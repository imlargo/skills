---
name: versioning-releases
description: "When a project is versioned, how versions are bumped and tagged, and how the changelog is written. Load when bumping a version, tagging, publishing a release or editing CHANGELOG.md."
---

# Versioning and Releases

## When

- Versioned: libraries, packages, CLIs, and products that are past a quick MVP (a serious MVP with real users counts).
- Not versioned: quick MVPs in fast mode. They ship from `main` with no version, tags or changelog.

## Version Scheme

[Semantic Versioning](https://semver.org), derived from the Conventional Commits since the last tag:

| Commits since last release | `>= 1.0.0` | `0.x` |
|---|---|---|
| `!` or `BREAKING CHANGE:` | major | minor |
| `feat` | minor | patch |
| `fix`, `perf` | patch | patch |
| only `docs`, `chore`, `ci`, `test`, `refactor` | no release | no release |

- Start at `0.1.0`. Go to `1.0.0` when the public API is stable (libraries) or at public launch (products).
- Pre-releases: `1.4.0-beta.1`, `1.4.0-rc.1`.
- Tag every release on the commit that ships it, as `v{version}` (`v1.4.0`). In formal mode that is the merge commit of the release PR on `main`.

## Release Steps

1. Move the `[Unreleased]` changelog entries under the new version heading.
2. Bump and tag: JS/TS with `bumpp` (bumps `package.json`, commits `chore: release v1.4.0`, tags and pushes); Go with an annotated tag (`git tag -a v1.4.0 -m v1.4.0`), remembering that `v2+` needs the `/v2` module path.
3. Publish from CI on the `v*` tag push, never from a local machine (npm with trusted publishing, no tokens).
4. Create the GitHub Release with that version's changelog section as notes: `gh release create v1.4.0 --notes-file <section.md>`.
5. Close the version's milestone.

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
