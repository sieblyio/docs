---
title: Hyperliquid API and WebSocket rate limits in Node.js
description: Hyperliquid REST weights, WebSocket connection and subscription limits, the 60 second heartbeat and address-based action limits, with Node.js examples using the Hyperliquid SDK.
---

# Rate limits and heartbeats

Hyperliquid limits traffic per IP address and signed actions per account address. This page lists the limits that affect a Node.js integration and shows how the SDK fits within them. The numbers come from [Hyperliquid's rate limit documentation](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/rate-limits-and-user-limits); check it before setting hard budgets.

## REST request weights {#rest-weights}

REST requests from one IP share a weight budget of 1200 per minute.

| Request | Weight |
| --- | --- |
| Exchange actions (orders, cancels, transfers) | 1, plus 1 per 40 items in a batch |
| `l2Book`, `allMids`, `clearinghouseState`, `orderStatus`, `spotClearinghouseState`, `exchangeStatus` | 2 |
| `userRole` | 60 |
| Other info requests | 20 |
| `userFills`, `userFillsByTime`, `historicalOrders`, `recentTrades`, `fundingHistory`, `userFunding` and other history requests | 20, plus extra weight per 20 items returned |
| `candleSnapshot` | 20, plus extra weight per 60 candles returned |

At weight 20, about 60 requests per minute exhaust the budget. Polling `getPerpAccountSummary()`, `getOrderBook()` or `getAllMids()` costs weight 2 each, so prefer those for frequent checks, and use WebSocket subscriptions for anything that changes continuously.

Workers behind one IP share the budget. Limit concurrency across them, not only inside one process.

## WebSocket limits {#websocket-limits}

| Limit (per IP) | Value |
| --- | --- |
| Open WebSocket connections | 10 |
| New connections per minute | 30 |
| Subscriptions | 1000 |
| Unique users across user-specific subscriptions | 10 |
| Messages sent to Hyperliquid per minute | 2000 |
| In-flight WebSocket POST requests | 100 |

`WebsocketClient` places public topics and most account topics (`userFills`, `clearinghouseState`, `openOrders` and similar) on one shared connection. `orderUpdates`, `userEvents` and `notification` messages do not say which account they belong to, so the SDK opens one connection per account for those topics. Subscribing to `allMids`, `l2Book`, `userFills` for two accounts and `orderUpdates` for the same two accounts therefore opens three connections: `public`, `user:<first address>` and `user:<second address>`.

Leave room under the 10-connection limit for reconnects and for any other process on the same IP. Watching more than about eight accounts for `orderUpdates` from one IP needs another IP or a different design.

`WebsocketAPIClient` uses its own connection. Its requests count towards the message and in-flight limits above, not the REST weight budget.

## Heartbeats {#heartbeats}

Hyperliquid closes a connection that has received nothing from the server for 60 seconds. A quiet account stream is enough to trigger it: in a test on 27 November 2026, a raw `ws` connection subscribed only to `userEvents` for an inactive address was closed with code 1006 after 61.8 seconds. Clients keep the connection open by sending `{ "method": "ping" }`, which the server answers with `{ "channel": "pong" }`.

`WebsocketClient` sends that ping every 10 seconds by default and reconnects if the pong does not arrive within the `pongTimeout`. The same quiet subscription through the SDK stayed open for the full 120 second test with no `reconnecting` event. Change the timing with `pingInterval` and `pongTimeout` in [`WebsocketClientOptions`](/api/interfaces/WebsocketClientOptions). Setting `pingInterval: 0` disables the heartbeat, which brings back the 60 second disconnect on quiet streams.

## Address-based action limits {#address-limits}

Signed actions are also limited per account address. Subaccounts count as separate users. Info requests are not counted here.

- Each address starts with 10,000 actions, and gains one more for every 1 USDC traded.
- Once the cap is reached, the address can send one action every 10 seconds.
- Cancels have a higher cap, so open orders can still be cancelled when the address is limited.
- A batched order or cancel is one request for the IP budget but counts once per order for the address limit.

Check the current position with `getUserRateLimit()`. Query the trading account (master or subaccount), not the API wallet. Set `HYPERLIQUID_ACCOUNT_ADDRESS`, save the example as `rate-limit.mts` and run `node --env-file=.env rate-limit.mts` with Node.js 24.

<<< @/../examples/rate-limit.ts

`nRequestsUsed` already excludes actions reserved with `reserveRequestWeight`, and `nRequestsSurplus` is reserved capacity not yet used, so the remaining allowance is `nRequestsCap - nRequestsUsed + nRequestsSurplus`.

[getUserRateLimit reference](/api/classes/RestClient#getuserratelimit)

## When a limit is hit {#when-limited}

- Slow down and retry reads with increasing delays and jitter. See [Timeouts and retries](/guides/production#timeouts-and-retries).
- Do not resend cancels whose results were already returned. During congestion Hyperliquid also limits each address to a share of block space, and batching orders or cancels uses less of it than sending them one by one.
- Move repeated reads to WebSocket subscriptions and keep REST for start-up, explicit lookups and [recovery after a disconnect](/guides/production#recover-after-a-disconnect).

## Further reading

- [Production usage](/guides/production)
- [Public streams (WebSocket)](/guides/websockets)
- [Troubleshooting](/guides/troubleshooting)
- [Hyperliquid integration tutorial on Siebly.io](https://siebly.io/sdk/hyperliquid/javascript/tutorial)
