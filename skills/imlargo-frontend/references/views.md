---
name: views
description: "The checklist a view must pass before it counts as done: empty states, async feedback, permissions, self-actions, visibility after writes and real consumers. Load before calling a view or screen done, or when reviewing one."
---

# Views

A view isn't done when the happy path works with sample data. Walk the full journey of every role that uses it, not only the one with the most permissions.

## Checklist

- **Honest empty states.** "Nothing exists yet" and "nothing matches the filter" are different and are said differently. For a filter, say which one and offer to clear it.
- **Async actions show progress.** A spinner or skeleton, never a disabled button alone: disabled says "not now", not "in progress".
- **The UI hides what the role can't do**, checked with the same permission source the server uses. Offering a control the backend will refuse is a UX bug even when it isn't a security one.
- **Self-actions and non-obvious effects warn first.** Can users remove their own access, or the permission that would let them undo it? Does an action change something its field name doesn't say? Warn before it happens, never silently.
- **A record just created or edited stays visible.** If active filters would hide it, adjust them or say so, or the action looks like it failed.
- **Everything on the server has a real consumer in the UI.** An endpoint nothing calls doesn't fulfill its requirement.
