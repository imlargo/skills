---
name: libraries
description: "How imlargo builds and publishes a TypeScript package: template, ESM-only package.json, exports, build, declaration and packaging checks, public API and dependencies. Load when creating, changing the public API of, or publishing a TypeScript library or npm package."
---

# Libraries

New libraries start from [imlargo/typescript-library-template](https://github.com/imlargo/typescript-library-template). Versioning, changelog and releases follow `imlargo-workflow`.

## Package

- ESM only: `"type": "module"` and an `exports` map. No CommonJS build and no `main` field without a consumer who needs it.
- `exports` lists every public entry point plus `"./package.json"`. Anything not in `exports` isn't public API, and consumers can't import it.
- `files` ships only `dist` and the license. `sideEffects: false` when true, so bundlers can tree-shake.
- `engines.node` states the oldest supported Node.
- Frameworks the library plugs into (`svelte`, `react`, `vite`) are `peerDependencies`, never `dependencies`.
- Build with tsdown (one build per package in a monorepo). Declarations are generated, never hand-written.

## Before Publishing

- `publint` and `attw --pack` (`--profile esm-only`) pass for every package. They catch broken `exports` and types that resolve on one setup and not another.
- Install the packed tarball in a real consumer project and use it, not only the workspace link: a workspace import can hide a missing file or export.

## Public API

- The public API is what `exports` exposes, and it's small. Don't export a helper without a consumer outside the package.
- Exported functions and types declare explicit types and carry short JSDoc on the contract (params, returns, throws). It's what consumers see in their editor.
- A change to an exported type is an API change. Removing or narrowing anything is breaking.
- Options objects over positional booleans. New options are optional, so adding one isn't breaking.
- The library never reads `process.env` or global state on its own. The consumer passes configuration in.
