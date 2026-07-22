from anthropic import Anthropic, Stream
from anthropic.types import MessageParam, ModelParam, RawMessageStreamEvent

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000
CLIENT: Anthropic = Anthropic()


def call_model_stream_helper(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    with CLIENT.messages.stream(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    ) as stream:
        for text in stream.text_stream:
            print(text, flush=True, end="")

    print()
