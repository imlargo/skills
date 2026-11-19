---
name: types
description: "How imlargo models data with TypeScript: closed sets, discriminated unions and exhaustiveness, schemas at the boundaries, narrowing instead of casting, branded ids, derived types, generics and errors. Load when designing types for a domain, API, state machine or error handling, or when a type error tempts a cast."
---

# Types

## Closed Sets

- Write the values once and derive the union: `const ROLES = ['admin', 'member'] as const; type Role = (typeof ROLES)[number]`. For named values, an `as const` object and `(typeof X)[keyof typeof X]`.
- Without `as const` the array widens to `string[]` and every `Record<Role, ...>` built on it stops being checked. Keep a short comment when that isn't obvious.
- Every map over a closed set is a complete `Record<Union, T>` (labels, classes, permissions), so a new value without an entry fails to compile.
- Check configuration tables with `as const satisfies`: the literal types survive and the shape is verified.

## Unions and Exhaustiveness

- Model alternatives as a discriminated union on one literal field (`type`, `status`, `kind`), never as one object with optional fields that are "only set when".
- Reducer actions, gestures, async states and results are unions. Optional booleans (`isLoading`, `isError`, `data?`) that allow impossible combinations aren't.
- A `switch` over a union is exhaustive. When it doesn't return from every branch, end it with `default: action satisfies never`, so a new member fails to compile.

## Boundaries

- Data from outside is `unknown` until parsed. Parse it once, at the edge (service, endpoint, env module, storage helper), and pass the domain type inward.
- The schema is the source of the type: `type User = z.infer<typeof UserSchema>`. A hand-written type next to a schema drifts.
- Wire types and domain types stay separate when they differ; the mapping lives where the data enters.
- Libraries that accept user schemas take a Standard Schema (`@standard-schema/spec`) instead of depending on one validator.
- Never `as User` on a `fetch` result or `JSON.parse`. That's a cast of unverified data, the same bug as `any`.

## Narrowing

- Narrow with `typeof`, `in`, `instanceof`, discriminants and type predicates (`(x): x is T`). A predicate must actually check what it claims.
- Indexed access is `T | undefined` with `noUncheckedIndexedAccess`: handle the `undefined`, or use a method that states the intent (`.at(-1)`, `find` plus a guard).
- `!` is acceptable only where absence is a programming error that should crash immediately (the app root element). Elsewhere, narrow or throw a clear error.

## Modeling

- Prefer `type` for unions, intersections and derived types; `interface` for object contracts a class implements or a consumer extends. Follow the repo when it's consistent.
- Derive instead of repeating: `Pick`, `Omit`, `Partial` for patches, `ReturnType`, `Parameters`, indexed access. A patch is `Partial<Note>`; a draft before the server assigns an id is `Omit<Note, 'id'>`.
- Brand ids that are easy to mix up (`type UserId = string & { readonly __brand: 'UserId' }`) only when a mix-up already happened or the cost of one is high. Otherwise it's ceremony.
- `readonly` on data a function must not mutate (input arrays, shared config).
- Two concepts that share a shape today stay two types (see `imlargo`).

## Generics

- A type parameter must appear in at least two places, or it isn't doing anything.
- Constrain it (`<K extends keyof T>`) rather than casting inside the function.
- Don't make a function generic for a second caller that doesn't exist yet.

## Errors

- Expected failures are a typed error class with a code from a closed union, and a `Record<Code, string>` of messages safe to show. Anything else is unknown and treated as a bug.
- `catch (error)` gives `unknown`: check `instanceof`, or normalize it in one helper. Never read `error.message` off an unchecked value.
- A function that can fail in an expected way returns a result union or throws the typed error. Pick one per codebase and don't mix them in a module.

## Examples

```ts
// Prefer: one source, derived union, exhaustive maps
export const NOTE_COLORS = ['indigo', 'amber', 'rose'] as const
export type NoteColor = (typeof NOTE_COLORS)[number]
export const COLOR_CLASSES: Record<NoteColor, string> = {
  indigo: 'bg-indigo-200',
  amber: 'bg-amber-200',
  rose: 'bg-rose-200',
}

// Prefer: a union for every transition, exhaustive switch
type Action =
  | { type: 'add'; note: Note }
  | { type: 'patch'; id: number; changes: Partial<Note> }
  | { type: 'remove'; id: number }

// Avoid: a cast of unverified data
const user = (await res.json()) as User
// Prefer: parse at the boundary
const user = UserSchema.parse(await res.json())
```
