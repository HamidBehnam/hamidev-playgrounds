"""Messy inputs for prompt iteration.

Each snippet targets one failure mode. A prompt revision that fixes one of
these will often regress another -- which is the point of keeping them together
and running the whole set on every change rather than eyeballing one input.

The ``probes`` field is a note to yourself about what the snippet is for; it is
not an expected output. Deliberately so: several of these have no single
defensible answer, and writing one down would hide the judgment call rather
than surface it.
"""

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class Snippet:
    """A source text plus a note on the failure mode it exercises."""

    id: str
    probes: str
    text: str


SNIPPETS: tuple[Snippet, ...] = (
    Snippet(
        id="baseline",
        probes="Clean case. Every field is stated outright; anything that fails "
        "here is a prompt problem, not a hard-case problem.",
        text=(
            "Pursuant to Section 12(b), each Registered Broker-Dealer shall file "
            "an annual audited statement of financial condition with the "
            "Commission no later than 31 March 2027. Failure to file will result "
            "in suspension of registration."
        ),
    ),
    Snippet(
        id="no-date",
        probes="No deadline exists. Does the model return null, or invent one?",
        text=(
            "Data controllers must maintain a written record of all processing "
            "activities carried out under their authority, and make that record "
            "available to the supervisory authority on request."
        ),
    ),
    Snippet(
        id="relative-date",
        probes="Deadline is relative to an unstated event. Resolving it requires "
        "a date the snippet does not contain.",
        text=(
            "Any Covered Institution that becomes aware of a reportable breach "
            "shall notify affected individuals within 30 days of enactment of "
            "this Part. Late notification carries a civil penalty of up to "
            "$50,000 per affected individual."
        ),
    ),
    Snippet(
        id="two-entities",
        probes="Two parties, one obligation. Which is bound, and which is merely "
        "mentioned?",
        text=(
            "The Vendor shall provide the Agency with quarterly security "
            "attestations. The Agency shall review each attestation, but bears "
            "no obligation to act upon it. Attestations are due within ten "
            "business days of each quarter's close, beginning 1 January 2027."
        ),
    ),
    Snippet(
        id="conditional",
        probes="Obligation applies only above a threshold. Does the extraction "
        "carry the condition, or drop it and overstate the scope?",
        text=(
            "Where an undertaking processes the personal data of more than "
            "10,000 data subjects in a calendar year, it shall appoint a Data "
            "Protection Officer and notify the authority of that appointment "
            "before 1 July 2027. Undertakings below this threshold are exempt."
        ),
    ),
    Snippet(
        id="buried",
        probes="One obligation inside procedural boilerplate. Tests whether the "
        "quote stays tight instead of swallowing the paragraph.",
        text=(
            "This Part may be cited as the Financial Transparency Regulations. "
            "It applies to the whole of the territory. Nothing in this Part "
            "affects the operation of the Companies Act. Subject to paragraph "
            "(4), every Listed Entity shall publish its beneficial ownership "
            "register by 30 September 2027. Paragraph (4) is repealed. The "
            "Minister may make further provision by order."
        ),
    ),
    Snippet(
        id="severity-unstated",
        probes="No penalty is described. risk_level becomes a judgment call, "
        "which is exactly where prompt wording moves the answer.",
        text=(
            "Operators of essential services should review their incident "
            "response procedures on an annual basis and update them where "
            "material changes to their network architecture have occurred."
        ),
    ),
    Snippet(
        id="split-obligation",
        probes="Obligation spans two sentences. A verbatim quote cannot cover "
        "both, so the model must choose the load-bearing span.",
        text=(
            "Each Clearing Member shall maintain net capital of not less than "
            "$5,000,000. That amount shall be recalculated on the first "
            "business day of each month and certified to the Exchange by 15 "
            "February 2027, with material shortfalls disclosed immediately."
        ),
    ),
)

SNIPPETS_BY_ID: dict[str, Snippet] = {snippet.id: snippet for snippet in SNIPPETS}
