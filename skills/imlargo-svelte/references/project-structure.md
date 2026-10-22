---
name: project-structure
description: "How imlargo lays out a SvelteKit project, following imlargo/svelte-template: lib layers, feature slices, import rules, aliases and file naming. Load when scaffolding a Svelte project or deciding where a file goes."
---

# Project Structure

Canonical examples: [svelte-template](https://github.com/imlargo/svelte-template) (most evolved), [ing](https://github.com/imlargo/ing), [svdocs](https://github.com/imlargo/svdocs), coral.

## Layout

```
src/lib/
  core/        base service, API client, errors, logger, permissions. Plain TS, no Svelte.
  hooks/       runes classes (*.svelte.ts): query, disclosure, pagination, is-mobile
  utils/       pure functions (date, forms, env, paths, tone); notify.ts is the one side-effect exception
  config/      what changes per project: app, routes, navigation, permissions, errors, labels
  types/       domain types shared by more than one slice
  features/<slice>/  services/, components/, schemas.ts (zod), types.ts
  components/  ui/ (shadcn, untouchable), coral/ (vendored kit, untouchable),
               blocks/ (own generic compositions: AsyncView, EmptyState, PageHeader), layout/
  server/      server-only helpers; imported only from routes/ and hooks.server.ts
src/routes/    (app)/ pages behind the shell, (auth)/ auth flows, api/ endpoints
src/env.ts     the environment schema
```

## Import Rules

Kept by hand; nothing enforces them.

| Layer | May import |
|-------|-----------|
| `routes` | everything |
| `features/<slice>` | `core`, `config`, `hooks`, `utils`, `types`, `components/*`. Never another slice, except through `types/`. |
| `hooks`, `utils` | `core`, `types` |
| `core` | nothing outside itself; project decisions arrive through setters wired in the `init` hooks |
| `types` | nothing |

## Naming

- `#lib/...` subpath imports with the `.js` extension. No barrels; shadcn's `index.js` is its convention, not one to copy.
- PascalCase component files; kebab-case `.svelte.ts` files.
- `*Wire` suffix for API-shaped types, `create<Thing>` for factories, `set<Thing>` for core wiring.
- Change what `sv create` generated as little as possible.
