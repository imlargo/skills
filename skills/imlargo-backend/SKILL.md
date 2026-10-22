---
name: imlargo-backend
description: imlargo's backend rules, independent of language. Covers service architecture, API design, validation, persistence and migrations, error handling, logging and observability, security and configuration. Use when designing, building or reviewing APIs, services, background jobs or data models, together with the language skill (e.g. imlargo-go).
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Backend

> Builds on `imlargo`. Language-specific rules live in their own skill (`imlargo-go`). Keep this one valid for any language.

## Principles

<!-- TODO: The rules that apply to every service. -->

## Architecture

<!-- TODO: Summary; details in references/architecture.md. -->

## API Design

<!-- TODO: Summary; details in references/api-design.md. -->

## Data and Persistence

<!-- TODO: Summary; details in references/data-persistence.md. -->

## Errors and Observability

<!-- TODO: Summary; details in references/observability.md. -->

## Security

<!-- TODO: Summary; details in references/security.md. -->

## Configuration

<!-- TODO: Env vars, config files, defaults and secrets. -->

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Architecture | Layers, boundaries, dependency direction, jobs | [architecture](references/architecture.md) |
| API Design | Routes, payloads, status codes, pagination, versioning | [api-design](references/api-design.md) |
| Data and Persistence | Schema, migrations, queries, transactions | [data-persistence](references/data-persistence.md) |
| Errors and Observability | Error propagation, logging, metrics, tracing | [observability](references/observability.md) |
| Security | Auth, input validation, secrets, dependencies | [security](references/security.md) |
