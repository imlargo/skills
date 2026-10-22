# imlargo's Skills

Hand-written [Agent Skills](https://agentskills.io/home) with imlargo's preferences and conventions.

PLEASE STRICTLY FOLLOW THE BEST PRACTICES FOR SKILLS: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

Skill content is written by imlargo. Do not invent rules or fill `TODO` placeholders unless asked; when asked to edit a skill, keep to what imlargo stated.

## Repository Structure

```
.
├── .claude-plugin/
│   ├── marketplace.json        # Marketplace with one plugin whose source is the repo root
│   └── plugin.json             # Plugin manifest; skills are discovered from skills/
├── scripts/
│   ├── check.ts                # Validates skills (pnpm check)
│   └── new.ts                  # Scaffolds a skill from the template (pnpm new <name>)
├── templates/skill/            # Template copied by pnpm new (not installed)
└── skills/
    └── {name}/
        ├── SKILL.md            # Entry point: frontmatter, key rules, references table
        └── references/
            └── {topic}.md      # One concept per file, loaded on demand
```

Only `skills/` is distributed. Anything that is not skill content (templates, notes, drafts) lives outside it, or the plugin and the skills CLI will install it.

## Skill Layers

| Layer | Skills | Contains |
|-------|--------|----------|
| Base | `imlargo` | How imlargo works and code conventions valid everywhere |
| Process | `imlargo-projects`, `imlargo-workflow` | How projects start and ship; git and GitHub mechanics |
| Domain | `imlargo-frontend`, `imlargo-backend` | Rules independent of framework or language |
| Technology | `imlargo-svelte`, `imlargo-go` | How imlargo uses that stack, never a tutorial on it |

- Put each rule in the most general layer where it holds. A Svelte skill must not restate frontend rules; a Go skill must not restate backend rules.
- When layers conflict, the more specific skill wins. Say so explicitly in the specific skill.
- Skills are installed independently, so never link to another skill's files. Refer to other skills by name in backticks (`imlargo-frontend`).
- New technology skills are named `imlargo-{tech}` and state which domain skill they build on.

## File Formats

### `SKILL.md`

```markdown
---
name: imlargo-{name}
description: {What it covers, front-loading the main use case}. Use when {situations, file types, keywords}.
metadata:
  author: imlargo
  version: "2026.10.22"
---

# {Title}

> Builds on `imlargo`. {What it does NOT cover.}

## Preferences

- The rules that most change the output, one per bullet

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Topic | What it covers | [topic](references/topic.md) |
```

- `name`: kebab-case, equal to the directory, at most 64 characters, no `anthropic` or `claude`.
- `description`: third person, what + when, at most 1024 characters. It is the only thing an agent sees before deciding to load the skill, so include the triggers (tasks, file types, keywords). Quote it if it contains `: `.
- `metadata.version`: date of the last meaningful change (`YYYY.MM.DD`). Bump it whenever the skill content changes.
- Only use portable frontmatter keys: `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`. Claude Code-only keys (`paths`, `disable-model-invocation`, ...) make the skill fail on claude.ai and the Skills API.
- Keep `SKILL.md` under 500 lines; it stays in context once loaded. Details go to `references/`.

### `references/*.md`

```markdown
---
name: {topic}
description: "{What it covers}. Load when {situation}."
---

# {Topic}

## Rules

## Examples
```

- One concept per file, file name equal to `name`.
- Every reference must be linked from the `SKILL.md` references table, one level deep. References never link to other references.
- Code examples beat prose: show the preferred form, and the avoided form when it is a common mistake.

## Writing Guidelines

1. **Rules, not explanations** - State what to do. Skip concepts the model already knows.
2. **Be concise** - Every line costs context. Cut anything that would not change the agent's output.
3. **Explain why when it is not obvious** - A reason lets the agent generalize to cases the rule does not name.
4. **Be specific** - "Wrap errors with `fmt.Errorf("op: %w", err)`" beats "handle errors properly".
5. **Imperative voice, English** - Consistent tone across skills; descriptions in English trigger best.

## Workflow

- Add a skill: `pnpm new imlargo-{name}`, write it, list it in the README table (and tree if layered).
- Before committing: `pnpm check` (runs in the pre-commit hook and CI). `pnpm check --strict` also fails on pending TODOs.
- After changing `.claude-plugin/`: `pnpm validate`.
