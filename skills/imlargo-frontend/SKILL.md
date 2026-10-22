---
name: imlargo-frontend
description: imlargo's frontend rules, independent of framework. Covers app architecture (services, contracts, environment, routes), components, state and data loading, forms, errors, styling and design system use, and the checklist a view must pass before it counts as done. Use when building, reviewing or scaffolding any web UI, together with the framework skill (e.g. imlargo-svelte).
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Frontend

> Builds on `imlargo`. Visual taste lives in `imlargo-design`. Framework-specific rules live in their own skill (`imlargo-svelte`). Keep this one valid for any framework.

## Architecture

- Services are the only code that calls the API. No direct `fetch` in components or state hooks.
- Wire types (what the API returns) live next to the service that consumes them and are mapped there. Components only see domain types.
- The core layer depends on nothing outside itself. The project wires it through parameters or setters at startup, never through imports.
- Read the environment only through one validated schema.
- Routes the code redirects to or calls by path are typed constants, not strings scattered in components.
- No mock, preview or demo branches in production code paths. Running without a backend is a configuration, not an `if` in a service.
→ [architecture](references/architecture.md)

## Components

- Composition over inheritance. Small, focused components; when one grows, extract a subcomponent or a hook.
- Use the platform and framework features before custom code.
- No native `confirm()`, `alert()` or `prompt()`: use the design system's dialog.
- Every native `<button>` has a `type`.
→ [components](references/components.md)

## State and Data

- Shared state lives in dedicated modules; state used by one component stays in it.
- Under SSR, never keep user data in module-level state: modules are shared across requests, so it leaks between users.
- A navigation never waits for slow data: await only what the page can't render without, stream the rest behind a skeleton.
- No client-side cache until a third place needs one. Then it's one module with its own invalidation.
- No form library. Validate with the domain's schema; the server always validates again.
- Errors are normalized so their message is always safe to show. Expected errors are typed; a generic error is a bug, shown with a default message and logged.
→ [data-and-state](references/data-and-state.md)

## Styling

- Utility CSS (Tailwind) always. Custom CSS only when utilities truly can't do it.
- shadcn is the design system, used pure; a project's identity comes from its tokens. Components own their appearance: callers pass only layout, appearance goes through variants.
- No raw colors, arbitrary values, inline styles, dynamic class names or fixed widths. Audit with `@shadcn/lint` temporarily, never as a dependency.
- No scale size variants (`sm`, `lg`, `xs`) on components. Two buttons doing the same thing look the same everywhere; if something looks too big, fix the layout. Icon sizes are a shape, not a scale, and are allowed.
- Semantic colors (action, information, success, warning, destructive) become classes in one place only.
→ [styling](references/styling.md)

## Views

A view isn't done when the happy path works with sample data. Walk every role's journey before calling it done.
→ [views](references/views.md)

## Accessibility

<!-- TODO: Minimum bar every screen must meet. -->

## Performance

<!-- TODO: Budgets and rules (images, bundles, rendering). -->

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Architecture | Services, wire vs domain types, core layer, environment, routes, errors | [architecture](references/architecture.md) |
| Components | Composition, extraction, native elements, labels for closed sets | [components](references/components.md) |
| Data and State | State scopes, SSR safety, loading and streaming, queries, forms, auth expiry | [data-and-state](references/data-and-state.md) |
| Styling | Design system use, tokens, widths, size variants, semantic colors | [styling](references/styling.md) |
| Views | The checklist a view must pass before it counts as done | [views](references/views.md) |
