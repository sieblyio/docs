---
title: "OKX WebSocket subscriptions"
description: "Subscribe to public market updates and handle connection recovery."
---

# WebSocket subscriptions

`WebsocketClient` opens connections as needed, maintains heartbeats and resubscribes after reconnects.

## Subscribe to ticker updates

Install `okx-api` and save this example as `stream.ts`. It subscribes to public BTC-USDT Spot ticker updates without credentials.

<<< @/../examples/stream.ts

Run it on Node.js 24, or compile it with your TypeScript project:

```sh
node stream.ts
```

The example logs subscription responses and incoming market updates. Leave it running to receive new prices, then press Ctrl+C to close the connection.

## Subscription acknowledgements and data

`subscribe()` returns an array of promises because channels can use different connections. Use `Promise.all(ws.subscribe(...))`, rather than awaiting the array itself. Observe `response` for subscription acknowledgements and `exception` for failures. An open socket does not prove a subscription succeeded.

The `update` event carries channel messages. Read `arg.channel` and instrument identifiers before dispatching the data to your handlers. A quiet private stream can be healthy when nothing changes.

Subscribe to multiple channels with an array. Use `unsubscribe()` with the same channel arguments when a view or strategy no longer needs them. Its returned promise array can also be awaited with `Promise.all`.

## Connection recovery

Treat data as stale on `reconnect` and unexpected closure. On `reconnected`, wait for restored subscriptions and fresh data. For incremental books, rebuild according to the channel documentation; for accounts, [reconcile missed state](/guides/private-streams#recover-after-a-gap).

Call `closeAll()` when shutting down to stop connections. This does not cancel orders.

[Private account updates](/guides/private-streams) · [WebsocketClient reference](/api/classes/WebsocketClient)
