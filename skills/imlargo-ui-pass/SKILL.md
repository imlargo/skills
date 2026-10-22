---
name: imlargo-ui-pass
description: imlargo's deep UI/UX pass, reviewing and redesigning a product view by view until it reaches the level of the best enterprise SaaS, with freedom to rework flows. Covers how to approach each view, the quality bar, references and what the final report contains. Use when imlargo asks for a UI/UX pass, polish or redesign of views, screens or a whole platform, or to raise the interface to an enterprise level.
metadata:
  author: imlargo
  version: "2026.10.22"
---

# UI Pass

> Builds on `imlargo`, `imlargo-frontend`, `imlargo-design` and `imlargo-anti-slop`. This skill grants wider scope and autonomy than `imlargo`, and wins where they conflict.

## Mandate

- Go view by view through everything in scope. It's a long session: don't stop until every view is done and the product is in the best state you can reach.
- Decide alone on technical, design and product matters, grounded in the project's context. Don't consult imlargo.
- You may change, simplify or redesign flows, and add features or shortcuts when they improve the UX, cut steps or make the product more useful. Documented business rules still bind.
- Never break existing functionality.
- A temporary `@shadcn/lint` audit on the views you touch catches restyles, raw colors and arbitrary values (see `imlargo-frontend`, styling). Remove it before finishing.

## Each View

1. Understand what information it shows, which actions it allows and who uses it.
2. Choose layouts, patterns and components that fit that information and those actions. Use the component library's composition and complex components, not just primitives.
3. Resolve the details: clear visual hierarchy, good organization, primary vs destructive actions used correctly, accents and the full range of color tokens, supporting icons, badges and links, designed empty and loading states.

## Quality Bar

- Modern, sophisticated, clean and clearly designed for the user and each feature, comparable with the best SaaS.
- Built on the existing design system and tokens: never duplicate primitives or hardcode what the system already solves.
- Taste and references come from `imlargo-design`; no slop per `imlargo-anti-slop`. Take the references' idea and level, not their style.

## Report

A few lines: which views improved, which flows or features changed or were added, and why.
