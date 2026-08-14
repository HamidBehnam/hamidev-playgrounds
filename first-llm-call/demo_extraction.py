from extraction import ExtractionError, extract_obligation
from fixtures import SNIPPETS_BY_ID

#: Kept to two fixtures so running main.py stays cheap. Iterate over the whole
#: set from a dedicated comparison runner instead.
DEMO_SNIPPET_IDS: tuple[str, ...] = ("baseline", "no-date", "severity-unstated")


def demo_extraction() -> None:
    """Extract obligations from a couple of fixtures and print the results.

    Errors are caught per snippet so one failure does not abandon the rest --
    which is also how a batch extraction job should behave.
    """
    for snippet_id in DEMO_SNIPPET_IDS:
        snippet = SNIPPETS_BY_ID[snippet_id]
        print(f"\n[{snippet.id}] {snippet.probes}")

        try:
            extraction = extract_obligation(snippet=snippet.text)
        except ExtractionError as error:
            # Every failure mode the package raises lands here, including
            # transport failures the SDK already retried and gave up on.
            print(f"  failed: {type(error).__name__}: {error}")
            continue

        print(f"  entity      : {extraction.entity}")
        print(f"  obligation  : {extraction.obligation}")
        print(f"  date        : {extraction.date}")
        print(f"  risk_level  : {extraction.risk_level}")
        print(f"  source_quote: {extraction.source_quote!r}")
