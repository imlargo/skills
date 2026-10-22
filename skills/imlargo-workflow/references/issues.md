---
name: issues
description: "Issue titles, labels, priority, bug/feature/retroactive templates, keeping issues current and closing them. Load when creating, updating, triaging or closing an issue."
---

# Issues

Anyone should be able to pick up an issue from its body, and its comments should tell what happened until it closed.

## Title and Labels

Symptom or outcome first, specific, with scope or impact when known. Optional `Area: ` prefix; `(needs repro)` or `(exposed by #N)` when they apply.

```text
Good: Invoices: exporting a month with refunds shows a negative total (3 workspaces, since 03/12)
Good: "Assign tags" picker only shows the first two items on small screens (needs repro)
Bad:  Bug in invoices
```

Labels: exactly one of `bug` / `enhancement`, plus every `area:*` it touches (create a new area only when none fits), plus `retroactive` for work merged before its issue existed.

## Priority

Every bug and urgent request has `**Priority: P1.** One sentence of impact.` in its summary. With a project, the `Priority` field holds the same value.

- `P0`: production down, data loss, security or payments broken. Hotfix now.
- `P1`: core flow broken for real users, no workaround. Next up.
- `P2`: degraded, workaround exists, or slow. Soon.
- `P3`: minor or cosmetic. When there's room.

## Templates

**Bug:** `## Summary` (what, who, since when; quote the source in italics with date and time zone; priority line) → `## Root cause` (`file:line` facts; if unconfirmed, title it "Likely causes (from code, not profiled; ranked)") → `## Evidence` (read-only checks with timestamp and source, numbers, a table for many records) → `## Expected` → `## Suggested fix` (checklist; production data fixes marked as needing owner authorization; product questions for the owner) → `Related: #N`. Use `## Acceptance criteria` instead of a fix when the approach isn't clear yet.

**Enhancement:** `## Summary` (request, who asked, quoted with date, why now) → `## Proposal` (checklist, exact UI copy in italics) or `## Scope (to be refined)` → `## Related` → `## Notes`.

**Retroactive:** first line `_Retroactive issue for work that was already merged without an issue._`, then what shipped or the bug, cause, fix (PR, merge date, sha), `**Not fixed:**` leftovers and any user action needed.

## Keeping It Current

- Find or create the issue before starting. On start: assign it, and move it to `In progress` if there is a project.
- Label claims as verified (with evidence), inferred from code, or not verified.
- Investigate production read-only. Writes to production data need explicit owner authorization; product decisions go to the owner as questions.
- New findings go in dated comments, not silent edits: `**Update YYYY-MM-DD HH:MM UTC (prod, read-only).** ...`. Tick checklist items as they land.
- A separate problem gets its own linked issue. When blocked on someone, say so (`**Needs info**: ...`) with a close-by date.

## Closing

- The merge or push that finishes the issue closes it: `closes #N` in PRs, `Closes #N` in fast-mode commit bodies. After merging into `develop`, close it yourself (`gh issue close N --comment "..."`), since GitHub only auto-closes on the default branch.
- The closing comment says what shipped in plain words and links the PR (and sha, when known). Partial work uses `refs #N` and a comment on what remains; leftovers become new linked issues.
- Milestones only in versioned projects, one per upcoming version.
