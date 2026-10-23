---
name: styling
description: "imlargo's styling rules: shadcn as the design system with custom tokens, what callers may and may not change on a component, colors, arbitrary values, widths, and auditing with @shadcn/lint. Load when writing styles, building layouts, theming, or auditing views for design system consistency."
---

# Styling

## The Design System

- The design system is shadcn, used pure. The project's identity comes from its tokens (colors, radius, fonts, shadows in the theme stylesheet), never from editing or restyling components.
- Coral comes first when it has the component; shadcn, used pure, covers the rest.
- Utility CSS (Tailwind) always. Custom CSS only when it's truly impossible with utilities.
- Own components are consistent with shadcn and with each other, with escape hatches for composition and passing props to children.

## Components Own Their Appearance

A component owns its spacing, typography, color and shape. Callers only place it.

- Callers may pass layout: margin, width, position, flex and grid placement. Space around a component comes from margin on it or `gap` on its parent.
- Appearance changes go through the component's variants, never `class` overrides (`p-4`, `rounded-full`, `bg-*`, `font-*` on a `Button`).
- Some parts are meant to be adjusted by callers, such as a card title's text size or a card content's padding. Allow only that.
- Add a variant to a `ui/` component only when the design explicitly calls for one, never to make one call site work.
- No scale size variants (`size="sm"`, `"lg"`, `"xs"`): keep the base size. Two buttons doing the same thing on different screens look the same, and once a size enters one place it must be remembered everywhere. If something looks too big or small, the layout around it is the problem. `size="icon"` and its variants are allowed: a shape, not a scale. This is stricter than shadcn's defaults on purpose.

## Values

- **No raw colors** (`bg-pink-500`, hex): only theme tokens. Semantic colors (action, information, success, warning, destructive) become classes in one helper.
- **No arbitrary values** (`p-[13px]`, `text-[13px]`): use the theme's scale.
- **No inline styles** or `<style>` blocks for appearance.
- **Static classes only.** Tailwind can't generate `` `bg-${color}` ``; map values to fully written classes in a `Record`.
- **No unknown classes.** Every class must be one Tailwind can generate from the theme.

## Widths

- No fixed widths. Don't split width by hand (`w-3/12`, `w-[320px]`, `style="width: ..."`). Let content and layout size things.
- When long content unbalances a layout, cap only that cell or column with `max-w-*`, cut the text with `truncate` or `line-clamp-*`, and show the full text in a tooltip.

## Auditing with @shadcn/lint

[@shadcn/lint](https://github.com/shadcn-ui/lint) checks the rules above and its errors tell the agent which variant or token to use. It isn't a project dependency: use it temporarily for a migration, a design system audit or a UI pass.

1. Add it as a temporary dev dependency with ESLint and the framework parser (`svelte-eslint-parser` for Svelte; Oxlint can't read Svelte or Vue markup).
2. Write a temporary `eslint.config.mjs` with `no-restyle` (`allow: ["layout"]`), `no-raw-colors`, `no-arbitrary-values`, `no-inline-styles` and `require-static-classes`, turned off inside `components/ui/`.
3. Run it on the scope being worked on, not the whole repo. It's a heavy command: follow the machine's command limits.
4. Fix findings with existing variants and tokens, not new ones.
5. Remove the config and the dependencies, and restore `package.json` and the lockfile. Nothing from the audit gets committed.

## Examples

```svelte
<!-- Avoid: restyling the component, raw color, arbitrary and fixed values -->
<Button class="p-4 rounded-full bg-pink-500" size="sm">Save</Button>
<td class="w-[320px] text-[13px]">{description}</td>

<!-- Prefer: variants for appearance, layout only from the caller -->
<Button variant="destructive" class="mt-4">Delete</Button>
<td class="max-w-sm truncate" title={description}>{description}</td>
```
