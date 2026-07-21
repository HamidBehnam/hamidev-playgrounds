import os
from translate import translate
from call_model import call_model


def main() -> int:
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("ANTHROPIC_API_KEY is not set in the environment.")
        return 1

    result = call_model(
        prompt="Provide the current stage of Sun star life. did I use the name of the star correctly?"
    )
    print(f"Here's the result: {result}")

    translated = translate(word="hello", language="french")
    print(f"translation result: {translated}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
