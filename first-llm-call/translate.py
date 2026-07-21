from call_model import call_model


def translate(*, word: str, language: str) -> str:
    return call_model(
        prompt=f"Translate the word {word} to {language}, return only the translated word nothing else.",
    )
