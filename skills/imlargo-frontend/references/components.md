---
name: components
description: "imlargo's component design rules: composition, extraction, native elements and labels for closed value sets. Load when creating or refactoring UI components."
---

# Components

## Rules

- Composition over inheritance: small pieces that compose. Inheritance only where it deliberately shares infrastructure (a base service).
- Keep components focused. When one grows in responsibilities, extract subcomponents or hooks. Reusable logic lives in hooks or utils, never duplicated across components.
- Use the framework before custom code: navigation hooks, server loading, form handling and the current URL are already solved.
- Never edit design system primitives or vendored kits. Compose around them with wrappers, props and composition; update a kit by copying in a new version.
- No native `confirm()`, `alert()` or `prompt()`. Use the confirm dialog component.
- Every native `<button>` has a `type`.
- Every closed value set the UI shows has a complete label record (`Record<Role, string>`), so a value added without a label fails to compile instead of rendering a raw `ADMIN`. Labels live with the values they name, never inline in a component.

## Examples

```ts
// Prefer: a new role without a label fails to compile
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.Admin]: 'Administrator',
  [UserRole.Member]: 'Member',
}
```
