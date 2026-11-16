---
title: "Gate.io WebSocket API requests"
description: "Read and manage Spot and perpetual-futures orders with promise-based WebSocket API methods."
---

# WebSocket API requests

Use `WebsocketAPIClient` for request/response operations over an authenticated connection. Use `WebsocketClient` subscriptions separately for ongoing fills and account changes.

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

## Read an existing Spot order

Set `GATEIO_ORDER_ID` in `.env` to an existing BTC_USDT exchange order ID. Save this as `ws-api.ts` beside the [credential helper](/guides/authentication). Follow the [compile instructions](/guides/authentication#compile-and-run-the-examples) with `ws-api.ts` as the entry file:

<<< @/../examples/ws-api.ts

```sh
node --env-file=.env dist/ws-api.js
```

Use the same account and environment as the original order. This example only reads order status and closes its connection afterward.

Unlike REST methods, WebSocket API methods return an envelope. The operation's result is in `response.data.result`. Failed requests reject; batch results still require checking individual items. Avoid logging the full envelope or raw error because the SDK may attach signed request context.

## Available commands

- [`submitNewSpotOrder()`](/api/classes/WebsocketAPIClient#submitnewspotorder), [`updateSpotOrder()`](/api/classes/WebsocketAPIClient#updatespotorder) and [`cancelSpotOrder()`](/api/classes/WebsocketAPIClient#cancelspotorder) manage Spot orders.
- [`submitNewFuturesOrder()`](/api/classes/WebsocketAPIClient#submitnewfuturesorder) and the other futures methods use the USDT perpetual connection by default. Select the supported futures connection key when needed.
- [`getWSClient()`](/api/classes/WebsocketAPIClient#getwsclient) exposes lifecycle events and shutdown.

The wrapper opens and authenticates connections as needed. To establish the Spot connection ahead of time, await `getWSClient().connectWSAPI('spotV4')`. For lower-level requests, use `sendWSAPIRequest('spotV4', operation, params)` on a `WebsocketClient`.

A long-running service should retain its client rather than reconnecting for each request. Set `useTestnet: true` on the wrapper for [TestNet](/guides/testing-environments).

In-flight requests can reject when a connection closes, even if the exchange processed them. [Resolve uncertain order outcomes](/guides/orders#recover-an-uncertain-outcome) before retrying a trading command.
