from anthropic import AsyncAnthropic
from anthropic.types import Message, MessageParam, ModelParam

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000
CLIENT: AsyncAnthropic = AsyncAnthropic()


async def call_model_async(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    response: Message = await CLIENT.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    )

    result = "".join(block.text for block in response.content if block.type == "text")
    print(result)

