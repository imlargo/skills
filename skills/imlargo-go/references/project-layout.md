---
name: project-layout
description: "How a Go backend built on medusa is laid out: the app's folders, where each kind of code goes, recipes for endpoints, tables and background jobs, and the line between the Medusa toolkit and the app. Load when scaffolding a Go service, adding a feature, or deciding where a file goes."
---

# Project Layout

A medusa repo or a project copied from it follows its own `AGENTS.md` first; this is the summary.

```
cmd/api/main.go              entry point, calls bootstrap
cmd/api/bootstrap/           container.go (dependencies), routes.go (every route), app.go (lifecycle)
cmd/migrate/                 applies migrations, its own deploy step
internal/config/             loads and validates env vars
internal/database/
  migrations/                goose migrations, embedded
  queries/*.sql              sqlc queries
  sqlc/                      generated, never edited
internal/repositories/       sqlc rows -> models, driver errors -> domain errors
internal/store/              groups the repositories, WithTx for transactions
internal/models/             domain types
internal/dto/                request and response bodies
internal/services/           business logic
internal/handlers/           handlers returning (result, error)
```

A request flows routes -> handler -> service -> repository -> sqlc -> Postgres.

## Rules

- **Endpoint:** DTO with `binding` tags, a service method, a handler `func(ctx *medusa.Context, in *dto.X) (*dto.Y, error)`, built in the container, routed in `routes.go` with the adapter for its verb (`medusa.HandleCreate`). Read the user with the `auth` battery.
- **Table or query:** a new numbered goose migration (never edit an applied one), queries with `-- name:` annotations, regenerate sqlc, a repository that maps generated rows to models and classifies driver errors, register it in the store, test it with `pgtest`.
- **sqlc types and driver errors never leave the repositories.** The store never exposes the pool.
- **Atomic writes:** `store.WithTx(ctx, func(tx *store.Store) error {...})`, using only `tx` inside. A nested `WithTx` is a savepoint.
- **Background work:** a service method `func(ctx) error` that returns when `ctx` is canceled, registered with `job.Every` next to the server. Every replica runs it: work that must run once per cluster needs a lock or a queue.
- **Gin:** register global middleware before any route.
- **Split by feature** before a package reaches about 50 files.
- **Toolkit vs app:** when in doubt, code goes in the app. Code moves into Medusa only if any API could use it unchanged, it has no app concepts, and its signature uses standard library types (or Gin at the edge). The core never imports a battery, the app, a driver or a logger other than `slog`.
- Never run `go work sync`. Check every module: `go vet ./... ./auth/... ./postgres/... ./app/...`.
- `internal/` is the default; no `util`, `common`, `helper` or `model` packages.
