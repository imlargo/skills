---
name: testing
description: "How imlargo tests Go: table tests, comparisons and failure messages, fakes, integration tests with Postgres, time and leak testing, and what runs where. Load when writing or fixing Go tests."
---

# Testing

## Rules

- **Standard library first.** Compare with `cmp.Diff` (go-cmp), not `reflect.DeepEqual`. Failure messages read `Func(%v) = %v, want %v`, got before want.
- **Table tests:** a `tests` slice, loop variable `tt`, fields `give` and `want`. No branches or mock flags inside the table: split the test instead.
- `t.Fatal` only from the test's own goroutine.
- **Real over mocked:** test against a real transport and backend (`httptest`, a real Postgres) before reaching for mocks. Fakes live in a `<pkg>test` package. Generated mocks use `go.uber.org/mock`.
- **Database tests** use `postgres/pgtest` for a fresh migrated database per test. They may skip locally without `TEST_DATABASE_URL`, but CI sets `REQUIRE_DB_TESTS=1` so a missing database fails instead of passing silently.
- **Postgres in containers:** wait explicitly with `wait.ForLog("database system is ready to accept connections").WithOccurrence(2)` (Postgres restarts once during init).
- **Time:** `testing/synctest` instead of injected clocks. Inside the bubble, I/O and mutexes don't count as durable blocking.
- **Leaks:** goleak's `VerifyTestMain` in packages with `t.Parallel`.
- Benchmarks use `for b.Loop()`. Fuzz failures stay in `testdata/fuzz/` as regressions.
- `-race -shuffle=on` runs in CI, not locally on a weak machine.
