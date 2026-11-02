---
name: data-persistence
description: "How imlargo handles databases and side effects: migrations and zero-downtime changes, tenancy and object-level authorization, transactions, the outbox, jobs, connection pools and caches. Load when changing a schema, writing queries or transactions, or adding jobs or events."
---

# Data Persistence

## Migrations

- Versioned and run as a separate step (a migrate command, a job or an init step), never on every replica's startup: concurrent runs race, and a failed one leaves every pod crash-looping.
- Zero downtime is a process, not a tool: add the nullable column, deploy dual writes, backfill in batches, switch reads, drop the old column in a later release.
- Removals always need a hand-written migration.

## Queries and Tenancy

- Every read of an object filters by its owner or tenant inside the query. Checking ownership in the handler after loading is how broken object-level authorization happens.
- Shared-schema multi-tenancy: a `tenant_id` column, optionally with Postgres row-level security. Then set the tenant with `set_config('app.tenant_id', $1, true)` inside the transaction (a session `SET` leaks across a transaction pooler), use `FORCE ROW LEVEL SECURITY`, give policies a `WITH CHECK`, and connect the app with a role that doesn't own the tables.
- Batch writes and reads. One query per item in a loop is a bug at scale.

## Transactions

- A transaction belongs to one unit of business work. Keep it short; never call external services inside it.
- The store owns transactions. Business logic that must run inside one is passed as a closure (`Update(ctx, id, fn)`, `WithTx(ctx, fn)`); a transaction is never hidden in the context. A unit of work spanning several repositories is explicit and only for when they must commit together.

## Side Effects

- Never enqueue to an external queue mid-transaction (the job can run before commit or on rolled-back data) or after commit (a crash in between loses it). Write the job or event to a table in the same transaction and drain it afterwards.
- Delivery is at least once. Consumers are idempotent: record the message ID with a unique index in the same transaction as the effect.
- When Postgres is the system of record, prefer a Postgres-backed job queue; long workflows with compensation go to a workflow engine.

## Pools and Caches

- Size connection pools as the database's `max_connections` divided by the number of instances, with a connection lifetime shorter than the load balancer's idle timeout. Defaults are often unlimited or tiny.
- A cache has one owner module and an explicit invalidation; never a key invented inside a service.

<!--
Source references:
- https://brandur.org/job-drain
- https://threedots.tech/post/database-transactions-in-go/
- https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- https://www.alexedwards.net/blog/configuring-sqldb
-->
