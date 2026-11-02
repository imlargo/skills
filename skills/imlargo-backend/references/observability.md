---
name: observability
description: "Logging, metrics, tracing, health probes, graceful shutdown and runtime limits for backend services. Load when adding logs or metrics, health checks, shutdown handling, or deployment settings."
---

# Observability

## Logs

- Structured JSON in production, one logger built at startup and injected. Request-scoped fields (request ID, user, tenant) are attached once per request.
- Never log credentials, tokens, cookies, full `Authorization` headers or bodies with personal data. Sensitive types redact themselves so logging a whole struct stays safe.
- Each error is logged once, where it's handled. Not at every layer it passes through.

## Metrics and Tracing

- Label cardinality stays bounded: the route template, never user IDs or raw paths.
- RED for request handlers (rate, errors, duration), USE for resources (utilization, saturation, errors).
- Propagate trace context across every call; export through OpenTelemetry when the project uses it.
- Metrics, profiling and debug endpoints are never public without protection. Prefer an internal admin port.

## Health

- **Liveness** reports only an unrecoverable state, such as a deadlock. It never checks dependencies: a database blip would restart every pod at once.
- **Readiness** means "initialized and not shutting down". Dependency failures are handled with circuit breakers, not by pulling every pod out of rotation.
- A slow start gets a startup probe, not a looser liveness probe.

## Shutdown and Runtime

- On SIGTERM: stop accepting, drain in-flight requests with a bounded timeout, stop workers, flush telemetry, close pools. Long-lived connections (SSE, WebSockets) need their own shutdown hook.
- Declare CPU and memory limits for every container; set the runtime's memory limit 5-10% below the container's.

<!--
Source references:
- https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/
- https://go.dev/doc/gc-guide
- https://api-security.owasp.org/editions/2023/en/0x11-t10
-->
