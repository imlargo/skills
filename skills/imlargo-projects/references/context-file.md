---
name: context-file
description: "The project context docs every repo carries (AGENTS.md for rules, context.md for specs and context), how they are written and how agents use them to resume work. Load when creating a project, writing or updating context docs, onboarding an agent or continuing a previous session."
---

# Context File

## Files

| File | Holds |
|------|-------|
| `AGENTS.md` | Rules and instructions for agents and humans. |
| `CLAUDE.md` | Only a pointer to `AGENTS.md` (`@AGENTS.md`). Never a separate rulebook. |
| `context.md` | Specs and product context: what the project is, its current focus, what's out of scope. |

Larger projects split context, specs and roadmap into separate docs instead of one growing file.

## Rules

- Write the what, not the how: needs, goals and constraints, so the agent reading it decides the implementation.
- Compact. Only what imlargo stated; don't add requirements, features or rules imlargo didn't ask for.
- In English.
- One source of truth per fact. When docs and code disagree, the code wins and the doc gets fixed.
- Update the docs in the same change that alters a decision they record.

## Resuming Work

Before continuing a previous session, read the context docs, handoffs, ADRs and prior work in the repo, then continue without redoing or contradicting what's already built.
