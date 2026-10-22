---
name: issues
description: "How imlargo writes and works issues: titles, labels, priority, bug/feature/retroactive templates, evidence, keeping issues current and closing them. Load when creating, refining, triaging, updating or closing an issue."
---

# Issues

An issue is the single place where a problem is understood, decided and closed. Anyone (or any agent) should be able to pick it up from the body alone, and its comments should tell what happened until it closed.

## Title

State the symptom or outcome, specific enough to understand without opening the issue. Add the concrete scope or impact when it is known.

```text
# Good
Invoices: exporting a month with refunds shows a negative total (3 workspaces, since 03/12)
Search results page slow with large catalogs: per-item price lookups, filter state recomputed on every keystroke
"Assign tags" picker only lets you pick the first two items on small screens (needs repro)
Webhook retries send duplicate receipts (exposed by #212)
Account settings: add Disable/Enable account in the danger zone (keeps data, frees the plan slot)

# Bad
Bug in invoices
Search is slow
Fix tags
```

- Optional `Area: ` prefix when it helps scanning (`Invoices: ...`, `Billing: ...`).
- Mark open conditions in parentheses: `(needs repro)`, `(exposed by #N)`.
- Name the user-visible behavior, not the suspected code.

## Labels

- Exactly one type label: `bug` (something isn't working) or `enhancement` (new feature or request).
- One or more `area:*` labels for the product areas it touches. Each area label has a description listing what it covers; create a new one only when no existing area fits.
- `retroactive` for issues opened after the work already merged (see below).

## Priority

Put a priority line in the summary of every bug and of urgent requests, with one sentence of impact:

```markdown
**Priority: P1.** Paying customers can't add accounts after a delivery; the only workaround deletes data.
```

| Priority | Meaning | Response |
|----------|---------|----------|
| `P0` | Production down, data loss, security hole, or payments broken | Drop everything; hotfix now |
| `P1` | A core flow is broken for real users with no workaround | Next thing to work on |
| `P2` | Degraded or broken with a workaround, or a slow experience | Planned soon |
| `P3` | Minor, cosmetic, or nice to have | When there is room |

When the repo has a project, the `Priority` field holds the value and the body line explains it; keep both equal.

## Bug Template

```markdown
## Summary
What is broken, who is affected and since when. Quote the source with date and time zone:
customer report, support chat or team chat, in italics.

**Priority: P2.** One-sentence impact.

## Root cause
Facts with `file:line` references. When not confirmed, title the section
"Likely causes (code analysis, not profiled yet; ranked)" or "Hypothesis (from code)".

## Evidence
Read-only checks with timestamp and source (prod, logs, metrics). Numbers, and a table
when several records are affected.

## Expected
The correct behavior, from the user's point of view.

## Suggested fix
- [ ] Ordered, checkable steps.
- [ ] Data fixes or backfills, marked as needing explicit owner authorization.
- [ ] Measurement to confirm the fix, when it is about performance.

Open questions for the owner, when a product decision is needed.

Related: #N, #M
```

Use `## Acceptance criteria` instead of `## Suggested fix` when the outcome is clear but the approach is not, especially for bugs that still need a repro.

## Enhancement Template

```markdown
## Summary
The request, who asked and where (quoted, with date), and why it matters now.

## Proposal
- [ ] Checkable scope items, including exact UI copy in italics when there is any.

## Related
- #N: how it relates.

## Notes
Constraints, decisions already made, open questions.
```

Use `## Scope (to be refined)` instead of `## Proposal` when the work still needs discovery or a handoff.

## Retroactive Issues

Work merged without an issue gets one after the fact, labeled `retroactive`, so the history stays traceable.

```markdown
_Retroactive issue for work that was already merged without an issue._

## Bug            (or: ## What shipped)
## Cause
## Fix
PR #N (merged YYYY-MM-DD HH:MM UTC). Live in `<sha>`.

**Not fixed:** what remains and what decision it needs.

## Customer action
What affected users must do, if anything.
```

## Keeping Issues Current

- **Every piece of work has an issue.** Before starting, find or create it. Work that slipped through gets a retroactive issue.
- **Start.** Assign it to the person doing the work and, if there is a project, move it to `In progress`.
- **Facts vs hypotheses.** Label every claim: verified (with evidence), inferred from code, or not verified. Never turn a hypothesis into a statement.
- **Read-only investigation.** Gather evidence from production without writing to it. Any write to production data (backfill, migration, manual fix) needs explicit owner authorization, stated in the issue.
- **Product decisions belong to the owner.** List them as open questions instead of deciding them in code.
- **Update with comments, not silent edits.** New findings go in a dated comment: `**Update YYYY-MM-DD HH:MM UTC (prod, read-only).** ...`, or `Second cause, also fixed in #N. ...`. Tick checklist items as they land.
- **Split, don't stretch.** A separate problem found along the way gets its own issue, linked from both sides.
- **Waiting on someone.** Say so explicitly (`Moving to **Needs info**: ...`) with what is missing and when it will be closed if nothing arrives.

## Closing

Merging the PR, or pushing the commit in fast mode, that finishes an issue closes it:

- PRs use `closes #N`; commits pushed to `main` use `Closes #N` in the body. GitHub auto-closes only on the default branch, so after merging into `develop`, close it yourself: `gh issue close N --comment "Fixed by #PR."`
- Partial work uses `refs #N` and leaves the issue open, with a comment saying what landed and what remains.
- The closing comment says what shipped in plain language and links the PR; add the release or deployed sha when known.
- Leftovers move to new linked issues instead of keeping the old one open.

## Milestones

Only in versioned projects: one milestone per upcoming version (`v1.4.0`), closed when it is released. Unversioned projects don't use milestones.
