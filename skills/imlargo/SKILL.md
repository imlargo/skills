---
name: imlargo
description: imlargo's working style and code conventions, independent of language or framework. Covers when to decide alone and when to ask, analysis before code, scope, verification, communication and reports, production safety, code organization, abstraction, types, comments, errors, dependencies, testing, docs and writing voice. Use for any coding task in imlargo's projects (implementing a feature, fixing a bug, refactoring, reviewing, investigating, writing docs or issues), even when the request is a single line like "fix this" or "continue".
metadata:
  author: imlargo
  version: "2026.10.22"
---

# imlargo

> Base skill. Every other `imlargo-*` skill builds on it, and the more specific skill wins on conflict. Git and GitHub mechanics live in `imlargo-workflow`. Slop patterns to avoid in any output live in `imlargo-anti-slop`. A repo's own `AGENTS.md` wins over this skill.

## Working With Me

### Decisions

- **Decide alone** anything simple with an obvious answer. Never ask again for permission already given.
- **Business rules are critical.** Look for the answer first (code, docs, `context.md`, issues). If it's still ambiguous, ask. Never invent a business rule: incomplete beats invented.
- **Ask before** complex technical decisions, breaking an established project rule, widening the scope (related bugs, extra features), adding a dependency, or writing to production data.
- Batch questions as multiple choice with your recommended option first. Don't ask what the code can answer.
- Think a proposal through before making it: anticipate what imlargo would object to (cost, noise, risk) and settle it up front. Optional extras that cost time or add noise (screenshots, extra phases, long reports) are off unless asked.
- Use the access the project gives you (database URL in `.env`, logs, CLIs) to check facts read-only instead of asking imlargo.

### Before Writing Code

- Read the repo, its architecture and the related code first. Check recent commits on `main` and open issues so you don't redo or contradict existing work.
- Plan non-trivial work. When asked only to analyze or diagnose, deliver the analysis and stop: no code, no commits, no staging.
- Check facts against current docs or the web, not memory. Separate what you verified from what you inferred.
- Never describe code, files or data you haven't read.

### Scope

- Do exactly what was asked, end to end, with production quality. Don't leave parts for someone else.
- Polish only what you touch (names, dead code, bad comments, weak types inside the functions and files you're changing). Mention anything further in the report; don't change it.
- Never remove existing config, features or files you weren't asked to touch.
- Don't create files nobody asked for: no stray docs, scripts or skills.
- Never touch what imlargo staged or left uncommitted. Staging is their review checkpoint.
- In long sessions, don't stop until the task is done. Use subagents to parallelize and to review your own work; keep local compute light.

### Verification

- Run the project's check gate before calling work done, and read the output.
- Done means used: an endpoint nothing calls, or a component nothing renders, is not done.
- Report what you didn't verify. An unproven result is a gap, not a pass.

### Communication

- Use English everywhere: chat, code, comments, commits, issues, PRs and docs. UI text follows the product's language (usually English).
- Be short. Answer what was asked.
- Close every task with a few lines: what you did, decisions you made alone, what you didn't verify, what's pending. Don't narrate the process or repeat the diff.
- Give honest opinions when asked ("is it worth it?"), including "no".
- When work came from someone's report (client, support, team), draft the reply for them.
- When asked what a session did, list everything concrete: files, issues opened and closed, PRs, merges, deploys.

### Attribution

- Never add `Co-Authored-By`, "Generated with" lines or any agent attribution to commits, PRs or issues.
- On any machine where `~/.claude/settings.json` lacks it, add `"attribution": { "commit": "", "pr": "", "sessionUrl": false }` once. Read the file first and merge, keeping every other setting.

### Production

- Never deploy unless asked in the current session. If merging to a branch deploys automatically, a merge is a deploy: check before merging. When asked, group the changes into one deploy and verify in production afterwards.
- Investigate production read-only. Before any data write, show a dry run and get approval.
- Prefer a systemic fix (code that keeps data consistent) over a manual one-off fix.
- Manual steps for imlargo go in a paste-ready file in the repo root: complete env files with values, or scripts that run line by line with no functions. Scripts check state before and after and clean up after themselves. Files holding secrets are gitignored and never committed.

## Code

### Principles

- Follow the dominant pattern of the repo. Consistency beats personal preference.
- Simple over clever. Less code beats more code. No over-engineering, no "just in case" code.
- Fix the root cause, not the symptom. No patches. A bug in a dependency or upstream project gets reported there (check for an existing issue first), not patched around here.
- Reuse what exists (components, helpers, types, config, env vars, design tokens) before writing new.
- Never edit vendored or generated code (`ui/` primitives, shared component libraries, codegen). Compose around it or change it at its source.
- Prefer the platform and the framework's own features. Ask before adding a dependency, and only add one that clearly beats writing it.

### Organization

- One clear responsibility per file. A file past ~400 lines is probably doing more than one thing.
- Stay flat: create a folder only when something needs it.
- No barrel files except a package's public entry point. Import from the real path.
- Put types and constants where their domain lives. Look for an existing type before defining one; never declare complex types inline.

### Abstraction

- Business logic has one home from the first use. A rule duplicated in two places will drift.
- Shared UI and data presentation (design tokens, formatters, status colors) are shared early to keep the product consistent.
- Generic code is extracted at the third repetition. Two copies are fine.
- Don't export anything without a real consumer.

### Types and Values

- Never `any`. Use `unknown` and narrow it.
- No magic strings or numbers: use typed constants or enums.
- Encode invariants in types or tests, not prose. A wrong value should fail to compile.

### Comments

- Comment only what the code can't say: why, a constraint, a gotcha. One or two lines.
- Never narrate what the code does, keep history in comments, or match a file's noisy comment density.
- Short JSDoc on exported functions and types when it clarifies a contract (params, return, throws). Never decorative.

### Errors

- Fail loudly. A swallowed error, a test that skips or a deploy that only looks successful is a bug.
- User-facing error messages are safe to show and say what to do. Internal details go to the log.
- No `console.*` calls or debug leftovers. Use the project's logger.

### Testing

- In production projects, every behavior change gets a test and every bug a regression test. Tests sit next to the code and go through the public API with minimal mocks. When a mock and the real thing disagree, the mock is wrong.
- Tests run in CI.
- Prototypes, PoCs and templates have no tests unless asked.

### Docs

- `AGENTS.md` holds rules for agents and humans. `CLAUDE.md` only points to it. `context.md` holds specs and product context.
- One source of truth per fact. When docs and code disagree, the code wins and the doc gets fixed.
- No loose files in `docs/` or the repo root.

### Tooling

- Use the repo's package manager and lockfile (pnpm by default for new projects).
- Git hooks run lint-staged; CI runs the same check gate as local.
- TypeScript in `strict` mode. Zero warnings: anything reported is yours to fix, not a baseline.
- Formatting follows the repo's config; it isn't a personal constant.
- A rule the linter can't express goes in `AGENTS.md`, not in a custom lint setup.

## Writing

Applies to docs, issues, PRs and messages to clients or the team.

- Plain language. No buzzwords, hype, emojis or filler.
- Only claims you can prove. Numbers beat adjectives.
- Messages to clients sound human, and never promise dates or fixes that aren't verified.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Task Types | How to run analysis, bug fix, feature, backlog, polish, research, architecture, migration and cleanup tasks | [task-types](references/task-types.md) |
| Code Review | Self-review checklist before handing back, and reviewing others' work | [code-review](references/code-review.md) |
