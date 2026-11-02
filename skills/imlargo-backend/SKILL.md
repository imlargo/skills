---
name: imlargo-backend
description: imlargo's backend rules, independent of language. Covers service architecture and dependency wiring, API design (resources, errors, pagination, versioning, idempotency, long operations), persistence (migrations, tenancy, transactions, side effects), resilience (timeouts, retries, circuit breakers), observability, health probes, security and configuration. Use when designing, building or reviewing APIs, services, background jobs, data models or deployments, together with the language skill (e.g. imlargo-go).
metadata:
  author: imlargo
  version: "2026.11.02"
---

# Backend

> Builds on `imlargo`. Language-specific rules live in their own skill (`imlargo-go`). Keep this one valid for any language.
>
> These are defaults for what imlargo designs. Not every API follows them all: an existing or published contract wins, and some rules apply only when the case needs them.

## Architecture

- Handlers parse and respond; services hold business logic; repositories (the store) are the only code that touches the database.
- Dependencies enter through constructors and are wired once at startup. No global state.
- The domain doesn't depend on infrastructure.
- Layers at the root while the domain is small; package by feature once it grows, each feature exposing its interfaces and keeping its store private.
→ [architecture](references/architecture.md)

## APIs

- Plural collections, no verbs in URLs, kebab-case path segments, one JSON casing (snake_case) everywhere.
- One error shape (problem+json) with a stable, machine-readable code. Never stack traces or internal causes in a response. Check permissions before existence: 403 to whoever can't see it, 404 only to whoever can.
- Every list paginates from day one, with opaque cursors: adding pagination later is a breaking change.
- A major version in the path (`/v1`) and only additive changes inside it.
- When needed, POSTs with side effects (payments, sends) accept an `Idempotency-Key`.
→ [api-design](references/api-design.md)

## Data

- Migrations are versioned and run as their own step, never on every replica's startup.
- Zero-downtime schema changes go expand/contract across several deploys.
- Every read of an object filters by owner or tenant in the query itself, not in the handler afterwards.
- Side effects that must follow a commit (jobs, events, emails) are written in the same transaction and drained afterwards; consumers are idempotent.
- Batch writes and queries; never one call per item in a loop.
→ [data-persistence](references/data-persistence.md)

## Resilience

- Explicit timeouts on every server and every client. Defaults are usually none.
- The time budget is set once at the edge; inner calls only shorten it.
- Retry at one layer of the stack only, with a budget, exponential backoff and jitter, and only for idempotent operations.
→ [resilience](references/resilience.md)

## Operations

- Structured JSON logs with the request ID. Never log credentials, tokens, cookies, `Authorization` headers or bodies with personal data.
- Metric labels stay bounded: route templates, never IDs or raw paths.
- Liveness never checks dependencies. Readiness means "initialized and not shutting down".
- Graceful shutdown: stop accepting, drain requests, stop workers, flush telemetry, close pools.
- No state in the process that blocks horizontal scaling: sessions, local rate limits when the limit is global, uploads on local disk, crons on every replica.
→ [observability](references/observability.md)

## Security and Config

- Deny by default: every endpoint declares its permission.
- CORS is not CSRF protection. Cookie sessions need CSRF protection; GET never has side effects.
- Config is a typed struct loaded from the environment, validated once at startup; invalid config exits non-zero. Secrets come from files or a secret manager when available.
→ [security](references/security.md)

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Architecture | Layers, feature packages, wiring, the modular monolith | [architecture](references/architecture.md) |
| API Design | Resources, errors, pagination, versioning, idempotency, long operations, rate limits | [api-design](references/api-design.md) |
| Data Persistence | Migrations, tenancy, transactions, outbox, jobs, pools | [data-persistence](references/data-persistence.md) |
| Resilience | Timeouts, retry budgets, backoff, circuit breakers, overload | [resilience](references/resilience.md) |
| Observability | Logs, metrics, tracing, health probes, shutdown, runtime limits | [observability](references/observability.md) |
| Security | OWASP API risks, authorization, CSRF, secrets, config | [security](references/security.md) |
