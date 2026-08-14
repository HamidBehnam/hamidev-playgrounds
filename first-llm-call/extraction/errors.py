"""Domain errors raised by :mod:`extraction.extract`.

Transport failures from the SDK are translated into these at the module
boundary, so callers handle one family of exceptions instead of reaching for
``anthropic`` types of their own.
"""


class ExtractionError(Exception):
    """Base class for every failure this package raises."""


class ExtractionRefused(ExtractionError):
    """Safety classifiers declined the request.

    Not retryable: the same snippet will be declined again.
    """

    def __init__(self, *, category: str | None, explanation: str | None) -> None:
        self.category = category
        self.explanation = explanation
        super().__init__(
            f"model refused the request (category={category}): {explanation}"
        )


class ExtractionTruncated(ExtractionError):
    """The response hit ``max_tokens`` before the object was complete.

    Not retryable by re-prompting -- raise ``max_tokens`` instead.
    """


class ExtractionInvalid(ExtractionError):
    """The response never validated, including after the repair attempts."""

    def __init__(self, *, attempts: int, last_error: Exception) -> None:
        self.attempts = attempts
        self.last_error = last_error
        super().__init__(
            f"no valid extraction after {attempts} attempt(s): {last_error}"
        )


class ExtractionUnavailable(ExtractionError):
    """The API could not be reached, or kept failing after the SDK's retries.

    The underlying ``anthropic`` exception is preserved as ``__cause__``.
    """
