---
title: "OKX private account updates"
description: "Observe orders, balances and positions with REST bootstrap and gap recovery."
---

# Private account updates

Private subscriptions keep account state current without polling after every order. The example below only observes changes: it does not place, modify or cancel orders.

Save it as `private-stream.ts` beside the [credential helper](/guides/authentication), then use the [compile instructions](/guides/authentication#compile-and-run-the-examples) with `private-stream.ts` as the entry file. It runs until Ctrl+C.

<<< @/../examples/private-stream.ts

```sh
node --env-file=.env dist/private-stream.js
```

## What each channel provides

- `orders` with `instType: 'SPOT'` reports Spot order changes. It does **not** send an initial snapshot of all open orders.
- `account` supplies trading-account balance information. Apply currency updates to your existing store; do not discard currencies absent from a partial update.
- `positions` with `instType: 'ANY'` covers available position types for the account. Spot cash holdings live in balances, not derivative position rows.

For a derivatives workflow, subscribe to the corresponding order instrument type as well. Access and available channels depend on your account and region. Authentication success alone does not mean every requested channel was accepted: inspect each subscription acknowledgement.

The example prints events for inspection. It is not a complete account-state reducer or a reconciliation service. Keep private data out of shared logs.

## Initialize without losing changes

Connect and confirm the needed subscriptions, buffering incoming updates while loading REST starting state. Use [`getBalance()`](/api/classes/RestClient#getbalance), [`getOrderList()`](/api/classes/RestClient#getorderlist) and [`getPositions()`](/api/classes/RestClient#getpositions). Paginate open orders where necessary. The [account-state example](/guides/authentication#read-starting-account-state) shows these reads but deliberately does not merge concurrent events.

Combine snapshots with buffered updates using order IDs, update times and execution identifiers. Preserve terminal orders and cumulative fills so that an older REST row cannot overwrite a newer event. Do not treat the separate REST responses as one atomic snapshot. Deduplicate repeated events before triggering downstream work.

## Recover after a gap

On `reconnect`, mark affected state stale and pause decisions that depend on it. On `reconnected`, confirm authentication and subscriptions again, buffer incoming events and reconcile:

1. Refresh balances, positions and all relevant open orders.
2. Query recent order history and fills covering the outage, with overlap and pagination. An order missing from the open-order list may have filled or been cancelled while disconnected.
3. Resolve uncertain commands by saved IDs. Merge and deduplicate buffered events and history before marking state current.
4. Resume stream-driven updates. Keep recovery scoped and rate-limited rather than polling every order continuously.

If private streaming is temporarily unavailable, use a bounded, rate-limited REST fallback appropriate to the account's limits and mark the reduced freshness explicitly. Once streams are restored, reconcile before turning polling off. Avoid acting on stale exposure merely because the socket is open.

[Production usage](/guides/production) · [Order management](/guides/orders) · [OKX orders channel](https://www.okx.com/docs-v5/en/#order-book-trading-trade-ws-order-channel)
