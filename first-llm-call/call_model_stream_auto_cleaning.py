from anthropic import Anthropic
from anthropic.types import MessageParam, ModelParam

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000
CLIENT: Anthropic = Anthropic()


def call_model_stream_auto_cleaning(
    *,
    messages: list[MessageParam],
    model: ModelParam = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> None:
    with CLIENT.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=messages,
        stream=True,
    ) as stream:
        for event in stream:
            if event.type == 'content_block_delta' and event.delta.type == 'text_delta':
                print(event.delta.text, flush=True, end="")

    print()
