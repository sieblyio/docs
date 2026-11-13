---
title: "Coinbase SDK clients"
description: "Choose a Coinbase REST client, shared WebSocket subscriptions or the Global WebSocket API."
---

# Coinbase clients

Choose the client for your Coinbase product. The main guides use Advanced Trade spot. Each other product has its own guide, credentials and account identifiers.

<!-- #region client-list -->
| Client | Purpose |
| --- | --- |
| [`CBAdvancedTradeClient`](/api/classes/CBAdvancedTradeClient) | Advanced Trade spot and US futures (CFM): market data, accounts and orders. [Advanced Trade guide](/getting-started). |
| [`CBAdvancedTradeGlobalClient`](/api/classes/CBAdvancedTradeGlobalClient) | Advanced Trade international derivatives on the Deribit-powered Starbase gateway. [Global derivatives guide](/products/global). |
| [`CBAppClient`](/api/classes/CBAppClient) | Coinbase App wallet accounts and transactions. [App guide](/products/app). |
| [`CBExchangeClient`](/api/classes/CBExchangeClient) | Coinbase Exchange REST market data, accounts and orders. [Exchange guide](/products/exchange). |
| [`CBInternationalClient`](/api/classes/CBInternationalClient) | International Exchange instruments, portfolios and orders. [INTX guide](/products/international). |
| [`CBPrimeClient`](/api/classes/CBPrimeClient) | Prime institutional trading, portfolios and custody. [Prime guide](/products/prime). |
| [`CBCommerceClient`](/api/classes/CBCommerceClient) | Commerce charges and checkouts. [Commerce guide](/products/commerce). |
| [`WebsocketClient`](/api/classes/WebsocketClient) | Shared public and private subscriptions across supported Coinbase platforms, selected with `WS_KEY_MAP`. [Stream selection](/clients#websocket-subscriptions). |
| [`WebsocketAPIClient`](/api/classes/WebsocketAPIClient) | Awaitable Global derivatives JSON-RPC requests over WebSocket. [Global WebSocket API](/products/global#ws-api). |
<!-- #endregion client-list -->

Advanced Trade international derivatives moved to Starbase on 1 October 2026. Use `CBAdvancedTradeGlobalClient` for those markets, even though `CBAdvancedTradeClient` still exposes older INTX methods. Spot and US futures remain on `CBAdvancedTradeClient`. See the [Coinbase migration guide](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/guides/derivatives/technical).

## Advanced Trade REST requests

<<< @/../examples/first-call.ts

Methods return response bodies directly, not Axios response wrappers. Public market-data methods have `Public` in their name. Account and order methods require [Advanced Trade credentials](/guides/authentication).

## WebSocket subscriptions

Register listeners before calling `subscribe()`. `WebsocketClient` manages connections for the selected `WS_KEY_MAP` key and emits parsed data on `update`. Choose the key, channels and credentials for the product you use:

| Product | Subscription keys | Guide |
| --- | --- | --- |
| Advanced Trade | `advTradeMarketData`, `advTradeUserData` | [Public streams](/guides/websockets), [private account updates](/guides/private-streams) |
| Global derivatives | `advTradeGlobalMarketData`, `advTradeGlobalUserData` | [Public streams](/products/global#public-streams), [private account updates](/products/global#private-streams) |
| Exchange | `exchangeMarketData`, `exchangeDirectMarketData` | [Exchange streams](/products/exchange#public-streams) |
| International Exchange | `internationalMarketData` | [INTX streams](/products/international#public-streams) |
| Prime | `primeMarketData` | [Prime streams](/products/prime#public-streams) |

## Global WebSocket API

`WebsocketAPIClient` lets you await Global derivatives requests over a persistent WebSocket connection. It uses the dedicated `advTradeGlobalWSAPI` connection, separate from subscriptions. It is not an Advanced Trade spot order-entry client. See the [Global WebSocket API guide](/products/global#ws-api).

[Advanced Trade reference](/reference) · [Choose a Coinbase API](/products)
