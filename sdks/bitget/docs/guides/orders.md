---
title: "Bitget UTA order management"
description: "Place, observe, amend, cancel and recover a Unified Trading Account Spot order with V3."
---

# UTA order management

This walkthrough uses `RestClientV3` for a Unified Trading Account. Its commands send real Spot order requests to production. Running `place` can spend funds. For simulation, configure [demo trading](/guides/configuration#demo-trading) on every REST and WebSocket client with separate demo credentials first.

## Before submitting

1. Confirm that your account supports UTA V3 and that its key has the required read/trading permissions. Classic accounts use different methods, described below.
2. Read `getInstruments({ category: 'SPOT', symbol: 'BTCUSDT' })`. Choose price and quantity strings satisfying current precision, minimums and instrument status.
3. Start the [UTA private stream](/guides/private-streams), using the same account and environment. Wait for authentication and successful order/fill subscription acknowledgements.
4. Create and persist a unique `clientOid` within the current endpoint's accepted format and length. Retain it even if the request never returns an exchange order ID.

Add your chosen values to the private `.env` file:

```dotenv
BITGET_CLIENT_ORDER_ID=spotExample20261113001
BITGET_LIMIT_PRICE=60000
BITGET_ORDER_SIZE=0.0001
BITGET_NEW_PRICE=59000
```

These prices and sizes are illustrative, not recommendations or guaranteed-valid orders. A buy limit below the best bid may rest, but it can still fill as the market moves. `post_only` prevents immediate taker execution according to the exchange contract; it does not make later fills impossible. This example explicitly disables auto-borrowing.

## Place and observe

Save `first-order.ts` beside the [credential helper](/guides/authentication). Follow that guide's compile instructions with `first-order.ts` as the entry file.

<<< @/../examples/first-order.ts

```sh
node --env-file=.env dist/first-order.js place
```

Record the returned `orderId` alongside `clientOid`. REST success uses `code: '00000'`, and the SDK rejects a non-success top-level response. A successful command acknowledgement does not prove a fill. Follow matching private order and fill events to learn execution state, cumulative executed quantity, fees and remaining quantity.

## Amend an open order

```sh
node --env-file=.env dist/first-order.js amend
```

This calls `modifyOrder()` with a new price and `autoCancel: 'no'`. It does not request cancellation if modification fails. Category and symbol are supplied explicitly. Orders can fill while an amendment is in flight; follow the resulting account events and keep the returned identifiers. If also changing quantity, read the current contract for total/remaining quantity semantics before populating `qty`.

## Cancel remaining quantity

```sh
node --env-file=.env dist/first-order.js cancel
```

A cancellation request does not reverse fills. Confirm the resulting order state and account for fills racing with cancellation. A filled Spot buy leaves an asset balance after any unfilled remainder is cancelled.

## Recover an uncertain outcome

The sample does not automatically retry commands. A timeout can occur after the exchange accepts a request. Check matching private events, then query the saved identifier if needed:

```sh
node --env-file=.env dist/first-order.js status
```

This calls [`getOrderInfo()`](/api/classes/RestClientV3#getorderinfo). For broader recovery use [`getUnfilledOrders()`](/api/classes/RestClientV3#getunfilledorders), [`getHistoryOrders()`](/api/classes/RestClientV3#gethistoryorders) and [`getTradeFills()`](/api/classes/RestClientV3#gettradefills), respecting pagination and history windows. Empty or delayed history is not proof the command failed.

A client order ID is a correlation/recovery identifier, not an indefinite idempotency guarantee. Do not reuse it for another intended order or resend an uncertain request simply because the response was lost. REST is for bootstrap and recovery, not an extra poll after each successful event.

## Classic V2 orders

For a Classic Spot account, use [`spotSubmitOrder()`](/api/classes/RestClientV2#spotsubmitorder), [`spotCancelOrder()`](/api/classes/RestClientV2#spotcancelorder), [`getSpotOrder()`](/api/classes/RestClientV2#getspotorder), [`getSpotHistoricOrders()`](/api/classes/RestClientV2#getspothistoricorders) and [`getSpotFills()`](/api/classes/RestClientV2#getspotfills). The placement request uses `size` and `force`, rather than V3's `qty` and `timeInForce`. Do not pass the UTA example to the Classic client.

Classic Spot's [`spotCancelandSubmitOrder()`](/api/classes/RestClientV2#spotcancelandsubmitorder) is a cancel-and-replace operation, not the same action as UTA `modifyOrder()`. Read its result and reconcile both the original and replacement order; do not treat a partial outcome as atomic success. Futures order methods have their own margin, position-side and reduce-only requirements.

Closing a process or WebSocket does not cancel open orders.

[Private streams](/guides/private-streams) · [Error handling](/guides/errors) · [UTA order API](https://www.bitget.com/api-doc/uta/trade/Place-Order)
