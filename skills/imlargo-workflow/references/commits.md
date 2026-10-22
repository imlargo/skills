---
name: commits
description: "Commit message format, granularity, pre-commit checks and history rules. Load when writing commits."
---

# Commits

`git log --oneline` should read as the story of the change.

## Messages

Conventional Commits, lowercase, imperative, no period, under ~70 characters. Scope is the module or product area the repo already uses.

- Describe the behavior that changes, not the code edited: `fix(billing): disabled accounts no longer count toward the plan limit`, not `fix: update countAccounts query`.
- End with the issue: `feat(accounts): disable an account from the danger zone (#1321)`.
- Body only when the why isn't obvious. Never `Co-Authored-By`.

## Granularity

Each commit does one logical thing and builds on its own.

```text
# Good
feat(api): add task creation endpoint with validation
feat(ui): add task creation form component
test(tasks): cover task creation

# Bad
feat: add task feature, fix sidebar, update deps, refactor utils
```

Unrelated fixes, dependency bumps and drive-by refactors go in their own PR.

## Checks and History

- Run the project's lint with autofix and its full check gate before every commit. Fix the root cause; don't silence rules, skip tests or use `--no-verify`.
- Commit atomically as you work. Never squash or rewrite commits to shorten the history, and never force-push `main` or `develop`.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-create-pr/SKILL.md (MIT)
- https://github.com/antfu/skills/blob/main/skills/antfu/SKILL.md (MIT)
-->
