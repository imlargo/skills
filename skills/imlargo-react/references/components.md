---
name: components
description: "imlargo's conventions for React components: props, composition, children and render props, keys, conditional classes with cn(), and accessibility patterns for interactive widgets. Load when writing or refactoring a React component."
---

# Components

## Props

- `interface <Component>Props` declared above the component. Destructure in the signature.
- Callbacks are `on<Event>` and pass the domain value they're about (`onDelete(id)`), not the DOM event, unless the caller needs it.
- Optional props have a sensible default in the destructuring. A boolean prop that changes the whole component's shape means it's two components.
- Extend a native element's props (`ComponentProps<'button'>`) when the component wraps one, and spread the rest onto it.
- A short comment on a prop only when its meaning isn't obvious from the name ("set while this note is on its way to the trash").

## Composition

- Customization goes through `children` and named slot props (`actions`, `empty`, `icon`), not a growing list of config props.
- shadcn primitives compose through `asChild` or the primitive's own API. Never edit files in `components/ui/`.
- A component past one responsibility gets split: subcomponents for markup, a hook for logic.
- Constants a component needs (step sizes, timeouts) are named at module level, next to it.

## Rendering

- Keys are stable domain ids. Items created optimistically get a temporary id (negative numbers) that's replaced when the server answers, so the key and the DOM node survive.
- Conditional rendering with `cond && <X />` only when `cond` is a boolean. `count && ...` renders `0`.
- Conditional classes go through `cn()` (shadcn's `clsx` plus `tailwind-merge`), never string concatenation or template literals. Class values come from complete `Record` maps (see `imlargo-frontend` styling).
- Inline `style` only for values computed per frame (position, scale during a drag). Everything else is a class.

## Accessibility

On top of `imlargo-frontend`:

- Interactive custom widgets are fully keyboard-operable, with one tab stop per item. Inner controls get `tabIndex={-1}` until the item is entered (Enter to edit, Escape to leave).
- Give composite items a `role`, an `aria-label` from their content, and `aria-describedby` pointing to shared instructions.
- Announce outcomes once: successes in a polite live region, failures with `role="alert"`, never both for the same event.
- Focus moves on purpose: into a field when editing starts, back to the item when it ends.
- Selection and focus are shown separately when they mean different things; `focus-visible` alone can't show both.

## Examples

```tsx
// Avoid: string-built classes, a raw color, an index key
<div className={`card ${active ? 'ring-2' : ''} bg-${color}-200`}>
  {notes.map((note, i) => <Note key={i} note={note} />)}
</div>

// Prefer: cn(), a complete class map, stable ids
<div className={cn('rounded-md border', active && 'ring-2 ring-ring', COLOR_CLASSES[note.color])}>
  {notes.map((note) => <Note key={note.id} note={note} />)}
</div>
```
