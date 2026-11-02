---
name: architecture
description: "How imlargo structures backend services: layers, when to switch to feature packages, dependency wiring and the modular monolith. Load when creating a service, adding a feature that crosses layers, or deciding where code goes."
---

# Architecture

## Rules

- **Layers:** transport (handlers, DTOs) → services (business rules) → store (repositories). A handler never reaches the database; a repository holds no business logic.
- **Wiring:** every dependency enters through a constructor and is assembled once in the startup code (`main`, a bootstrap package). No global state, no service locators.
- **Interfaces:** small, declared where they're consumed. Don't build a "ports" layer of interfaces nobody else needs.
- **Growth:** layered packages at the root while the domain is small. When it grows (a package nearing about 50 files), package by feature: each feature exposes its interfaces, types and errors, keeps its implementation and store private, and ships an in-memory fake for tests. Splitting a feature into its own service then becomes a wiring and transport change.
- **No ceremony by default:** DDD, hexagonal or clean-architecture layering only when the domain's complexity has earned it.
- **Dependency injection** is manual. DI frameworks only for platforms with dozens of components shared across teams.
- Keep a single file that lists the whole API surface (every route with its middleware), so the contract can be read in one place.

<!--
Source references:
- https://www.gobeyond.dev/standard-package-layout/
- https://github.com/grafana/grafana/blob/main/contribute/backend/package-hierarchy.md
- https://grafana.com/blog/2024/02/09/how-i-write-http-services-in-go-after-13-years/
- https://threedots.tech/post/ddd-lite-in-go-introduction/
-->
