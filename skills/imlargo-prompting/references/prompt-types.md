---
name: prompt-types
description: "The recurring prompt types imlargo asks for and what each one must state. Load when the need matches one of them, to make sure no part of imlargo's intent is dropped."
---

# Prompt Types

Each entry lists what the prompt must state on top of the concrete need. Adapt; never paste it as a template.

| Type | Must state |
|------|------------|
| Bug fixes from issues | Which issues (all, an area, a label). Root cause over symptom, group bugs sharing a cause, check recent `main` commits first, regression tests. Warn before widening scope to unreported bugs. Close the issues. |
| Feature | The problem it solves and for whom. Requirements analysis (use cases, edge cases, acceptance criteria) before building, integrated with what exists without duplicating it. Business questions go to imlargo. |
| Backlog features | Which part of the backlog, in what order (simple to complex). Each one shipped and closed before the next. |
| Chat to backlog | Where the exported chats live, which period. Follows `imlargo-projects` (chat-to-backlog). Repeatable: process only what's new. Report language. |
| UI/UX pass | Scope (whole platform or some views). Follows `imlargo-ui-pass`. Quality references if imlargo gave new ones. |
| PR or work review | What to review (a PR, a branch, another agent's work) and against what (the issue, `main`). Findings only, or fix them too. |
| Polish and simplify | Which area. Less code with the same behavior, no regressions, nothing outside the area. |
| Repo tidy-up | What to tidy (docs, scripts, data). Safe phase now; propose a deeper phase and run it only when approved. |
| Migration by phases | From what to what. Fresh project from the template, port piece by piece, delete each legacy part once moved. Phase boundaries where imlargo reviews. |
| Context docs | What the project is, its current focus and what's out of scope. Follows `imlargo-projects` (context-file). Only what imlargo stated. |
| Continue a session | Where the previous context lives (context folder, handoff, issue). Read it first, then continue without redoing work. |
| Writing | Audience, channel (LinkedIn, WhatsApp, blog, client message) and goal. Human and natural, run through the `avoid-ai-writing` skill, no unverified promises. |
| Analysis or roadmap | What to evaluate and which pillars must be covered. Diagnosis and a prioritized, phased plan only; no implementation. Stay in the project's scope. |
