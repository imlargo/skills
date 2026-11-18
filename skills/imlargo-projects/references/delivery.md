---
name: delivery
description: "How phases and projects are delivered: per-phase shipping, infrastructure ownership, the handoff and the evolve phase. Load when preparing a delivery, a handoff or the end of a project phase."
---

# Delivery

## Rules

- Deliver in small, visible increments: working software in production, not a demo or a progress report.
- A phase is delivered when it runs in production, is verified, has its handoff, and whoever receives it knows how to use it.
- A system that needs someone watching it isn't finished: it must run unsupervised.
- The handoff lets someone operate and continue the project without imlargo: what was built, how to run and operate it, environment and accounts, decisions (ADRs), known limits and what's next (see [context-file](context-file.md)).
- Close the phase on GitHub: milestone closed, issues closed, release if versioned.
- After delivery the project evolves: new features and maintenance go through the same backlog.
