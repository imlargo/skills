---
name: task-types
description: "How imlargo expects each kind of task to run, from first read to final report: analysis, bug fixes, features, backlog work, polish, research, architecture, migration and repo cleanup. Load when starting any of these tasks."
---

# Task Types

## Analysis, Audit or Pre-Launch Review

Triggered by "analyze", "diagnose", "audit", "don't implement yet".

1. Read the repo, its docs, recent commits and open issues. Use MCPs and official docs.
2. Compare against industry standards and references, including other ecosystems.
3. Deliver findings, causes and a prioritized, phased plan. Separate verified facts from inferences. Stay within the project's scope.
4. Stop. No code, no commits, no staging. Implementation comes in a later message.

## Bug Fix

1. Start with critical bugs, then the quick ones.
2. Find the root cause, including whether it starts in the frontend or the backend. Read recent commits on `main` first: it may already be fixed.
3. Group bugs that share a cause and fix the cause once, so it can't come back.
4. Add validation and error handling where the bug got through, plus a regression test.
5. Unreported related bugs or ambiguous ones: ask imlargo, and keep working on the rest meanwhile.
6. Finish the git loop per `imlargo-workflow` and close the issue with a reference to the fix.

## Feature

1. Analyze the requirement: the problem, users and roles, use cases, edge cases, acceptance criteria. Ask about business ambiguity before building.
2. Integrate with what exists. Don't contradict or duplicate existing flows, components or rules.
3. Implement end to end, in every layer it needs: validation, error handling, loading and empty states, tests, and the real consumer (the UI that calls the endpoint).
4. Verify it works, then report.

## Backlog

1. Load the issues, check each against the code and recent commits, and skip what already exists.
2. Go from the simplest and clearest to the complex ones and those needing business validation.
3. Ship and close each one before the next.
4. Report the issues left pending and what decision or validation each needs.

## Polish and Simplify

What exists is what exists: refine it, don't expand it. Hunt patches, accidental complexity, duplication and drift from the project's patterns. Same behavior, less code.

## Research

- Compare real options pragmatically: the few that fit, with trade-offs. No hype.
- Verify claims in current docs or sources before stating them.
- When imlargo points to a reference repo or product, take the idea and the quality bar, not its style or code.

## Architecture

1. Ask first what the design depends on: volume, peaks, costs, budget, stack, providers.
2. Analyze the current system and its real bottlenecks.
3. Compare alternatives with their trade-offs (cost, operational complexity, latency, migration effort) and recommend one without over-engineering.
4. Deliver the design with an incremental migration path. No implementation.

## Migration

1. Document first: context, product specs and a migration roadmap in the context folder (see `imlargo-projects`). Don't migrate until imlargo validates them.
2. Phases: move the legacy code into the new project from the template as it is, then reorganize it with working imports, then migrate it to the template's rules and patterns. Delete each legacy part once it's moved.
3. Each session starts by reading the context folder and checking the real state, and updates the roadmap if it's stale.

## Repo Cleanup

1. Delete what's unused, obsolete or should never have been committed: loose files, abandoned prototypes, temp scripts, generated artifacts. Update `.gitignore` to match.
2. Organize what's needed but messy (docs, data, context) into a clear folder structure, and update every reference to the moved paths.
3. Ask before deleting docs or context data. Before deleting code, check references and imports.
4. Report what was deleted, what moved and where. Propose a deeper second phase and run it only when approved.
