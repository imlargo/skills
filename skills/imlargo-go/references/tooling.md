---
name: tooling
description: "Lint, vulnerability and CI setup for imlargo's Go repos: golangci-lint v2 base config, the CI pipeline, govulncheck, go fix and go.mod hygiene. Load when adding or changing lint config, CI workflows or the Go toolchain version."
---

# Tooling

## golangci-lint v2

Never `default: all`: each minor release adds linters and breaks CI. Start from this and adjust per repo:

```yaml
version: "2"
linters:
  default: standard
  enable: [bodyclose, noctx, errorlint, contextcheck, nilerr, nilnesserr, exhaustive,
           gosec, copyloopvar, fatcontext, sloglint, usestdlibvars, modernize,
           nolintlint, gocritic, revive, depguard, sqlclosecheck, rowserrcheck]
  settings:
    govet: { enable: [nilness, shadow] }
    nolintlint: { require-explanation: true, require-specific: true }
    depguard:
      rules:
        main:
          deny:
            - { pkg: github.com/pkg/errors, desc: "use the standard library errors" }
            - { pkg: io/ioutil, desc: "use io and os" }
formatters:
  enable: [gofumpt, gci]
  settings:
    gci: { sections: [standard, default, "prefix(<module path>)"] }
```

- `//nolint` needs the specific linter and a reason.
- On an existing codebase, `issues.new-from-merge-base: main` limits findings to new code.

## CI Pipeline

- `permissions: contents: read`, actions pinned by SHA, `setup-go` with `go-version-file: go.mod`.
- `go mod download && go mod verify`, then a `go mod tidy` check with `git diff --exit-code`.
- golangci-lint at an exact version.
- `go test -race -shuffle=on -coverprofile=cover.out ./...`.
- govulncheck in text mode (json and sarif modes exit 0 even with findings), on every PR and on a schedule.

## Toolchain

- After every Go upgrade, run `go fix ./...` from a clean tree, twice.
- Tools go in `go.mod` with the `tool` directive, not a `tools.go` file.
- Review the maintenance status of direct dependencies once a year: wire, go-kit, gorilla/mux, pkg/errors and golang/mock all went stale.
