---
title: "KuCoin WebSocket subscriptions"
description: "Subscribe to Classic Spot ticker updates and handle KuCoin connection recovery."
---

# WebSocket subscriptions

`WebsocketClient` opens connections as needed, maintains heartbeats and restores subscriptions after reconnects.

## Subscribe to ticker updates

Install `kucoin-api` and save this as `stream.ts`. It subscribes to public BTC-USDT Spot ticker updates without credentials.

<<< @/../examples/stream.ts

Run it on Node.js 24, or compile it with your TypeScript project:

```sh
node stream.ts
```

Leave it running for new prices, then press Ctrl+C to close the connection.

## Subscription acknowledgements and data

`subscribe(requests, wsKey)` returns `void`. Observe `response` for acknowledgements and `exception` for failures. Opening a socket or returning from `subscribe()` does not prove the exchange accepted the topic.

Classic V1 data arrives on `update`, with a `topic`, `subject` and `data`. Check the topic before reading its payload. Pass an array to subscribe to multiple topics on the same connection. Use `unsubscribe()` with the same requests and connection key to remove them.

The example uses `/market/ticker:BTC-USDT` on `spotPublicV1`. Classic futures topics use a futures connection, such as `futuresPublicV1`, and futures contract identifiers. Pro V2 uses `{ topic, payload }` requests and separate keys such as `spotPublicProV2`. Do not reuse V1 topics or message shapes for V2.

V1 connections begin with a REST token request, even for public topics. The SDK performs this step automatically; see [Proxies](/guides/proxies) if the socket cannot open through your network route.

## Connection recovery

The SDK restores subscriptions automatically; you do not need to subscribe again after reconnecting. Mark cached data stale on `reconnect` or unexpected closure. The `reconnected` event signals an open socket, not fresh data or recovered history.

Wait for new prices before using a cached ticker. Rebuild incremental order books after gaps and [reconcile private account state](/guides/private-streams#recover-after-a-gap) through REST.

Call `closeAll()` at shutdown. Closing a connection does not cancel an order.

[Private account updates](/guides/private-streams) · [WebsocketClient reference](/api/classes/WebsocketClient)
