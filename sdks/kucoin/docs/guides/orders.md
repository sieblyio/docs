---
title: "KuCoin Spot order management"
description: "Place, observe, amend and cancel a Classic Spot limit order with kucoin-api."
---

# Spot order management

Use `SpotClient` to manage a BTC-USDT Classic Spot order. These clients use live services, so running `place` can spend real funds. Start with the [test-order endpoint](/guides/testing-environments#test-order) when validating request parameters and signing.

## Before submitting

1. Configure [authenticated access](/guides/authentication) with read and trading permissions.
2. Read current pair rules with [`getSymbols()`](/api/classes/SpotClient#getsymbols). Choose price and size strings that meet increments, minimums and current limits.
3. Start the [private order stream](/guides/private-streams) with the same account and region. Confirm the subscriptions before placing orders.
4. Create and persist a unique `clientOid` before sending. Keep it with the returned exchange `orderId` so a lost response can be reconciled.

Add your own values to `.env`:

```dotenv
KUCOIN_CLIENT_ORDER_ID=spotExample20261115001
KUCOIN_LIMIT_PRICE=60000
KUCOIN_ORDER_SIZE=0.0001
KUCOIN_NEW_PRICE=59000
```

Replace the example prices and size with values that meet the current pair rules. For this buy order, choose a price below the best bid. `postOnly: true` requests post-only handling, but an accepted resting order can still fill before you cancel it.

## Place, inspect, amend or cancel

Save this as `first-order.ts` beside the [credential helper](/guides/authentication). Follow its [compile instructions](/guides/authentication#compile-and-run-the-examples), using `first-order.ts` as the entry file:

<<< @/../examples/first-order.ts

Run one command at a time:

```sh
node --env-file=.env dist/first-order.js place
node --env-file=.env dist/first-order.js status
node --env-file=.env dist/first-order.js amend
node --env-file=.env dist/first-order.js cancel
```

After placement, save the returned exchange `orderId` as `KUCOIN_ORDER_ID` in `.env`. Status, amendment and cancellation use that ID when provided, otherwise they use `KUCOIN_CLIENT_ORDER_ID`. Clear `KUCOIN_ORDER_ID` before starting a different order workflow.

An amendment cancels and replaces the order and can return a `newOrderId`. Save the new ID before later queries or cancellation, and reconcile the original order's fills. Do not assume the original identifier continues to address the amended order. If a requested new quantity is below the already filled quantity, KuCoin cancels without creating a replacement. See [Modify Order](https://www.kucoin.com/docs-new/rest/spot-trading/orders/modify-order).

The example uses the current HF Spot methods, not the older general Spot order endpoints. Limit `size` is in base currency. A placement acknowledgement does not prove the order remains open; a cancellation acknowledgement does not prove cancellation completed. Inspect private updates and final status before deciding what to do next.

## Recover an uncertain outcome

A timeout or disconnect does not prove the exchange rejected the command. Check private events, then query `getHFOrderDetailsByClientOid()` or `getHFOrderDetailsByOrderId()` with the saved identifier and symbol. If necessary, search completed orders and fills with `getHFCompletedOrders()` and `getHFFilledOrders()`.

Paginate the relevant history within its retention limits and allow for delayed records. Do not submit a replacement while the first outcome remains unknown. An order can fill while an amendment or cancellation is being processed, so reconcile executed quantity as well as the command response.

For batch operations, inspect each item's result. Do not assume the entire batch succeeded or failed together.

[Error handling](/guides/errors) · [WebSocket API requests](/guides/websocket-api) · [KuCoin API documentation](https://www.kucoin.com/docs-new/introduction)
