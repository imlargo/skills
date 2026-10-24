---
name: imlargo-workflow
description: imlargo's git and GitHub workflow. Covers branching modes (fast on main, formal with develop), Conventional Commits, pull requests, releases and hotfixes, issues (titles, labels, priority, templates, closing), versioning and changelogs, and GitHub Projects. Use whenever committing, creating a branch, opening or merging a PR, preparing a release or hotfix, writing, triaging or closing an issue, or tagging a version, triaging or grooming issues, even when the user only says "commit this", "open a PR" or "file a bug".
metadata:
  author: imlargo
  version: "2026.10.24"
---

# Workflow

> Builds on `imlargo`. Planning and backlog decisions belong to `imlargo-projects`. A repo's own CONTRIBUTING.md, templates or AGENTS.md win over these rules.

## Principles

- **Traceable:** Every piece of work has an issue, every PR links one, and issues are always current.
- **Evidence over claims:** State what was verified and how, and what was not.
- **Small units:** One logical change per commit, one concern per PR.

## Rules

- **Branching:** A `develop` branch means formal mode: branch from `develop`, PR into it, release `develop` to `main`. Otherwise fast mode: commit straight to `main`. Never create `develop` on your own; propose it. → [branching](references/branching.md)
- **Commits:** Conventional Commits, atomic, check gate green before each one, no `Co-Authored-By`. → [commits](references/commits.md)
- **Pull requests:** Conventional title ending in `(#issue)`; body with Summary, linked issue and Verification. Merge with a merge commit once checks are green, then close the issue. Screenshots only on request. → [pull-requests](references/pull-requests.md), [pr-body](references/pr-body.md), [visual-evidence](references/visual-evidence.md)
- **Issues:** Symptom-first title, one type label plus `area:*` labels, priority `P0`-`P3`, facts separated from hypotheses, progress as comments. Triage is read-only until imlargo approves the proposed actions. → [issues](references/issues.md), [issue-triage](references/issue-triage.md)
- **Versioning:** Only libraries, packages and products past a quick MVP: SemVer, `v` tags, `CHANGELOG.md`. → [versioning-releases](references/versioning-releases.md)
- **GitHub Projects:** Create one when imlargo asks or when setting up a new project's backlog; once it exists, every issue and PR lives in it with a current status. → [project-management](references/project-management.md)

## References

| Topic | Load when | Reference |
|-------|-----------|-----------|
| Branching | Creating a branch, picking a PR base, releasing, hotfixing | [branching](references/branching.md) |
| Commits | Writing commits | [commits](references/commits.md) |
| Pull Requests | Opening, updating or merging a PR | [pull-requests](references/pull-requests.md) |
| PR Body | Writing the PR description | [pr-body](references/pr-body.md) |
| Visual Evidence | imlargo asked for screenshots | [visual-evidence](references/visual-evidence.md) |
| Issues | Creating, updating or closing an issue | [issues](references/issues.md) |
| Issue Triage | Triaging, grooming or syncing open issues and PRs | [issue-triage](references/issue-triage.md) |
| Versioning and Releases | Bumping, tagging, publishing, changelog | [versioning-releases](references/versioning-releases.md) |
| Project Management | Creating a project, or the repo has one | [project-management](references/project-management.md) |
