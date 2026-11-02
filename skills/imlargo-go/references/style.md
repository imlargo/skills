---
name: style
description: "imlargo's Go style: the guide hierarchy, naming, packages, receivers, interfaces, options, embedding, imports, and the points where Google and Uber disagree resolved. Load when writing or reviewing Go code for style."
---

# Style

Base: Google's Go Style Decisions plus Code Review Comments, completed with Uber's guide where they're silent. Effective Go is background, not current reference.

## Naming

- MixedCaps, never ALL_CAPS. Initialisms keep one case (`appID`, `ServeHTTP`). No getters with `Get`.
- Package names short, lowercase, singular. No stutter: `widget.New`, not `widget.NewWidget`.
- Receivers of one or two letters, never `this` or `self`.
- Methods that block on I/O or are expensive say so: `Fetch`, `Compute`.
- No `_` prefix on unexported globals.

## Types and APIs

- Interfaces are small and declared by the consumer. Constructors return concrete types.
- `any`, never `interface{}`. Generics only when the requirement needs them; type aliases only for migrations.
- Enums start at `iota + 1` so the zero value means unset.
- A mutex is a named field `mu`, never embedded. Don't embed types in exported structs.
- Copy slices and maps at API boundaries when the caller could mutate them.
- Compile-time interface checks: `var _ http.Handler = (*Handler)(nil)`.
- Options: an options struct when most callers set them, variadic functional options when few do. Options carry values, not presence (`FailFast(bool)`).
- `&T{}` for structs; `new(expr)` for pointers to optional scalars.
- No `init()` with I/O or goroutines; prefer none at all. Flags only in `package main`.

## Formatting

- gofmt and goimports. Imports in three groups: standard library, third party, this module.
- No hard line limit; break by meaning and extract variables.
- Capacity hints in `make` only when a profile backs them.
- No dot imports.

<!--
Source references:
- https://google.github.io/styleguide/go/decisions
- https://go.dev/wiki/CodeReviewComments
- https://github.com/uber-go/guide/blob/master/style.md (CC BY 4.0)
-->
