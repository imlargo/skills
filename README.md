# imlargo's Skills

A collection of [Agent Skills](https://agentskills.io/home) reflecting [imlargo](https://github.com/imlargo)'s preferences, workflow and conventions. They tell agents **how I work**, not how a technology works: anything a capable model already knows from the official docs is left out.

Inspired by [antfu/skills](https://github.com/antfu/skills).

## Installation

### Claude Code plugin

This repo is also a Claude Code [plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces) with a single plugin, `imlargo`, that ships every skill:

```bash
/plugin marketplace add imlargo/skills
/plugin install imlargo@imlargo
```

Plugin skills are namespaced, e.g. `/imlargo:imlargo-go`. Run `/plugin marketplace update imlargo` to pull new versions.

### Any agent (skills CLI)

Use the [skills](https://github.com/vercel-labs/skills) CLI to copy them into Claude Code, Cursor, Codex and other agents:

```bash
pnpx skills add imlargo/skills --skill='*'      # current project
pnpx skills add imlargo/skills --skill='*' -g   # globally
pnpx skills add imlargo/skills --skill=imlargo-go
```

### Local development

Symlink the skills into your personal directory so edits apply immediately:

```bash
for s in skills/*/; do ln -sfn "$PWD/$s" ~/.claude/skills/; done
```

## Skills

All skills are hand-maintained and opinionated. They are layered: `imlargo` is the base, the domain skills add tech-agnostic rules, and the technology skills add how I use a specific stack.

```
imlargo                      how I work + code conventions (always relevant)
├── imlargo-anti-slop        no AI slop in any output; routes to the right skills
├── imlargo-prompting        everyday needs into ready-to-paste agent prompts
├── imlargo-projects         kickoff, requirements, context, setup, backlog, delivery
├── imlargo-workflow         git and GitHub: branches, commits, versions, PRs, issues, boards
├── imlargo-design           visual taste: simple, minimalist, sophisticated
├── imlargo-frontend         frontend rules, any framework
│   ├── imlargo-svelte       Svelte / SvelteKit, my way
│   └── imlargo-ui-pass      deep UI/UX pass, view by view
└── imlargo-backend          backend rules, any language
    └── imlargo-go           Go, my way
```

| Skill | Description |
|-------|-------------|
| [imlargo](skills/imlargo) | Working style and code conventions, independent of language or framework |
| [imlargo-anti-slop](skills/imlargo-anti-slop) | Guard against AI slop in anything the agent produces (code, UI, design, text); routes each output to its skill |
| [imlargo-prompting](skills/imlargo-prompting) | Turn an everyday need into one ready-to-paste prompt for a coding agent |
| [imlargo-projects](skills/imlargo-projects) | How projects start and ship: kickoff, requirements, context file, templates, backlog, delivery |
| [imlargo-workflow](skills/imlargo-workflow) | Git and GitHub: branches, commits, versioning and releases, PRs, issues, project boards |
| [imlargo-design](skills/imlargo-design) | Visual taste: simple, minimalist, sophisticated, enterprise SaaS level |
| [imlargo-frontend](skills/imlargo-frontend) | Frontend rules: architecture, components, state, styling, a11y, performance |
| [imlargo-backend](skills/imlargo-backend) | Backend rules: architecture, API design, persistence, observability, security |
| [imlargo-ui-pass](skills/imlargo-ui-pass) | Deep UI/UX pass, view by view, to an enterprise SaaS level |
| [imlargo-svelte](skills/imlargo-svelte) | How I work with Svelte and SvelteKit |
| [imlargo-go](skills/imlargo-go) | How I write Go |

> [!TIP]
> Skills load on demand and can be missed. To make one always apply in a project, reference it from that project's `CLAUDE.md` / `AGENTS.md` (e.g. "Follow the `imlargo` and `imlargo-svelte` skills").

## Adding a Skill

```bash
pnpm install
pnpm new imlargo-docker   # scaffolds skills/imlargo-docker from templates/skill
pnpm check                # validates frontmatter, links, README listing
```

Then write the content, add the skill to the table above and, if it builds on others, to the tree. See [AGENTS.md](AGENTS.md) for the format and writing rules.

| Script | Description |
|--------|-------------|
| `pnpm new <name>` | Scaffold a new skill from the template |
| `pnpm check` | Validate every skill; `--strict` also fails on warnings and pending TODOs |
| `pnpm validate` | Validate the plugin and marketplace manifests with `claude plugin validate` |
| `pnpm lint` | Lint scripts and config |

## Credits

- The pull request workflow, PR body guide, visual evidence workflow and commit granularity rules in `imlargo-workflow` are adapted from [antfu/skills](https://github.com/antfu/skills) (MIT), which in turn adapted them from [moeru-ai/airi](https://github.com/moeru-ai/airi) (MIT).
- The issue triage workflow in `imlargo-workflow` is adapted from [antfu/skills](https://github.com/antfu/skills) (MIT). The handoff, research and audit rules take ideas from [mattpocock/skills](https://github.com/mattpocock/skills) and [shadcn/improve](https://github.com/shadcn/improve) (MIT).

## License

[MIT](LICENSE.md)
