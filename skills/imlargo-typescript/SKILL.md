---
name: imlargo-typescript
description: How imlargo writes TypeScript, independent of framework or runtime. Covers tsconfig and lint strictness, modeling with types (closed sets, discriminated unions, exhaustiveness, branded and derived types), validating data at the boundaries, narrowing instead of casting, generics, errors, async code, modules, Node scripts, testing and publishing libraries. Use when writing, reviewing or scaffolding any .ts or .tsx file, a tsconfig, a TypeScript library or package, or when typing an API, schema or domain model, together with the framework skill (imlargo-svelte, imlargo-react).
metadata:
  author: imlargo
  version: "2026.11.19"
---

# TypeScript

> Builds on `imlargo`, which already bans `any` and magic values and requires `strict`. Framework rules live in their own skill (`imlargo-svelte`, `imlargo-react`). Only how imlargo uses TypeScript; skip what the handbook teaches.

## Preferences

- The compiler is the first test. Model the domain so a wrong value fails to compile instead of failing at runtime.
- Closed sets are `as const` arrays or objects with the union derived from them, never hand-written twice. No `enum` or `namespace` in new code: they aren't erasable syntax. In a repo that already uses enums, follow it.
- State with more than one shape is a discriminated union, and every `switch` over it is exhaustive.
- Everything that crosses a boundary (API responses, request bodies, env, `JSON.parse`, storage, URL params, files) is `unknown` until a schema (zod) parses it. The type comes from the schema with `z.infer`, never written alongside it.
- Narrow, don't cast. `as` and `!` only where you know something the compiler can't, with a one-line comment saying why. `as const` and `satisfies` aren't casts and are encouraged.
- `satisfies` checks a table against a type without widening it (`as const satisfies Record<Role, Permission[]>`).
- A generic exists only to connect two types (input to output, key to value). A type parameter used once is `unknown` or the concrete type.
- `import type` for type-only imports. Named exports; default exports only where a framework or tool requires them.
- Exported functions of a library declare their return type: it's the contract. Inside an app, let inference work.
- Throw `Error` subclasses, never strings or plain objects. Wrap with `new Error(message, { cause })`. A caught value is `unknown` and gets narrowed.
- No floating promises: every promise is awaited, returned, or explicitly handled. Independent work runs in `Promise.all`; cancellable work takes an `AbortSignal`.
- Set compiler flags explicitly. Defaults changed between TypeScript 5 and 6, so a tsconfig that relies on them means different things on different machines.

→ [config](references/config.md), [types](references/types.md)

## Checks

- `tsc --noEmit` (or the framework's checker, `svelte-check`) and the linter at zero warnings. Lint with typed rules: typescript-eslint `strictTypeChecked` and `stylisticTypeChecked` in libraries; small apps may use oxlint. Follow the repo's tool.
- Tests with Vitest, next to the code. Pure modules are tested without the framework. Two implementations of one interface share one contract suite that runs against both: it catches them disagreeing.
- Follow the machine's command limits: type checks and lint are heavy, run them on the touched scope.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Config | The tsconfig flags imlargo turns on and why, lint setup, Node scripts with type stripping | [config](references/config.md) |
| Types | Closed sets, unions and exhaustiveness, boundaries and schemas, narrowing, generics, errors, examples | [types](references/types.md) |
| Libraries | Publishing an npm package: ESM-only exports, build, declaration checks, public API, versioning | [libraries](references/libraries.md) |
