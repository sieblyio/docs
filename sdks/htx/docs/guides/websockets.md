---
title: "HTX public WebSocket subscriptions"
description: "Subscribe to public Spot market data, select connection keys and manage WebSocket lifecycle events."
---

# Public streams

Use `WebsocketClient` to receive market updates. Public Spot subscriptions do not require credentials. The SDK manages connections, heartbeats and resubscription after reconnecting.

## Subscribe to Spot prices

<<< @/../examples/stream.ts

This stream runs until Ctrl+C. `subscribe()` returns `void`; it is not a promise confirming exchange acceptance. Listen for `response` and `exception`, then wait for a valid `message` on the requested channel before considering data available.

## Connection keys and events

`spotPublic` carries the standard Spot market feed. Other products use their own [connection keys](/clients#select-a-websocket-connection). Subscription topics and payloads must match the selected key.

- `message`: channel data, including the connection's `wsKey`.
- `response`: subscription or request acknowledgments.
- `exception`: protocol, transport or listener failures.
- `open`, `reconnecting`, `reconnected`, `close`: connection lifecycle changes.
- `authenticated`: private connection authentication, when required.

HTX market messages are compressed. The runtime must provide `DecompressionStream`. See [Runtime setup](/compatibility).

## Unsubscribe and close

Call `unsubscribe('market.btcusdt.detail', 'spotPublic')` to remove this topic. Use `closeAll()` when the application or view no longer needs the client, and clear any timers your application created. Browser and React examples include cleanup for page and component lifecycle changes.

## Recover after a connection gap

Mark cached data stale on `reconnecting` or an unexpected close. `reconnected` means a socket reopened, not that your data is current. Wait for fresh market updates; rebuild local order books according to the channel's rules. Private account recovery also requires [REST reconciliation](/guides/private-streams#recover-after-a-gap).
