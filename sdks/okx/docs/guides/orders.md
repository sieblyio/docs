---
title: "OKX order management"
description: "Place, observe, amend and cancel a Spot order using REST and private account events."
---

# Order management

This walkthrough sends real Spot order commands to the default live global service. Each CLI command is explicit; running `place` can spend funds. For simulated trading, configure [demo trading](/guides/configuration#demo-trading) on every client and use separate demo credentials before running anything.

## Before submitting

1. Configure [authenticated account access](/guides/authentication) with read and trading permissions.
2. Check `BTC-USDT` instrument metadata using [`getInstruments()`](/api/classes/RestClient#getinstruments). Choose price and size strings satisfying its increments, minimums and current exchange limits. This example uses `tdMode: 'cash'`, so it buys Spot without changing leverage or position mode.
3. Start the [private stream](/guides/private-streams) with the same account, region and environment. Wait for authentication and a successful `orders` subscription acknowledgement before submitting.
4. Record a unique alphanumeric `clOrdId` of at most 32 characters before sending. Keep it for recovery even if the command never returns an exchange order ID.

Add your own values to `.env`:

```dotenv
OKX_CLIENT_ORDER_ID=spotExample20261111001
OKX_LIMIT_PRICE=60000
OKX_ORDER_SIZE=0.0001
OKX_NEW_PRICE=59000
```

Prices and sizes are illustrative, not recommendations or guaranteed-valid orders. Choose a buy price below the current best bid. A `post_only` order that would immediately take liquidity is rejected or cancelled according to the exchange's rules; a resting order can still fill before you cancel it.

## Place and observe

Save `first-order.ts` beside the [credential helper](/guides/authentication), follow the [compile instructions](/guides/authentication#compile-and-run-the-examples) with `first-order.ts` as the entry file, then run the emitted file:

<<< @/../examples/first-order.ts

```sh
node --env-file=.env dist/first-order.js place
```

Save the returned `ordId`. REST removes the top-level response envelope, but each result still has `sCode` and `sMsg`. Only `sCode: '0'` indicates that item was accepted. The sample checks each returned result.

Follow the matching `ordId` or `clOrdId` on the private `orders` channel. Typical states include `live`, `partially_filled`, `filled` and `canceled`. Read `accFillSz` for cumulative filled quantity; use fill identifiers and trade history when recording individual executions. Acceptance is not evidence of a fill.

## Amend an open order

```sh
node --env-file=.env dist/first-order.js amend
```

This changes the price using `newPx` and explicitly sets `cxlOnFail: false`. It does not request cancellation if the amendment fails. Check the item response and subsequent order events; orders can fill while an amendment is in flight. If amending size with `newSz`, it is the new total size, not an additional quantity.

## Cancel remaining quantity

```sh
node --env-file=.env dist/first-order.js cancel
```

Cancellation requests do not reverse fills. Follow the order stream until the resulting state is known, accounting for fills that race with cancellation. A filled Spot buy leaves an asset balance even if any remainder is cancelled.

## Recover an uncertain outcome

The sample never retries order commands automatically. A timeout can occur after OKX accepts a request. Check matching private events first, then use a scoped read if the outcome is still unknown:

```sh
node --env-file=.env dist/first-order.js status
```

This uses [`getOrderDetails()`](/api/classes/RestClient#getorderdetails) with the saved client ID. For records beyond that endpoint's scope, use [`getOrderHistory()`](/api/classes/RestClient#getorderhistory), [`getOrderHistoryArchive()`](/api/classes/RestClient#getorderhistoryarchive) and [`getFills()`](/api/classes/RestClient#getfills), with pagination and appropriate filters. Empty results or delayed history are not proof the order failed.

Treat client IDs as correlation identifiers, not a guarantee of indefinite idempotency. Do not reuse one for a new intended order or resubmit an uncertain request merely because its response was lost. Use REST for recovery, not after every successful command.

Closing a process or WebSocket does not cancel open orders.

[Private account updates](/guides/private-streams) · [Error handling](/guides/errors) · [OKX order contract](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-order)
