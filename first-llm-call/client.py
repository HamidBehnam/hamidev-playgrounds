from functools import cache

from anthropic import Anthropic, AsyncAnthropic


@cache
def get_client() -> Anthropic:
    return Anthropic()


@cache
def get_async_client() -> AsyncAnthropic:
    return AsyncAnthropic()
