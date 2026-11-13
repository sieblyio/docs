---
title: "OKX WebSocket API requests"
description: "Use promise-based trading commands over the authenticated WebSocket connection."
---

# WebSocket API requests

Use `WebsocketAPIClient` to submit, amend and cancel orders over an authenticated WebSocket connection. Use `WebsocketClient` subscriptions separately to follow the resulting account changes.

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

## Cancel an existing order

This example cancels the remaining quantity of an existing `BTC-USDT` order. It uses live trading by default. Set `OKX_CLIENT_ORDER_ID` to an existing order you intend to cancel. Save the example as `ws-api.ts` beside the [credential helper](/guides/authentication). Follow the [compile instructions](/guides/authentication#compile-and-run-the-examples) with `ws-api.ts` as the entry file and use the same account, region and live/demo environment as the original order:

<<< @/../examples/ws-api.ts

```sh
node --env-file=.env dist/ws-api.js
```

The example looks up `BTC-USDT` with `getInstruments()` and passes its numeric `instIdCode` to the WebSocket command. Do not copy the REST `instId` parameter into WebSocket trading requests: use the instrument code required by the [current WebSocket API](https://www.okx.com/docs-v5/en/#order-book-trading-trade-ws-cancel-order).

Unlike the REST client, the WebSocket wrapper returns a response envelope containing `code`, `msg` and `data`. Inspect the top-level result and each item's `sCode` and `sMsg`. Transport or request errors may also reject the promise. Batch responses require checking every item; some items can succeed while others fail.

## Available commands

- [`submitNewOrder()`](/api/classes/WebsocketAPIClient#submitneworder): submit an order.
- [`amendOrder()`](/api/classes/WebsocketAPIClient#amendorder): amend an existing order.
- [`cancelOrder()`](/api/classes/WebsocketAPIClient#cancelorder): cancel remaining quantity.
- [`getWSClient()`](/api/classes/WebsocketAPIClient#getwsclient): access lifecycle events and close the underlying client.

The wrapper opens and authenticates connections as needed. A long-running service should retain its client instead of creating and closing it for every order; this single-command example closes on completion.

For lower-level use, [`sendWSAPIRequest()`](/api/classes/WebsocketClient#sendwsapirequest) takes a connection key, operation and parameters. Obtain private routing with `getMarketWsKey('private')` rather than hardcoding a connection key or URL. Keep `market` and `demoTrading` consistent across clients.

An order can fill while cancellation is being processed. Follow the private order stream and check unknown outcomes as described in [Order management](/guides/orders#recover-an-uncertain-outcome). Never replay a timed-out trade automatically.
