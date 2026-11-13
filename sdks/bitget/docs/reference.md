---
title: "Bitget JavaScript and TypeScript SDK API reference"
description: "Browse generated Classic V2, UTA V3, WebSocket and typed request references for bitget-api."
---

# API reference

Generated reference for the documented `bitget-api` release. JavaScript and TypeScript use the same methods; TypeScript additionally checks request and response shapes. Start with [client selection](/clients) to match your account and API generation.

## Clients

- [RestClientV2](/api/classes/RestClientV2): Classic REST APIs.
- [RestClientV3](/api/classes/RestClientV3): UTA and V3 product REST APIs.
- [WebsocketClientV2](/api/classes/WebsocketClientV2): Classic subscriptions.
- [WebsocketClientV3](/api/classes/WebsocketClientV3): UTA subscriptions and low-level commands.
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient): awaitable UTA trading commands.

## Common workflows

| Task | Method |
| --- | --- |
| Classic Spot ticker | [getSpotTicker](/api/classes/RestClientV2#getspotticker) |
| Classic Spot instruments / balances | [getSpotSymbolInfo](/api/classes/RestClientV2#getspotsymbolinfo), [getSpotAccountAssets](/api/classes/RestClientV2#getspotaccountassets) |
| UTA ticker / instruments | [getTickers](/api/classes/RestClientV3#gettickers), [getInstruments](/api/classes/RestClientV3#getinstruments) |
| UTA balances | [getBalances](/api/classes/RestClientV3#getbalances) |
| UTA submit / amend / cancel | [submitNewOrder](/api/classes/RestClientV3#submitneworder), [modifyOrder](/api/classes/RestClientV3#modifyorder), [cancelOrder](/api/classes/RestClientV3#cancelorder) |
| UTA order recovery | [getOrderInfo](/api/classes/RestClientV3#getorderinfo), [getHistoryOrders](/api/classes/RestClientV3#gethistoryorders), [getTradeFills](/api/classes/RestClientV3#gettradefills) |
| Classic public subscription | [subscribeTopic](/api/classes/WebsocketClientV2#subscribetopic) |
| UTA subscription | [subscribe](/api/classes/WebsocketClientV3#subscribe) |
| UTA WebSocket command | [submitNewOrder](/api/classes/WebsocketAPIClient#submitneworder) |

Search methods and types with **⌘K / Ctrl+K**. Use [authentication](/guides/authentication), [orders](/guides/orders) and [private streams](/guides/private-streams) for complete workflows. The generated reference includes the release's additional product endpoints; verify account eligibility and current exchange requirements before using them.

[All exports](/api/) · [Bitget API documentation](https://www.bitget.com/api-doc/common/intro)
