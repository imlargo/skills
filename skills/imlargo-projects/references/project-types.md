---
name: project-types
description: "How imlargo's own products, libraries and prototypes differ in process, quality bar, tests, CI, docs and delivery. Load when starting a project or when a decision depends on what kind of project it is."
---

# Project Types

| | Own product | Library / OSS | Prototype / PoC |
|---|---|---|---|
| Define phase | Context and roadmap; imlargo is the client | Context and API design | Short context only |
| Template | Per product (`svelte-template`, plus `medusa` for a Go backend) | `typescript-library-template`, `svdocs` for docs | `svelte-template` |
| Tests and CI | Yes when production | Yes, plus checks on the published package | No |
| Versioning | Only past a quick MVP (`imlargo-workflow`) | Always: SemVer, changelog, releases | No |
| Docs | Context, ADRs | Public README and docs site | README |
| Delivery | Continuous | Releases to npm | A demo |

Work inside a team or company follows that team's repo, process and `AGENTS.md`; these skills fill only what the repo doesn't define.
