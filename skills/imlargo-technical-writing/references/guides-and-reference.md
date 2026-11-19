---
name: guides-and-reference
description: "How imlargo writes docs-site pages: getting started and tutorials, how-to guides, API, CLI and config reference, migration guides, known limits and troubleshooting, plus page frontmatter and navigation. Load when writing a docs page or guide, documenting an API, options or a CLI, or preparing a migration guide."
---

# Guides and Reference

## Getting Started

- Shortest path to a first working result: requirements, install, the minimal config, the first real use, what success looks like.
- Every step is copy-pasteable and in order. No "configure as needed".
- End by pointing to the two or three next pages a new user needs, not to everything.

## How-To Guides

- Title is the task: "Add a page", "Highlight code with Shiki", "Deploy to Cloudflare Workers".
- Start with prerequisites and the end state, then numbered steps, each one action with its command or code.
- Show the expected output or result after the steps that produce one, so the reader can tell they're on track.
- Cover the common variation in one short section; link out for the rest.

## Reference

- Complete and uniform: every option, function, flag or field, each entry with the same parts in the same order.
- For each entry: name, type, default, what it does in one sentence, constraints, a short example when usage isn't obvious, and the version it appeared in when that matters.
- Generate from the source when possible (types, JSDoc, CLI help), so it can't drift. Hand-written reference is checked against the source.
- Errors are reference too: the message, what causes it, how to fix it.

## Migration Guides

- One per breaking release. Ordered by what most users will hit first.
- For each change: what changed, why, before and after code, and whether a codemod or a deprecation warning exists.
- Say what doesn't need to change, so readers don't hunt for it.

## Known Limits and Troubleshooting

- A known limit is stated as behavior, cause, and workaround: "A markdown list inside `{#each}` produces one list per iteration. That's arithmetic, not a bug: write the markup if you want one list."
- Say which limits are permanent by design and which are not done yet.
- Troubleshooting entries start from the symptom the reader sees (the exact error text, or what looks wrong), not from the cause.

## Docs-Site Pages

- Frontmatter carries what the site needs (`title`, `description`, group or order, `updated`); the description is one sentence that works as the search and SEO summary.
- One H1 per page, from the title. Headings form an outline a reader can scan in the table of contents.
- Link the first mention of another concept to its page. Never "click here"; link text says where it goes.
- Pages are short enough to read in one go. Split by task, not by length.
