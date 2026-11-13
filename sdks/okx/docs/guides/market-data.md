---
title: "OKX public market data"
description: "Read instruments, order books and Spot or swap tickers through the SDK."
---

# Public market data

Use `RestClient` without credentials for public data. An instrument ID includes separators: `BTC-USDT` is Spot and `BTC-USDT-SWAP` is a perpetual swap. Availability depends on region and instrument status.

## Read instrument rules and market data

Install `okx-api` and save this example as `market-data.ts`. It reads the BTC-USDT Spot instrument rules, a five-level order book and perpetual-swap tickers.

<<< @/../examples/market-data.ts

Run it on Node.js 24, or compile it with your TypeScript project:

```sh
node market-data.ts
```

The example prints each result with its label. Each method returns an array of records from the API's `data` field.

## Check instrument rules

Inspect instrument metadata before choosing order values: `tickSz` is the price increment, `lotSz` the size increment, and `minSz` the minimum size. Also check the current instrument state and contract fields. Spot limit sizes are in base currency; derivative sizes generally represent contracts and must be interpreted using the instrument metadata.

Keep price and size values as decimal strings when sending requests. Do not assume JavaScript floating-point arithmetic preserves valid increments.

## Read an order book {#order-books}

`getOrderBook()` is a REST snapshot. Book levels include price and size along with additional fields defined by OKX. A single snapshot is not a continuously maintained order book.

For ongoing data use [WebSocket subscriptions](/guides/websockets). For a small order-book display, use a snapshot channel such as `books5`. Incremental book channels require the exchange's snapshot, sequence and checksum rules, plus recovery after gaps. Your application must apply these updates and check the resulting order book.

[getInstruments reference](/api/classes/RestClient#getinstruments) · [getOrderBook reference](/api/classes/RestClient#getorderbook) · [OKX public data](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-instruments)
