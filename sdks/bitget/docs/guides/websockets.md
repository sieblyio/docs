---
title: "Bitget public WebSocket subscriptions"
description: "Stream UTA V3 tickers and understand subscription acknowledgements, recovery and Classic V2 alternatives."
---

# Public WebSocket subscriptions

`WebsocketClientV3` connects when needed, maintains heartbeats and restores requested subscriptions after reconnects. This passive UTA Spot example runs until Ctrl+C without periodically polling or reconnecting:

<<< @/../examples/stream.ts

Save as `stream.ts` and run `node stream.ts` on Node.js 24 after installing `bitget-api`, or compile it with your TypeScript project.

## Subscription acknowledgement and data

`subscribe()` returns a promise. Listen for `response` acknowledgements and `exception` failures as well as `update` messages; an open connection alone does not prove that the requested subscription succeeded. Route updates using `arg.topic`, `arg.instType` and `arg.symbol`. For the ticker subscription, `data[0].lastPrice` is the latest price as a decimal string.

`subscribe()` takes a topic/payload object and `WS_KEY_MAP.v3Public` as the second argument. For multiple topics on that connection, pass an array of objects. Use `unsubscribe()` with the same topic/payload and connection key when the subscription is no longer needed. See the [V3 reference](/api/classes/WebsocketClientV3#subscribe) and [official ticker channel contract](https://www.bitget.com/docs/uta/websocket/public/Tickers-Channel).

## Classic V2 alternative

Existing Classic integrations can use `WebsocketClientV2.subscribeTopic('SPOT', 'ticker', 'BTCUSDT')`, with `unsubscribeTopic()` for cleanup. Classic topics use `instId` and uppercase `SPOT`, unlike V3's `symbol` and lowercase `spot`. Classic ticker prices use `lastPr`, not V3's `lastPrice`. Do not mix the topic or response shapes between API generations.

## Recovery and shutdown

Treat data as stale during `reconnect` or unexpected closure. On `reconnected`, confirm subscriptions and wait for fresh data. Incremental order books require the exchange's channel-specific recovery procedure, not just continuing to apply deltas.

Call `closeAll()` on deliberate shutdown. Browser/mobile views should unsubscribe or close their owned connections when removed; do not reconnect on every render. Closing a socket does not cancel orders.

[Private account updates](/guides/private-streams) · [Production usage](/guides/production)
