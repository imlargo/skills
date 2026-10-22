---
name: versioning-releases
description: "Which projects are versioned, how versions are bumped, tagged and published, and how the changelog is kept. Load when bumping a version, tagging, publishing or editing CHANGELOG.md."
---

# Versioning and Releases

Versioned: libraries, packages, CLIs and products past a quick MVP. Quick MVPs have no versions, tags or changelog.

## Versions

- SemVer, bump derived from Conventional Commits since the last tag. Start at `0.1.0`; `1.0.0` when the API is stable or the product launches.
- Tag the commit that ships (the release merge commit in formal mode) as `v1.4.0`.
- JS/TS: `bumpp`. Go: annotated tags, `/v2` module path for v2+.
- Publish from CI on the tag push, never locally; npm via trusted publishing, no tokens.
- `gh release create` with that version's changelog section as notes. Close the version's milestone.

## Changelog

`CHANGELOG.md` in [Keep a Changelog](https://keepachangelog.com) format. Add the entry under `[Unreleased]` in the same PR as the change, written for users with the issue number, never pasted from the commit log. Breaking changes lead their line and explain the migration.
