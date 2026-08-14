from anthropic.types import ModelParam

DEFAULT_MODEL: ModelParam = "claude-haiku-4-5-20251001"
DEFAULT_MAX_TOKENS: int = 1000

#: Extraction rewards judgment on ambiguous regulatory wording, so it overrides
#: DEFAULT_MODEL. Must be a model that supports structured outputs.
EXTRACTION_MODEL: ModelParam = "claude-sonnet-5"

#: Transport-level retries, applied by the SDK with exponential backoff for
#: 429/5xx/connection errors. This is a separate budget from the validation
#: repair attempts in extraction.extract -- do not hand-roll retries on top.
DEFAULT_MAX_RETRIES: int = 3
