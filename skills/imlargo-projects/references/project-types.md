---
name: project-types
description: "How Kora client projects, imlargo's own products, libraries and prototypes differ in process, quality bar, tests, CI, docs and delivery. Load when starting a project or when a decision depends on what kind of project it is."
---

# Project Types

| | Kora client | Own product | Library / OSS | Prototype / PoC |
|---|---|---|---|---|
| Define phase | Full: diagnosis + repo docs + backlog | Context and roadmap; imlargo is the client | Context and API design | Short context only |
| Template | `svelte-template` (+ Go backend if needed) | Per product | `typescript-library-template`, `svdocs` for docs | `svelte-template` |
| Tests and CI | Yes | Yes when production | Yes, plus checks on the published package | No |
| Versioning | Only past a quick MVP (`imlargo-workflow`) | Same | Always: SemVer, changelog, releases | No |
| Docs | Handoff, ADRs, operation guide | Context, ADRs | Public README and docs site | README |
| Delivery | Per phase, decided with the client | Continuous | Releases to npm | A demo |

Work that isn't Kora's (a team or company product, a freelance job outside Kora) follows that team's repo, process and `AGENTS.md`; these skills fill only what the repo doesn't define.

## Kora Clients

- The decision maker is usually not technical: talk about business results, never the stack.
- Kora tells the client no when what they ask isn't what they need. Flag it to imlargo instead of building it.
- Built to last: documented, ordered, and able to run without Kora. No black boxes.
- If an existing tool already solves the problem, say so instead of building.
- Scope is closed per phase, in writing. Anything new that comes up is a change request: flag it to imlargo to quote separately, don't build it inside the phase.
