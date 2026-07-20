from anthropic import Anthropic
from anthropic.types import Message


def ask(
    *,
    question: str,
    client: Anthropic,
    model: str,
    max_tokens: int,
) -> str:
    message: Message = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=[{"role": "user", "content": question}],
    )

    return message.content[0].text


def main() -> int:
    from dotenv import load_dotenv
    import os

    load_dotenv()
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("ANTHROPIC API KEY is not found in the env file.")
        return 1

    client = Anthropic()
    question: str = "Provide the current stage of Bettlejuse star life. did I use the name of the star correctly?"
    result = ask(
        client=client,
        model="claude-haiku-4-5-20251001",
        max_tokens=1000,
        question=question,
    )
    print(f"Here's the result: {result}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
