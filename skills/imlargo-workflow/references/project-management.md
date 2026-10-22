---
name: project-management
description: "How imlargo sets up and maintains a GitHub Project when one is requested: README, fields, views, built-in workflows, sub-issues and status updates. Load only when imlargo asks to create, configure or update a GitHub Project."
---

# Project Management

Use GitHub Projects only when the work needs it and imlargo asks for it. Without a project, issues, labels and PRs are enough. Never create a project on your own initiative.

## Setup

When a project is requested, build it following GitHub's [best practices for Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects):

- **Context.** Fill the short description and the README: purpose, what each view is for, links and contacts.
- **Fields.** Built-in `Status`, plus custom fields only where they add information that labels, milestones or assignees don't already hold:
  - `Priority` (single select)
  - `Size` (number or single select)
  - `Iteration` when the work is planned in cycles
  - `Target date` (date) for deadlines
- **Views.** A board grouped by `Status` for day-to-day work, a table for the backlog sorted by priority, and a roadmap when there are dates or iterations. Set column limits on the board's in-progress column.
- **Workflows.** Turn on the built-in automations: auto-add issues and PRs from the repository, set `Done` when an item is closed or merged, and auto-archive done items.
- **Linking.** Link the project to its repository.

<!-- TODO: Status columns and what moves an item between them, if they differ from GitHub's default Todo / In Progress / Done. -->

## Maintenance

- Break large items into sub-issues instead of long checklists when parts can be worked or closed independently; mark blocking relationships with issue dependencies.
- Keep a single source of truth: a value lives in one field. Do not mirror labels or milestones in custom fields.
- Post a project status update (On track / At risk / Off track, with a short note) when the state of the work changes.
