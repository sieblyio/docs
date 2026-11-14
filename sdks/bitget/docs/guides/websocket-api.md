---
title: "Bitget UTA WebSocket API requests"
description: "Send promise-based V3 order commands using WebsocketAPIClient and inspect acknowledgement codes."
---

# UTA WebSocket API requests

`WebsocketAPIClient` returns promises for UTA V3 trading requests. Use a separate private subscription client for account events. Classic V2 trading is not supported by this client. Methods include `submitNewOrder()`, `updateOrder()`, `cancelOrder()` and batch operations. The underlying `WebsocketClientV3` is available through `getWSClient()`.

## Cancel one existing UTA Spot order

This example cancels the remaining quantity of the order identified by `BITGET_CLIENT_ORDER_ID`. It uses live trading by default. Configure [credentials](/guides/authentication), select the intended account/environment and keep the separate [UTA private stream](/guides/private-streams) running. Save as `ws-api.ts`, compile with the credential helper and run only when you intend to cancel that order:

<<< @/../examples/ws-api.ts

```sh
node --env-file=.env dist/ws-api.js
```

The wrapper connects and authenticates automatically. This one-shot example closes its own command connection after completion; a production service can reuse a long-lived client. Closing it does not cancel other orders or close your separate private subscription client.

## Request and response differences

- The wrapper's category argument is lowercase, such as `spot` or `usdt-futures`. REST requests use uppercase categories such as `SPOT`.
- WebSocket command success uses `code: '0'`, while REST success uses `code: '00000'`.
- WebSocket response payloads are in `args`, not REST's `data`.
- Placement uses `submitNewOrder(category, params)`. Amendment uses `updateOrder(category, params)`, not the REST name `modifyOrder()`.

Inspect top-level codes and each item's result where supplied by batch endpoints. A resolved promise is not proof that every batch item succeeded or that an order filled. Handle rejected requests as well. Check each item's outcome before retrying a partially successful batch.

## Recovery

A command acknowledgement confirms acceptance. Follow private order and fill events to keep account state current. A rejected or timed-out command may require reconciliation before retrying; use the saved order IDs and [targeted REST recovery](/guides/orders#recover-an-uncertain-outcome).

The SDK manages the connection and matches responses to requests. Your application must save order IDs, respect rate limits and recover missed account changes. Moving a request from REST to WebSockets does not remove exchange rate limits.

[WebsocketAPIClient reference](/api/classes/WebsocketAPIClient) · [Bitget WebSocket cancellation API](https://www.bitget.com/docs/uta/websocket/private/Cancel-Order-Channel)
