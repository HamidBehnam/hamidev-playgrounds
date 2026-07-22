import os
from translate import translate
from call_model import call_model
from chat import chat
from anthropic.types import MessageParam
from call_model_stream_async import call_model_stream_async
import asyncio


async def main() -> int:
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("ANTHROPIC_API_KEY is not set in the environment.")
        return 1
    message: MessageParam = {
        "role": "user",
        "content": "Provide the current stage of Sun star life. did I use the name of the star correctly?",
    }

    call_model(messages=[message])

    translated = translate(word="hello", language="french")
    print(f"translation result: {translated}")

    await call_model_stream_async(messages=[{
        "role": "user",
        "content": "Provide the current stage of beteljoose star life. did I use the name of the star correctly?"
    }])

    chat()

    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
