---
name: security
description: "Backend security and configuration rules: the OWASP API risks that matter most, authorization, CSRF vs CORS, secrets, tokens and config loading. Load when adding auth, permissions, endpoints that change state, secrets or configuration."
---

# Security

## Rules

- **Authorization per object (OWASP API1):** filter by owner or tenant in the query. Never trust an ID from the client to imply access.
- **Deny by default:** every endpoint declares its permission; an undeclared one is denied.
- **Property exposure (API3):** respond with explicit DTOs, never the database model. Accept only the fields a caller may set.
- **Resource consumption (API4):** cap body size, page size, upload size and request rate.
- **SSRF (API7):** never fetch a URL a user supplied without an allow-list.
- **CSRF is not CORS.** CORS controls who reads responses; CSRF is about state-changing requests the attacker doesn't need to read. Cookie sessions need CSRF protection; GET and HEAD never change state.
- **Tokens and randomness:** cryptographic randomness for tokens and keys, never a general-purpose RNG. Hash passwords with a slow, salted algorithm.
- **Secrets:** never in code, logs, issues or PRs. Prefer files or a secret manager over environment variables when the platform offers them.
- **Config:** one typed struct loaded from the environment and validated once at startup. Invalid config exits non-zero with a clear message.
- **Dependencies:** scan for known vulnerabilities in CI on every PR and on a schedule, since new CVEs appear without code changes. Each new direct dependency needs a reason.

<!--
Source references:
- https://api-security.owasp.org/editions/2023/en/0x11-t10
- https://words.filippo.io/csrf/
- https://www.12factor.net/
-->
