---
name: components
description: "imlargo's conventions for .svelte components: where they live, props, bindables, events, snippets, AsyncView and form dialogs. Load when writing or refactoring a Svelte component."
---

# Components

## Where They Live

| Folder | Holds |
|--------|-------|
| `components/ui/` | shadcn primitives, used as they are, never edited |
| `components/coral/` | the vendored kit, updated by copying a new version |
| `components/blocks/` | own generic compositions (AsyncView, EmptyState, PageHeader, Boundary) |
| `components/layout/` | the app shell |
| `features/<slice>/components/` | domain components |

## Rules

- Props typed inline in `$props()`, with a short JSDoc only on non-obvious props.
- Two-way props use `$bindable()` (`open = $bindable()`).
- Handlers are lowercase `on<event>` props (`onsubmit`, `onedit`, `onerror`).
- Customization goes through snippets (`actions`, `icon`, `empty`, `error`); shadcn triggers compose with `{#snippet child({ props })}`.
- Render async data with `AsyncView`: it takes a `Query` or a promise, with `loading`, `empty` and `error` snippets, so streamed `load` data and client queries look the same.
- A form dialog is mounted only while open and reads its initial values once with `untrack`. It validates with the slice schema through the form utils and shadcn `Field`, disables submit while submitting, and closes when `onsubmit` resolves `true`.
- Destructive actions go through the kit's `ConfirmDialog` with `onerror`.
