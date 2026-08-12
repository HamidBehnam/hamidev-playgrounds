from anthropic.types import MessageParam, ModelParam

from client import get_client
from config import DEFAULT_MAX_TOKENS, DEFAULT_MODEL


def call_model_stream_helper(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    with get_client().messages.stream(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    ) as stream:
        for text in stream.text_stream:
            print(text, flush=True, end="")

    print()
