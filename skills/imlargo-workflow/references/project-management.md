---
name: project-management
description: "How imlargo creates and works with a GitHub Project: when to create one, fields, statuses, views, automations, keeping items current and the gh commands. Load when asked to create a project, and whenever working issues or PRs in a repo that has a project."
---

# Project Management

- Create a GitHub Project only when imlargo asks for one. Without a project, issues, labels and PRs are enough.
- Once a repo has a project, work with it always: every new issue and PR goes in it, and its status is kept current. A stale board is worse than none.

## Setup

Follow GitHub's [best practices for Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects):

- **Context.** Fill the short description and the README: purpose, what each view is for, links.
- **Status** (single select):

  | Status | Meaning |
  |--------|---------|
  | `Backlog` | Captured, not ready to start |
  | `Ready` | Clear enough to start: scope and acceptance criteria written |
  | `In progress` | Someone is working on it |
  | `In review` | A PR is open for it |
  | `Done` | Merged and the issue is closed |

- **Fields.** `Priority` (single select `P0`-`P3`, same scale as issues) and `Size` (single select `XS`, `S`, `M`, `L`, `XL`). Add `Iteration` only when the work is planned in cycles and `Target date` only when there is a real deadline. Don't mirror labels, milestones or assignees in custom fields: one value, one place.
- **Views.**
  - `Board`: grouped by `Status`, with a column limit on `In progress`.
  - `Backlog`: table of open items sorted by `Priority`.
  - `Roadmap`: only when there are iterations or target dates.
- **Workflows.** Turn on the built-ins:
  - Auto-add issues and PRs from the repository.
  - Item added sets `Backlog`.
  - Item closed and pull request merged set `Done`.
  - Auto-archive `Done` items after two weeks.
- **Linking.** Link the project to its repository.

## Working With It

- Starting an issue: move it to `In progress` and assign it.
- Opening its PR: move it to `In review`.
- Merging and closing: it ends in `Done` (the workflow does it; check it did).
- Set `Priority` and `Size` when creating an issue. Break large items into sub-issues when the parts can be closed independently, and mark blocking relationships with issue dependencies.
- Post a project status update (On track / At risk / Off track, with a short note) when the state of the work changes.

## gh Commands

The `project` scope is required once: `gh auth refresh -s project`.

```bash
gh project list --owner <owner>
gh project field-list <number> --owner <owner> --format json   # field and option ids
gh project item-add <number> --owner <owner> --url <issue-or-pr-url>
gh project item-edit --project-id <project-id> --id <item-id> \
  --field-id <status-field-id> --single-select-option-id <in-progress-option-id>
```
