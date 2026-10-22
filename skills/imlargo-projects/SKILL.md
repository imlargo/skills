---
name: imlargo-projects
description: How imlargo starts, shapes and delivers projects, whether personal, Kora client work, open source or libraries. Covers kickoff and intake questions, project study, requirements, the project context file, initialization from templates, backlog and MVP, and delivery and handoff. Use when starting a new project or repo, taking a new client or freelance job, writing requirements or a context file, planning a backlog, or preparing a delivery.
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Projects

> Builds on `imlargo`. Covers what a project is and how it is prepared, not code. GitHub mechanics (issues, PRs, boards, releases) belong to `imlargo-workflow`.

## Principles

- Every project starts from one of imlargo's templates (see [setup](references/setup.md)). Legacy code is rebuilt on a fresh template, not patched in place.
- Every project states whether it's a prototype or production. Prototypes, PoCs and templates skip tests and CI; production doesn't.
- Context docs exist from day one (see [context-file](references/context-file.md)).
- GitHub issues are the backlog, kept current (`imlargo-workflow`).
- Product and business decisions are kept apart from code work and decided by imlargo.

## Lifecycle

<!-- TODO: The phases a project goes through and what must exist before moving to the next one (kickoff -> requirements -> setup -> backlog -> build -> delivery). -->

## Project Types

<!-- TODO: One line per type (personal, Kora client, open source, library); details in references/project-types.md. -->

## Starting a Project

<!-- TODO: The short checklist the agent follows when asked to start a project; details in the kickoff, requirements and setup references. -->

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project Types | Personal, Kora client, open source and library differences | [project-types](references/project-types.md) |
| Kickoff | Intake questions, project study, go/no-go decisions | [kickoff](references/kickoff.md) |
| Requirements | Scope, non-goals, stories, acceptance criteria | [requirements](references/requirements.md) |
| Context File | AGENTS.md vs context.md, writing context docs, resuming work | [context-file](references/context-file.md) |
| Setup | Templates, init checklist, base files, CI, deploy | [setup](references/setup.md) |
| Backlog | Breakdown, MVP cut, prioritization, milestones | [backlog](references/backlog.md) |
| Chat to Backlog | Exported team or support chats into verified GitHub issues | [chat-to-backlog](references/chat-to-backlog.md) |
| Delivery | Demos, deploys, handoff, maintenance, close-out | [delivery](references/delivery.md) |
