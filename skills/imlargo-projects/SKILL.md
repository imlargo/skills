---
name: imlargo-projects
description: How imlargo starts, shapes and delivers projects, whether own products, libraries, prototypes or work inside a team. Covers kickoff and the Define phase, specs, context docs and handoffs, templates and repo setup, backlog and MVP, turning team or support chats into a verified backlog, and delivery. Use when starting a new project or repo, writing specs, context docs, ADRs or handoffs, planning or syncing a backlog, converting chats or support threads into issues, or preparing a delivery.
metadata:
  author: imlargo
  version: "2026.11.18"
---

# Projects

> Builds on `imlargo`. Covers what a project is and how it is prepared, not code. GitHub mechanics (issues, PRs, boards, releases) belong to `imlargo-workflow`.

## Principles

- A new project imlargo owns starts from one of imlargo's templates (see [setup](references/setup.md)), and legacy code imlargo owns is rebuilt on a fresh template, not patched in place. Inside a team's repo, its structure and process win.
- Every project states whether it's a prototype or production. Prototypes, PoCs and templates skip tests and CI; production doesn't.
- Context docs exist from day one (see [context-file](references/context-file.md)).
- GitHub issues are the backlog, kept current (`imlargo-workflow`).
- Product and business decisions are kept apart from code work and made by imlargo or the product owner, never by the agent.

## Lifecycle

1. **Define:** kickoff interview, then the repo docs (context, specs, roadmap). Nothing is built before this exists. → [kickoff](references/kickoff.md), [requirements](references/requirements.md)
2. **Set up:** repo from the template, docs committed, backlog on GitHub. → [setup](references/setup.md), [backlog](references/backlog.md)
3. **Build:** in small increments, each one shipped and visible before the next.
4. **Deliver and evolve:** a handoff at each milestone; the software keeps growing afterwards. → [delivery](references/delivery.md)

## Project Types

| Type | In short |
|------|----------|
| Own product | imlargo's products. imlargo decides scope and pace; production or prototype, stated up front. |
| Library / open source | Public API, versioning, changelog, docs, npm publishing. |
| Prototype / PoC | Validates an idea fast on the template. No tests or CI; still clean code. |
| Team or company work | Follows that team's repo, process and `AGENTS.md`; this skill fills only what the repo doesn't define. |

Details in [project-types](references/project-types.md).

## Starting a Project

1. Ask which type it is and whether it's a prototype or production.
2. Run the kickoff interview.
3. Write the Define deliverables and get imlargo's approval.
4. Create the repo from the template and commit the docs.
5. Turn the roadmap into the GitHub backlog and project board.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project Types | Own product, library and prototype differences | [project-types](references/project-types.md) |
| Kickoff | Intake questions, project study, go/no-go decisions | [kickoff](references/kickoff.md) |
| Requirements | The specs format: requirements, business rules, acceptance criteria, non-goals | [requirements](references/requirements.md) |
| Context File | AGENTS.md vs context.md, writing context docs, resuming work | [context-file](references/context-file.md) |
| Setup | Templates, init checklist, base files, CI, deploy | [setup](references/setup.md) |
| Backlog | Breakdown, MVP cut, prioritization, milestones | [backlog](references/backlog.md) |
| Chat to Backlog | Exported team or support chats into verified GitHub issues | [chat-to-backlog](references/chat-to-backlog.md) |
| Delivery | Demos, deploys, handoff, maintenance, close-out | [delivery](references/delivery.md) |
