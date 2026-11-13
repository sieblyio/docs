---
title: "Choose a Bitget UTA V3 or Classic V2 client"
description: "Start with UTA V3 clients and find Classic V2 alternatives for existing integrations."
---

# Choose a client

Use V3 clients for a Unified Trading Account (UTA) and V2 clients for a Classic account. REST clients make individual requests; WebSocket clients receive ongoing updates.

<!-- #region client-list -->
- [RestClientV3](/api/classes/RestClientV3): UTA public market data, account reads and trading, plus the V3 product APIs exposed by the SDK.
- [WebsocketClientV3](/api/classes/WebsocketClientV3): UTA V3 subscriptions and low-level WebSocket API requests.
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient): promise-based UTA V3 order commands over WebSockets.
- [RestClientV2](/api/classes/RestClientV2): Classic Spot, futures, margin and related account/product REST APIs.
- [WebsocketClientV2](/api/classes/WebsocketClientV2): Classic V2 public and private subscriptions.
<!-- #endregion client-list -->

## Start with UTA V3

For new integrations, start with `RestClientV3` and `WebsocketClientV3`, as the quickstart and runtime examples do. Bitget [prioritizes new products and capabilities for UTA](https://www.bitget.com/docs/classic/uta-api-upgrade-guide). Use Classic V2 for existing Classic accounts.

## Match the account and API version {#match-the-account-and-api-generation}

Creating a V3 client does not convert a Classic account to UTA.

For UTA, use `RestClientV3.getTickers()` to read prices for a category such as `SPOT`, and `getBalances()` to read account balances. Existing Classic Spot integrations use `RestClientV2.getSpotTicker()` and `getSpotAccountAssets()`. REST returns an envelope with `code`, `msg`, `requestTime` and `data`; it does not unwrap `data` for you.

## Product coverage

`RestClientV3` includes UTA trading and account endpoints, plus product-specific methods for areas such as copy-trading, strategies/grids, loans, earn, broker services, P2P, CFDs, StockPlus and Reality. `RestClientV2` includes Classic Spot, futures, margin, copy-trading, earn, broker and common account endpoints. See the [reference](/reference) for available methods and check Bitget's requirements for the product you want to use.

Check each method's request type and exchange documentation. Spot and futures use different quantity units, and Classic parameters differ from UTA parameters.

## Combine REST requests and subscriptions {#rest-and-subscriptions-work-together}

Reuse REST clients for initial data and recovery after disconnects. Use the matching WebSocket client for ongoing market and account updates. V3 uses topic/payload objects plus an explicit connection key. Classic V2 uses `subscribeTopic('SPOT', 'ticker', 'BTCUSDT')`. Private V3 topics use `instType: 'UTA'`.

## Send WebSocket API requests {#awaitable-websocket-commands}

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

`WebsocketAPIClient` wraps V3 methods such as `submitNewOrder()`, `updateOrder()` and `cancelOrder()`. A REST category such as `SPOT` is uppercase, while this wrapper's category argument is lowercase, such as `spot`. See [WebSocket API requests](/guides/websocket-api).

## Older examples and V1

The SDK exports V2 and V3 clients. Older examples using V1 Spot/Futures clients or an unversioned `WebsocketClient` need updating. Some legacy types and connection keys remain exported, but the V1 clients are no longer available. Choose V2 or V3 for your account, then update the method names, parameters and response handling.
