---
name: api-design
description: "imlargo's HTTP API conventions: resources and naming, error responses, pagination, versioning, idempotency, partial updates, long operations and rate limits. Load when designing or changing an endpoint or an API contract."
---

# API Design

These are defaults for APIs imlargo designs. An existing or published contract wins: never break clients to conform, and keep a third-party or legacy API's conventions when extending it. Rules marked "when needed" apply only when the case calls for them.

## Resources

- Plural collections (`/v1/users/{id}`), no verbs in URLs, kebab-case path segments.
- JSON properties and query params in snake_case, enforced across the whole API. Never send `null` fields; treat null and absent the same.
- Empty lists are sent as `[]`, never `null`.
- Partial updates use JSON Merge Patch semantics (`PATCH`). Optimistic concurrency uses `If-Match` with content-hash ETags and answers 412.

## Errors

- One error shape for the whole API: `application/problem+json` (RFC 9457) with `type`, `title`, `status`, `detail`, plus a stable machine-readable `code` that's never reused and the request ID. Every dynamic value in `detail` is also a field, so clients never parse text.
- No stack traces, SQL or internal causes in a response; the cause goes to the log.
- Check permission before existence: answer 403 even when the resource doesn't exist, and 404 only to someone allowed to see it.
- Unrecognized errors are logged once and answered as 500. A request the client canceled answers 499; a server-side timeout answers 503.

## Pagination

- Every list endpoint paginates from the first version, with one shared response shape.
- Opaque cursors (`page_size`, `page_token`, `next_page_token`): the token is meaningless to clients, never grants access, and an empty next token is the only end signal. Total counts are optional and may be estimates.
- A size of 0 uses a documented default; an excessive size is clamped to a documented maximum.

## Versioning

- A major version prefix in the path (`/v1`). Inside it, only additive changes: new fields, new endpoints, new optional params.
- A breaking change means a new major version. When external clients can't be forced to migrate, transform responses backwards to the requested version instead of forking the code.

## Side Effects

- When needed, `POST` endpoints with side effects (payments, sends, provisioning) accept an `Idempotency-Key` (up to 255 characters). Store the status and body of the first execution and replay them, including 500s; reusing a key with different parameters is an error; keys can expire after 24 hours. Validation failures and concurrent conflicts aren't stored.
- When needed, operations that usually take more than about 1 second (p99) answer `202 Accepted` with a link to a status resource (`queued`, `running`, `succeeded`, `failed`, `canceled`), kept for at least 24 hours.
- Rate-limited requests answer `429` with `Retry-After`.

<!--
Source references:
- https://www.rfc-editor.org/rfc/rfc9457.html
- https://google.aip.dev/193
- https://google.aip.dev/158
- https://opensource.zalando.com/restful-api-guidelines/
- https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md
- https://docs.stripe.com/api/idempotent_requests
- https://stripe.com/blog/api-versioning
-->
