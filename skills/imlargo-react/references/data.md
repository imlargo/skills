---
name: data
description: "How imlargo loads and writes data in React: fetching with or without a data layer, Suspense and error boundaries, forms with React 19 actions, optimistic updates and rollback, Server Components and SSR safety. Load when wiring data into a React view, building a form, adding a mutation, or working in a Next.js or React Router app."
---

# Data

## Reading

- Use the repo's data layer for every read: TanStack Query, the router's loaders, or Server Components. One mechanism per kind of data.
- Without one, a hook loads through the service in an effect with cancellation (see [hooks-and-effects](hooks-and-effects.md)). Don't add a data library to fix one screen: ask first.
- Query keys (TanStack Query) are built by one factory per resource, never typed inline at each call.
- A refresh after a write keeps the current rows; a new search shows the loading state (see `imlargo-frontend`).

## Suspense and Errors

- Wrap async sections in `Suspense` with a skeleton that has the final layout's shape. Place the boundary so the rest of the page renders while one part loads.
- `use(promise)` reads a promise created outside the component (a loader, a cached request). Never create the promise during render: it's a new one each time.
- Every route or independent section has an error boundary with a retry. Errors thrown in event handlers and async callbacks don't reach boundaries; report them where they happen.

## Writing

- Forms use `<form action={fn}>` with `useActionState` for the result and errors, and `useFormStatus` for the pending button. No hand-rolled `isSubmitting` state.
- Optimistic writes: update the screen, call the service, and restore the previous value if it fails, with an error the user can see. `useOptimistic` when the write is an action; a reducer with explicit rollback when writes overlap.
- Send only the fields that changed and don't apply the response over newer local edits, so a slow save can't overwrite what the user typed after it.
- An item that exists before the server answers carries a temporary id, and no write for that id leaves the browser until the real one arrives.
- Decide per field whether to roll back. Reverting text someone typed because a save failed is worse than keeping it and showing the error.

## Server Components

Only when the repo uses them (Next.js App Router, React Router with RSC):

- Components are server components by default. `'use client'` goes on the smallest interactive leaf, not on a layout or page.
- Fetch in server components, close to where the data is used; pass serializable props to client components. Never pass functions, class instances or secrets across the boundary.
- Server Functions (`'use server'`) are public endpoints: each one checks auth and permissions and validates its input with the schema, every time.
- Code that must never reach the client imports `server-only`.

## SSR

- Module-level stores (a `zustand` store, a singleton client holding user data) are shared across requests on the server. Create them per request and provide them through context.
- Read browser APIs (`window`, `localStorage`) in effects or event handlers, never during render. Wrap storage access in `try`/`catch`: it throws in private mode and when blocked.
