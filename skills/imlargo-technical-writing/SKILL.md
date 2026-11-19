---
name: imlargo-technical-writing
description: How imlargo writes technical documentation. Covers choosing the doc type (tutorial, how-to, reference, explanation), READMEs for libraries and apps, ARCHITECTURE and CONTRIBUTING docs, docs-site pages, getting started and API reference, migration guides, known limits and troubleshooting, code examples, JSDoc and error messages, sentence-level style, and verifying every claim against the code. Use when writing, editing, reviewing or restructuring a README, docs page, docs site, guide, tutorial, API reference, architecture or design doc, CONTRIBUTING, migration guide or code comments meant as documentation, even when phrased as "document this", "write the docs", "mejora el README" or "explica cómo funciona".
metadata:
  author: imlargo
  version: "2026.11.19"
---

# Technical Writing

> Builds on `imlargo` (its Docs and Writing rules) and `imlargo-anti-slop`. Context docs, specs, ADRs and handoffs follow `imlargo-projects`; changelogs and release notes follow `imlargo-workflow`; work messages follow `imlargo-comms`.

## Principles

- **Every line earns its place.** Docs are read by someone trying to do something. Cut what doesn't help them do it: history, praise of the project, restating the heading, filler intros.
- **Decisions, with their why.** The valuable part of a doc is what the code can't say: why it's built this way, what was rejected, what it deliberately doesn't do. "`core` doesn't know Vite exists" teaches more than a feature list.
- **Concrete over abstract.** A runnable example, a real number, an exact error message, a file path. If a sentence would fit any project's docs, rewrite it or cut it.
- **Accurate or absent.** Read the code before describing it. Every command, flag, option, default and output in a doc is checked against the source or run. Never document a planned feature as existing.
- **Honest limits.** Every non-trivial doc names what doesn't work, the known limits and the trade-offs. A limit the reader finds alone costs more trust than one you told them.
- **One doc type per page.** A tutorial doesn't stop to explain internals; a reference doesn't teach. Mixing them makes both worse (see [doc-types](references/doc-types.md)).
- **One source of truth.** Link instead of copying. When docs and code disagree, the code wins and the doc gets fixed in the same change.
- **Docs ship with the change.** A PR that changes behavior, an option or a command updates its docs in the same PR.

## Process

1. Name the reader and what they should be able to do after reading. That picks the doc type.
2. Read the code, tests, existing docs and recent commits. List the facts the doc will state.
3. Outline with headings that say what each section answers. Check the outline covers the reader's task end to end before writing prose.
4. Write the examples first, then the prose around them.
5. Verify: run or trace every command and example, check every link and path, compare every option and default with the source. Report anything you couldn't verify.
6. Cut: remove every sentence that doesn't change what the reader knows or does, then run the `avoid-ai-writing` rules on the prose (see `imlargo-anti-slop`).

## Style

- Second person and present tense for instructions ("Run `pnpm add -D @svmd/vite`"); first person plural or plain statements for design explanations.
- Short declarative sentences with concrete subjects. Active voice. One idea per paragraph.
- Sentence-case headings that name the topic or the task ("Adding a page", "Known limits"), unless the repo uses another convention.
- One term per concept, everywhere. Define a term on first use or link to where it's defined.
- Bullets for parallel items, numbered lists for ordered steps, tables for comparisons across the same attributes. Prose for reasoning. Never bullets of bare noun phrases.
- Bold only for the one thing a reader must not miss in a section. No emojis, no exclamation marks, no "simply", "just", "easily" or "obviously".
- Details in [style](references/style.md).

## Checklist

- [ ] The first lines say what it is and who it's for; a reader knows in ten seconds whether they're in the right place.
- [ ] Every command and example was run or traced against the source.
- [ ] Requirements (versions, peers, environment) are stated before the install step.
- [ ] Limits, trade-offs and non-goals are named.
- [ ] Links and paths resolve; nothing is copied that could be linked.
- [ ] No sentence that would fit another project's docs.

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Doc Types | Tutorial, how-to, reference and explanation, and which repo file holds what | [doc-types](references/doc-types.md) |
| README | Structure for library and app READMEs, with what to leave out | [readme](references/readme.md) |
| Architecture | ARCHITECTURE and CONTRIBUTING docs: structure, boundaries, decisions, working agreements | [architecture](references/architecture.md) |
| Guides and Reference | Getting started, how-to guides, API and config reference, migration guides, troubleshooting, docs-site pages | [guides-and-reference](references/guides-and-reference.md) |
| Style | Sentences, terminology, code examples, JSDoc, error messages, words to avoid, before and after examples | [style](references/style.md) |
