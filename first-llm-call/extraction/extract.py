"""Extract a structured obligation from a regulatory snippet.

Two retry budgets run here, on independent axes:

*Transport* retries (429, 5xx, connection failures) are handled by the SDK
itself with exponential backoff -- see ``DEFAULT_MAX_RETRIES`` in
:mod:`config`. By the time a rate-limit error reaches this module it has
already been retried and is a genuine failure, so it is translated and raised
rather than retried again.

*Validation* repair is handled here. Constrained decoding guarantees the
response is shaped like :class:`ExtractedObligation`, but it cannot enforce
semantics -- the verbatim check on ``source_quote`` is the model's own claim
about its input, which no schema can express. That surfaces as a
``ValidationError``, and the model gets one chance to correct itself with the
error fed back to it.

The schema is Pydantic's own ``model_json_schema()``, sent unmodified. Pydantic
knows nothing about which keywords this API accepts, so anything it emits goes
out on the wire as-is; validating the response against the model on the way
back is what covers any keyword the API turns out to ignore.
"""

import anthropic
from anthropic.types import Message, MessageParam, ModelParam
from pydantic import ValidationError

from client import get_client
from config import DEFAULT_MAX_TOKENS, EXTRACTION_MODEL
from extraction.errors import (
    ExtractionInvalid,
    ExtractionRefused,
    ExtractionTruncated,
    ExtractionUnavailable,
)
from extraction.models import ExtractedObligation
from extraction.prompts import (
    DEFAULT_PROMPT_VERSION,
    REPAIR_INSTRUCTION,
    get_system_prompt,
)

#: Derived once at import: the model is the source of truth, the schema follows.
_OUTPUT_SCHEMA = ExtractedObligation.model_json_schema()


def extract_obligation(
    *,
    snippet: str,
    model: ModelParam = EXTRACTION_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
    prompt_version: str = DEFAULT_PROMPT_VERSION,
    max_repair_attempts: int = 1,
) -> ExtractedObligation:
    """Extract the primary obligation stated in ``snippet``.

    Args:
        snippet: The regulatory or policy text to read.
        model: Must support structured outputs (Haiku 4.5, Sonnet 5, Opus 4.8,
            Opus 5, Fable 5).
        max_tokens: Output ceiling. Truncation is raised, not repaired.
        prompt_version: Key into :data:`extraction.prompts.SYSTEM_PROMPTS`.
        max_repair_attempts: Extra attempts granted after a validation failure.
            Zero disables repair.

    Returns:
        The validated extraction.

    Raises:
        ExtractionRefused: Safety classifiers declined the request.
        ExtractionTruncated: The response hit ``max_tokens``.
        ExtractionInvalid: Still invalid after every repair attempt.
        ExtractionUnavailable: The API was unreachable or kept failing.
    """
    messages: list[MessageParam] = [{"role": "user", "content": snippet}]
    system_prompt = get_system_prompt(prompt_version)
    last_error: ValidationError | None = None

    for attempt in range(max_repair_attempts + 1):
        response = _request(
            messages=messages,
            system_prompt=system_prompt,
            model=model,
            max_tokens=max_tokens,
        )
        raw_output = _text_of(response)

        try:
            # `context` carries the source text to the grounding validator; see
            # ExtractedObligation.source_quote_must_be_verbatim.
            return ExtractedObligation.model_validate_json(
                raw_output, context={"source": snippet}
            )
        except ValidationError as error:
            last_error = error
            if attempt == max_repair_attempts:
                break

            # Repair conversationally rather than restarting. The API is
            # stateless, so the model only knows what it produced if we echo it
            # back alongside the error.
            repair: list[MessageParam] = [
                {"role": "assistant", "content": raw_output},
                {
                    "role": "user",
                    "content": REPAIR_INSTRUCTION.format(error=_describe(error)),
                },
            ]
            messages += repair

    assert last_error is not None  # only reachable via the `except` branch
    raise ExtractionInvalid(attempts=max_repair_attempts + 1, last_error=last_error)


def _request(
    *,
    messages: list[MessageParam],
    system_prompt: str,
    model: ModelParam,
    max_tokens: int,
) -> Message:
    """Make one constrained call and reject responses that carry no output.

    ``stop_reason`` is checked before the content is read: a refusal returns
    HTTP 200 with an empty content list, so code that indexes into ``content``
    first crashes on it.
    """
    try:
        response = get_client().messages.create(
            model=model,
            max_tokens=max_tokens,
            system=system_prompt,
            messages=messages,
            output_config={"format": {"type": "json_schema", "schema": _OUTPUT_SCHEMA}},
        )
    # Most specific first. In this SDK APIConnectionError is a sibling of
    # APIStatusError, not a subclass, so it needs its own clause.
    except anthropic.RateLimitError as error:
        raise ExtractionUnavailable(
            "rate limited, and the SDK's automatic retries were exhausted"
        ) from error
    except anthropic.APIStatusError as error:
        raise ExtractionUnavailable(
            f"API returned {error.status_code}: {error.message}"
        ) from error
    except anthropic.APIConnectionError as error:
        raise ExtractionUnavailable("could not reach the API") from error

    if response.stop_reason == "refusal":
        details = response.stop_details
        raise ExtractionRefused(
            category=getattr(details, "category", None),
            explanation=getattr(details, "explanation", None),
        )

    if response.stop_reason == "max_tokens":
        raise ExtractionTruncated(
            f"response hit the {max_tokens} token ceiling before completing; "
            "re-prompting would truncate again, so raise max_tokens instead"
        )

    return response


def _text_of(response: Message) -> str:
    """Concatenate the text blocks of a response."""
    return "".join(block.text for block in response.content if block.type == "text")


def _describe(error: ValidationError) -> str:
    """Render a validation error compactly enough to hand back to the model."""
    return "\n".join(
        f"- {'.'.join(str(part) for part in item['loc']) or '(root)'}: {item['msg']}"
        for item in error.errors()
    )
