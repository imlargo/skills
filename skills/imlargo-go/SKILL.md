---
name: imlargo-go
description: How imlargo writes Go, following current Go best practices. Covers the default stack, project layout, naming and style, errors and their translation at the boundary, context, concurrency, shutdown, testing, linting and CI. Use when writing, reviewing or scaffolding Go code (.go files, go.mod, Go services, jobs and CLIs), including imlargo's backend template medusa. Encodes imlargo's rules, not a Go tutorial.
metadata:
  author: imlargo
  version: "2026.11.02"
---

# Go

> Builds on `imlargo` and `imlargo-backend`. Only how imlargo uses Go; skip what the official docs already teach.
>
> Targets the Go version in `go.mod` (1.27 today). The question is never which library to add, but what justifies not using the standard library.

## Stack

New backends start from [imlargo/medusa](https://github.com/imlargo/medusa): copy its `app/` and build on the Medusa core and batteries instead of reimplementing them. medusa is a work in progress; where its code still differs from these rules, new code follows the rules and the report names the gap.

| Concern | Default |
|---------|---------|
| HTTP | Gin through Medusa: typed handlers (`medusa.Handle`, `HandleCreate`...), `httperr` errors, `middleware`, `httpserver` with graceful shutdown |
| Lifecycle | `lifecycle.New(...).Run(ctx)` runs servers and `job.Every(...)` background work, stops on SIGINT/SIGTERM |
| Database | Postgres with pgx v5 through the `postgres` battery; sqlc generating typed code from hand-written SQL |
| Migrations | goose SQL migrations, embedded, applied by `cmd/migrate` as their own deploy step |
| Auth | The `auth` battery (JWT with a typed subject and issuer) |
| Logging | `log/slog`, built once in the container and passed down |
| API docs | swaggo today; a replacement generating OpenAPI from types is pending |
| Tests | Standard library, `go-cmp`, `postgres/pgtest` for a fresh migrated database per test |
| Standard library first | `uuid`, `http.CrossOriginProtection`, `os.Root`, `errgroup`, `WaitGroup.Go`, typed atomics |

Repos on another stack (butter: GORM, zap) keep their libraries until imlargo swaps them: propose, never swap unasked.

## Preferences

- Google's Go style decisions and Code Review Comments are the base; Uber's guide fills the gaps.
- `main` only calls `run(ctx, ...) error` and exits non-zero on error. `os.Exit` and `log.Fatal` live only in `main`.
- Dependencies are wired by hand in the bootstrap container. Constructors return concrete types; interfaces are small and declared by the consumer.
- Every error is handled once: wrapped and returned, or logged and degraded. Never both.
- Services return domain errors; the boundary translates them to `httperr`. Never send `err.Error()` to a client.
- `context.Context` is the first parameter, never stored in a struct, never nil.
- Every goroutine has an owner that stops and waits for it: a `job`, a `lifecycle` server, or a function that waits before returning.
- Each new module in `go.mod` needs a written reason.
- Checks: `go build ./... && go vet ./...`, `go test ./...`, gofumpt and goimports, golangci-lint. Race detection and govulncheck run in CI.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project Layout | medusa's app layout, recipes for endpoints, tables and jobs, Medusa core vs app | [project-layout](references/project-layout.md) |
| Style | Naming, packages, interfaces, options, the guide conflicts resolved | [style](references/style.md) |
| Errors | Error forms, wrapping, handling once, boundary translation, panics, context | [errors](references/errors.md) |
| Concurrency | Goroutine ownership, errgroup, mutexes, channels, shutdown | [concurrency](references/concurrency.md) |
| Testing | Table tests, comparisons, integration tests, time, leaks | [testing](references/testing.md) |
| Tooling | golangci-lint v2 config, CI pipeline, govulncheck, go fix | [tooling](references/tooling.md) |
