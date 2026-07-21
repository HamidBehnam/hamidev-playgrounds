# first-llm-call

A minimal playground for calling the Claude API with the `anthropic` Python SDK.

## Setup

Copy the example env file and add your key:

```
cp .env.example .env
```

Install dependencies:

```
uv sync
```

## Running

```
uv run --env-file .env main.py
```

The `--env-file` flag is required. The app reads `ANTHROPIC_API_KEY` from the
environment and does not load `.env` itself — see
[ADR 0001](docs/adr/0001-env-vars.md) for why. Without the flag it exits with
`ANTHROPIC_API_KEY is not set in the environment.`

## Structure

| File | Responsibility |
| --- | --- |
| `main.py` | Entry point — checks config, calls the tasks, prints results. |
| `call_model.py` | Transport — owns the Anthropic client and the model/token defaults. |
| `translate.py` | Task — builds a translation prompt on top of `call_model`. |

Task modules like `translate.py` own a prompt and nothing else; anything that
talks to the SDK lives in `call_model.py`.

## Lint and format

```
uv run ruff check .
uv run ruff format .
```
