---
title: "HTX public market data with REST"
description: "Read Spot tickers, candles, order books and symbol metadata with @siebly/htx-api."
---

# Public market data

Use an unauthenticated `SpotClient` for public prices and instrument metadata. Spot symbols are lowercase, such as `btcusdt`.

## Read prices and an order book

<<< @/../examples/market-data.ts

Ticker and depth responses carry `tick`; candles and trading-symbol metadata carry `data`. Depth levels contain price and quantity. The `type` parameter selects the exchange's aggregation step; `step0` requests unaggregated depth.

## Check instrument constraints

Read `getTradingSymbols()` before validating orders. Use the current symbol status, precision and amount/value limits. Keep decimal order amounts and prices as strings, and avoid using floating-point arithmetic for accounting.

## Candles and historical data

`getKlines()` accepts `symbol`, `period` and an optional `size`. A candle's `id` is its interval start in Unix seconds; response timestamps use their documented units. The current candle can change until the interval closes.

## Futures market data

Use [FuturesClient](/api/classes/FuturesClient) methods for the relevant contract family. Contract identifiers and quantity units differ from Spot. Inspect contract metadata and the selected endpoint's return type before sharing code between products.

## Maintain a local order book

A REST depth response is a snapshot, not a continuously synchronized book. For incremental feeds, follow the channel's snapshot, sequence and resubscription rules. Do not apply one channel's reconciliation rules to another merely because both contain bids and asks.

[Public streams](/guides/websockets) · [Spot reference](https://huobiapi.github.io/docs/spot/v1/en/)
