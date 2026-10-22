---
name: architecture
description: "How imlargo structures frontend apps: the service layer, wire vs domain types, the core layer, environment, routes and error handling. Load when creating a frontend project or deciding where new code goes."
---

# Architecture

## Services

- Services are the only place that calls the API. Components and state hooks delegate to them.
- In a fullstack app, everything backend lives behind API endpoints. Pages get data through a service, reads included, so whether the backend is this process or a separate one is never the page's business.
- A wire type (what the API returns) lives next to the service that consumes it and is mapped there. Components only see domain types.
- Session expiry is handled once, in the transport layer and the server hook: renew or redirect to login. No component handles a 401.

## Layers

- The core layer depends on nothing outside itself. It receives project decisions (base URL, error parser, logger) through parameters or setters wired at startup.
- Pure, stateless helpers (formatting, validation, transformation) go to `utils/`; anything with state or reactivity goes to `hooks/`. Check for an equivalent before adding one.

## Configuration

- Every environment variable is declared once in a validated schema and read only through it.
- Routes the code redirects to or calls are typed constants in one config module.
- No mock or demo branches in production code: a hook or service never checks a "mock" cookie or query param.

## Errors

- Every error is normalized; its message is always safe to show. Never display the raw message of an error that wasn't normalized.
- Expected errors are thrown as a typed app error with a code. A generic error is treated as a bug: the user sees the default message, the detail goes only to the log.
- A failure the user triggered is reported with one call that shows a toast and logs.
- The global error handler acts only on unexpected errors; expected ones already carry their message.
