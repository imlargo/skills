---
name: imlargo-go
description: How imlargo writes Go and builds backends. Covers where backend decisions live (medusa), the backend rules that hold in any service, Go style and naming, errors and context, concurrency and shutdown, and testing. Use when writing, reviewing or scaffolding Go code or any backend (.go files, go.mod, APIs, services, jobs, CLIs). Encodes imlargo's rules, not a Go tutorial.
metadata:
  author: imlargo
  version: "2026.11.02"
---

# Go

> Builds on `imlargo`. Only how imlargo writes Go; skip what the official docs already teach.

## Backends Are medusa

imlargo's backends are Go on [imlargo/medusa](https://github.com/imlargo/medusa): new ones copy its `app/`. Stack, layout, recipes, API contracts and platform decisions live in medusa's `AGENTS.md` and docs, and they win over this skill. In a repo with another stack (butter), follow that repo; propose library swaps, never make them unasked.

## Backend Rules

These hold in any service, medusa or not:

- Every read of an object filters by its owner or tenant inside the query, not in the handler after loading.
- Migrations are versioned and run as their own step, never on the app's startup.
- Never log credentials, tokens, cookies, `Authorization` headers or bodies with personal data. Never send an internal error or `err.Error()` to a client.
- Every server and every outbound client has an explicit timeout. Retry in one layer only, for idempotent operations, with backoff and jitter.
- An existing or published API contract wins: never break clients to conform to a newer convention.

## Go Preferences

- Google's Go style decisions and Code Review Comments are the base; Uber's guide fills the gaps.
- `main` only calls `run(ctx, ...) error` and exits non-zero on error. `os.Exit` and `log.Fatal` live only in `main`.
- Dependencies are wired by hand at startup. Constructors return concrete types; interfaces are small and declared by the consumer.
- Every error is handled once: wrapped and returned, or logged and degraded. Never both.
- Services return domain errors; the HTTP boundary translates them.
- `context.Context` is the first parameter, never stored in a struct, never nil.
- Every goroutine has an owner that stops and waits for it.
- Prefer the standard library; each new module in `go.mod` needs a written reason.
- Checks: `go build ./... && go vet ./...`, `go test ./...`, gofumpt and goimports, golangci-lint. Race detection and govulncheck run in CI.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Style | Naming, packages, interfaces, options, the guide conflicts resolved | [style](references/style.md) |
| Errors | Error forms, wrapping, handling once, boundary translation, panics, context | [errors](references/errors.md) |
| Concurrency | Goroutine ownership, errgroup, mutexes, channels, shutdown | [concurrency](references/concurrency.md) |
| Testing | Table tests, comparisons, integration tests, time, leaks | [testing](references/testing.md) |
