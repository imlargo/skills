---
name: resilience
description: "Quantified rules for timeouts, retries, backoff, circuit breakers and overload. Load when calling another service or database, adding retries, or handling load and failures."
---

# Resilience

## Rules

- **Timeouts everywhere.** Servers set read-header, read, write and idle timeouts and cap body size; every outbound client has a timeout. Streaming endpoints are the only place a write timeout is disabled.
- **Choose a timeout from the downstream's latency,** for example its p99.9, including connection and TLS handshake. Not a round number.
- **One time budget per request,** set at the edge and passed down; inner calls only shorten it. A timeout carries a cause that says what ran out ("db query budget exceeded").
- **Retry in one layer only.** Five layers retrying three times each multiply the load on the bottom by 243.
- **Retry budget:** at most 3 attempts per request and under 10% retries per client. Exponential backoff with a cap and jitter. Only idempotent operations.
- **Circuit breakers** on dependencies that fail slowly. A client disconnect (`context canceled`) never counts as a failure.
- **Overload:** reject early instead of queueing forever. Clients throttle themselves when requests exceed about twice the accepted ones, and an explicit "overloaded, don't retry" response stops retry storms.
- **Outbound HTTP clients** always take a context and a timeout, cap the response body, turn non-2xx statuses into typed errors, and retry only when the call is idempotent and the caller opted in.
- **Work that outlives the request** (audit, enqueue) keeps the request's trace and IDs but drops its cancellation, and gets its own timeout.

<!--
Source references:
- https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/
- https://sre.google/sre-book/handling-overload/
- https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/
-->
