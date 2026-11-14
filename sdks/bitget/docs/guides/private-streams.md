---
title: "Bitget private account WebSocket streams"
description: "Subscribe to Classic V2 or UTA V3 order, balance and execution updates."
---

# Private account updates

Choose the stream for your [UTA or Classic account](/clients). Private subscriptions require server-side credentials. These examples read updates only; they do not place, amend or cancel orders.

## Unified Trading Account V3

Save as `private-stream.ts` beside the [credential helper](/guides/authentication). Use that guide's compile instructions with `private-stream.ts` as the entry file, then run:

```sh
node --env-file=.env dist/private-stream.js
```

<<< @/../examples/private-stream.ts

UTA private subscriptions use `WS_KEY_MAP.v3Private` and `instType: 'UTA'`, including account, order, fill and position topics. The order topic is singular, `order`; Classic uses `orders`. Handle account data on the server. The example logs only the topic information.

## Classic V2 Spot

Save as `classic-private-stream.ts`, compile it with the same helper and run the emitted file:

<<< @/../examples/classic-private-stream.ts

```sh
node --env-file=.env dist/classic-private-stream.js
```

`subscribeTopic()` determines the private connection from the topic. For `orders`, `default` subscribes to all Spot symbols; for `account`, it subscribes to all coins. Futures and margin use different instrument types and channels.

## Follow order updates {#observe-commands-passively}

Wait for authentication and all required subscription acknowledgements before placing orders. Match updates to orders using `orderId` and your saved `clientOid`. An order-command acknowledgement confirms acceptance, not execution. Follow order and fill events to track execution. A quiet stream can be healthy when no account changes occur.

Keep order state, fills, balances and positions separate. Deduplicate executions by their exchange identifiers and preserve decimal precision. Do not poll REST after every successful event or command.

## Recover after a gap

The SDK reconnects, authenticates and restores subscriptions automatically. Mark affected state stale during a connection gap. Buffer incoming events and reconcile balances, open orders and executions using the matching REST client. Page through all relevant history, merge buffered events by identifiers and timestamps, and resume trading decisions only when account state is current.

For UTA use `getBalances()`, `getUnfilledOrders()`, `getHistoryOrders()` and `getTradeFills()`. `getFills()` is public market trade data and cannot recover your account executions. Classic Spot uses `getSpotAccountAssets()`, `getSpotOpenOrders()`, `getSpotHistoricOrders()` and `getSpotFills()`. Respect each endpoint's history window and pagination.

UTA's `account` topic sends initial data, but `order` and `fill` do not. Load open orders and any required execution history through REST. Reconnection does not necessarily replay missed events. Save recovery checkpoints so later history queries cover the gap without reloading all history.

[UTA order management](/guides/orders) · [Production usage](/guides/production)
