---
title: "Choose a KuCoin SDK client"
description: "Choose KuCoin REST clients, subscriptions and promise-based WebSocket API methods."
---

# Choose a client

Choose the REST client for your account and product. Use `WebsocketClient` for ongoing market and account updates.

<!-- #region client-list -->
- [SpotClient](/api/classes/SpotClient): Classic Spot and margin market data, account reads and trading.
- [FuturesClient](/api/classes/FuturesClient): Classic futures market data, positions and orders.
- [BrokerClient](/api/classes/BrokerClient): broker and sub-account operations.
- [UnifiedAPIClient](/api/classes/UnifiedAPIClient): Unified Trading Account market data, balances, positions and trading.
- [WebsocketClient](/api/classes/WebsocketClient): public and private subscriptions, connection events and low-level WebSocket API requests.
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient): promise-based Spot, margin, futures and supported UTA order commands over WebSockets.
<!-- #endregion client-list -->

## Combine requests and subscriptions {#rest-and-subscriptions-work-together}

The quickstart and Spot workflow use `SpotClient`. UTA methods have their own parameters and account requirements; do not assume Classic balance or order methods apply to a Unified Trading Account. For futures, verify contract identifiers and quantity units rather than reusing Spot symbols or amounts.

For subscriptions, the required second argument selects the connection. Classic public Spot uses `spotPublicV1`; Classic private Spot uses `spotPrivateV1`. Futures uses `futuresPublicV1` or `futuresPrivateV1`. Pro V2 has separate public keys and the shared `privateProV2` connection. Topic names and payloads depend on the connection version.

Keep long-lived clients for each account and region. After a disconnect, recover missed state through REST before relying on cached data.

## Send WebSocket API requests {#awaitable-websocket-commands}

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

`WebsocketAPIClient` provides methods such as `submitNewSpotOrder()`, `modifySpotOrder()` and `cancelSpotOrder()`. It opens and authenticates a dedicated connection when needed. Use private subscriptions separately to follow fills and account changes.

[WebSocket subscriptions](/guides/websockets) · [WebSocket API requests](/guides/websocket-api)
