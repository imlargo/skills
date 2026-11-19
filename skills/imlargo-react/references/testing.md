---
name: testing
description: "How imlargo tests React apps: pure layers and reducers without React, shared contract suites for service implementations, hooks and components with Testing Library, and what each layer must cover. Load when writing or fixing tests in a React project."
---

# Testing

Vitest everywhere, tests next to the code. Production projects only (see `imlargo`).

## Rules

- **Pure layers first.** `domain/` and reducers are tested directly, without rendering: every action, every rule, the edge cases (clamping at the bounds, an action for an id that doesn't exist).
- **Contracts.** Two implementations of a service interface (memory and storage, mock and HTTP) run the same contract suite. It's what catches them disagreeing: reusing a deleted id, reporting success for a missing record so a rollback never fires.
- **Components and hooks** through Testing Library: query by role and accessible name, act with `user-event`, assert what the user sees. No snapshot tests of markup, no testing implementation details (state values, hook internals).
- **Interactions are features.** Keyboard commands and gestures are covered, not only the pure maths behind them. If they're untested, say so in the report.
- Test data comes from factories in `src/test/`, not literals copied between tests.
- Mock at the service boundary, not `fetch` or modules deep inside the tree.
