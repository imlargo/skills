---
name: imlargo-prompting
description: How imlargo turns an everyday need into one ready-to-paste prompt for a coding agent (Claude Code). Covers what the prompt states (goal, relevant context, constraints, priorities, autonomy, expected result), what it leaves to the agent, format, fidelity and the recurring prompt types. Use whenever imlargo asks to write, improve or "metaprompt" a prompt for an agent, or to write AGENTS.md, CLAUDE.md or skill instructions, even when phrased as "hazme un prompt", "pásalo a prompt" or "turn this into a prompt".
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Prompting

> Builds on `imlargo`. When asked for a prompt, the deliverable is the prompt itself: never execute the task it describes. For AGENTS.md, CLAUDE.md and skills, see [agent-instructions](references/agent-instructions.md).

## Output

- One final prompt between quotes, ready to paste. Nothing before or after it: no preamble, no explanation, no alternatives.
- A compact paragraph, not a list of rules or steps. Rejected before: versions with "Rules" or "step by step" headings.
- In English, even when imlargo describes the need in Spanish.
- Ask first only when a fact is truly blocking, in a single question. Otherwise generate.

## Content

- **What, never how.** State the goal, the context that changes the result, constraints, priorities and the expected result. No steps, methods or execution checklists: the receiving agent is senior and decides.
- **Fidelity over brevity.** Keep every idea, nuance and business detail imlargo gave. If something must go, cut words, not intent.
- **Only context that changes the result.** Leave out what the agent can discover in the repo (file paths, line numbers, code snippets).
- **Reusable.** Assume it runs in the current repo. No `<placeholders>` and no assumptions about infrastructure that may not exist (a database, a tool, a service).
- **Task only.** The senior-engineer base (`imlargo`), git flow (`imlargo-workflow`) and machine limits (`~/.claude/CLAUDE.md`) are already loaded. Don't restate them; name a skill when the task should follow it (`imlargo-ui-pass`).
- **Autonomy explicit.** Say whether the agent asks with interactive multiple-choice questions (recommended option first) or decides alone, and whether it may stop before finishing ("don't stop until...").
- **Closing explicit.** Say what the final report must contain (for example: what was done, decisions, what is pending and why), and its language if not English.
- **Phase explicit** when it matters: analysis only ("don't implement yet"), or implementation, or a deeper second phase only on approval.

## Mistakes to Avoid

- Executing the task instead of writing the prompt.
- Summarizing until imlargo's message is lost.
- Dumping all the technical context instead of what matters.
- Turning the need into rules and steps.
- Assuming someone else will do part of the work.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Prompt Types | What each recurring prompt type must state | [prompt-types](references/prompt-types.md) |
| Agent Instructions | Writing AGENTS.md, CLAUDE.md, skills and long reusable prompts | [agent-instructions](references/agent-instructions.md) |
