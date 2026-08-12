from anthropic.types import MessageParam, ModelParam

from client import get_client
from config import DEFAULT_MAX_TOKENS, DEFAULT_MODEL


def call_model_stream_auto_cleaning(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    with get_client().messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
        stream=True,
    ) as stream:
        for event in stream:
            if event.type == "content_block_delta" and event.delta.type == "text_delta":
                print(event.delta.text, flush=True, end="")

    print()
