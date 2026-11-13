---
title: "Choose a Bitget Classic V2 or UTA V3 client"
description: "Compare RestClientV2, RestClientV3, versioned WebSocket clients and WebsocketAPIClient."
---

# Choose a client

<!-- #region client-list -->
- [RestClientV2](/api/classes/RestClientV2): Classic Spot, futures, margin and related account/product REST APIs.
- [RestClientV3](/api/classes/RestClientV3): UTA public market data, account reads and trading, plus the V3 product APIs exposed by the SDK.
- [WebsocketClientV2](/api/classes/WebsocketClientV2): Classic V2 public and private subscriptions.
- [WebsocketClientV3](/api/classes/WebsocketClientV3): UTA V3 subscriptions and low-level WebSocket API requests.
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient): promise-based UTA V3 order commands over WebSockets.
<!-- #endregion client-list -->

## Match the account and API generation

V2 and V3 are exchange API generations, not interchangeable aliases. Choose the private client that matches your account's supported API. Creating `RestClientV3` does not migrate a Classic account to UTA, change its margin mode or grant access to a product.

For Classic Spot, begin with `RestClientV2.getSpotTicker()` and `getSpotAccountAssets()`. For UTA, use `RestClientV3.getTickers()` with a category such as `SPOT`, and `getBalances()` for the account. REST returns an envelope with `code`, `msg`, `requestTime` and `data`; it does not unwrap `data` for you.

## Product coverage

`RestClientV2` includes Classic Spot, futures, margin, copy-trading, earn, broker and common account endpoints. `RestClientV3` includes UTA trading and account endpoints, plus product-specific methods for areas such as copy-trading, strategies/grids, loans, earn, broker services, P2P, CFDs, StockPlus and Reality. The generated [reference](/reference) lists the methods in the documented release. Account eligibility and exchange availability still apply; a method in the SDK does not grant access to its product.

Do not substitute Spot quantities for futures quantities, or copy Classic endpoint parameters into UTA requests. Read each method's request type and the matching exchange contract.

## REST and subscriptions work together

Use long-lived REST clients for startup reads and targeted recovery. Use the matching WebSocket client for ongoing market and account updates. V2 uses `subscribeTopic('SPOT', 'ticker', 'BTCUSDT')`; V3 uses topic/payload objects plus an explicit connection key. Private V3 topics use `instType: 'UTA'`.

## Awaitable WebSocket commands

<!--@include: @/.vitepress/shared/clients/awaitable-websocket.md-->

`WebsocketAPIClient` wraps V3 methods such as `submitNewOrder()`, `updateOrder()` and `cancelOrder()`. A REST category such as `SPOT` is uppercase, while this wrapper's category argument is lowercase, such as `spot`. See [WebSocket API requests](/guides/websocket-api).

## Older examples and V1

The documented release exports V2 and V3 clients, not the old V1 Spot/Futures REST clients or an unversioned `WebsocketClient`. Some legacy types and connection keys remain exported. They are not evidence that a V1 client or endpoint is supported. When adapting old snippets, choose the current account generation, then update method names, parameters and response handling together.
