---
title: "OKX SDK API reference"
description: "Find REST and WebSocket clients, methods and typed requests for okx-api."
---

# API reference

Client methods, parameters and response types exported by [`okx-api`](https://www.npmjs.com/package/okx-api). The same API works in JavaScript and TypeScript.

## Clients

- [RestClient](/api/classes/RestClient)
- [WebsocketClient](/api/classes/WebsocketClient)
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient)

## Common methods

| Task | Method |
| --- | --- |
| Public ticker | [getTicker](/api/classes/RestClient#getticker) |
| Instrument metadata | [getInstruments](/api/classes/RestClient#getinstruments) |
| Order-book snapshot | [getOrderBook](/api/classes/RestClient#getorderbook) |
| Trading-account balances | [getBalance](/api/classes/RestClient#getbalance) |
| Funding-account balances | [getBalances](/api/classes/RestClient#getbalances) |
| Submit / amend / cancel | [submitOrder](/api/classes/RestClient#submitorder), [amendOrder](/api/classes/RestClient#amendorder), [cancelOrder](/api/classes/RestClient#cancelorder) |
| Recover one order | [getOrderDetails](/api/classes/RestClient#getorderdetails) |
| Open orders and positions | [getOrderList](/api/classes/RestClient#getorderlist), [getPositions](/api/classes/RestClient#getpositions) |
| Order and execution history | [getOrderHistory](/api/classes/RestClient#getorderhistory), [getFills](/api/classes/RestClient#getfills) |
| Subscribe to updates | [subscribe](/api/classes/WebsocketClient#subscribe) |
| WebSocket order command | [submitNewOrder](/api/classes/WebsocketAPIClient#submitneworder) |

Search methods and types with **⌘K / Ctrl+K**. Use the [authentication](/guides/authentication), [order lifecycle](/guides/orders) and [private stream](/guides/private-streams) guides for complete workflows.

[Reference index](/api/) · [OKX API documentation](https://www.okx.com/docs-v5/en/)
