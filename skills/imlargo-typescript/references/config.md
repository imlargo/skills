---
name: config
description: "The tsconfig flags imlargo enables and why, how lint is set up for TypeScript, and how Node scripts run TypeScript directly. Load when creating or changing a tsconfig, lint config, or a TypeScript script."
---

# Config

## Rules

- A framework template owns its base tsconfig (`$app/tsconfig` in SvelteKit, Vite's `tsconfig.app.json`). Extend it; never replace it to match this list.
- Turn on the flags below in new projects and libraries. Adding one to an existing repo is a change of its own: fix every error it reports in the same PR, never with casts.
- `skipLibCheck` stays on for speed. Its cost: a dependency without declarations silently becomes `any`. When a package's types matter, check they resolve (`attw` for your own packages, a test call for others).
- Monorepos type-check the whole workspace in one pass, resolving sibling packages to source through `paths`, so a change in one package is checked against its dependents without a build.

| Flag | Why |
|------|-----|
| `strict` | The base. Set it explicitly even where it's the default |
| `noUncheckedIndexedAccess` | `arr[i]` and `record[key]` are `T \| undefined`, which they are at runtime |
| `exactOptionalPropertyTypes` | `x?: T` means "may be absent", not "may be `undefined`" |
| `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch` | Catch the silent mistakes in classes and branches |
| `noUnusedLocals`, `noUnusedParameters` | Dead code fails the check. Prefix a binding kept on purpose with `_` |
| `verbatimModuleSyntax` | Type imports must say `import type`; what you write is what is emitted |
| `isolatedModules`, `moduleDetection: "force"` | Every file compiles on its own, as bundlers and Node do |
| `erasableSyntaxOnly` | No enums, namespaces or parameter properties, so Node and any bundler can strip types without transforming code |
| `moduleResolution: "bundler"` with `module: "esnext"` or `"preserve"` | Apps and bundled libraries. A package run by Node without a bundler uses `nodenext` |
| `types: [...]` | List the ambient types the project uses (`node`, `vite/client`); don't rely on auto-loading every `@types` package |

## Lint

- Libraries: typescript-eslint `strictTypeChecked` plus `stylisticTypeChecked`, with `parserOptions.projectService`, typed rules turned off for plain `.js` files. Prettier only formats; `eslint-config-prettier` removes the overlap.
- `no-unused-vars` ignores `^_` for args, vars and caught errors, matching the compiler.
- Ignore forked, generated and snapshot code with a comment saying why, instead of filling it with disable comments.
- Lint runs with `--max-warnings 0`.

## Node Scripts

Repo scripts are `.ts` files run directly by Node (`node scripts/check.ts`), which strips types. That's why `erasableSyntaxOnly` matters: no enums or parameter properties in them. Import built-ins with the `node:` prefix and use `import.meta.dirname` instead of `__dirname`. No `ts-node` or `tsx` dependency for scripts.

## Examples

```jsonc
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "esnext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "erasableSyntaxOnly": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["node"]
  }
}
```
