---
name: task-types
description: "How imlargo expects analysis, bug fix, feature, research and repo cleanup tasks to run, from first read to final report. Load when starting any of these tasks."
---

# Task Types

## Analysis or Diagnosis

Triggered by "analyze", "diagnose", "don't implement yet".

1. Read the repo, its docs, recent commits and open issues.
2. Deliver findings, causes and a plan. Separate verified facts from inferences.
3. Stop. No code, no commits, no staging. Implementation comes in a later message.

## Bug Fix

1. Reproduce or locate the bug, then find the root cause. Read recent commits on `main` first: it may already be fixed.
2. Group bugs that share a cause and fix the cause once.
3. Add validation and error handling where the bug got through, plus a regression test.
4. Related bugs that weren't reported: tell imlargo before widening the scope.
5. Finish the git loop per `imlargo-workflow` (merge, close the issue).

## Feature

1. Analyze the requirement: problem, use cases, edge cases, acceptance criteria. Ask about business ambiguity before building.
2. Integrate with what exists. Don't contradict or duplicate existing flows, components or rules.
3. Implement end to end, including the real consumer (the UI that calls the endpoint, the page that renders the component).
4. Verify it works, then report.

## Research

- Compare real options pragmatically: the few that fit, with trade-offs. No hype.
- Verify claims in current docs or sources before stating them.
- When imlargo points to a reference repo or product, take the idea and the quality bar, not its style or code.

## Repo Cleanup

- Do the safe, obvious phase. Propose a deeper second phase and run it only when approved.
- Never delete what has unmerged work or might still be used. Check references first.
