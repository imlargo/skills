---
name: imlargo-ui-pass
description: imlargo's deep UI/UX pass, an aggressive redesign of a product view by view until it reaches the level of the best enterprise SaaS, with full freedom to change layouts, flows, navigation and information architecture. Covers the mandate and autonomy, what an aggressive redesign means, how to approach each view, navigation and the quality bar. Use when imlargo asks for a UI/UX pass, polish, redesign or revamp of views, screens, a sidebar or a whole platform, or to raise the interface to an enterprise level, even when phrased as "mejora la UI", "rediseña esta vista" or "esto se ve mal".
metadata:
  author: imlargo
  version: "2026.11.22"
---

# UI Pass

> Builds on `imlargo`, `imlargo-frontend`, `imlargo-design` and `imlargo-anti-slop`. This skill grants wider scope and autonomy than `imlargo`, and wins where they conflict. In a project whose design or product decisions belong to someone else, the wider autonomy doesn't apply: the pass produces proposals for them, and only agreed changes are built, within the project's design system.

## Mandate

- Go view by view through everything in scope. It's a long session: don't stop until every view is done and the product is in the best state you can reach.
- Decide alone on technical, design and product matters, grounded in the project's context. Don't consult imlargo.
- Full freedom to change anything: layouts, components, flows, navigation, information architecture and copy. Simplify, redesign or remove what doesn't serve the user, and add features or shortcuts when they improve the UX, cut steps or make the product more useful. Only documented business rules and existing functionality bind.
- Never break existing functionality.

## Redesign, Don't Retouch

A UI pass is always an aggressive redesign, never a polish. Rethink each view from scratch and change its approach to give the best possible UX and flow; the current design is not a constraint. A pass that only retouches containers and styles while the experience stays the same is a failure.

## Each View

1. Study the repo first: architecture, conventions, the design system and its tokens, the components available, the docs and the business rules behind the view.
2. Understand what information it shows, which actions it allows, who uses it and the question they arrive with ("what needs me?", "is it done?"). Organize the view around that question; a list of pending work, for example, splits into views by who has to act.
3. Look at the real shape of the data, read-only: volumes, long and missing values, edge cases. Design for that, not for sample data.
4. Rethink its approach, flow and information architecture, then choose layouts, patterns and components that fit. Use the component library's composition and complex components, not just primitives.
5. Resolve the details:
   - a clear visual hierarchy, with primary and destructive actions used correctly;
   - the right layout for the information, so it reads organized at a glance;
   - real information and useful actions, without losing personality or context;
   - accents and the full range of tone tokens, with supporting icons, badges and links;
   - designed loading, empty and error states;
   - the patterns in `imlargo-design`;
   - fully featured, per `imlargo-frontend`: everything the user needs from the view gets built.
6. Remove what's duplicated across views: a feature embedded twice, navigation that repeats the sidebar.

## Navigation

- A sidebar is grouped and ordered by use: the links everyone uses daily come first, every group has a label, and tools and secondary modules come after the core.
- Pages that are facets of the same area merge into one page with tabs instead of separate links.
- When a page merges or moves, its old URL redirects to the new one, so no link breaks.

## Quality Bar

- Modern, sophisticated, clean and clearly designed for the user and each feature.
- Tailark, shadcnblocks (including shadcnblocks admin) and ReUI: clean, sophisticated, minimalist, never saturated, never AI slop. Take their level, patterns and practices, not their styling.
- Built on the existing design system and tokens: components used pure, never duplicated or restyled. A temporary `@shadcn/lint` audit on the views you touch catches restyles, raw colors and arbitrary values (see `imlargo-frontend`, styling). Remove it before finishing.
- Taste comes from `imlargo-design`; no slop per `imlargo-anti-slop`.
