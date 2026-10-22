---
name: chat-to-backlog
description: "Turning exported team or support conversations (chats, notes, images) into a verified, deduplicated GitHub backlog, and re-syncing it when the chat is updated. Load when asked to process a chat, local context folder or support thread into issues."
---

# Chat to Backlog

Turn the conversations in the local context folder (`local-context/` or similar) into a real, verified and actionable backlog on GitHub. Issue format, labels and priority follow `imlargo-workflow`.

## Rules

- Read all of it: chats, notes and images. Skip audio unless asked.
- Identify everything actionable: bugs, support cases, features, product decisions, incidents and tech debt.
- Check each item against reality before writing it: the code, recent commits and PRs, what's deployed, existing issues (open and closed) and, when there's access, production data read-only. No duplicates, no issues for things already fixed.
- Each issue is investigated and ready for any developer or agent to take: the problem, evidence (reference to the chat or file), current vs expected behavior, root cause or a clear hypothesis, the code involved, a proposed solution, acceptance criteria, and priority by real impact.
- Separate verified facts from inferences.
- Close items already fixed and deployed, with their reference. Document what was fixed without an issue.
- If the project has a GitHub Project, add and prioritize the issues there.
- No secrets, credentials or customer personal data in GitHub. Nothing changes in production or `main` without approval.
- Ambiguous items or business decisions: ask imlargo instead of creating the issue.
- It must be repeatable. When imlargo says the chat was updated, process only what's new and sync everything again.

## Chat to Implementation

When imlargo asks to implement the chat's feedback instead of only filing it: cover at least the last two weeks (more if the context needs it), including meetings, feedback, prior analyses and imlargo's loose bullet notes. Build a prioritized backlog and roadmap from it, then work it end to end. Each feature gets a requirements analysis first (see `imlargo` task types). Ambiguous or contradictory items wait for imlargo.

## Report

Short: issues created, closed and commented on, key findings, and what imlargo needs to clarify.
