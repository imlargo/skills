---
name: data-and-state
description: "How imlargo handles state, data loading, queries, caching and forms on the frontend. Load when wiring data into the UI, adding state or building a form."
---

# Data and State

## State

- Shared state lives in dedicated state modules. Before creating one, check whether the state is really shared; local state stays in its component.
- Under SSR, modules are singletons per process, not per request. Module-level state holding user data leaks between users: it's a security incident, not a nuisance. Per-request state goes in the request context, the page data or component context.
- State modules don't call the API; they delegate to services.

## Loading

- A navigation never waits for slow data. Await only what the page can't render without; return the rest as a promise and render it with a skeleton.
- Data the user searches, filters or edits in place is loaded by the page itself through a query object.
- A query tells a new search from a refresh: a new search shows the loading state and replaces the old rows; a refresh after a write keeps them. Leaving stale rows clickable during a new search is worse than showing nothing.
- Fetchers take an `AbortSignal` and pass it to the service.
- List endpoints answer one paginated response shape, typed once with the shared generic types. Never redefine response types locally.
- No client-side cache until a third place needs one. Then it's one module with its own invalidation, never a storage key invented inside a service.

## Forms

- No form library. A form that posts to the server uses the framework's form handling; a form inside a client flow (a dialog calling a service) handles its own submit.
- Validate with the domain's schema (zod). The server always validates, even if the client already did.
