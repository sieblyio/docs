---
title: "Bitget SDK production usage"
description: "Manage account state, reconnect recovery, rate limits, shutdown and upgrades."
---

# Production usage

Reuse clients and use the same account type and live/demo settings for REST and WebSockets. Keep credentials server-side with minimum permissions, synchronize time, use IP restrictions where supported and rotate keys regularly.

<!--@include: @/.vitepress/shared/production/request-policy.md-->

Bitget limits differ by endpoint, product and account. Budget startup and recovery traffic separately from normal commands. Check whether limits apply per account, IP or endpoint, and whether REST and WebSocket requests share them. Paginate history and open-order reads.

<!--@include: @/.vitepress/shared/production/account-state.md-->

## Bitget recovery events

Use `reconnect` and unexpected closure to mark affected state stale. On `reconnected`, confirm authentication and subscriptions, then recover missed updates. Buffer live events during recovery and use saved identifiers to remove duplicates.

Classic Spot uses V2 balances, open orders, history and fills. UTA uses V3 equivalents, including `getTradeFills()` for private executions. `getFills()` is public market data. Do not assume subscriptions replay every missed event. See [Private account updates](/guides/private-streams#recover-after-a-gap).

Keep order, execution, balance and position state separate. Scope state by account, environment, category and symbol, with position side where relevant. Spot amounts and futures quantities are not interchangeable. Maintain decimal precision throughout validation and accounting.

## Shut down cleanly

Stop accepting new work, record or resolve in-flight outcomes and save order identifiers and recovery checkpoints. Then call `closeAll()` on subscription clients and `getWSClient().closeAll()` on WebSocket API clients. Clear application-owned timers and listeners.

Closing a process or connection does not cancel exchange orders. Cancelling an order is a separate command, and cancellation cannot reverse a fill.

## Logging {#observe-failures-without-exposing-credentials}

Log selected operation names, sanitized codes, durations, reconnects and recovery results. Whole error and request objects can contain API keys or other private data even when some credentials have been redacted. Keep account payloads out of public logs.

<!--@include: @/.vitepress/shared/production/upgrading.md-->

After upgrades, check support for your account type, endpoints and demo environment, along with any changes to batch response types. Test account permissions and order handling separately from bundling and public connectivity.
