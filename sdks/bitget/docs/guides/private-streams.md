---
title: "Bitget private account WebSocket streams"
description: "Observe Classic V2 or UTA V3 orders, balances and executions without polling after every command."
---

# Private account updates

Choose the stream matching your [account generation](/clients). Private subscriptions authenticate using server-side credentials. These examples observe events only; they do not place, amend or cancel orders.

## Unified Trading Account V3

Save as `private-stream.ts` beside the [credential helper](/guides/authentication). Use that guide's compile instructions with `private-stream.ts` as the entry file, then run:

```sh
node --env-file=.env dist/private-stream.js
```

<<< @/../examples/private-stream.ts

UTA private subscriptions use `WS_KEY_MAP.v3Private` and `instType: 'UTA'`, including account, order, fill and position topics. The order topic is singular, `order`; Classic uses `orders`. Keep the event payloads in private server-side handlers. The example logs only the routing argument.

## Classic V2 Spot

Save as `classic-private-stream.ts`, compile it with the same helper and run the emitted file:

<<< @/../examples/classic-private-stream.ts

```sh
node --env-file=.env dist/classic-private-stream.js
```

`subscribeTopic()` determines the private connection from the topic. The `default` selector follows the Classic private topic contract; it is not a Spot symbol. Futures and margin have different instrument types and available channels. Do not reuse a Spot topic blindly.

## Observe commands passively

Wait for authentication and successful acknowledgements for every required subscription before allowing dependent commands. Correlate order updates by `orderId` and your saved `clientOid`. Treat an order acknowledgement separately from execution. A quiet stream can be healthy when no account changes occur.

Keep order state, fills, balances and positions separate. Deduplicate executions by their exchange identifiers and preserve decimal precision. Do not poll REST after every successful event or command.

## Recover after a gap

Mark affected state stale on reconnect or unexpected closure. Confirm renewed authentication and subscriptions, buffer incoming events, then reconcile balances, open orders and executions using the matching REST client. Page through all relevant history, merge buffered events by identifiers and timestamps, and resume dependent actions only when the state is consistent.

For UTA use `getBalances()`, `getUnfilledOrders()`, `getHistoryOrders()` and **`getTradeFills()`**. `getFills()` is public market trade data and cannot recover your account executions. Classic Spot uses `getSpotAccountAssets()`, `getSpotOpenOrders()`, `getSpotHistoricOrders()` and `getSpotFills()`. Respect each endpoint's history window and pagination.

Do not assume every private topic provides a full initial snapshot or that reconnection replays missed events. Follow each channel's contract and keep recovery bounded by persistent checkpoints.

[UTA order management](/guides/orders) · [Production usage](/guides/production)
