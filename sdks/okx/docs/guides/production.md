---
title: "OKX production usage"
description: "Manage connection health, account-state recovery, request policy and upgrades."
---

# Production usage

Use long-lived clients with a consistent region and environment. Keep credentials on the server, use the minimum permissions and an IP allowlist, synchronize time and rotate keys regularly.

<!--@include: @/.vitepress/shared/production/request-policy.md-->

OKX limits vary by endpoint, instrument, account and operation. Some trading limits are shared between REST and WebSocket requests. Moving commands to WebSockets does not remove those limits. Paginate history and open-order reads and budget reconciliation traffic separately from routine requests.

<!--@include: @/.vitepress/shared/production/account-state.md-->

## OKX recovery events

Mark affected state stale on `reconnect` or unexpected `close` events. The SDK reconnects, authenticates and restores subscriptions automatically. Use `reconnected` to start recovering missed account updates; it signals an open socket, not completed account-state recovery. The `orders` channel does not send an initial list of open orders. Load them through REST and combine order history and fills with events buffered during recovery. See [Private account updates](/guides/private-streams).

For derivatives, key state by account, instrument and position side where applicable. Derivative contract sizes and Spot quantities are not interchangeable. Keep balance, order and position events separate rather than assuming they arrive together.

## Shut down cleanly

Stop accepting new work, resolve or record in-flight command outcomes, persist order identifiers and recovery checkpoints, then call `closeAll()` on subscription clients and `getWSClient().closeAll()` on WebSocket API clients. Remove timers and listeners owned by your application. Closing a connection does not cancel an order; cancellation is a separate trading action.

## Logging {#observe-failures-without-exposing-credentials}

Record operation names, sanitized response codes, duration, retries and reconnects. Select fields using the SDK's [error format](/guides/errors); whole request and error objects can contain credentials.

<!--@include: @/.vitepress/shared/production/upgrading.md-->


Recheck regional and demo support, request/response types and order error handling when upgrading. Test account permissions and order handling separately from public connectivity.
