from anthropic import Anthropic, Stream
from anthropic.types import MessageParam, ModelParam, RawMessageStreamEvent

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000
CLIENT: Anthropic = Anthropic()


def call_model_stream(
    *,
    messages: list[MessageParam],
    model: str = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    stream: Stream[RawMessageStreamEvent] = CLIENT.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
        stream=True,
    )

    for event in stream:
        if event.type == 'content_block_delta':
            print(event.delta.text, flush=True, end="")

    print()
