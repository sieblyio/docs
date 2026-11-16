---
title: "KuCoin SDK API reference"
description: "Find kucoin-api REST and WebSocket methods, request parameters and response types."
---

# API reference

Client methods, parameters and response types exported by [`kucoin-api`](https://www.npmjs.com/package/kucoin-api). The same API works in JavaScript and TypeScript.

## Clients

- [SpotClient](/api/classes/SpotClient)
- [FuturesClient](/api/classes/FuturesClient)
- [BrokerClient](/api/classes/BrokerClient)
- [UnifiedAPIClient](/api/classes/UnifiedAPIClient)
- [WebsocketClient](/api/classes/WebsocketClient)
- [WebsocketAPIClient](/api/classes/WebsocketAPIClient)

## Common methods

| Task | Method |
| --- | --- |
| Spot ticker | [getTicker](/api/classes/SpotClient#getticker) |
| Pair rules | [getSymbols](/api/classes/SpotClient#getsymbols) |
| Order-book snapshot | [getOrderBookLevel20](/api/classes/SpotClient#getorderbooklevel20) |
| Spot candles | [getKlines](/api/classes/SpotClient#getklines) |
| Classic Spot balances | [getBalances](/api/classes/SpotClient#getbalances) |
| Submit / amend / cancel | [submitHFOrder](/api/classes/SpotClient#submithforder), [updateHFOrder](/api/classes/SpotClient#updatehforder), [cancelHFOrder](/api/classes/SpotClient#cancelhforder) |
| Recover one order | [getHFOrderDetailsByClientOid](/api/classes/SpotClient#gethforderdetailsbyclientoid), [getHFOrderDetailsByOrderId](/api/classes/SpotClient#gethforderdetailsbyorderid) |
| Open orders | [getHFActiveOrdersPaginated](/api/classes/SpotClient#gethfactiveorderspaginated) |
| Completed orders and fills | [getHFCompletedOrders](/api/classes/SpotClient#gethfcompletedorders), [getHFFilledOrders](/api/classes/SpotClient#gethffilledorders) |
| Validate without matching | [submitHFOrderTest](/api/classes/SpotClient#submithfordertest) |
| Subscribe to updates | [subscribe](/api/classes/WebsocketClient#subscribe) |
| WebSocket cancellation | [cancelSpotOrder](/api/classes/WebsocketAPIClient#cancelspotorder) |

Search methods and types with **⌘K / Ctrl+K**. Use the [authentication](/guides/authentication), [order management](/guides/orders) and [private stream](/guides/private-streams) guides for complete workflows.

[Reference index](/api/) · [KuCoin API documentation](https://www.kucoin.com/docs-new/introduction)
