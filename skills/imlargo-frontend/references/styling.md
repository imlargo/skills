---
name: styling
description: "imlargo's styling rules: design system consistency, tokens, widths and layout, theming and responsive layout. Load when writing styles, building layouts or auditing views for design system consistency."
---

# Styling

<!-- TODO: Spacing/typography scales, responsive breakpoints, dark mode. -->

## Design System

- Utility CSS (Tailwind) always. Custom CSS only when it's truly impossible with utilities.
- No scale size variants (`size="sm"`, `"lg"`, `"xs"`): keep the base size. Two buttons doing the same thing on different screens must look the same, and once a size enters one place it must be remembered everywhere. If something looks too big or small, the problem is the layout around it. `size="icon"` and its variants are allowed: a shape, not a scale.
- Semantic colors (action, information, success, warning, destructive) become classes in one helper only, never ad hoc in components.
- When a design system component fits (button, input, dialog, select...), use it in its pure form. No extra classes unless strictly necessary; keep its base style.
- No hardcoded utility values (text sizes, tracking, colors, inline styles). Use the system's variants, props and tokens. A class that must be specific is backed by a component in `ui/`.
- Own components are consistent with the design system and with each other, with escape hatches for composition and passing props to children.
- Follow the philosophy of [shadcn-ui/lint](https://github.com/shadcn-ui/lint) without adding it as a dependency.

## Widths

- No fixed widths. Don't split width by hand (`w-3/12`, `w-[320px]`, `style="width: ..."`). Let content and layout size things.
- When long content unbalances a layout, cap only that cell or column with `max-w-*`, cut the text with `truncate` or `line-clamp-*`, and show the full text in a tooltip.

## Examples

```html
<!-- Avoid -->
<td class="w-[320px] text-[13px] tracking-tight">{description}</td>

<!-- Prefer -->
<td class="max-w-sm truncate" title={description}>{description}</td>
```
