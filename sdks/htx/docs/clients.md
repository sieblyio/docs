---
title: "HTX REST and WebSocket clients"
description: "Choose SpotClient, FuturesClient, WebsocketClient or WebsocketAPIClient for the HTX API family you need."
---

# Choose a client

<!-- #region client-list -->
- **[SpotClient](/api/classes/SpotClient)**: Spot market data, balances, orders, margin and account operations.
- **[FuturesClient](/api/classes/FuturesClient)**: futures market data and trading, including linear swaps, coin-margined swaps, delivery contracts and V5 endpoints.
- **[WebsocketClient](/api/classes/WebsocketClient)**: public market subscriptions and private account updates across HTX products.
- **[WebsocketAPIClient](/api/classes/WebsocketAPIClient)**: promise-based Spot and derivatives trading commands over WebSockets.
<!-- #endregion client-list -->

## Match the product and account

Spot examples use lowercase symbols such as `btcusdt`. Derivatives methods use their own contract identifiers, margin modes and quantity units. Use the method's request type and current contract metadata rather than adapting Spot parameters by changing only the symbol.

`FuturesClient` exposes several API generations in one class. Choose the method for the account mode you actually use. A shared client does not imply that legacy and V5 request or response formats are interchangeable.

## Select a WebSocket connection

Pass a connection key as the second argument to `subscribe()`:

| Product | Public data | Private updates | Trading commands |
| --- | --- | --- | --- |
| Spot | `spotPublic`, `spotFeed` | `spotPrivateV2` | `spotTrade` |
| Linear swaps | `linearSwapPublic` | `linearSwapPrivate` | `linearSwapTrade` |
| Coin-margined delivery | `coinDeliveryPublic` | `coinDeliveryPrivate` | `coinDeliveryTrade` |
| Coin-margined swaps | `coinSwapPublic` | `coinSwapPrivate` | `coinSwapTrade` |

`derivativesPrivateV5` is a separate unified derivatives account feed. `derivativesIndex` and `derivativesSystem` provide additional derivatives channels. Select only the connections your application needs; `connectAll()` opens multiple product connections.

The wrapper's methods choose trading connections for you. For low-level commands, use `sendWSAPIRequest()` with the matching key and operation. Read [WebSocket API requests](/guides/websocket-api) before using either approach.

[Configuration](/guides/configuration) · [Public streams](/guides/websockets) · [API reference](/reference)
