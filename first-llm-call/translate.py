from call_model import call_model
from anthropic.types import MessageParam


def translate(*, word: str, language: str) -> str:
    message: MessageParam = {
        "role": "user",
        "content": f"Translate the word {word} to {language}, return only the translated word nothing else.",
    }

    return call_model(messages=[message])
