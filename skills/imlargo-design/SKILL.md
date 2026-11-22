---
name: imlargo-design
description: imlargo's visual design taste for interfaces, illustrations and assets. Simple, minimalist, sophisticated and restrained, at the level of the best enterprise SaaS. Covers the design system, preferred UI patterns, typography, color, effects, icons, illustrations, content formatting and quality references. Use whenever designing or styling UI, choosing components, colors, effects or layouts, making illustrations or SVGs, or judging whether something looks good, together with `imlargo-frontend`.
metadata:
  author: imlargo
  version: "2026.11.22"
---

# Design

> Builds on `imlargo`. Implementation rules (tokens, components, widths) live in `imlargo-frontend`. This taste wins over generic design skills (such as `frontend-design`) that push bold or maximal aesthetics.

## Design System

When a project has its own design system and designers, they own the visual language: use its components and tokens as documented, and bring taste through composition, states and details, never by restyling. The rest of this section is imlargo's default.

- shadcn, pure and untouched, is the base. A project's own design system comes from changing its tokens: colors, radius, fonts, shadows. Never from restyling or editing components.
- Good UI is built from the system's components and composition, then raised with UX, details and supporting visual elements (icons, badges, links, empty and loading states).

## Patterns

- A combobox wherever a select would hold a lot of data; a select only for a short fixed set.
- Navigation tabs use the line (underline) variant, left-aligned, never stretched across the full width, and each has its own URL. Tabs that filter or toggle a list stay as pills.
- Detail page or sheet is a deliberate choice. Anything with its own information, actions or history gets a real detail page; a sheet is only for a quick look or a short edit. Never overload a sheet with what belongs on a page.
- Lists that grow get search, filters and sorting. Search really finds things: it matches while typing, word by word, across the fields a user would type. Search, filters and sorting live in the URL, so a reload or a shared link keeps them.
- Primary and destructive actions used correctly.
- The same status reads the same everywhere it appears.
- Settings at SaaS level, with section navigation.
- Page headers summarize with real information organized through visual elements (icons, badges, tone, layout), never a line of facts joined by separators or a row of stat mini-cards. No eyebrow that repeats the route or the section.
- Form errors show on the field that failed, not in toasts. After creating something, take the user to it.
- Promos and banners are dismissible.
- A feature lives once; no view embeds its own copy of something the product already has.

## Brand

- Each product follows its own brand: palette, density and personality come from the product's brand, expressed through tokens.
- When a product has no brand of its own, use imlargo's taste below.
- Data-heavy views (tables, dashboards) stay scannable whatever the brand.

## Taste

- Simple, minimalist, clean, sophisticated. Geometric over ornamental.
- Restraint: fewer effects, used with intent. Think Raycast, not a landing page template.
- Minimalism removes noise, not information. A view never loses its personality, general information or useful actions to look clean.
- Enterprise SaaS level: every view clearly designed for its user and its feature.
- When imlargo shares screenshots or references, match them before improvising.

## Typography

- Hierarchy through size, weight and spacing, not color or effects.
- Geist by default when the brand doesn't set a font.
- Sentence case everywhere. No all-caps labels, headings or buttons; acronyms excepted.

## Color

- Stay faithful to the brand colors and the design system's tokens.
- Color carries meaning: semantic colors (success, warning, destructive) only when the meaning applies, destructive for urgent or dangerous. One accent, used deliberately.
- Neutral surfaces by default; color is the exception that draws the eye.

## Effects

- Subtle and few: soft shadows, low opacity, low line intensity. Pull back before adding more.
- No decorative gradients, glow, glassmorphism or blobs unless the brand calls for them.
- Marketing pages may carry one effect in the hero (React Bits style) in the brand colors, with reduced motion respected. Working views never do.

## Icons and Illustrations

- Icons support content, from one set (Lucide). Never emojis as icons.
- Badges, icons and links help scanning and navigation, but don't overdo them.
- Illustrations are abstract and geometric, minimal, in brand colors, never literal clip-art. Isometric perspective works well.

## Content

- Readable dates: "Aug 17" or "17 de agosto", not `17/08/2026`.
- Real, specific copy. No marketing filler or invented metrics.

## References

Quality bar, not styles to copy: take their level, patterns and practices.

- Product UI: [shadcnblocks](https://www.shadcnblocks.com) and [shadcnblocks admin](https://shadcnblocks-admin.vercel.app), [ReUI](https://reui.io), Tailwind UI / Catalyst, [imlargo/sapiencia](https://github.com/imlargo/sapiencia), Raycast.
- Marketing pages: [Tailark](https://tailark.com), with a hero that catches the eye; [React Bits](https://reactbits.dev) for its effect.
- Docs sites: shadcn/ui docs, Starlight, Next.js and Vercel docs.
