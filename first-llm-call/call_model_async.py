from anthropic.types import Message, MessageParam, ModelParam

from client import get_async_client
from config import DEFAULT_MAX_TOKENS, DEFAULT_MODEL


async def call_model_async(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    response: Message = await get_async_client().messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    )

    result = "".join(block.text for block in response.content if block.type == "text")
    print(result)
