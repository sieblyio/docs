---
title: "Bitget JavaScript and TypeScript SDK API reference"
description: "Browse generated UTA V3, Classic V2, WebSocket and typed request references for bitget-api."
---

# API reference

Client methods, parameters and response types exported by [`bitget-api`](https://www.npmjs.com/package/bitget-api). The same API works in JavaScript and TypeScript. Start with [client selection](/clients) to match your account and API version.

## Clients

- [RestClientV3](/api/classes/RestClientV3): UTA and V3 product REST APIs.
- [WebsocketClientV3](/api/classes/WebsocketClientV3): UTA subscriptions and low-level commands.
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient): awaitable UTA trading commands.
- [RestClientV2](/api/classes/RestClientV2): Classic REST APIs.
- [WebsocketClientV2](/api/classes/WebsocketClientV2): Classic subscriptions.

## Common workflows

| Task | Method |
| --- | --- |
| UTA ticker / instruments | [getTickers](/api/classes/RestClientV3#gettickers), [getInstruments](/api/classes/RestClientV3#getinstruments) |
| UTA balances | [getBalances](/api/classes/RestClientV3#getbalances) |
| UTA submit / amend / cancel | [submitNewOrder](/api/classes/RestClientV3#submitneworder), [modifyOrder](/api/classes/RestClientV3#modifyorder), [cancelOrder](/api/classes/RestClientV3#cancelorder) |
| UTA order recovery | [getOrderInfo](/api/classes/RestClientV3#getorderinfo), [getHistoryOrders](/api/classes/RestClientV3#gethistoryorders), [getTradeFills](/api/classes/RestClientV3#gettradefills) |
| UTA public/private subscription | [subscribe](/api/classes/WebsocketClientV3#subscribe) |
| Classic Spot ticker | [getSpotTicker](/api/classes/RestClientV2#getspotticker) |
| Classic Spot instruments / balances | [getSpotSymbolInfo](/api/classes/RestClientV2#getspotsymbolinfo), [getSpotAccountAssets](/api/classes/RestClientV2#getspotaccountassets) |
| Classic subscription alternative | [subscribeTopic](/api/classes/WebsocketClientV2#subscribetopic) |
| UTA WebSocket command | [submitNewOrder](/api/classes/WebsocketAPIClient#submitneworder) |

Search methods and types with **⌘K / Ctrl+K**. Use [authentication](/guides/authentication), [orders](/guides/orders) and [private streams](/guides/private-streams) for complete workflows. The generated reference includes the release's additional product endpoints; verify account eligibility and current exchange requirements before using them.

[All exports](/api/) · [Bitget API documentation](https://www.bitget.com/api-doc/common/intro)
