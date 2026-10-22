---
name: versioning-releases
description: "When a project is versioned, how versions are bumped and tagged, and how the changelog is written. Load when bumping a version, tagging, publishing a release or editing CHANGELOG.md."
---

# Versioning and Releases

## When

- Versioned: libraries, packages, CLIs, and products that are past a quick MVP (a serious MVP with real users counts).
- Not versioned: quick MVPs in fast mode. They ship from `main` with no version, tags or changelog.

## Version Scheme

<!-- TODO: Version scheme (SemVer?), what triggers each bump, pre-releases, and the release tooling (e.g. bumpp, release-please, CI on tag). -->

- Tag every release on the commit that ships it, as `v{version}` (`v1.4.0`). In formal mode that is the merge commit of the release PR on `main`.
- Create a GitHub Release from the tag whose notes are the changelog entry for that version.

## Changelog

Keep a changelog only when the project is versioned. Follow [Keep a Changelog](https://keepachangelog.com):

```markdown
# Changelog

## [Unreleased]

### Added
- Disable and re-enable an account from the danger zone (#1321)

## [1.4.0] - 2026-10-22

### Fixed
- Disabled accounts no longer count toward the plan limit (#1315)
```

- `CHANGELOG.md` at the repo root, newest version first, dates as `YYYY-MM-DD`.
- Sections, in this order and only when non-empty: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
- Write for the people who use the project, not for the people who wrote it: what changed for them, with the issue or PR number. Never paste the commit log.
- Add the entry under `[Unreleased]` in the same PR as the change. Releasing moves `[Unreleased]` to a new version heading.
- Breaking changes say so first in their line and explain the migration.
