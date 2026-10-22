---
name: imlargo-anti-slop
description: imlargo's guard against AI slop in anything an agent produces (frontend and backend code, APIs, tests, scripts, config, UI, visual design, SVGs, docs, issues, PRs, commits, chat answers, reports and messages). Lists the patterns that make output look machine-generated and routes each kind of output to the skill that holds its rules. Use whenever producing or reviewing any output for imlargo, before handing work back, and when imlargo says "no slop", "sin AI slop" or complains something looks generic.
metadata:
  author: imlargo
  version: "2026.10.22"
---

# Anti-Slop

> Builds on `imlargo`. Slop is output that looks generated: generic, padded, decorated, or more than the task needs. It applies to everything the agent produces.

## Load the Right Skills

| Producing | Follow |
|-----------|--------|
| Any code | `imlargo` |
| Frontend code | `imlargo-frontend` plus the stack's skill (`imlargo-svelte`, with its Svelte MCP autofixer) |
| Backend code | `imlargo-backend` plus the stack's skill (`imlargo-go`) |
| Visual design, illustrations, SVGs | `imlargo-design` |
| Commits, PRs, issues, releases | `imlargo-workflow` |
| Prompts for agents | `imlargo-prompting` |
| Any prose | the `avoid-ai-writing` skill (see below) |

## Prose Goes Through `avoid-ai-writing`

imlargo has the `avoid-ai-writing` skill installed. Use it on every piece of prose before delivering it:

- **Drafts** (issues, PR bodies, release notes, README and docs, client or team messages, posts, UI copy): write, then run it in `rewrite` mode and deliver the corrected version.
- **Files already written** (a doc or markdown file in the repo): run it in `edit` mode on that file.
- **Reviewing someone else's text:** `detect` mode, flags only.
- **Short chat answers and commit messages:** apply its rules while writing; a full audit isn't worth the cost.

Never let it touch code, code blocks, tables or quoted text. If the skill isn't available, apply the Text section below by hand.

## Everywhere

- No emojis: not in code, comments, logs, commits, docs, UI or chat.
- No all-caps text except acronyms and constants.
- No filler, hype or buzzwords ("robust", "seamless", "leverage", "powerful", "comprehensive"). No em dashes in prose.
- Nothing nobody asked for: extra files, docs, features, options, sections, summaries.
- Specific beats generic: real names, real numbers, real examples. Never invent facts, metrics or sample data presented as real.

## Code (any language)

- Comments that narrate the code, address the reader ("Now we..."), record history ("Changed X to Y") or decorate (ten-line doc comments on obvious functions).
- Defensive checks for states the types already rule out, and fallback defaults that hide bugs.
- Error handling that swallows the error, logs and continues as if nothing happened, or rethrows it unchanged.
- Wrappers that only forward, abstractions with one caller, interfaces with one implementation, exports with no consumer, config options nobody sets.
- Compatibility shims, re-exports or renamed leftovers for code with no other users.
- Vague names (`data`, `result`, `handleStuff`, `utils2`, `manager`, `helper`), debug prints and commented-out code.
- Tests that assert the mock instead of the behavior, or that restate the implementation.

## Backend and APIs

- Endpoints, fields or layers added "for later". Generic CRUD scaffolding nobody needs.
- Error responses that leak internals, or catch-all `500`s that hide what failed.
- Logs that are noisy or decorative instead of carrying the context to debug.

## UI

- Emoji icons, all-caps labels with wide tracking, decorative gradients, glow, glassmorphism, blobs.
- Heavy shadows, cards inside cards, everything centered, a badge on everything, a rainbow of colors.
- Gratuitous animation, marketing copy inside the product ("Supercharge your workflow"), fake metrics and sparklines.
- Hardcoded values and resized design system components instead of tokens and variants.

## Text (docs, issues, PRs, commits, reports, chat)

- Preambles ("Great question", "Here's a comprehensive..."), recaps of what was just said, closing offers ("Let me know if...").
- Headings and bullets on content that is a two-line answer. Bold on every other phrase.
- Lists of bare noun phrases, rule-of-three padding, hedging stacks ("could potentially").
- Claims without evidence ("fixed", "safe", "production-ready") when nothing was verified.

## Before Handing Back

Scan the output against these lists and fix what you find. If a pattern is deliberate (the brand uses a gradient, a constant is uppercase), keep it.
