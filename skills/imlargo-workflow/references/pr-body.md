---
name: pr-body
description: "When to add each optional PR body section and its format. Load when writing or updating a PR description."
---

# PR Body

Pick sections by what the reviewer needs. Never invent content to fill a heading: a small fix is Summary, `closes #N` and Verification.

## Summary

```markdown
## Summary

Uploads over ~10MB failed silently because the client dropped the response body on a 413.
This surfaces the error to the caller and retries once with chunked transfer.

closes #482
```

Stacked PR: add `Stacked on #480; only the last two commits belong to this PR.`

## Optional Sections

- **`## Change map`**: when several modules change or responsibility moves. Rows are modules, never files.

  ```markdown
  | Module | Before | After | Why |
  | --- | --- | --- | --- |
  | `upload/client` | Swallowed non-2xx | Maps 413 to `PayloadTooLarge`, retries once | Callers can tell size errors from network errors |
  ```

- **`## Architecture and behavior`**: a Mermaid diagram when ordering, async work or state transitions change. Name nodes after real modules. For fixes, a `Before` and `After` pair at the same level, then name the edge that changed.
- **`## Boundaries and risks`**: only real failure modes, migrations or external effects. Write `Not verified` rather than turning a risk into a claim.

  ```markdown
  | Invariant | Failure mode | Protection | Evidence |
  | --- | --- | --- | --- |
  | Retry at most once | Loop on persistent 413 | Attempt cap of 1 | `upload.test.ts` "does not retry twice" |
  ```

- **`## Visual changes`**: only when screenshots were requested. Before/after image row, then a label row (`Absent` for new states, `Removed` for deleted ones).
- **`## Rollout and follow-up`**: migrations, flags, known gaps, and whether each gap blocks merge.

<!--
Source references:
- https://github.com/antfu/skills/blob/main/skills/antfu-create-pr/references/pr-body.md (MIT)
- https://github.com/moeru-ai/airi/blob/main/.agents/skills/create-pr/references/pr-body.md (MIT)
-->
