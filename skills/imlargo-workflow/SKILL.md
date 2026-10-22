---
name: imlargo-workflow
description: imlargo's git and GitHub workflow. Covers branching modes (fast on main, formal with develop), Conventional Commits, pull requests (title, evidence-based body, screenshots on request), releases from develop to main, hotfixes, issues (titles, labels, priority, bug and feature templates, closing), versioning and changelogs, and GitHub Projects. Use whenever committing, creating a branch, opening, updating or merging a PR, preparing a release or hotfix, writing, triaging or closing an issue, or tagging a version, even when the user only says "commit this", "open a PR" or "file a bug".
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Workflow

> Builds on `imlargo`. Covers the mechanics on git and GitHub; how a project is planned and its backlog decided belongs to `imlargo-projects`. When a repository documents its own conventions (CONTRIBUTING.md, PR or issue templates, AGENTS.md), follow those first.

## Principles

- **Everything is traceable.** Every change links to an issue, every PR closes or references one, and work merged without an issue gets a retroactive issue.
- **Evidence over claims.** Say what was verified, how, and what was not. Never write "fixed", "safe" or "backward compatible" without pointing at the evidence.
- **Small, reviewable units.** One logical change per commit, one concern per PR. Unrelated fixes go to their own branch.

## Quick Rules

### Branching

- **Fast mode** (quick MVPs, fast-moving projects): work directly on `main`.
- **Formal mode** (the repo has a `develop` branch): branches start from `develop` and PR back into it; `develop` is released to `main` through a release PR merged with a merge commit; hotfixes branch from `main`. `develop` must always contain `main`.
- Never create `develop` or switch modes on your own; propose it to imlargo.
- Branch names: `{type}/{short-kebab-summary}-{issue}`.
- Details: [branching](references/branching.md).

### Commits

- Conventional Commits: `type(scope): summary`, lowercase, imperative, no trailing period, under ~70 characters.
- One logical change per commit; each one builds and passes checks on its own.
- Run the project's lint and check gate before every commit. Never commit with failing checks, and fix the root cause instead of silencing rules.
- Never add `Co-Authored-By` trailers.
- Details: [commits](references/commits.md).

### Pull Requests

- Title in Conventional Commits form, ending with the issue number when there is one: `fix(billing): free the plan slot of disabled accounts (#1315)`.
- The body always has `## Summary`, the linked issue and `## Verification`; other sections only when they help the reviewer.
- Before/after screenshots only when imlargo asks for them; then attach them with `gh --attach`, never commit them.
- Merge with a merge commit once checks are green; no approval needed.
- Workflow and body guide: [pull-requests](references/pull-requests.md), [pr-body](references/pr-body.md), [visual-evidence](references/visual-evidence.md).

### Issues

- Title states the symptom or outcome, specific enough to understand without opening it.
- One type label (`bug` or `enhancement`) plus the `area:*` labels it touches.
- Every piece of work has an issue, and issues are always current: status, findings and progress as comments.
- Merging the PR (or pushing the commit) that finishes an issue closes it, with a comment linking the PR.
- Priority `P0`-`P3` on every bug and urgent request.
- Details and templates: [issues](references/issues.md).

### Versioning and Changelog

- Only libraries, packages and products past a quick MVP are versioned. Quick MVPs have no versions, tags or changelog.
- SemVer with `v` tags; versioned projects keep a `CHANGELOG.md` in Keep a Changelog format, updated in the same PR as the change.
- Details: [versioning-releases](references/versioning-releases.md).

### GitHub Projects

- Create one only when imlargo asks. Once a repo has a project, every issue and PR goes in it and its status is kept current.
- Details: [project-management](references/project-management.md).

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Branching | Fast vs formal mode, feature, release and hotfix flows, sync, protection | [branching](references/branching.md) |
| Commits | Commit format, granularity, pre-commit checks, history rules | [commits](references/commits.md) |
| Pull Requests | Workflow to open a reviewable PR, title, required body, rules | [pull-requests](references/pull-requests.md) |
| PR Body | Decision guide and templates for each PR body section | [pr-body](references/pr-body.md) |
| Visual Evidence | Before/after screenshots, only on request | [visual-evidence](references/visual-evidence.md) |
| Issues | Titles, labels, bug/feature/retroactive templates, updates and closing | [issues](references/issues.md) |
| Versioning and Releases | When to version, tags, GitHub Releases, changelog | [versioning-releases](references/versioning-releases.md) |
| Project Management | GitHub Projects setup on request, fields, statuses, upkeep | [project-management](references/project-management.md) |
