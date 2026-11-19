---
name: hooks-and-effects
description: "imlargo's rules for React state and hooks: custom hooks, reducers, effects and their cleanup, refs, useEffectEvent, memoization and the React Compiler, and context. Load when adding state, writing a custom hook or effect, fixing re-renders, stale closures or exhaustive-deps warnings."
---

# Hooks and Effects

## State

- Start local (`useState` in the component). Lift it only as far as the nearest component that needs it.
- Several related transitions, or updates that depend on the previous state, go in a `useReducer`. The reducer is pure, lives in `state/`, and returns the same reference when nothing changed so React can skip the render.
- Never store what can be derived. Filtered lists, totals, `isValid` and labels are computed during render.
- Updates that depend on the current value use the updater form (`setCount((c) => c + 1)`).

## Custom Hooks

- A hook exists to own one concern: data and persistence, pointer gestures, a measured element. Split by what each one needs to know: the gestures hook knows nothing about persistence.
- Something two hooks both need (the board's bounds) is its own hook, used by both.
- One composing hook owns the UI state of a screen and returns what the component renders. Components stay thin.
- A hook returns an object with named fields, not a tuple, once it returns more than two things.

## Effects

Use one only to sync with something outside React. Before writing it, check react.dev's "You Might Not Need an Effect" cases: derived values, resetting state on prop change, handling a user event, chaining updates and notifying a parent never need one.

- Every effect cleans up what it starts: observers disconnect, timers clear, listeners unsubscribe, requests abort or set a `cancelled` flag so a late response can't land.
- `StrictMode` runs effects twice in development. An effect that breaks under that is broken in production too, on remount.
- Dependencies are complete. To read the latest props or state inside an effect without re-running it, move that logic into a `useEffectEvent`, never drop the dependency or disable the rule.
- Code that responds to a user action runs in the event handler, not in an effect watching state.

## Refs

- A ref holds a value nothing renders from: a DOM node, a timer id, a gesture in progress that changes on every `pointermove`.
- Don't read or write `ref.current` during render, except for lazy initialization.
- To give a callback the latest list without changing its identity on every render, read the list through a ref. Commit what the gesture computed, not what state says after it rendered.
- In React 19, `ref` is a regular prop. No `forwardRef` in new code.

## Memoization

- If the repo enables the React Compiler, write plain code. Manual `useMemo`, `useCallback` and `memo` are noise the compiler already does.
- Without it, memoize where it's needed: a list item that re-renders on every frame (`memo`), a callback whose identity is an effect or child dependency (`useCallback`), a calculation measured to be slow (`useMemo`). Not by default.
- Never memoize to fix a bug. If it changes behavior, the bug is a dependency or an effect.

## Context

- Context is for values many components need and that change rarely: session, theme, a service instance. Not a replacement for a state library for frequently changing data.
- Every context has a hook (`useSession()`) that throws a clear error outside its provider. The context object itself isn't exported.
- Split contexts that change at different rates, so a frequent update doesn't re-render everything.

## Examples

```tsx
// Avoid: state derived in an effect
const [visible, setVisible] = useState<Note[]>([])
useEffect(() => setVisible(notes.filter((n) => n.color === filter)), [notes, filter])

// Prefer: derived during render
const visible = notes.filter((n) => n.color === filter)

// Prefer: a cancellable load, so a response from the old source can't land after the new one
useEffect(() => {
  let cancelled = false
  void service.getNotes()
    .then((notes) => { if (!cancelled) dispatch({ type: 'load', notes }) })
    .catch(() => { if (!cancelled) fail('Could not load the notes') })
  return () => { cancelled = true }
}, [service])
```
