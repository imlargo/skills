---
name: state
description: "How imlargo manages state in Svelte: runes classes, local state, per-request state under SSR and context. Load when adding reactive or shared state."
---

# State

## Rules

- Shared state with runes is a class in a `.svelte.ts` file under `lib/hooks/` (queries, disclosure, pagination, media queries). `lib/core/` stays free of Svelte.
- Before creating a shared class, check whether the state is local to a component. Then a `$state` in the component is enough.
- Module-level `$state` is forbidden for user-dependent data. Modules are singletons per process under SSR, so it leaks between users. Per-request state goes in `locals`, the `load`'s `data` or Svelte context.
- `if (browser)` around a mutation of global state isn't a guard; it's the sign the state is in the wrong place.
- `$effect` only syncs with something outside Svelte. Derive with `$derived`; communicate through props, callbacks or context.
- State classes don't call the API; they delegate to services.
