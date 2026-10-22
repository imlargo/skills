---
name: branching
description: "Fast and formal branching modes, branch names, feature, release and hotfix flows, and keeping develop in sync with main. Load when creating a branch, picking a PR base, releasing or hotfixing."
---

# Branching

## Modes

- **Fast** (quick MVPs, fast-moving projects): commit and push straight to `main`. The commit that finishes an issue has `Closes #N` in its body.
- **Formal** (the repo has `develop`): `main` is production, `develop` is what ships next, and both only change through PRs. Propose switching when the project gets real users or needs grouped deploys; never create `develop` on your own.

## Names

`{type}/{short-kebab-summary}-{issue}`, with a Conventional Commits type: `fix/overlay-glyph-coverage-1035`. No issue: date instead (`fix/bug-sweep-20261021`). Hotfixes: `hotfix/...`.

## Formal Mode Flows

- **Feature/fix:** branch from up-to-date `develop`, keep it short-lived, PR into `develop`.
- **Release:** PR `develop` → `main` titled `release: v1.4.0` (or `release: YYYY-MM-DD` if unversioned), listing the PRs and issues it ships. Merge with a merge commit, never squash: squashing makes `main` and `develop` diverge and the next release conflict. Then tag if versioned.
- **Hotfix:** branch from `main`, PR into `main`, then merge `main` into `develop` right away so the next release doesn't revert it.
- **Sync:** after every merge into `main`, update `develop` from it. Before a release, check `git merge-base --is-ancestor origin/main origin/develop`.
- **Repo setup:** default branch `main`; protect `main` and `develop` (PRs and checks required, no force push); auto-delete merged branches.
