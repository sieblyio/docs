---
title: "KuCoin SDK production usage"
description: "Manage request limits, connection health, account recovery and clean shutdown."
---

# Production usage

Use long-lived clients for a consistent account and region. Keep credentials on the server, use minimum permissions and an IP allowlist, synchronize the clock and rotate keys regularly.

<!--@include: @/.vitepress/shared/production/request-policy.md-->

KuCoin limits depend on the endpoint and operation. Budget account-recovery reads separately from routine traffic and paginate history. WebSocket commands do not remove exchange trading limits.

<!--@include: @/.vitepress/shared/production/account-state.md-->

## KuCoin recovery events

Mark affected state stale on `reconnect` or unexpected `close`. The SDK reconnects and restores subscriptions, but `reconnected` signals an open socket rather than complete account recovery. Buffer new private events while refreshing balances, orders and fills through REST. See [Private account updates](/guides/private-streams).

For derivatives, key state by account, contract and position side where applicable. Keep Spot quantities separate from contract sizes. Do not assume balances, fills and positions arrive together.

## Shut down cleanly

Stop accepting new work, resolve or record in-flight outcomes, and persist order identifiers and recovery checkpoints. Call `closeAll()` on subscription clients and `getWSClient().closeAll()` on WebSocket API clients. Remove application-owned timers and listeners.

Closing a connection does not cancel orders. Any cancellation is a separate trading action whose outcome must also be checked.

## Logging {#observe-failures-without-exposing-credentials}

Record sanitized operation names, response codes, duration, retry counts and reconnects. Use the [error format](/guides/errors) to select fields rather than serializing entire failures. Keep credentials, signed request context and account data out of shared diagnostics.

<!--@include: @/.vitepress/shared/production/upgrading.md-->

Test region selection, request and response types, permissions and order recovery separately from public connectivity when upgrading.
