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

Larger projects split the docs instead of growing one file:

- **Context:** what will be built, its purpose, the business, its rules and background.
- **Specs:** definitions, expected features, requirements and every relevant detail discussed.
- **Roadmap:** phases and where the work stands. Used for long or multi-session work such as migrations.

## Decisions and Handoffs

- Record relevant decisions as ADRs: context, decision, alternatives considered, consequences.
- A handoff lets someone take the project over without depending on imlargo: what was built, what decisions were made and why, where things stand, and what's next.
- When a decision isn't clear from the code or the conversations, ask instead of inventing a reason.
- A session handoff for another agent covers where the work stands and what's next, tailored to what the next session will do. It references existing artifacts (specs, ADRs, issues, PRs, commits) by path or URL instead of copying them, names the skills the next agent should load, and contains no secrets or personal data.

## Rules

- Write the what, not the how: needs, goals and constraints, so the agent reading it decides the implementation.
- Compact. Only what imlargo stated; don't add requirements, features or rules imlargo didn't ask for.
- In English.
- One source of truth per fact. When docs and code disagree, the code wins and the doc gets fixed.
- Update the docs in the same change that alters a decision they record.

## Resuming Work

Before continuing a previous session, read the context docs, handoffs, ADRs and prior work in the repo, and check the real state of the code. If the roadmap or context is stale, update it first. Then continue from where the work actually stands, without redoing or contradicting what's built.
