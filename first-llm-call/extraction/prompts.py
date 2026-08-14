"""Versioned system prompts for obligation extraction.

Prompts are versioned rather than edited in place so that a revision is a diff
you can run side by side against :mod:`fixtures.snippets`. Record what each
version changed, and what it broke, in ``docs/prompt-log.md``.

``v1`` is a deliberately plain baseline. It says what to extract and nothing
about how to handle the awkward cases -- that is the material for v2 onward.
"""

REPAIR_INSTRUCTION = (
    "Your previous response did not pass validation:\n\n{error}\n\n"
    "Return the corrected object. Change only what the error identifies; "
    "leave every other field exactly as it was."
)

SYSTEM_PROMPTS: dict[str, str] = {
    "v1": (
        "You extract regulatory obligations from policy and legislative text.\n"
        "\n"
        "Given a snippet, identify the single most significant obligation it "
        "imposes and report the party bound by it, what they must do, the "
        "deadline, and how severe the consequence of non-compliance is."
    ),
}

DEFAULT_PROMPT_VERSION = "v1"


def get_system_prompt(version: str) -> str:
    """Return the system prompt for ``version``.

    Raises:
        KeyError: if ``version`` is not defined, listing what is available so a
            typo in a comparison run fails loudly rather than silently falling
            back to the baseline.
    """
    try:
        return SYSTEM_PROMPTS[version]
    except KeyError:
        available = ", ".join(sorted(SYSTEM_PROMPTS))
        raise KeyError(
            f"unknown prompt version {version!r}; available: {available}"
        ) from None
