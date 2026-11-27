---
title: "Bitget public WebSocket subscriptions"
description: "Stream UTA V3 tickers and understand subscription acknowledgements, recovery and Classic V2 alternatives."
---

# Public WebSocket subscriptions

`WebsocketClientV3` connects when needed, maintains heartbeats and restores requested subscriptions after reconnects.

## Subscribe to ticker updates

Install `bitget-api` and save this example as `stream.ts`. It subscribes to public BTCUSDT Spot ticker updates without credentials.

<<< @/../examples/stream.ts

Run it on Node.js 24, or compile it with your TypeScript project:

```sh
node stream.ts
```

The example logs subscription responses and incoming market updates. Leave it running to receive new prices, then press Ctrl+C to close the connection.

## Subscription acknowledgement and data

`subscribe()` returns a promise. Listen for `response` acknowledgements and `exception` failures as well as `update` messages; check acknowledgements to confirm that the exchange accepted each subscription. Route updates using `arg.topic`, `arg.instType` and `arg.symbol`. For the ticker subscription, `data[0].lastPrice` is the latest price as a decimal string.

`subscribe()` takes a topic/payload object and `WS_KEY_MAP.v3Public` as the second argument. For multiple topics on that connection, pass an array of objects. Use `unsubscribe()` with the same topic/payload and connection key when the subscription is no longer needed. See the [V3 reference](/api/classes/WebsocketClientV3#subscribe) and [ticker channel documentation](https://www.bitget.com/docs/uta/websocket/public/Tickers-Channel).

## Classic V2 alternative

Existing Classic integrations can use `WebsocketClientV2.subscribeTopic('SPOT', 'ticker', 'BTCUSDT')`, with `unsubscribeTopic()` for cleanup. Classic topics use `instId` and uppercase `SPOT`, unlike V3's `symbol` and lowercase `spot`. Classic ticker prices use `lastPr`, not V3's `lastPrice`. Check the topic and response fields when switching between API versions.

## Order book and candle channel changes {#channel-changes}

From 1 December 2026, Bitget changes the V3 `books50` channel from a full snapshot on every push to incremental pushes: one `snapshot` after you subscribe, then `update` messages with only the changed levels (size `0` removes a level). `pseq` is also set on `books50` from then on, so you can detect a missed message. Demo trading already behaves this way. Code that replaces the whole book on every message will break, so branch on the event's `action`: reset the book on `snapshot` and merge levels on `update`. On a gap in `pseq`, resubscribe to get a fresh snapshot. `books1` and `books5` stay full snapshots.

The `kline` and `publicTrade` channels no longer send an initial snapshot after subscribing, only `update` messages. Load history through REST first.

See Bitget's [update preview](https://www.bitget.com/docs/uta/update-preview) for the exact dates.

## Recovery and shutdown

The SDK restores subscriptions automatically after reconnecting; you do not need to subscribe again. The `reconnected` event means the socket is open, not that fresh data has arrived. Treat cached data as stale until fresh updates arrive. For incremental order books, follow the channel's recovery procedure before applying further deltas.

Call `closeAll()` when shutting down. Browser/mobile views should unsubscribe or close their owned connections when removed; do not reconnect on every render. Closing a socket does not cancel orders.

[Private account updates](/guides/private-streams) · [Production usage](/guides/production)
