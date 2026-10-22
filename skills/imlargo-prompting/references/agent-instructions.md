---
name: agent-instructions
description: "How imlargo writes instructions that agents read every session: AGENTS.md, CLAUDE.md, skills and long reusable prompts. Load when creating or editing any of them."
---

# Agent Instructions

## Rules

- Rules, not explanations. Skip what the model already knows; keep only lines that change its output.
- Compact. Too much text clutters the agent. Cut before adding.
- Explain the why when it isn't obvious, in one clause, so the agent can generalize.
- Specific over vague: name the command, file, pattern or value.
- Imperative voice, in English. No slop (`imlargo-anti-slop`).
- One source of truth. `CLAUDE.md` points to `AGENTS.md`. A rule lives in the most general place where it holds; don't restate it elsewhere.
- Only what imlargo stated. Never invent rules to fill a section; leave a TODO instead.
- Rules apply to humans too. Write them for anyone working in the repo.
- Project-specific facts (paths, names, reference files) go in the repo's `AGENTS.md`; portable preferences go in skills. A template that others clone keeps its `AGENTS.md` self-contained.
- Test important instructions: run the same task with and without them in a subagent and compare.
