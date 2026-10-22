---
name: imlargo-svelte
description: How imlargo works with Svelte 5 and SvelteKit. Covers project structure (from imlargo's SvelteKit template), runes and state, load functions and streaming, form actions, environment and routing APIs, and using the Svelte MCP. Use when writing, reviewing or scaffolding .svelte or .svelte.ts files, Svelte components or SvelteKit routes. Encodes imlargo's rules, not a Svelte tutorial.
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Svelte

> Builds on `imlargo` and `imlargo-frontend`. Only how imlargo uses Svelte; skip what the official docs already teach.
>
> Targets Svelte 5 and SvelteKit 3. New projects start from [imlargo/svelte-template](https://github.com/imlargo/svelte-template); a project's own `AGENTS.md` wins.

## Preferences

- Idiomatic over clever. If SvelteKit already solves it (`load`, form actions, `afterNavigate`, `page.url`), use that.
- `$effect` only syncs with something outside Svelte. Never use it to derive values or to communicate between components.
- Shared state with runes lives in classes in `.svelte.ts` files under `lib/hooks/`. Local state is a `$state` in the component.
- Module-level `$state` is forbidden for user data: under SSR it leaks between requests. If you're writing `if (browser)` around a global state mutation, the state is in the wrong place.
- Read the environment through `$app/env/public` and `$app/env/private`, declared in `src/env.ts`. Never `process.env`, `import.meta.env` or `$env/*` (deprecated in SvelteKit 3).
- Remote functions aren't used while they're experimental.
- `svelte-check` warnings (like `state_referenced_locally`) are reactivity bugs, not noise.

## Stack

Taken from the template; don't swap a piece without asking.

| Concern | Choice |
|---------|--------|
| UI | shadcn-svelte, Tailwind, Coral for higher-level components |
| Icons | `@lucide/svelte` |
| Font | Geist via `@fontsource-variable/geist`, self-hosted |
| Validation | zod |
| Theme | `mode-watcher` |
| Tests | Vitest; components with Vitest browser mode (`vitest-browser-svelte`, Playwright provider) |
| Deploy | Cloudflare Workers |
| i18n | None: one language per product, until it truly needs two |

## Svelte MCP

imlargo's template enables the official Svelte plugin (`svelte@svelte` from `sveltejs/ai-tools` in `.claude/settings.json`), which provides this MCP. In any Svelte project, use it instead of memory: Svelte and SvelteKit change faster than the model's knowledge. If it's missing, say so and suggest enabling the plugin.

1. `list-sections` first, then `get-documentation` for every relevant section at once.
2. `svelte-autofixer` on all Svelte code before delivering it, repeated until it returns nothing.
3. `playground-link` only when imlargo asks, and never for code written to project files.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project Structure | Lib layers, import rules, naming, from the template | [project-structure](references/project-structure.md) |
| Architecture | Atomic hooks, shared state via context, feature slices and services, page data flow, errors, permissions | [architecture](references/architecture.md) |
| Components | Folders, props, bindables, events, snippets, AsyncView, form dialogs | [components](references/components.md) |
| State | Runes classes, per-request state, context | [state](references/state.md) |
| SvelteKit | Load and streaming, form actions, endpoints, auth on the server | [sveltekit](references/sveltekit.md) |
