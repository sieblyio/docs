---
title: "Bitget SDK production usage"
description: "Manage account state, reconnect recovery, rate limits, shutdown and upgrades."
---

# Production usage

Reuse long-lived clients. Match account generation and live/demo settings across REST and WebSocket connections. Keep credentials server-side with minimum permissions, synchronize time, use IP restrictions where supported and rotate keys according to your operational policy.

<!--@include: @/.vitepress/shared/production/request-policy.md-->

Bitget limits differ by endpoint, product and account. Budget startup and recovery traffic separately from normal commands. Read each endpoint's limit scope rather than assuming REST and WebSocket operations have independent capacity. Paginate history and open-order reads.

<!--@include: @/.vitepress/shared/production/account-state.md-->

## Bitget recovery events

Use `reconnect` and unexpected closure to mark affected state stale. `reconnected` begins recovery; it does not prove authentication, subscription acknowledgement or reconciliation has finished. Buffer live events while repairing gaps and deduplicate by persistent identifiers.

Classic Spot uses V2 balances, open orders, history and fills. UTA uses V3 equivalents, including `getTradeFills()` for private executions. `getFills()` is public market data. Do not assume subscriptions replay every missed event. See [Private account updates](/guides/private-streams#recover-after-a-gap).

Keep order, execution, balance and position state separate. Scope state by account, environment, category and symbol, with position side where relevant. Spot amounts and futures quantities are not interchangeable. Maintain decimal precision throughout validation and accounting.

## Shut down cleanly

Stop accepting new work, record or resolve in-flight outcomes and persist identifiers/checkpoints. Then call `closeAll()` on subscription clients and `getWSClient().closeAll()` on WebSocket API clients. Clear application-owned timers and listeners.

Closing a process or connection does not cancel exchange orders. Cancelling an order is a separate command, and cancellation cannot reverse a fill.

## Logging {#observe-failures-without-exposing-credentials}

Log selected operation names, sanitized codes, durations, reconnects and recovery results. Raw error/request objects can contain API keys or other private data even when some credentials have been redacted. Keep account payloads out of public logs.

<!--@include: @/.vitepress/shared/production/upgrading.md-->

Recheck account generation, endpoint availability, demo support and batch result types after upgrades. Public connectivity and bundling checks do not establish private permissions or trading behavior.
