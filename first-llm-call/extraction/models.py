"""Pydantic models describing a regulatory obligation extraction."""

import datetime
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field, ValidationInfo, model_validator


class RiskLevel(StrEnum):
    """Severity of the consequence attached to missing an obligation."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


def _normalise(text: str) -> str:
    """Collapse whitespace and case so quote matching survives reformatting."""
    return " ".join(text.split()).casefold()


class ExtractedObligation(BaseModel):
    """A single obligation extracted from a regulatory or policy snippet.

    Two design choices carry most of the weight here:

    ``date`` is nullable. A model asked for a non-optional deadline will invent
    one when the source states none, which is the characteristic failure of
    compliance extraction pipelines.

    ``source_quote`` grounds the extraction in the input. It is checked against
    the source text by :meth:`source_quote_must_be_verbatim`, which is the kind
    of constraint a JSON Schema cannot express and therefore the reason the
    repair loop in :mod:`extraction.extract` exists.
    """

    # The docstring above is written for developers. `description` here is
    # written for the model and replaces it in the generated schema, which is
    # sent on every request.
    model_config = ConfigDict(
        extra="forbid",
        json_schema_extra={
            "description": (
                "One obligation stated in the source text, with the span it was "
                "taken from."
            )
        },
    )

    entity: str = Field(
        description="The party bound by the obligation, copied from the source text."
    )
    obligation: str = Field(
        min_length=10,
        description="What the entity is required to do, stated in one sentence.",
    )
    date: datetime.date | None = Field(
        default=None,
        description=(
            "The compliance deadline as an ISO-8601 date. Null when the source "
            "states no explicit date."
        ),
    )
    risk_level: RiskLevel = Field(
        description=(
            "Severity of the consequence the source attaches to non-compliance."
        )
    )
    source_quote: str = Field(
        description=(
            "The shortest span of the source text supporting this extraction, "
            "copied verbatim."
        )
    )

    @model_validator(mode="after")
    def source_quote_must_be_verbatim(
        self, info: ValidationInfo
    ) -> ExtractedObligation:
        """Reject a quote the model composed rather than copied.

        Only runs when a ``source`` is supplied through validation context, so
        the model stays usable for re-reading extractions that were stored
        without their original snippet.
        """
        source = (info.context or {}).get("source")
        if source is None:
            return self

        if _normalise(self.source_quote) not in _normalise(source):
            raise ValueError(
                "source_quote must be copied verbatim from the source text; "
                f"{self.source_quote!r} does not appear in it"
            )

        return self
