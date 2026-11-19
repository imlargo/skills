---
name: style
description: "Sentence-level rules for technical docs: clarity, terminology, numbers and units, code examples, JSDoc and doc comments, error and CLI messages, words to avoid, and before-and-after examples. Load when writing or editing technical prose, code examples, JSDoc or error messages."
---

# Style

## Sentences

- Lead with the subject and the verb. "The plugin compiles `.md` files matched by `include`", not "With regards to compilation, the `.md` files that are matched...".
- State behavior exactly: what happens, when, and what doesn't. "Markdown parses inside components by default" is precise; "supports components" isn't.
- Conditions before instructions: "If you use SvelteKit, add it to `src/app.d.ts`."
- Prefer the positive form: "Keep content unindented", not "Don't fail to avoid indenting".
- Hedge only real uncertainty, once, with what it depends on. No "should work", "may possibly".

## Terms, Numbers, Names

- Code names (`functions`, `options`, `files`, `commands`) in inline code, spelled exactly as in the source.
- Products and libraries spelled as their owners spell them (SvelteKit, TypeScript, GitHub, pnpm).
- Numbers with units and conditions: "under 200 ms at p95 on 10k rows", "3 retries with backoff". No "much faster" without the measure.
- Versions as ranges the reader can check: "Svelte 5+, Vite 6+".

## Code Examples

- Complete enough to run when pasted: imports, the file name as a comment or a label, real-looking names (`post.md`, `UserService`), no `foo`/`bar`.
- Minimal: only the lines the point needs. Elide with a comment (`// ...`) rather than pasting a whole file.
- Comments in examples explain non-obvious lines, never restate the code.
- Show the avoided form next to the preferred one when it's a common mistake, labeled.
- Use the project's package manager and language: `pnpm`, TypeScript when the project is TypeScript.
- Shell examples don't include the prompt (`$`) unless output is shown alongside.

## JSDoc and Doc Comments

- Exported API: one sentence on what it does, then `@param`, `@returns` and `@throws` only where the type doesn't say it, and `@example` for anything non-obvious.
- Document the contract (units, ranges, ownership, side effects, what happens on bad input), not the implementation.
- Mark deprecations with `@deprecated` plus the replacement and the version it goes away.

## Error and CLI Messages

- Say what went wrong, where (file, line, column, option name), and what to do: "`include` matched no files. Check the glob is relative to the project root: `src/content/**/*.md`."
- Point to the user's input, never to generated code or internals.
- No blame ("You entered an invalid..."), no apologies, no stack traces for expected errors.

## Avoid

- Openers that delay the point: "In this guide, we will...", "Welcome to...", "This section describes...".
- Minimizers: "simply", "just", "easily", "obviously", "of course". What's easy for you isn't for the reader stuck on it.
- Marketing: "powerful", "seamless", "blazing fast", "robust", "cutting-edge", "best-in-class".
- Future promises in docs ("coming soon") unless there's a tracked issue, linked.
- "Note:" and callouts for content that's just part of the paragraph. A callout is for warnings that prevent data loss or a broken setup.

## Before and After

| Before | After |
|--------|-------|
| "svmd is a powerful and flexible tool that makes it easy to use Svelte in markdown." | "A markdown compiler for Svelte 5. Components, expressions and control blocks are part of its grammar, not patterns matched after parsing." |
| "Simply configure the plugin and you're good to go!" | "Add `svmd()` before `svelte()` in `plugins`: it hands the Svelte plugin compiled Svelte, not markdown." |
| "Fixed an issue with scripts." | "Two `<script>` blocks importing the same name no longer produce a duplicate declaration." |
| "Error: invalid input" | "`post.md:12:4`: unclosed `{#if}` block. Add `{/if}` on its own line." |
