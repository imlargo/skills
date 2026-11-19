---
name: doc-types
description: "The four documentation types (tutorial, how-to, reference, explanation) and which file in a repo holds which kind of content: README, ARCHITECTURE, CONTRIBUTING, docs site, context docs, changelog, code comments. Load when deciding what kind of doc to write, where content belongs, or restructuring existing docs."
---

# Doc Types

Based on the Diátaxis framework. Each page serves one need.

| Type | Reader's need | Shape | Avoid |
|------|---------------|-------|-------|
| Tutorial | Learn by doing, first time | A guaranteed path from zero to a working result, every step shown | Choices, alternatives, explaining internals |
| How-to | Get a specific task done | Goal in the title, prerequisites, numbered steps, the result | Teaching basics, covering every option |
| Reference | Look something up | Complete, consistent entries in a predictable order, generated from source where possible | Narrative, opinions, tutorials |
| Explanation | Understand why | Prose about design, trade-offs, alternatives, history that still matters | Step-by-step instructions |

## Where Content Lives

| File | Holds | Reader |
|------|-------|--------|
| `README.md` | What it is, why it's different, install, a minimal example, links onward | Someone deciding whether to use it |
| Docs site / `docs/` | Tutorials, how-tos, reference | Users |
| `ARCHITECTURE.md` | How it works inside, boundaries and the decisions behind them | Contributors and future maintainers |
| `CONTRIBUTING.md` | Philosophy, non-goals, conventions, testing, releasing, working agreements | Contributors |
| `AGENTS.md`, `context.md` | Rules for agents and product context (`imlargo`, `imlargo-projects`) | Agents and the team |
| `CHANGELOG.md` | What changed for users, per version (`imlargo-workflow`) | Users upgrading |
| Code comments, JSDoc | Why, constraints, contracts at the point of use | Whoever reads that code |

- A fact lives in one of these and the others link to it.
- Small projects collapse layers: an app's README can hold its layout and next steps; a template's docs can be one page. Don't create files with nothing to say.
- When docs grow past one README, the README stays short and points to the docs site.

<!--
Source references:
- https://diataxis.fr/ (CC-BY-SA 4.0)
-->
