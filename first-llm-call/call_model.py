from anthropic.types import Message, MessageParam, ModelParam

from client import get_client
from config import DEFAULT_MAX_TOKENS, DEFAULT_MODEL


def call_model(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> str:
    response: Message = get_client().messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
    )

    return "".join(block.text for block in response.content if block.type == "text")
