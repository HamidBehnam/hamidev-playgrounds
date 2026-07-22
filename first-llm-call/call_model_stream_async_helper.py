from anthropic import AsyncAnthropic, AsyncStream
from anthropic.types import MessageParam, ModelParam, RawMessageStreamEvent

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000
CLIENT: AsyncAnthropic = AsyncAnthropic()


async def call_model_stream_async_helper(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    async with CLIENT.messages.stream(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    ) as stream:
        async for text in stream.text_stream:
            print(text, flush=True, end="")
        final_message = await stream.get_final_message()

    print("\n\nSTREAMING IS DONE.  HERE IS THE FINAL ACCUMULATED MESSAGE: ")
    print(final_message)
