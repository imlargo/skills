---
name: requirements
description: "imlargo's specs format: a compact requirements document with glossary, roles, business rules, numbered requirements with acceptance criteria, quality requirements, non-goals and open decisions. Load when gathering, writing or reviewing requirements or specs."
---

# Requirements

A compact take on an industry SRS. Every line must be needed to build or verify the product.

## Specs Structure

1. **Purpose:** one paragraph on what the product does and for whom.
2. **Glossary:** business terms, defined once and used exactly everywhere (code, UI, issues).
3. **Roles:** who uses it and what each role can do.
4. **Business rules** (`BR-01`): rules that hold across features, such as "an approved order can't be edited". Requirements reference them instead of repeating them.
5. **Requirements** (`R-01`), grouped by area. Each one has a behavior, its acceptance criteria and a priority (Must, Should, Could).
6. **Quality requirements:** only the measurable ones that matter (response time, availability, audit, data retention).
7. **Out of scope:** explicit non-goals for this phase.
8. **Open decisions:** provisional choices marked `[D]`, with who decides. Built so they're cheap to change.

## Writing a Requirement

- One behavior per requirement: atomic, unambiguous, verifiable.
- State what the system does, not how.
- Acceptance criteria are concrete and testable. In production projects, each one gets an automated test.
- Never invent a business rule. Missing information goes to Open decisions.

## Example

```md
### R-07 Approve a purchase request (Must)
A supervisor approves or rejects a pending purchase request. Applies BR-03.
- Approving moves it to Approved and notifies the requester.
- Rejecting requires a reason, shown to the requester.
- A requester can't approve their own request.
```
