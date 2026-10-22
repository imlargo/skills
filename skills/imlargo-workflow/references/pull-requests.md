---
name: pull-requests
description: "Workflow to open, merge and close out a reviewable GitHub pull request, plus title and body rules. Load when opening, updating or merging a PR."
---

# Pull Requests

A reviewer should understand the PR from the body alone: the changed behavior and why, not a list of files. Size the body to the change.

## Workflow

1. Read the repo's PR template and `AGENTS.md` / `CONTRIBUTING.md`.
2. Pick the base (`develop` in formal mode, see `branching`), compute the merge base and record the `base...head` range. Stacked branch: target the parent and describe only this PR.
3. Read the full diff. Separate runtime code from generated files, lockfiles and snapshots; back architecture claims with paths or symbols.
4. Run the checks that match the changed surfaces and record exact commands and results.
5. Screenshots only if imlargo asked: see [visual-evidence](visual-evidence.md).
6. Write the body to a temp file, push, `gh pr create --title ... --body-file ...`. Use `--draft` while not review-ready.
7. Open the PR and check base, head and rendering.
8. Address review: fix, run focused checks, push, reply with evidence, resolve the thread.
9. When checks are green: `gh pr merge --merge --delete-branch`. Merge commits keep the atomic history.
10. Close the issue it finished and update the project, if any (see `issues`).

## Title

Conventional Commits, ending with the issue: `fix(upload): retry once on 413 (#482)`. It becomes the merge commit's description.

## Body

Always `## Summary` (problem first, then what changed and why this way), `closes #N` (`refs #N` if partial) and `## Verification` (commands, results, what wasn't verified). Optional sections only when they speed up review: see [pr-body](pr-body.md). Keep a repo template's headings when there is one.

## Rules

- Never write "safe", "fixed" or "backward compatible" without evidence. Green CI proves only what CI runs.
- Don't describe a parent branch's changes as this PR's.
- No filler ("This PR aims to...", "robust"); start sentences with the fact. Plain hyphens, no em or en dashes.
- No secrets, user records or full payloads in the body. No PR-only files committed.
- No `Co-Authored-By` or agent attribution lines.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-create-pr/SKILL.md (MIT)
- https://github.com/moeru-ai/airi/blob/main/.agents/skills/create-pr/SKILL.md (MIT)
-->
