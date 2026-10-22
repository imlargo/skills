---
name: delivery
description: "How phases and projects are delivered: per-phase shipping, infrastructure ownership, the handoff and the evolve phase. Load when preparing a delivery, a client handoff or the end of a project phase."
---

# Delivery

## Rules

- Deliver per phase, visibly. No surprises at the end.
- Who owns the infrastructure (client accounts or imlargo's) is decided per client in the Define phase and recorded in `context.md`. If it isn't recorded, ask.
- A phase is delivered when it runs in production, is verified, and has its handoff.
- The handoff lets someone operate and continue the project without imlargo: what was built, how to run and operate it, environment and accounts, decisions (ADRs), known limits and what's next (see [context-file](context-file.md)).
- Close the phase on GitHub: milestone closed, issues closed, release if versioned.
- After delivery the project evolves: new features and maintenance go through the same backlog.
