---
title: "HTX WebSocket API trading requests"
description: "Send Spot and derivatives trading commands with WebsocketAPIClient and handle uncertain outcomes."
---

# WebSocket API requests

`WebsocketAPIClient` sends trading commands and returns a promise for each response. It wraps `WebsocketClient`, opening and authenticating the appropriate trading connection as needed. Subscription streams and trading commands use different connections.

## Submit a Spot order

This exported function submits a live order only when called. Validate the account and instrument constraints, and persist the client order ID before calling it:

<<< @/../examples/ws-api.ts

The one-shot example closes its client in `finally`. In a long-running service, reuse the wrapper and close it during application shutdown instead. Closing the connection does not cancel an accepted order.

## Choose the command family

Spot methods include `submitSpotOrder()`, `submitSpotBatchOrders()` and `cancelSpotOrders()`. Derivatives methods distinguish linear swaps, delivery contracts and coin-margined swaps. V5 methods such as `placeLinearSwapOrder()` have a different request contract from legacy `submitLinearSwapOrder()`.

Use [WebsocketAPIClient](/api/classes/WebsocketAPIClient) for supported wrappers, or `sendWSAPIRequest(wsKey, operation, params)` for typed low-level requests. The SDK handles signatures and request correlation; do not copy REST headers or handcraft login messages for these wrappers.

## Handle replies and disconnects

Command replies retain the exchange envelope. Inspect the operation's response type and per-item results for batches. A disconnect rejects in-flight promises even if the server may already have accepted a command.

After an uncertain order or cancellation, reconcile private events and REST order/fill reads before retrying. Automatic reconnection and reauthentication do not make a rejected promise safe to replay. See [Order recovery](/guides/orders#recover-an-uncertain-outcome).
