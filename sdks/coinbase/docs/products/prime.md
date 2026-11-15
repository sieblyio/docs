---
title: "Coinbase Prime SDK"
description: "Read Prime portfolios and balances, preview orders, and configure authenticated market subscriptions."
---

# Prime

`CBPrimeClient` targets institutional trading and custody at `api.prime.coinbase.com`. Requests use Prime entity, portfolio and wallet identifiers. There is no mapped Prime sandbox.

## Setup {#setup}

Install `coinbase-api` with `npm install coinbase-api` and use Node.js 24 to run the examples. Add the credentials below to a private `.env` file excluded from Git. Run each saved example with `node --env-file=.env filename.ts`, replacing `filename.ts` with its filename. Keep account output private.

## Authenticate and discover portfolios {#authentication}

Prime REST requests require a Prime API key, secret and API passphrase. Keep the key's access limited to the required portfolios and operations:

```dotenv
COINBASE_PRIME_API_KEY=your-prime-key
COINBASE_PRIME_API_SECRET=your-prime-secret
COINBASE_PRIME_API_PASSPHRASE=your-api-passphrase
```

Save as `prime-read.ts`:

<<< @/../examples/prime-read.ts

Choose a portfolio returned by `getPortfolios()` and set `COINBASE_PRIME_PORTFOLIO_ID`. The passphrase is an API credential, not the account password.

## Portfolio balances and products {#account-state}

Save as `prime-balances.ts`:

<<< @/../examples/prime-balances.ts

Choose the appropriate `balance_type`: `TRADING_BALANCES`, `VAULT_BALANCES` or `TOTAL_BALANCES`. Funds held in custody may not be available for trading. For one wallet, use `getWalletBalance({ portfolio_id, wallet_id })`.

Use `getPortfolioProducts()` for the products available to the selected portfolio. Product access and order rules remain portfolio-specific.

## Authenticated market subscriptions {#public-streams}

The Prime market feed also requires authentication. Use a dedicated `WebsocketClient` with the Prime key, secret and passphrase. Select `WS_KEY_MAP.primeMarketData` and pass the channel's required fields through `payload`:

- `svcAccountId`: the Prime service-account identifier.
- `portfolio_id`: the selected Prime portfolio.
- `product_ids`: the products to subscribe to.
- `product_type`: optional, when required by the selected product/channel.

The SDK signs the subscription. Follow the [Prime channel schema](https://docs.cdp.coinbase.com/prime/websocket-feed/channels) for the channel name and snapshot/update behavior. Register `update`, `response` and `exception` listeners before subscribing. Keep the default logger, and call `closeAll()` on intentional shutdown.

These market subscriptions do not track all custody, order or portfolio changes. The SDK restores subscriptions automatically after reconnecting; you do not need to subscribe again. The `reconnected` event means the socket is open, not that fresh data has arrived. Treat derived market state as stale until fresh data arrives, and restore any missing snapshots before applying further updates.

## Preview and manage orders {#orders}

Save as `prime-preview.ts`. This example previews a market buy and does not submit it:

<<< @/../examples/prime-preview.ts

The amount is illustrative. Inspect the preview's fees, liquidity and errors; it does not reserve funds or guarantee execution. Use the portfolio's product rules and available trading balance to construct the real request.

For live order entry, `submitOrder()` takes Prime fields including `portfolio_id`, `product_id`, `side`, `type`, and `base_quantity` or `quote_value`. Generate and persist a `client_order_id` with `client.generateNewOrderId()` before sending. Keep the exchange order ID and portfolio together.

- `getOpenOrders()` and `getPortfolioOrders()` supply current and historical portfolio orders.
- `getOrderById({ portfolio_id, order_id })` resolves a specific order.
- `getOrderFills()` reads its executions.
- `editOrder()` changes an existing order.
- `cancelOrder({ portfolio_id, order_id })` requests cancellation; it cannot cancel an already filled order.

Resolve uncertain outcomes before submitting replacements. Do not interpret a market-data update as an order acknowledgement. Where another authorized private event source supplies account changes, update account state from those events and use REST to initialize or repair it. This SDK does not provide a separate Prime private-account feed or Prime WebSocket order API.

## Custody operations {#custody}

`getPortfolioWallets()` and `getPortfolioTransactions()` support wallet and transfer inspection. `createTransfer()` and `createWithdrawal()` move funds; they are not read operations. Review the destination, asset, amount and required approvals before using them, and retain transaction identifiers for status reads.

[Prime client reference](/api/classes/CBPrimeClient) · [Choose another API](/products)
