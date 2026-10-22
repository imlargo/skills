---
name: project-management
description: "Creating and working with a GitHub Project: statuses, fields, views, automations and keeping items current. Load when asked to create a project, and whenever working issues or PRs in a repo that has one."
---

# Project Management

Create a project only when imlargo asks. Once a repo has one, use it always: every issue and PR goes in, and status stays current. A stale board is worse than none.

## Setup

Follow GitHub's [best practices for Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects), with these choices:

- **Status:** `Backlog` → `Ready` (scope and acceptance criteria written) → `In progress` → `In review` (PR open) → `Done` (merged, issue closed).
- **Fields:** `Priority` (`P0`-`P3`, same scale as issues) and `Size` (`XS`-`XL`). `Iteration` and `Target date` only when there are cycles or real deadlines. Never mirror labels, milestones or assignees.
- **Views:** board by status with a limit on `In progress`; backlog table sorted by priority; roadmap only with dates.
- **Built-in workflows:** auto-add from the repo, added → `Backlog`, closed or merged → `Done`, auto-archive done items.
- Fill the README and link the project to the repo.

## Working With It

- Starting an issue → `In progress` and assign it. Opening its PR → `In review`. Closing → check it reached `Done`.
- New issues get `Priority` and `Size`. Use sub-issues when parts close independently.
- `gh project` needs the scope once: `gh auth refresh -s project`.
