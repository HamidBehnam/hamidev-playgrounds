from anthropic import Stream
from anthropic.types import MessageParam, ModelParam, RawMessageStreamEvent

from client import get_client
from config import DEFAULT_MAX_TOKENS, DEFAULT_MODEL


def call_model_stream(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    stream: Stream[RawMessageStreamEvent] = get_client().messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
        stream=True,
    )

    try:
        for event in stream:
            if event.type == 'content_block_delta' and event.delta.type == 'text_delta':
                print(event.delta.text, flush=True, end="")
    finally:
        stream.close()

    print()
