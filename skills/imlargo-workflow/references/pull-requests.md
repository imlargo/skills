---
name: pull-requests
description: "Step-by-step workflow to open a reviewable GitHub pull request, its title, required body sections, merge rules and how to address review. Load when asked to open, create, publish, prepare, update or merge a PR."
---

# Pull Requests

Open a PR that a reviewer can understand from the body alone. Explain the changed behavior and why, not the list of changed files. Keep the body proportional to the change: a one-line fix gets a few sentences, a cross-module feature gets tables and diagrams.

## Workflow

1. Inspect the repo: `git status`, current branch, remotes, default branch, `.github/PULL_REQUEST_TEMPLATE*`, and `AGENTS.md` / `CONTRIBUTING.md` for PR rules.
2. Pick the base from the branching mode: `develop` in formal mode (`main` only for release and hotfix PRs). See [branching](branching.md). Compute the merge base against it and record the exact `base...head` range the PR publishes. If the branch is stacked on another unmerged branch, target that branch and describe only this PR's own changes.
3. Read the full diff. Separate runtime code from generated files, lockfiles and snapshots. Trace changed code to its entry points, callers and external boundaries so architecture claims are backed by file paths or symbols.
4. Classify the PR (feature, fix, refactor, chore, docs) and decide which optional body sections earn their place. See [pr-body](pr-body.md).
5. Run the checks that match the changed surfaces (focused tests, typecheck, lint). Record the exact commands and results.
6. Only if imlargo asked for visual evidence, capture before/after screenshots. See [visual-evidence](visual-evidence.md). Otherwise skip this step, even for UI changes.
7. Review the commit history and reshape it into atomic Conventional Commits. See [commits](commits.md).
8. Write the body to a temporary file. Push the branch. Create the PR with `gh pr create --title ... --body-file ...` (plus `--attach` for each screenshot, when there are any). Use `--draft` when checks are still running or the work is not review-ready.
9. Open the created PR and verify title, base, head, rendered tables, diagrams and images.
10. Address review comments: fix each confirmed issue, run focused checks, push, reply with evidence, and resolve the thread.
11. Merge once checks are green and review threads are resolved: `gh pr checks --watch`, then `gh pr merge --merge --delete-branch`. Use a merge commit so the atomic commits are kept.
12. Close what the PR finished and update the project, if there is one (see the `issues` reference).

## Title

Use Conventional Commits, matching how the repo already writes commit messages, and end with the issue number when there is one:

```text
feat(scope): add retry to upload client (#482)
fix(scope): avoid double submit on enter
refactor: extract diff parsing from cli
chore(deps): update vite to v8
docs: clarify worktree setup
```

- Lowercase, imperative, no trailing period, under ~70 characters plus the issue number.
- Scope is the package, module or feature name the repo already uses. Omit it when the change is repo-wide.
- The title becomes the merge commit's description; write it as the line you want in history.

## Body

Required in every PR:

- `## Summary`: the problem or capability first, then what changed and why this approach. Mention if the PR is stacked and on what.
- Linked issues: `closes #123` / `fixes #123` / `refs #123` so GitHub links and auto-closes. Use `refs` only when the PR ships part of the issue.
- `## Verification`: exact commands run and their results, plus anything left unverified.

Optional, only when it helps the reviewer:

- `## Change map`: table of module, before, after, reason. Use for changes across several modules or ownership boundaries. Never a raw file list.
- `## Architecture and behavior`: a Mermaid flow, sequence or state diagram when ordering, async work or state transitions changed. For a fix, pair a `Before` and `After` diagram at the same abstraction level.
- `## Boundaries and risks`: table of invariant, failure mode, protection, evidence. Use when there are real failure modes, migrations or external effects.
- `## Visual changes`: before/after image table, only when screenshots were requested.
- `## Rollout and follow-up`: migrations, feature flags, known gaps. State whether a gap blocks merge.

If the repo has a PR template, keep its headings and fill them; add sections above only where the template leaves room. Templates and examples for every section: [pr-body](pr-body.md).

## Rules

- Say what is verified, what is assumed, and what is not verified. Do not write "safe", "fixed" or "backward compatible" without pointing at the evidence.
- Green CI proves only the checks CI runs. Focused tests prove only the behavior they cover.
- Do not describe inherited changes from a parent branch as this PR's changes.
- Use plain hyphens; never em dashes (U+2014) or en dashes (U+2013).
- No filler ("This PR aims to...", "comprehensive", "robust"). Start sentences with the fact.
- Do not paste tokens, secrets, user records or full payloads into the body.
- Do not commit screenshots or other PR-only artifacts to the repo; attach them with `gh --attach`.
- Never force-push `main` or `develop`, and never add `Co-Authored-By` trailers or agent attribution lines.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-create-pr/SKILL.md (MIT)
- https://github.com/moeru-ai/airi/blob/main/.agents/skills/create-pr/SKILL.md (MIT)
-->
