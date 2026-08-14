import asyncio
import os

from anthropic.types import MessageParam

from call_model import call_model
from call_model_stream_auto_cleaning import call_model_stream_auto_cleaning
from chat import chat
from demo_extraction import demo_extraction
from translate import translate


async def main() -> int:
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("ANTHROPIC_API_KEY is not set in the environment.")
        return 1
    message: MessageParam = {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "Provide the current stage of Sun star life. did I use the name of the star correctly?",
            }
        ],
    }

    print(call_model(messages=[message]))

    translated = translate(word="hello", language="french")
    print(f"translation result: {translated}")

    star_messages: list[MessageParam] = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Provide the current stage of beteljoose star life. did I use the name of the star correctly?",
                }
            ],
        }
    ]

    call_model_stream_auto_cleaning(messages=star_messages)

    demo_extraction()

    chat()

    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
