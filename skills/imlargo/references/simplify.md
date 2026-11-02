---
name: simplify
description: "Cutting a diff or PR down to the smallest correct change with an ablation study: inventory each piece, try removing it, keep only what's proven needed. Load when asked to simplify, slim down, clean up or reduce the current changes, or before handing back a large diff."
---

# Simplify

Cut the current changes to the smallest correct diff. For each piece, ask: if I delete this, what concretely breaks? Keep only what earns its place. The target is the fewest concepts a reader must hold, not the fewest lines or the most layers.

## Rules

- **Behavior stays the same.** No features, no public API changes, no unrelated fixes. Report those instead.
- **Scope is the diff:** code the change introduced or modified, plus what must change to remove it. Not the surrounding codebase.
- **Every cut is verified:** by the project's checks when the machine allows, otherwise by reading the callers and the tests. A piece no check covers is kept unless you can reason it away explicitly.

## Workflow

1. Get the diff (`git diff $(git merge-base HEAD origin/main)` or `git diff HEAD`) and write the change's goal in one sentence. It's the yardstick.
2. Inventory every piece: function, parameter, option, branch, type, file, dependency, layer, comment, test.
3. Ablate each piece with the table below, apply cuts in small batches, and revert any cut that breaks behavior.
4. Re-read the final diff: every remaining line is explained by the goal, and the change is still robust and general.
5. Report the table and the diff size before and after (`git diff --stat`). Don't commit unless asked.

## Ablation

| Piece | Try | Keep if |
|-------|-----|---------|
| New function or helper | Inline it | Called from 2+ places, or its name explains a non-obvious step |
| Wrapper or layer | Call the underlying thing | It hides real complexity or a likely-to-change boundary |
| Parameter, option, config | Hardcode the only value used | A real caller needs another value now |
| Type, interface, generic | Use the inferred or existing type | It's exported, or inference gives a worse type |
| Branch, guard, try/catch | Delete it | It guards a reachable case, not an impossible one |
| New file or module | Merge into its only consumer | Several consumers or a distinct responsibility |
| Dependency | A few lines or an existing dependency | It handles hard edge cases you'd get wrong |
| Duplicate logic | Reuse the existing helper | Nothing equivalent exists (search first) |
| Comment | Delete it | It explains why, not what |
| Test | Remove it | It covers behavior nothing else covers |
| Lines unrelated to the goal | Revert them | Never |

Keep, or add, what makes it **robust** (real edge cases, cleanup, error context) and **general** (a fix that hardcodes a name or value from the bug report gets generalized).

## Smells

- A patch at the call site instead of the cause; special cases (`if (name === 'foo')`) a general rule would cover.
- Two paths doing the same thing with small differences.
- State, flags or caches derivable from existing data.
- Option bags where most values never vary.
- Types copied by hand instead of derived (`typeof`, `ReturnType`, utility types).
- Tests that mirror the implementation line by line.

## Report

```md
| # | Piece | Action | Why |
|---|-------|--------|-----|
| 1 | `parseOptions()` in src/cli.ts | inlined | one caller, 3 lines |
| 2 | `retry` option | removed | no caller passes it |
| 3 | try/catch in fetchData | kept | network errors reach users; a test covers it |

Diff: +142 -8 -> +61 -8.
```

Out-of-scope findings go in a separate list, untouched.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-simplify/SKILL.md (MIT)
-->
