---
name: imlargo-go
description: How imlargo writes Go. Covers project layout, package design, naming, error handling, interfaces, concurrency, testing, tooling and preferred libraries. Use when writing, reviewing or scaffolding Go code (.go files, go.mod, Go services and CLIs). Encodes imlargo's rules, not a Go tutorial.
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Go

> Builds on `imlargo` and, for services, `imlargo-backend`. Only how imlargo uses Go; skip what Effective Go and the standard docs already teach.
>
> Targets Go {version}. <!-- TODO: fill version -->

## Preferences

<!-- TODO: The 5-10 rules that most change how code looks (e.g. stdlib first, small interfaces at the consumer). -->

## Stack

<!-- TODO: Libraries chosen for each concern (HTTP router, DB access, config, logging, testing, CLI...). -->

## Avoid

<!-- TODO: Patterns, APIs or libraries that must not be used, and what to use instead. -->

## Tooling

<!-- TODO: Formatter, linters (golangci-lint config), generate/build/test commands that must pass. -->

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project Layout | Directories, packages, cmd/internal, wiring | [project-layout](references/project-layout.md) |
| Errors | Wrapping, sentinel and typed errors, boundaries | [errors](references/errors.md) |
| Concurrency | Goroutine ownership, context, errgroup, shutdown | [concurrency](references/concurrency.md) |
| Testing | Table tests, fakes, integration tests, flags | [testing](references/testing.md) |
