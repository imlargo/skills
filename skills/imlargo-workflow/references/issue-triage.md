---
name: issue-triage
description: "Triaging a repo's open issues and PRs: finding already-fixed, duplicate and spam items, suggesting labels and priority, gauging demand, and proposing actions for approval before touching anything. Load when asked to triage, groom, clean up or sync issues and PRs."
---

# Issue Triage

imlargo decides; the agent investigates. Issue format, labels and priority follow [issues](issues.md).

## Rules

- **Read-only until approved.** No comment, label, close or edit before imlargo approves the action tables. Reads (`gh issue view`, `gh api` GET, `gh search`, `git log`) are fine.
- **Conservative.** When unsure, keep it open (with labels if useful). Never close an item with an open linked PR, a milestone or active maintainer discussion.
- **Verify in the code, not the title.** A partial fix isn't fixed.
- Only labels that exist. New labels go in the Labels table and are created after approval, before they're applied.
- Comments are 1-3 plain English sentences written fresh for each item, with the link that justifies the action (PR, commit, release or canonical issue). No templates, no agent attribution.

## Workflow

1. **Scope.** All open items by default; for large repos, ask for a label, area or age limit. Fetch in bulk:
   ```bash
   gh issue list --state open --limit 200 --json number,title,body,author,labels,createdAt,updatedAt,comments,reactionGroups,url,milestone
   gh pr list --state open --limit 200 --json number,title,body,author,labels,isDraft,reviewDecision,mergeable,url
   gh label list --limit 200 --json name,description
   ```
2. **Map references.** Linked issues and PRs (`#123`, `closes`, timeline) form a cluster. Being linked doesn't make two items duplicates, but it doesn't prevent it either: if one clearly covers the other's symptom, propose the duplicate and mention the link.
3. **Check each item:**
   - **Already fixed:** search merged PRs and commits (`gh pr list --state merged --search "<keywords>"`, `git log -i --grep`), then confirm in the current code. Name the release or deploy that shipped it.
   - **Duplicate:** group by symptom, not wording. The canonical item is the one with a linked PR, then a maintainer answer, then the best repro, then the most reactions, then the oldest.
   - **Spam:** two or more strong signals (promo links, off-topic, repeated posts, empty body with a link). Terse, typo-ridden or non-English isn't spam.
   - **Labels and priority:** fill missing type and `area:*` labels. Priority goes where [issues](issues.md) puts it (the `**Priority:**` line or the project field), not as a new label.
   - **Superseded or stale:** PRs whose changes are already on `main` or obsolete, tracking issues whose work is done, and items waiting on information past the date they were given.
   - **Quick wins:** ready PRs with passing checks, small clear fixes, docs and typos. Say why each is quick.
   - **Demand:** positive reactions, distinct commenters, "+1"s and folded-in duplicates, as raw numbers plus High/Medium/Low.
4. **Present three numbered tables** (so imlargo can answer "apply 1-5, skip 3") and stop.
5. **Execute approved rows only,** one issue per command (comment, then label, then close), stopping at the first error. Finish with a done/failed table with links.

## Tables

**Close:** `# | Item | Reason (fixed / duplicate / superseded / stale / spam) | Link | Comment`

**Labels and priority:** `# | Item | Add | Reason`. Priority changes are body or project-field edits; new labels are rows with item `(new label)`.

**Needs attention** (no action): `# | Item | Demand | Reactions / comments | Note`, most urgent first: P0 and regressions, security, high demand, long-waiting PRs, then quick wins.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-issue-triage/SKILL.md (MIT)
-->
