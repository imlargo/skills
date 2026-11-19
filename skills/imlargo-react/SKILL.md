---
name: imlargo-react
description: How imlargo works with React 19 and TypeScript. Covers project layers (domain, services, state, hooks, components), components and props, hooks and state, effects and when not to use them, refs, memoization and the React Compiler, data loading, Suspense and error boundaries, forms and actions, optimistic updates, Server Components when the repo uses them, styling with shadcn/ui, accessibility patterns and testing. Use when writing, reviewing or scaffolding .tsx or .jsx files, React components, hooks or React apps (Vite, Next.js, React Router), even inside a team's existing React codebase. Encodes imlargo's rules, not a React tutorial.
metadata:
  author: imlargo
  version: "2026.11.19"
---

# React

> Builds on `imlargo`, `imlargo-frontend` and `imlargo-typescript`. Only how imlargo uses React; skip what react.dev teaches. Targets React 19.
>
> The stack and structure here are imlargo's defaults. In an existing codebase, its structure, libraries, design system and `AGENTS.md` win (see `imlargo`); this skill fills what the project doesn't define. The principles (pure logic outside React, effects only for syncing, derived state, stable keys, accessibility, testing by role) hold in any codebase.

## Preferences

- Logic and persistence never touch React. The domain model, rules and calculations are pure functions in `domain/`; I/O lives in `services/`; React only renders and wires. What can be tested without mounting anything is.
- Hooks are split by what each one needs to know, not by size: data and persistence in one, gestures or input in another, and one hook composes them and owns the UI state.
- State with several transitions is a `useReducer` with a pure reducer over a discriminated union of actions, tested directly.
- Effects only sync with something outside React (subscriptions, observers, timers, the DOM, a request). Never derive state, chain state updates or relay events through an effect. Every effect cleans up and survives `StrictMode`'s double run.
- Derive during render. If a value can be computed from props or state, it isn't state.
- Values that change on every frame and that nothing renders from (a gesture in progress, the latest list for a callback) live in a ref. An effect that needs the latest props without re-subscribing uses `useEffectEvent`.
- With the React Compiler enabled, no manual `useMemo`, `useCallback` or `memo`. Without it, memoize only where a measured re-render or a dependency's identity requires it, never by default.
- Keys are stable ids, never the array index for lists that reorder, filter or insert. Reset a component's state by changing its `key`, not with an effect.
- `react-hooks` lint rules are errors. An `exhaustive-deps` warning is a bug to fix by restructuring, not to disable.
- Function components with named exports. Props are an interface named `<Component>Props` above the component; callbacks are `on<Event>` props.
- No class components except an error boundary, and use `react-error-boundary` if the repo already has it.

→ [structure](references/structure.md), [hooks-and-effects](references/hooks-and-effects.md), [components](references/components.md)

## Stack

For a new React project imlargo owns. In a team repo, keep its choices and propose swaps, never make them unasked.

| Concern | Choice |
|---------|--------|
| Build | Vite with `@vitejs/plugin-react`, pnpm |
| UI | shadcn/ui, Tailwind, `cn()` for conditional classes |
| Icons | `lucide-react` |
| Validation | zod |
| Tests | Vitest; components with Testing Library queried by role |
| Deploy | Cloudflare Workers |
| Routing, data fetching, meta-framework | Ask: it depends on the product, and it's a decision that shapes the whole app |

## Data and Forms

- Fetching in an effect is acceptable only in an app with no data layer. It goes through a service, passes an `AbortSignal` or a cancelled flag, and ignores a response that arrives after the input changed.
- If the repo has a data layer (TanStack Query, a router's loaders, Server Components), every read goes through it. Never mix it with hand-rolled fetching for the same data.
- Async UI sits inside `Suspense` with a skeleton that matches the final layout, and inside an error boundary per route or section.
- Forms use React 19 actions (`<form action>`, `useActionState`, `useFormStatus`) for submit and pending state. Validation follows `imlargo-frontend`.
- Optimistic writes update the screen first and roll back on failure, sending only the fields that changed.
→ [data](references/data.md)

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Structure | Layers and folders, what each one may import, naming | [structure](references/structure.md) |
| Hooks and Effects | Custom hooks, reducers, effects and cleanup, refs, `useEffectEvent`, memoization, context | [hooks-and-effects](references/hooks-and-effects.md) |
| Components | Props, composition, keys, classes with `cn()`, accessibility patterns for interactive widgets | [components](references/components.md) |
| Data | Fetching, data layers, Suspense and error boundaries, forms and actions, optimistic updates, Server Components, SSR | [data](references/data.md) |
| Testing | What is tested where: pure layers, reducers, contracts, hooks, components | [testing](references/testing.md) |
