from anthropic import AsyncStream
from anthropic.types import MessageParam, ModelParam, RawMessageStreamEvent

from client import get_async_client
from config import DEFAULT_MAX_TOKENS, DEFAULT_MODEL


async def call_model_stream_async(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    stream: AsyncStream[
        RawMessageStreamEvent
    ] = await get_async_client().messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
        stream=True,
    )

    try:
        async for event in stream:
            if event.type == "content_block_delta" and event.delta.type == "text_delta":
                print(event.delta.text, flush=True, end="")
    finally:
        await stream.close()

    print()
