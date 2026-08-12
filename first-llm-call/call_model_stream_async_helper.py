from anthropic.types import MessageParam, ModelParam

from client import get_async_client
from config import DEFAULT_MAX_TOKENS, DEFAULT_MODEL


async def call_model_stream_async_helper(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    async with get_async_client().messages.stream(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    ) as stream:
        async for text in stream.text_stream:
            print(text, flush=True, end="")
        final_message = await stream.get_final_message()

    print("\n\nSTREAMING IS DONE.  HERE IS THE FINAL ACCUMULATED MESSAGE: ")
    print(final_message)
