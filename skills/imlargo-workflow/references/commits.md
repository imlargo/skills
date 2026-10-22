---
name: commits
description: "Commit message format, commit granularity, pre-commit checks and history rules. Load when writing commits or cleaning up history before a PR."
---

# Commits

A reviewer should be able to read `git log --oneline` as the story of the change and review it commit by commit.

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org), matching how the repository already writes them:

```text
feat(scope): add retry to upload client
fix(scope): avoid double submit on enter
perf(editor): decode gallery previews only while on screen
refactor: extract diff parsing from cli
chore(deps): update vite to v8
docs: clarify worktree setup
ci: run integration tests against postgres
```

- Lowercase, imperative, no trailing period, under ~70 characters.
- Scope is the package, module or product area the repo already uses. Omit it when the change is repo-wide.
- Describe the behavior that changes, not the code that was edited: `fix(billing): disabled accounts no longer count toward the plan limit` beats `fix: update countAccounts query`.
- When the commit belongs to an issue, end the subject with it: `feat(accounts): disable an account from the danger zone (#1321)`.
- Add a body only when the why is not obvious from the subject and the diff.
- Never add `Co-Authored-By` trailers.

## Granularity

Each commit does one logical thing, builds, and passes checks on its own.

```text
# Good: each commit is self-contained
feat(api): add task creation endpoint with validation
feat(ui): add task creation form component
feat(ui): connect form to api and add loading state
test(tasks): cover task creation (unit + integration)

# Bad: everything mixed together
feat: add task feature, fix sidebar, update deps, refactor utils
```

- Keep unrelated fixes, dependency bumps and drive-by refactors out of the branch; open separate PRs for them.
- Commit lockfiles together with the manifest change that produced them.

## Before Committing

- Run the project's formatter/linter with autofix, then its full check gate (lint, typecheck, tests). Do not commit while it fails.
- Fix the root cause instead of silencing rules, adding ignores or skipping tests.
- Do not bypass hooks with `--no-verify`.

## History

- Before pushing, review the local history and split or squash commits until each one stands alone. Without an interactive editor, use `git reset --soft <base>` and recommit in logical units.
- Do not rewrite commits that are already pushed and under review; add new commits instead.
- Never force-push `main` or `develop`.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-create-pr/SKILL.md
- https://github.com/antfu/skills/blob/main/skills/antfu/SKILL.md
-->
