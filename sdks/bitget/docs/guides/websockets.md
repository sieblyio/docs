---
title: "Bitget public WebSocket subscriptions"
description: "Stream Classic V2 tickers and understand V3 subscription shapes and recovery."
---

# Public WebSocket subscriptions

`WebsocketClientV2` connects when needed, maintains heartbeats and restores requested subscriptions after reconnects. This passive Classic Spot example runs until Ctrl+C without periodically polling or reconnecting:

<<< @/../examples/stream.ts

Save as `stream.ts` and run `node stream.ts` on Node.js 24 after installing `bitget-api`, or compile it with your TypeScript project.

## Subscription acknowledgement and data

`subscribeTopic()` returns a promise. Listen for `response` acknowledgements and `exception` failures as well as `update` messages; an open connection alone does not prove that the requested subscription succeeded. Route updates by their `arg` fields and inspect the channel and instrument before consuming the payload.

For Classic V2, `subscribeTopic('SPOT', 'ticker', 'BTCUSDT')` selects the public connection. `unsubscribeTopic()` accepts the same topic arguments. For multiple requests, await each promise or collect them with `Promise.all`.

## UTA public streams

Use `WebsocketClientV3` for UTA. Its `subscribe()` takes a topic/payload object and `WS_KEY_MAP.v3Public` as the second argument. For a ticker, set `topic: 'ticker'`, with `instType: 'spot'` and `symbol: 'BTCUSDT'` inside `payload`. This differs from Classic V2's `instId` and uppercase `SPOT`. See the [V3 reference](/api/classes/WebsocketClientV3#subscribe) before translating a Classic subscription.

## Recovery and shutdown

Treat data as stale during `reconnect` or unexpected closure. On `reconnected`, confirm subscriptions and wait for fresh data. Incremental order books require the exchange's channel-specific recovery procedure, not just continuing to apply deltas.

Call `closeAll()` on deliberate shutdown. Browser/mobile views should unsubscribe or close their owned connections when removed; do not reconnect on every render. Closing a socket does not cancel orders.

[Private account updates](/guides/private-streams) · [Production usage](/guides/production)
