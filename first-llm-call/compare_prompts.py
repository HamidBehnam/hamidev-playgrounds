"""Run every fixture through two or more prompt versions and diff the results.

Prompt changes regress things. A revision that fixes ``relative-date`` can
quietly break ``baseline``, and you will not see it by re-running the one
snippet you were working on. This runs the whole set against each version and
marks the fields that moved.

Usage::

    python compare_prompts.py v1 v2
    python compare_prompts.py v1 v2 v3 --only relative-date,two-entities
"""

import argparse
from concurrent.futures import ThreadPoolExecutor

from extraction import ExtractedObligation, ExtractionError, extract_obligation
from extraction.prompts import SYSTEM_PROMPTS
from fixtures import SNIPPETS, SNIPPETS_BY_ID, Snippet

#: Order matters: the fields most likely to move under a prompt change first.
COMPARED_FIELDS: tuple[str, ...] = (
    "date",
    "risk_level",
    "entity",
    "obligation",
    "source_quote",
)

#: Extractions are IO-bound, so a small pool keeps a full sweep tolerable
#: without hammering the rate limit.
MAX_WORKERS = 4

_COLUMN_WIDTH = 34


def compare_prompts(
    *, versions: list[str], snippets: tuple[Snippet, ...] = SNIPPETS
) -> int:
    """Print a field-by-field comparison and return the count of fixtures that moved.

    Args:
        versions: Prompt version keys, in the order the columns should appear.
        snippets: Fixtures to run. Defaults to the whole set.

    Returns:
        How many fixtures produced a different value under at least one version.
    """
    for version in versions:
        if version not in SYSTEM_PROMPTS:
            available = ", ".join(sorted(SYSTEM_PROMPTS))
            raise SystemExit(f"unknown prompt version {version!r}; have: {available}")

    jobs = [(snippet, version) for snippet in snippets for version in versions]
    print(
        f"Running {len(jobs)} extractions ({len(snippets)} fixtures x {len(versions)} versions)...\n"
    )

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        outcomes = list(pool.map(lambda job: _run(*job), jobs))

    results = dict(zip(((s.id, v) for s, v in jobs), outcomes, strict=True))

    moved = 0
    for snippet in snippets:
        if _report(snippet, versions, results):
            moved += 1

    print(f"\n{moved}/{len(snippets)} fixtures differ across {', '.join(versions)}.")
    return moved


def _run(snippet: Snippet, version: str) -> ExtractedObligation | str:
    """Extract once, returning the error text rather than raising.

    One fixture failing should not abandon the sweep -- a version that refuses
    on a single snippet is itself a comparison result worth seeing.
    """
    try:
        return extract_obligation(snippet=snippet.text, prompt_version=version)
    except ExtractionError as error:
        return f"!! {type(error).__name__}"


def _report(
    snippet: Snippet,
    versions: list[str],
    results: dict[tuple[str, str], ExtractedObligation | str],
) -> bool:
    """Print one fixture's table. Returns whether any field differed."""
    print(f"── {snippet.id} " + "─" * max(0, 60 - len(snippet.id)))
    print(f"   {snippet.probes}\n")

    header = "".join(version.ljust(_COLUMN_WIDTH) for version in versions)
    print(f"   {'field':<14}{header}")

    differed = False
    for field in COMPARED_FIELDS:
        values = [
            _value_of(results[snippet.id, version], field) for version in versions
        ]
        field_moved = len(set(values)) > 1
        differed = differed or field_moved

        cells = "".join(_truncate(value).ljust(_COLUMN_WIDTH) for value in values)
        marker = "  <- differs" if field_moved else ""
        print(f"   {field:<14}{cells}{marker}")

    print()
    return differed


def _value_of(result: ExtractedObligation | str, field: str) -> str:
    """Render one field of a result, or the error if the extraction failed."""
    if isinstance(result, str):
        return result
    return str(getattr(result, field))


def _truncate(value: str) -> str:
    limit = _COLUMN_WIDTH - 2
    return value if len(value) <= limit else f"{value[: limit - 1]}…"


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("versions", nargs="+", help="prompt versions to compare")
    parser.add_argument(
        "--only",
        help="comma-separated fixture ids; defaults to every fixture",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = _parse_args()

    if args.only:
        try:
            selected = tuple(SNIPPETS_BY_ID[name] for name in args.only.split(","))
        except KeyError as error:
            available = ", ".join(SNIPPETS_BY_ID)
            raise SystemExit(f"unknown fixture {error}; have: {available}") from None
    else:
        selected = SNIPPETS

    compare_prompts(versions=args.versions, snippets=selected)
