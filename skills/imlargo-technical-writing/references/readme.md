---
name: readme
description: "How imlargo structures READMEs for libraries, apps, templates and internal repos: the opening, what sets it apart, requirements, install, a minimal working example, and what to leave out. Load when writing or reviewing a README."
---

# README

The README answers, in order: what is it, why this one, can I use it, how do I start, where do I go next.

## Library

1. **Title and one line** saying what it is, in a blockquote under the title: "A markdown compiler for Svelte 5. Built as a Vite plugin, with a grammar of its own."
2. **Badges:** CI and license at most. No badge walls.
3. **What sets it apart:** a few bullets, each a behavior or a decision, not an adjective. "Every error carries a line and column in your `.md`, never in generated code." beats "Great error messages."
4. **Install:** the command, then the requirements (runtime, framework, peer versions) right under it.
5. **Setup and usage:** the smallest example that works when pasted, with a comment on any line whose order or presence is non-obvious ("svmd goes before the Svelte plugin").
6. **Further docs:** links to the docs site, API reference, ARCHITECTURE and CONTRIBUTING.
7. **License.**

## App or Product Repo

1. What it does and for whom, in two or three sentences.
2. Running it: prerequisites, install, env setup (point to `.env.example`), dev, test, build. Commands in code blocks, using the repo's package manager.
3. Layout: a short tree of the top-level folders with one line each, when the structure isn't obvious.
4. Deploy, if someone reading it will deploy.
5. Known gaps or what's next, when the project is a test, a PoC or unfinished. Say it plainly.

## Template

What it includes, what it deliberately doesn't (yet), and the one thing to do after creating a project from it ("Drop a new `.md` under `src/content/docs/`; the sidebar picks it up").

## Leave Out

- Generated boilerplate the tool created (`sv create` instructions, "If you're seeing this...") once the project is real. Replace it.
- Tables of contents in a README short enough to scroll.
- Feature lists of everything, roadmaps that aren't decided, star-history charts, "Why X?" marketing sections.
- Contribution, conduct and security policy text copied in full: link the files.
- Screenshots that will go stale, unless the product is visual; then one, current.
