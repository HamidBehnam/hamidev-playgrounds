from functools import cache

from anthropic import Anthropic, AsyncAnthropic

from config import DEFAULT_MAX_RETRIES


@cache
def get_client() -> Anthropic:
    return Anthropic(max_retries=DEFAULT_MAX_RETRIES)


@cache
def get_async_client() -> AsyncAnthropic:
    return AsyncAnthropic(max_retries=DEFAULT_MAX_RETRIES)
