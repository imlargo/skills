---
name: setup
description: "How imlargo initializes a repository: which template to start from, base files, tooling, CI, deploy and scripts. Load when creating a repository or adding tooling to one."
---

# Setup

<!-- TODO: The init checklist (repo, naming, license, env, CI, deploy, domain). -->

## Templates

| Project | Template |
|---------|----------|
| Web app (SvelteKit) | [imlargo/svelte-template](https://github.com/imlargo/svelte-template) |
| Docs site | [imlargo/svdocs](https://github.com/imlargo/svdocs) |
| TypeScript library | [imlargo/typescript-library-template](https://github.com/imlargo/typescript-library-template) |
| Vue / Nuxt app | [klima-open-source/nuxt-template](https://github.com/klima-open-source/nuxt-template) |
| UI components | [coral](https://github.com/imlargo/coral), installed into projects, not cloned |
| Backend | Go, with Postgres and Redis when needed |

## Rules

- Clone the template and build on it. Change what the template ships as little as possible; improvements to the base go back to the template.
- Every repo carries `AGENTS.md` (rules), `CLAUDE.md` pointing to it, and `context.md`.
- Pre-commit hooks and CI run the same check gate.
- Libraries: ESM only, built with tsdown, checked with publint and attw, a smoke test of the built output on the oldest supported Node, published from CI with npm trusted publishing (no token). The tag matches the version and the changelog.

## Examples

<!-- TODO: Short Prefer / Avoid snippets for the rules an agent is most likely to get wrong. Delete this section if it adds nothing. -->
