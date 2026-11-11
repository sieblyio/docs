---
title: "Choose an OKX SDK client"
description: "Choose RestClient, WebsocketClient or WebsocketAPIClient for OKX requests and streams."
---

# Choose a client

<!-- #region client-list -->
- [RestClient](/api/classes/RestClient): public market data, authenticated account reads and order commands over REST.
- [WebsocketClient](/api/classes/WebsocketClient): public and private subscriptions, connection lifecycle events and low-level WebSocket API requests.
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient): promise-based order commands over WebSockets.
<!-- #endregion client-list -->

## REST and subscriptions work together

Use one long-lived REST client for your account and region. Start with [`getTicker()`](/api/classes/RestClient#getticker), then configure credentials for [`getBalance()`](/api/classes/RestClient#getbalance). The same client covers Spot and derivatives: select the instrument and trading mode in each request rather than choosing a separate futures class.

Use `WebsocketClient` for ongoing prices and account state. It selects the public, private or business connection from the channel, signs private logins and restores subscriptions after reconnects. Your application still owns recovery of missed state.

## Awaitable WebSocket commands

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

`WebsocketAPIClient` exposes methods such as `submitNewOrder()`, `amendOrder()` and `cancelOrder()`. It is not a replacement for the private orders subscription: command responses acknowledge requests, while order events describe subsequent execution.

New applications should use `WebsocketClient`, not the exported legacy client. See [WebSocket API requests](/guides/websocket-api) for the request and response differences.
