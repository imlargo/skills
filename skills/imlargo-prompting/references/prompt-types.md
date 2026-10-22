---
name: prompt-types
description: "The recurring prompt types imlargo asks for and what each one must state. Load when the need matches one of them, to make sure no part of imlargo's intent is dropped."
---

# Prompt Types

The skills already hold how each task runs, so a prompt names the task type or skill and adds only what's specific to this need. Each row lists what the prompt must still state. Adapt; never paste it as a template.

| Type | Must state |
|------|------------|
| General task | The task, its business context, and anything that changes the result. |
| Feature | The feature, the problem it solves, for whom, and any business context, docs or links. |
| Bugs from issues | Which issues (all, an area, a label) and the order if it isn't "critical first, then quick ones". Whether to deploy (the default is not to). |
| Backlog features | Which part of the backlog. The final list of pending issues with what each needs. |
| Chat to backlog | Where the chats live and which period. Follows `imlargo-projects` (chat-to-backlog). Repeatable: process only what's new. |
| Chat to implementation | Same, plus implementing it all in a long session. Which period, at least two weeks. |
| UI/UX pass | Scope (whole platform or some views). Follows `imlargo-ui-pass`. New quality references, if any. |
| Design system audit | Which components or views. Follows `imlargo-frontend` (styling). Analyze everything first, then implement. |
| PR or work review | What to review (a PR, a branch, another agent's work), against what (the issue, `main`), and whether to fix or only report. |
| Polish and simplify | Which area. Refine, don't expand. |
| Pre-launch review | What the product is and when it launches. Analysis and plan only. |
| Audit and roadmap | What to evaluate and the pillars it must cover, the adopter's day-one view, phases for the roadmap. No implementation. |
| Architecture | The problem in imlargo's words (what doesn't scale, what costs too much) and the goals (scale, idle cost, queue behavior). Ask about volume and budget first. No implementation. |
| Migration | From where to where (folders, template). Start: write the context docs and stop. Continue: read them and go on from the real state. |
| Repo tidy-up | What to tidy. Safe phase now, deeper phase only on approval. |
| Context docs | What was discussed and for which product. Context and technical specs, the what only, so another agent decides the how. |
| Docs, ADRs, handoffs | Which repos and period, and where the docs go. Confirm access to repos and conversations first. ADRs first. |
| Communication assistant | The relationship, the people, the situation and the channel. Sounds like imlargo; run through `avoid-ai-writing`; ask for missing context before drafting. |
| LinkedIn post | The ideas, kept whole. Research the content, a genuine hook that isn't clickbait, none of the usual LinkedIn patterns, run through `avoid-ai-writing`. Ask about intent and context first. |
