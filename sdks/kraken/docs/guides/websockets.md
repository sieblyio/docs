---
title: "Kraken WebSocket subscriptions"
description: "Subscribe to Kraken Spot ticker updates with automatic reconnects and default SDK logging."
---

# Public streams (WebSocket) {#websocket-subscriptions}

`WebsocketClient` manages public and private subscriptions for Spot and Futures. This example subscribes to the public Spot v2 ticker for `BTC/USD`, without credentials.

## Subscribe to a ticker

Save this as `stream.ts` in a TypeScript project and run `node stream.ts` with Node.js 24. It logs messages for 30 seconds, then closes its connections. Ctrl+C and `SIGTERM` also close the client.

<<< @/../examples/stream.ts

## Messages and acknowledgements

Register listeners before calling `subscribe()`. It requests the subscription but does not return a promise confirming acceptance. Successful subscription replies arrive on `response`; rejected replies arrive on `exception`. Stream data arrives on `message`.

The example logs every message rather than dropping unrecognised events. In an application, route messages by channel and retain a catch-all branch for diagnostics.

## Unified public streams (in development)

[PR #62](https://github.com/sieblyio/kraken-api/pull/62) adds Unified public streams to `WebsocketClient`. This is work in progress, not part of the published SDK; the API may change before release.

The draft uses `client.subscribe(request, WS_KEY_MAP.unifiedPublicV2)` to connect to `wss://uws.kraken.com/v2/public`. Each request has a `topic` and a `payload` containing `asset_class`. For a Futures ticker, the [draft example](https://github.com/sieblyio/kraken-api/blob/unifiedws/examples/Unified/WebSockets/publicWs.ts) uses `topic: 'ticker'` with `asset_class: 'derivatives'` and `symbol: ['PF_XBTUSD']`. The `instrument` channel lists symbols for the selected asset class.

The draft covers public `ticker`, `book`, `ohlc`, `trade` and `instrument` subscriptions and reuses automatic reconnection and resubscription. It does not include Unified private account streams or order entry.

## Reconnects and shutdown

The SDK reconnects and restores subscriptions automatically. `reconnecting` is a status event, not a reason to terminate the process. `reconnected` indicates the connection has recovered; reconcile any application state that may have missed updates.

The timer only limits this demonstration. Long-running services can omit it and call `closeAll()` when intentionally stopping the client. See [stream recovery](/guides/production#recover-streaming-state).

[Private account updates](/guides/private-streams) · [WebsocketClient reference](/api/classes/WebsocketClient)
