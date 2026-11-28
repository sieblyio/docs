---
title: "Binance SDK production usage"
description: "Handle Binance rate limits, retries, uncertain order outcomes, stream recovery and shutdown."
---

# Production usage

<!--@include: @/.vitepress/shared/production/account-state.md-->

<!--@include: @/.vitepress/shared/production/request-policy.md-->

## Stay within rate limits {#rate-limits}

Binance limits REST traffic by request weight per IP address and order placement per account. Read the current limits from `getExchangeInfo()` rather than hard-coding them. On 27 November 2026 the values were:

| Market | Request weight | Orders |
| --- | --- | --- |
| Spot (`MainClient`) | 6000 per minute | 100 per 10 seconds, 200000 per day |
| USDⓈ-M futures (`USDMClient`) | 2400 per minute | 300 per 10 seconds, 1200 per minute |

Each REST client keeps its own cache of Binance's usage headers, taken from the last response that client received. Call `getRateLimitStates()` to read those values, such as `x-mbx-used-weight-1m` and `x-mbx-order-count-10s`, and slow down before you hit the limit rather than waiting for an HTTP 429.

The cache is only as fresh as that last response, so the figures can be stale. Until a response arrives, the counters sit at 0 and `lastUpdated` is unset, which does not mean the IP is unused. To refresh the cache, make the cheapest call available: [`getServerTime()`](/api/classes/MainClient#getservertime). It exists on every REST client (`MainClient`, `USDMClient` and `CoinMClient`) and updates the cached state when the reply comes in.

Do not use `getExchangeInfo()` to refresh the usage cache. Its responses can be served from an edge cache, and the usage headers may not reflect your IP address. Keep using `getExchangeInfo()` for the limit values themselves.

Aim to stay comfortably below the limit, for example around 80% of the request-weight budget, rather than running right up to it.

<<< @/../examples/rate-limits.ts

When backfilling at speed, call `getServerTime()` before the first kline request so the weight counter is fresh, then read `x-mbx-used-weight-1m` from `getRateLimitStates()` and sleep when usage crosses that safety threshold:

<<< @/../examples/rate-limits-backfill.ts

All processes on one IP address share the weight budget, so the value can be higher than your own client's requests. An HTTP 429 means a limit was hit. Repeatedly ignoring 429 responses leads to HTTP 418 and an automatic IP ban. Back off for the `Retry-After` period, and use WebSocket streams for data that changes continuously.

## Resolve uncertain order outcomes

A timeout does not prove that Binance rejected an order. First use matching private order and trade events to determine what happened. If the outcome is still unclear, query `getOrder()` with the symbol and returned `orderId`. If no ID is available, use open orders, order history and trade history for the same account and symbol to resolve the request before submitting again. For derivatives, use the matching futures client's methods.

Save the returned order ID with the account, network and symbol. Track acknowledgement, acceptance and fills separately.

## Recover streaming state

The client reconnects and restores subscriptions automatically. `reconnecting` signals that connection recovery is starting; mark the affected account state as stale. `reconnected` means the socket has reopened and is a useful trigger for REST reconciliation of missed orders, fills, balances and, for futures, positions. Listen for `exception` to diagnose errors.

Authentication and subscription recovery may still be completing when `reconnected` fires. The SDK handles authentication and resubscription; do not add a manual resubscription loop. Account for updates received during REST recovery, and reconcile open orders with the current position before making follow-up changes. Do not blindly recreate orders after reconnecting.

For a local order book, follow Binance's documented snapshot and depth-update sequence rules. Reconnecting a socket alone does not rebuild an accurate book.

Track feed freshness and finish recovery before using affected data for new orders.

<!--@include: @/.vitepress/shared/production/operations.md-->

[Repository releases](https://github.com/sieblyio/binance/releases) · [Current exchange documentation](https://developers.binance.com/docs/binance-spot-api-docs)
