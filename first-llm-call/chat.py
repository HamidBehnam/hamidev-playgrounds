from call_model import call_model
from anthropic.types import MessageParam


def chat() -> None:
    history: list[MessageParam] = []

    while True:
        try:
            user_prompt = input("You: ").strip()
        except EOFError, KeyboardInterrupt:
            print("ok, bye")
            break

        if not user_prompt:
            continue

        history.append({"role": "user", "content": user_prompt})
        agent_response = call_model(messages=history)
        history.append({"role": "assistant", "content": agent_response})
        print(f"Agent: {agent_response}")
