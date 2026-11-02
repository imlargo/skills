---
name: interview
description: "How to interview imlargo about a plan, decision, spec or skill until reaching a shared understanding: interactive multiple-choice questions in rounds, facts looked up by the agent, decisions left to imlargo, nothing acted on until confirmed. Load when imlargo asks to be interviewed or asked questions, to plan or design something together, or when a task has several open decisions only imlargo can make."
---

# Interview

Map the topic as a decision tree: each decision branches into the ones that hang off it. Work it in rounds until nothing is silently assumed.

## Asking

- Use the interactive question tool (`AskUserQuestion` in Claude Code; load it if it's deferred), never questions in plain text. Without the tool, number the questions, list the options and mark the recommended one.
- 2-4 concrete options per question, each with a one-line trade-off. Recommended option first, marked `(Recommended)`. Don't add an "Other" option; the tool adds it.
- Short headers. Multi-select only when the options aren't mutually exclusive.
- Word each question so the recommended option is the natural yes.

## Rounds

- The frontier is every decision whose prerequisites are settled. Ask the whole frontier in one round (up to the tool's limit, 4 in Claude Code), most blocking first, then wait.
- A question that depends on another still open goes to a later round.
- Each round's answers reshape the tree. Free-form answers and notes are new input: they can add or remove branches.

## Facts vs Decisions

- Facts are the agent's job: look them up in the code, docs, repos and history, or send a subagent. Never ask imlargo for something you can find.
- A lookup in progress only blocks the questions downstream of it; ask the rest now.
- Decisions are imlargo's: put each one to them and wait.

## Done

When the frontier is empty, summarize the settled decisions in a short list and don't act on them until imlargo confirms the shared understanding.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-query/SKILL.md (MIT)
- https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md (MIT)
-->
