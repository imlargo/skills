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
- **Database tests** get a fresh migrated database per test (the project's helper, such as medusa's `pgtest`). If they skip locally without a database, CI must make them required so a missing database fails instead of passing silently.
- **Postgres in containers:** wait explicitly with `wait.ForLog("database system is ready to accept connections").WithOccurrence(2)` (Postgres restarts once during init).
- **Time:** `testing/synctest` instead of injected clocks. Inside the bubble, I/O and mutexes don't count as durable blocking.
- **Leaks:** goleak's `VerifyTestMain` in packages with `t.Parallel`.
- Benchmarks use `for b.Loop()`. Fuzz failures stay in `testdata/fuzz/` as regressions.
- `-race -shuffle=on` runs in CI, not locally on a weak machine.
