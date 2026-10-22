---
name: branching
description: "imlargo's two branching modes (fast on main, formal with develop), branch names, feature, release and hotfix flows, keeping develop in sync with main, and branch protection. Load when creating a branch, choosing a PR base, preparing a release or hotfix, or setting up a repository's branches."
---

# Branching

## Pick the Mode

| Mode | When | Branches |
|------|------|----------|
| Fast | Quick MVPs and projects moving fast, before there is anything to protect | `main` only |
| Formal | Anything with real users, deploys that must be grouped, or more than one change in flight | `main` + `develop` + short-lived branches |

- Detect the mode from the repo: a `develop` branch means formal mode. Otherwise it is fast mode.
- Do not create `develop` on your own. Moving a project to formal mode is imlargo's call; propose it when the project outgrows fast mode (real users, a release to coordinate, a change that must not reach production yet).

## Fast Mode

- Commit and push straight to `main`. No `develop`, no release PRs.
- The commit that finishes an issue closes it with `Closes #N` in its body.
- Commit rules still apply: atomic Conventional Commits and a green check gate on every commit, because `main` is the only line of history.

## Formal Mode

| Branch | Purpose | Receives |
|--------|---------|----------|
| `main` | Production. Every commit on it is deployed or deployable. | Release PRs from `develop`, hotfix PRs |
| `develop` | Integration. What ships next. Always deployable to staging. | Feature/fix PRs |
| `{type}/...` | One change. Short-lived. | Commits |
| `hotfix/...` | Urgent production fix. | Commits |

### Feature and fix branches

1. Branch from an up-to-date `develop`.
2. Keep it short-lived; bring in `develop` often (rebase while the branch is unpushed or yours alone, merge `develop` into it once others review it).
3. Open the PR against `develop` with `closes #N`. GitHub only auto-closes on merges into the default branch, so close the issue yourself right after merging (see the `issues` reference).
4. Delete the branch after merging.

### Releases (`develop` -> `main`)

Group what is ready on `develop` into one deploy:

1. Make sure `develop` contains everything on `main` (see [Keep develop in sync](#keep-develop-in-sync)) and that its checks are green.
2. Open a PR from `develop` to `main`, titled `release: v1.4.0` (versioned projects) or `release: YYYY-MM-DD` (unversioned).
3. In the body, list the PRs and issues it ships.
4. Merge with a **merge commit**, never squash or rebase. Squashing rewrites the commits so `main` and `develop` diverge and the next release conflicts with itself.
5. Once checks are green, merge it. Then tag the merge commit when the project is versioned, and fast-forward `develop` to `main`.

### Hotfixes

1. Branch `hotfix/{short-kebab-summary}-{issue}` from `main`.
2. PR into `main` with `closes #N`, merged with a merge commit like a release.
3. Immediately bring the fix into `develop` (merge `main` into `develop`), so the next release does not revert it.

### Keep develop in sync

- After every merge into `main` (release or hotfix), update `develop` from `main` right away: fast-forward after a release, merge after a hotfix.
- `develop` must always contain `main`. Check before opening a release PR: `git merge-base --is-ancestor origin/main origin/develop`.
- Never commit directly to `main` or `develop`; everything arrives through a PR.

## Branch Names

- `{type}/{short-kebab-summary}-{issue}`, where `{type}` is a Conventional Commits type: `feat/account-disable-danger-zone-1321`, `fix/overlay-glyph-coverage-1035`.
- Without an issue, use the date instead: `fix/bug-sweep-20261021`.
- Hotfixes: `hotfix/{short-kebab-summary}-{issue}`.

## Repository Setup (formal mode)

- Default branch on GitHub: `main`.
- Protect `main` and `develop`: PRs required, status checks required, no force pushes, no deletion.
- Enable "Automatically delete head branches".
- CI runs on PRs into both `develop` and `main`; deploys come from `main` (production) and, when there is one, `develop` (staging).
