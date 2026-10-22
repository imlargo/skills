---
name: code-review
description: "Checklist for self-review before handing work back and for reviewing someone else's changes (a teammate, Codex, another agent). Load when reviewing a diff, a PR or your own changes."
---

# Code Review

Use it on your own diff before reporting done, and on others' work when asked to review it.

## Checklist

In priority order. The first four are blocking.

1. **Correct:** it solves the actual problem at its root cause, including edge cases (empty, error, concurrent, large data).
2. **No regressions:** existing behavior, config and features still work. Nothing was removed that wasn't asked for.
3. **Safe:** no secrets or personal data in code, logs, issues or PRs. Production data is untouched unless approved.
4. **In scope:** nothing beyond the request. Extra fixes are reported, not shipped.
5. **Consistent:** follows the repo's dominant pattern and reuses existing components, helpers, types and tokens.
6. **Simple:** no over-engineering, dead code, premature abstraction or unused exports.
7. **Typed:** no `any`, magic strings or inline complex types.
8. **Commented right:** only the why; no narration or AI slop.
9. **Tested:** behavior changes and bug fixes have tests (production projects).
10. **Verified:** the check gate passed, and anything not verified is stated.

## Reviewing Others' Work

- Read the whole diff and the issue it closes, not just the summary. Summaries overclaim.
- Focus on code quality and architecture, not UI/UX, unless asked. Include maintainability risks and tech debt the change introduces.
- Report findings as: location, what is wrong, why it's a problem, the fix. Blocking first.
- Don't restate what's fine. If nothing blocks, say so in one line.
