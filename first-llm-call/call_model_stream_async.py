from anthropic import AsyncAnthropic, AsyncStream
from anthropic.types import MessageParam, ModelParam, RawMessageStreamEvent

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000
CLIENT: AsyncAnthropic = AsyncAnthropic()


async def call_model_stream_async(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    stream: AsyncStream[RawMessageStreamEvent] = await CLIENT.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
        stream=True,
    )

    try:
        async for event in stream:
            if event.type == 'content_block_delta' and event.delta.type == 'text_delta':
                print(event.delta.text, flush=True, end="")
    finally:
        await stream.close()

    print()
