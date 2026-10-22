---
name: sveltekit
description: "imlargo's SvelteKit conventions: load and streaming, client queries, form actions, API endpoints, server auth and route helpers. Load when working on SvelteKit routes or server code."
---

# SvelteKit

## Load

- A `load` authorizes the page and awaits only what the page can't render without. Everything else is returned as a promise and rendered with an async view plus a skeleton.
- A `load` doesn't import server internals or reach around the endpoint. Data comes through a service, reads included.
- Searched, filtered or edited-in-place data is loaded by the page in `onMount` with a query class, not with `if (browser)`.

## Services

- On the client, create a service from the auth context's API client, never from a bare token, so it inherits session renewal and 401 handling.
- On the server, create it with `{ token: locals.accessToken, fetch }`.

## Endpoints

- In fullstack mode, everything backend lives in `routes/api/`.
- Endpoints answer failures through one error-response helper and read bodies through one body reader.
- Permissions are exhaustive over the route IDs `svelte-kit sync` generates, so a new page or endpoint without an entry doesn't compile. Deny by default.

## Forms

- A form that posts to the server is a form action with `use:enhance`. A form inside a client flow handles its own `onsubmit`.
- Lay out fields with shadcn's `Field`. Validate with the slice's zod schema; the server always validates.

## Routes

- Pathnames used as redirect targets live in the routes config. For an `href`, pass them through the template's pathname resolver, not `resolve()`, which reads a leading `/` as a route ID.
- Route IDs (`/(app)/admin`, typed from `$app/types`) go through `resolve()`.
