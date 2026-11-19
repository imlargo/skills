---
name: architecture
description: "How imlargo writes ARCHITECTURE.md and CONTRIBUTING.md: explaining structure, boundaries and the decisions behind them, pipelines and data models, errors, and contributor philosophy, non-goals, conventions and working agreements. Load when writing or updating an architecture, design or contributing doc."
---

# Architecture and Contributing

## ARCHITECTURE.md

Explains how the thing works inside and why it's shaped that way, for someone about to change it.

1. **One line** on what the doc covers ("How `svmd` turns markdown into Svelte 5 component source, and how the repository is organized around that.").
2. **The parts:** a table of packages or layers with their responsibility and what each depends on. Then the rule that draws the boundaries ("Package boundaries follow dependency boundaries, not layers") and what never points where.
3. **The flow:** the pipeline or request path in order, one section per stage that has a decision worth explaining.
4. **The data model**, when there is one central structure.
5. **Errors:** how they're produced, where they're caught, what the user sees.
6. **Cross-cutting decisions:** concurrency, optimistic updates, accessibility, persistence. Each as what was chosen, why, and what it costs.

## Writing It

- Explain decisions in prose, not bullets: a decision needs its "because" and its "so". "Every write is optimistic. The screen updates first, the repository after, and a failure puts the previous value back."
- Name the exceptions to your own rules and why ("Text is the exception: reverting what someone typed because a save failed is worse than a stale disk").
- Say what each part does *not* know about. Boundaries are easier to keep when they're written as ignorance ("`useBoardGestures` knows nothing about persistence").
- Say what's uncovered or next. A doc that admits the gap ("the gesture wiring isn't tested; that's the next thing to write") is trusted on everything else.
- Reference files and symbols by path, so a reader can jump there. Don't paste code that will drift; a short snippet only when the shape is the point.
- Diagrams only when a flow has branches or several actors that prose can't hold. Mermaid in the markdown, so it's versioned with the code.
- Update it in the same PR as a structural change.

## CONTRIBUTING.md

1. **Philosophy:** what the project optimizes for, in a few sentences.
2. **Non-goals:** what it won't do, so nobody spends a week on a PR that gets closed.
3. **Setup and the check gate:** the commands, exactly as CI runs them.
4. **Code conventions** the linter can't enforce, each with its reason.
5. **Testing:** where tests go, how to run one, what each kind of test is for.
6. **Releasing and changelog** rules (see `imlargo-workflow`).
7. **Working agreements:** short rules with their reason ("Before adding an option, ask: would most users need this? Every option is a combination the test matrix has to cover forever.").

Rules in a CONTRIBUTING are pairs of rule and reason. A rule without its reason gets broken the first time it's inconvenient.
