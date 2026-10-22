---
name: architecture
description: "The patterns behind imlargo's best Svelte projects: atomic hooks as runes classes, shared state through typed context, feature slices with services, the query/AsyncView data flow, errors, permissions and label records. Load when creating hooks, shared state, a feature slice, a service or a data-loading page."
---

# Architecture

## Atomic Hooks

One concern per hook: open/closed, paging, an async call, a media query.

- An exported PascalCase class in `hooks/<kebab>.svelte.ts`, named for its role (not `useX`), created with `new` where it's used.
- Public fields are `$state`; values replaced wholesale (responses) use `$state.raw`. Computed values are `readonly ... = $derived(...)`. Private state uses `#fields`.
- Methods are verbs (`show`, `toggle`, `next`, `goTo`, `reset`, `run`). Constructor args are initial values or config.
- A hook may extend a Svelte primitive (`IsMobile extends MediaQuery`).
- Only a hook that needs `$effect` or reactive inputs is a function: it takes getters and returns `{ get current() }`.
- Hooks never call the API. `Query` receives a fetcher that calls a service.

```ts
export class Pagination {
  page = $state(1)
  pageSize = $state(20)
  total = $state(0)
  readonly totalPages = $derived(Math.ceil(this.total / this.pageSize))
  readonly hasNext = $derived(this.page < this.totalPages)
  next() { if (this.hasNext) this.page++ }
  reset() { this.page = 1 }
}
```

`Query<T>` guarantees: the last started run wins and aborts the previous one, a failed run keeps the previous data, new params mark it stale (skeleton) while the same params are a refresh (rows stay).

## Shared State

- No module-level `$state` with user data. App-wide state is a class created in a layout and provided with Svelte's typed `createContext`.
- It receives layout `data` as a getter, so it follows navigations.
- Compound components use the same context pattern, with a getter that throws a clear error when used outside its parent.

```ts
export class ClientSession {
  readonly #data: () => SessionData
  constructor(data: () => SessionData) { this.#data = data }
  get user(): User | null { return this.#data().user }
}
export const [getAuth, setAuth] = createContext<ClientSession>()
// routes/+layout.svelte: setAuth(new ClientSession(() => data))
```

## Feature Slices

- A slice holds `services/`, `components/`, `schemas.ts` (zod schema and its inferred form type, shared by client and server) and optionally `types.ts`.
- A service extends the abstract `BaseService`, fixes its host, and maps wire types to domain types inside. It turns an unexpected empty body into an `AppError`.

```ts
export class UsersService extends BaseService {
  constructor(auth: ApiAuth = {}) { super(SAME_ORIGIN, auth) }
  list(search?: string, signal?: AbortSignal) {
    return this.expectBody(this.api.get<PaginatedResponse<User>>('/api/users', { query: { q: search || undefined }, signal }))
  }
}
```

## Data Flow in a Page

- `+page.server.ts` authorizes (`locals.requirePermission(...)`) and streams what isn't essential.
- The page creates the service from the session (`new UsersService(getAuth().api)`) and a `Query`, and runs it in `onMount`.
- A failed refresh keeps the table and reports the error; a mutation callback returns `boolean` so a dialog knows whether to close.
- Endpoints start every handler with their own permission check, read bodies through the shared schema, and answer failures with `AppError`.

## Cross-Cutting

- **Errors:** one `AppError` with a closed code union and a `Record<ErrorCode, string>` of messages. `normalizeError` turns anything into an `AppError`; `reportError` normalizes, logs only unknowns, toasts, and returns it. Pages sit inside an error boundary.
- **Permissions:** `'resource:action'` union, `ROLE_PERMISSIONS` checked with `as const satisfies`, `ROUTE_ACCESS` exhaustive over generated route IDs, deny by default. Navigation visibility reads the same table, and a test covers the role × permission matrix.
- **Labels and tones:** complete `Record<Enum, string>` label maps next to their values; `Record<Tone, string>` with written-out Tailwind classes, because dynamic class names aren't generated.
- **Env:** `src/env.ts` with zod, read from `$app/env/*`, assembled into one typed `config` that checks cross-variable rules.
