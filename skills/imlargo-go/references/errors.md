---
name: errors
description: "How imlargo handles errors and context in Go: choosing the error form, wrapping, handling once, translating at the boundary with medusa responses, panics, and context rules. Load when returning, wrapping, checking or logging errors, or passing context."
---

# Errors

## Rules

- **Choose the form by need:**

  | Matched by callers? | Static message | Dynamic message |
  |---|---|---|
  | No | `errors.New` | `fmt.Errorf` |
  | Yes | exported `var ErrX` | custom type ending in `Error` |

- **Wrap with short context**, no "failed to": `fmt.Errorf("load user: %w", err)`. `%w` goes last. Add only what the cause doesn't already say (`os` errors already include the path).
- **Handle once:** wrap and return, or log and degrade. Never log and return the same error.
- Sentinels and error types only for conditions a caller branches on. Prefer `errors.AsType[*E](err)` over `errors.As`; combine with `errors.Join`.
- Exported functions return the `error` interface, never a concrete error type (a typed nil isn't `nil`).
- **At the boundary:** services return domain errors (sentinels and types from the feature's package), never HTTP statuses. The HTTP boundary translates them to `httperr` values; anything unrecognized is logged once and answered as 500. The client never sees the internal cause.
- **Don't swallow lookups:** distinguish "not found" from "the lookup failed". A database outage must not read as a free email address.
- **Panics:** never recover to avoid a crash. `Must` helpers only at startup and in tests. A panic in your own goroutine kills the process; request recovery middleware doesn't protect background work.

## Context

- First parameter, never stored, never nil (`context.TODO` while wiring). Values only for request-scoped data, never optional parameters.
- Work that must outlive the request uses `context.WithoutCancel(ctx)` plus its own timeout.
- `context.WithTimeoutCause` so logs say what ran out.
- Tests use `t.Context()`.

## Examples

```go
// Avoid: logs and returns, generic prefix
if err != nil {
    log.Error("failed to load user", zap.Error(err))
    return nil, fmt.Errorf("failed to load user: %w", err)
}

// Prefer
if err != nil {
    return nil, fmt.Errorf("load user %d: %w", id, err)
}
```

<!--
Source references:
- https://github.com/uber-go/guide/blob/master/style.md (CC BY 4.0)
- https://google.github.io/styleguide/go/best-practices
- https://pkg.go.dev/context
-->
