from anthropic import Anthropic
from anthropic.types import Message, MessageParam, ModelParam

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000
CLIENT: Anthropic = Anthropic()


def call_model(
    *,
    messages: list[MessageParam],
    model: str = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> str:
    response: Message = CLIENT.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    )

    return response.content[0].text
