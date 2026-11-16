---
title: "KuCoin WebSocket API requests"
description: "Manage Spot, margin and futures orders with promise-based KuCoin WebSocket API methods."
---

# WebSocket API requests

Use `WebsocketAPIClient` for request/response operations over an authenticated connection. Use `WebsocketClient` subscriptions separately for ongoing fills and account changes.

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

## Cancel an existing Spot order

This example sends a live cancellation. Set `KUCOIN_ORDER_ID` in `.env` to an existing BTC-USDT exchange order ID that you intend to cancel. Save this as `ws-api.ts` beside the [credential helper](/guides/authentication). Follow the [compile instructions](/guides/authentication#compile-and-run-the-examples) with `ws-api.ts` as the entry file:

<<< @/../examples/ws-api.ts

```sh
node --env-file=.env dist/ws-api.js
```

Use the same account as the original order. This release uses fixed global WebSocket API hosts; `apiRegion` does not select a regional WebSocket API endpoint. Confirm account access before using this example. The example closes its connection afterward. Check order status through REST or private updates to confirm the cancellation outcome and any fills.

Responses retain the WebSocket API envelope: `code`, `op`, `data` and timing fields. The operation's result is in `response.data`. Failed requests reject; batch responses still require checking each item.

## Available commands

- [`submitNewSpotOrder()`](/api/classes/WebsocketAPIClient#submitnewspotorder), [`modifySpotOrder()`](/api/classes/WebsocketAPIClient#modifyspotorder) and [`cancelSpotOrder()`](/api/classes/WebsocketAPIClient#cancelspotorder) manage Spot orders on `wsApiSpotV1` by default.
- [`submitMarginOrder()`](/api/classes/WebsocketAPIClient#submitmarginorder) uses the Spot WebSocket API connection.
- [`submitFuturesOrder()`](/api/classes/WebsocketAPIClient#submitfuturesorder) and futures cancellation methods use `wsApiFuturesV1` by default.
- [`getWSClient()`](/api/classes/WebsocketAPIClient#getwsclient) exposes lifecycle events and shutdown.

The wrapper connects and authenticates as needed. To prepare the Spot connection ahead of time, await `getWSClient().connectWSAPI('wsApiSpotV1')`. For lower-level requests, use `sendWSAPIRequest('wsApiSpotV1', operation, params)` on a `WebsocketClient`.

A long-running service should retain its client rather than reconnecting for every request. There is no supported testnet constructor option. Do not confuse the dedicated command keys with `spotPrivateV1` or other subscription connections.

In-flight requests can reject when a connection closes, even if the exchange processed them. [Resolve uncertain order outcomes](/guides/orders#recover-an-uncertain-outcome) before retrying a trading command.
