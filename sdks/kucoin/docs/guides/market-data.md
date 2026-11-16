---
title: "KuCoin public market data over REST"
description: "Read Spot tickers, pair rules, order-book snapshots and candles with kucoin-api."
---

# Public market data

Use `SpotClient` for Classic Spot market data. These requests need no credentials and use live services.

<<< @/../examples/market-data.ts

## Prices and quantities

Successful responses retain KuCoin's `code` and `data` envelope. Read the ticker at `response.data.price`, the book at `response.data.bids` and `response.data.asks`, and symbol rules from `response.data` returned by `getSymbols()`.

Price and size fields are decimal strings. Preserve them through trading calculations or use a decimal library; converting to JavaScript numbers can lose precision. Book levels are `[price, size]` pairs.

Before placing an order, check the symbol's `enableTrading`, increments, minimum size and `minFunds`. Pair rules can change. A book snapshot is not a continuously maintained local order book.

## Candles and time units

`getKlines()` uses `type` values such as `1min` and `1hour`. Its `startAt` and `endAt` bounds are Unix seconds, not milliseconds. Candle tuples contain `[time, open, close, high, low, volume, turnover]`; the time is a string containing Unix seconds.

Do not assume every interval has a candle or that responses are in ascending time order. Sort and deduplicate when combining overlapping requests, and treat the current candle as incomplete.

## Other products

Use [FuturesClient](/api/classes/FuturesClient) for Classic futures and [UnifiedAPIClient](/api/classes/UnifiedAPIClient) for UTA market data. Choose symbols and request parameters from each product's reference instead of substituting a Spot symbol into a futures call.

[Streaming updates](/guides/websockets) · [SpotClient reference](/api/classes/SpotClient)
