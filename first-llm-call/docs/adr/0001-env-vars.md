# ADR 0001: Read env vars from the environment, not via python-dotenv

Status: Accepted — 2026-07-21

## Context

The app needs `ANTHROPIC_API_KEY`. Originally `main.py` called `load_dotenv()`,
and `call_model.py` constructs the Anthropic client at module scope. That forced
`load_dotenv()` to run *before* the imports, which meant a statement sitting
between import lines and three `E402` ruff errors.

The ordering was load-bearing but invisible: nothing in the code said why the
imports were arranged that way, so any routine tidy-up would have broken it at
runtime with a confusing auth error.

## Decision

Drop the `python-dotenv` dependency. The app reads `os.getenv("ANTHROPIC_API_KEY")`
and never loads a `.env` file itself. Locally, `uv` injects the file instead:

```
uv run --env-file .env main.py
```

## Consequences

- Imports are plain top-of-file. `E402` is gone structurally, not suppressed.
- Deployment needs no code change — platform-injected env vars work as-is, and no
  `.env` file ships or gets baked into an image.
- Local runs require the `--env-file` flag; plain `uv run main.py` fails the key
  check. Setting `UV_ENV_FILE=.env` (via direnv or the shell) removes the flag if
  it becomes tedious.
- Already-exported env vars take precedence over `.env`. Correct for deployment,
  but worth remembering when debugging a stale local key.
