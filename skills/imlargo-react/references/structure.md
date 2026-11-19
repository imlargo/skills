---
name: structure
description: "How imlargo lays out a React app: the domain, services, state, hooks and components layers, what each may import, and file naming. Load when scaffolding a React project, adding a feature, or deciding where new React code goes."
---

# Structure

In a team repo, its layout wins. For a new app:

```
src/
  domain/      model, constants and rules as pure functions; no React, no I/O
  services/    I/O behind interfaces (API, storage) and the factory that picks an implementation
  state/       reducers and their action unions; pure, no React
  hooks/       custom hooks, one per concern, plus the hook that composes them
  components/  rendering; ui/ holds the shadcn primitives, never edited
  lib/         small framework-free helpers
  test/        shared factories and fixtures
```

A larger app groups by feature (`features/<slice>/` with its own `components/`, `hooks/`, `services/`, `schemas.ts`) and keeps the same rules inside each slice.

## Import Rules

- `domain/` and `state/` import nothing from React, services or components. They're the part that's tested without a DOM.
- `services/` imports `domain/` only. A service depends on an interface (`NoteRepository`), so swapping the backend is one more class and nothing above it changes.
- Hooks call services; components call hooks. A component never imports a service or calls `fetch`.
- Components don't hold business rules. A calculation in a component (clamping, totals, permissions) moves to `domain/`.

## Naming

- Components and their files are `PascalCase` (`StickyNote.tsx`). Hooks are `useCamelCase` (`useBoardGestures.ts`). Everything else follows the repo; kebab-case for new non-component files.
- One component per file, except small private pieces used only by it.
- Tests sit next to the file they cover (`notesReducer.test.ts`).
