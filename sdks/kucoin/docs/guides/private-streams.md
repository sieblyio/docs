---
title: "KuCoin private account updates over WebSockets"
description: "Subscribe to Classic Spot balance and order updates and recover state after disconnects."
---

# Private account updates

Use private subscriptions for ongoing balance and order changes. Use REST for initial state, explicit lookups and recovery after gaps.

## Subscribe to Spot updates

Save this as `private-stream.ts` beside the [credential helper](/guides/authentication). Follow the [compile instructions](/guides/authentication#compile-and-run-the-examples) with `private-stream.ts` as the entry file:

<<< @/../examples/private-stream.ts

```sh
node --env-file=.env dist/private-stream.js
```

Press Ctrl+C to close the connection. The example prints event labels for local inspection; it does not maintain a local account store. Keep raw private payloads out of shared logs.

The SDK requests a private connection token using your credentials and opens `spotPrivateV1`. It then subscribes to `/account/balance` and `/spotMarket/tradeOrdersV2`. The order topic includes order lifecycle and execution updates. A quiet stream can be normal when the account has no activity.

Use the matching Classic Spot account and region. Futures and Pro V2 private streams use different keys, topics and payloads; consult the [WebSocket reference](/api/classes/WebsocketClient) before adapting this workflow.

## Initialize without losing changes

Confirm the required subscriptions and buffer incoming events while loading balances and open orders through REST. Use `getBalances()` and `getHFActiveOrdersPaginated({ symbol, pageNum, pageSize })`, with pagination for each relevant pair. `getHFActiveSymbols()` can identify pairs with open orders.

Merge buffered updates using order IDs, execution identifiers and update times. Deduplicate fills and preserve terminal order states so an older snapshot cannot overwrite newer events. Separate REST reads are not an atomic account snapshot.

## Recover after a gap

The SDK reconnects and restores subscriptions automatically. On `reconnect`, mark affected state stale and pause decisions that depend on it. Use `reconnected` to start recovery while buffering new events:

1. Confirm the required subscriptions have been restored, buffer updates, then refresh balances and all relevant open orders.
2. Query `getHFCompletedOrders()` and `getHFFilledOrders()` across the outage, with overlap and pagination. An order missing from open orders may have filled or been cancelled.
3. Resolve uncertain commands by their saved identifiers. Merge and deduplicate history and buffered events.
4. Resume stream-driven decisions only when the required subscriptions are healthy and account state is current.

Keep recovery reads within exchange rate limits and history-retention limits. If you temporarily fall back to REST polling, label the data as delayed and reconcile before switching back to streams.

[Order management](/guides/orders) · [Production usage](/guides/production)
