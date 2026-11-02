---
name: concurrency
description: "Goroutine ownership, worker pools, mutexes and channels, and graceful shutdown in imlargo's Go services. Load when starting goroutines, writing workers or pools, sharing state, or handling shutdown."
---

# Concurrency

## Rules

- **No fire-and-forget goroutines.** Each one can be stopped and waited for. Long-lived ones sit behind a type with `Close`, `Stop` or `Shutdown`.
- **Prefer synchronous functions;** let the caller add concurrency.
- **Worker pools:** `errgroup.WithContext` with `SetLimit(n)`. It cancels on the first error. Don't reuse a group for different tasks.
- **Fan-out without errors:** `sync.WaitGroup.Go`, not a manual `Add`.
- **Channels** are unbuffered or size one unless there's a measured reason. Channels move ownership; a mutex guards caches and state, whichever is simpler.
- **Atomics:** the standard library's typed atomics.

## Shutdown

When the project has a lifecycle manager (medusa's `lifecycle`), it does this. Otherwise:

1. `signal.NotifyContext(ctx, os.Interrupt, syscall.SIGTERM)`.
2. Run the server in a goroutine; treat `http.ErrServerClosed` as normal.
3. On cancel, call `Shutdown` with a bounded timeout and wait for it to return before exiting.
4. Then stop workers, flush metrics and logs, close pools.

`Shutdown` doesn't wait for hijacked connections: SSE and WebSockets need `RegisterOnShutdown` or their own tracking.

<!--
Source references:
- https://github.com/uber-go/guide/blob/master/style.md (CC BY 4.0)
- https://pkg.go.dev/golang.org/x/sync/errgroup
- https://pkg.go.dev/net/http#Server.Shutdown
-->
