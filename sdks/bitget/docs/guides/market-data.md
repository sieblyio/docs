---
title: "Bitget public market data with REST"
description: "Read UTA V3 tickers, instrument metadata and depth, with Classic V2 alternatives."
---

# Public market data with REST

Start with `RestClientV3` for UTA market endpoints. Existing Classic integrations can use `RestClientV2` as described below. Public reads do not require credentials. Use symbols such as `BTCUSDT`, without a hyphen.

<<< @/../examples/market-data.ts

Save as `market-data.ts` and run with `node market-data.ts` on Node.js 24 after installing `bitget-api`, or compile it with your TypeScript project.

## Read the response envelope

Both clients return the exchange envelope. Read the payload from `response.data`. Prices and quantities are commonly decimal strings. Preserve their precision for accounting and order validation.

## Select the right instrument rules

UTA uses [`getInstruments()`](/api/classes/RestClientV3#getinstruments) with the matching category. Classic Spot uses [`getSpotSymbolInfo()`](/api/classes/RestClientV2#getspotsymbolinfo). Read current price/quantity precision, minimums and instrument status before submitting an order. Futures have different quantity and contract rules from Spot.

For UTA prices, use [`getTickers()`](/api/classes/RestClientV3#gettickers) and read `response.data[0]?.lastPrice`.

## Classic V2 alternatives

Existing Classic Spot integrations can use `getSpotTicker()`, `getSpotSymbolInfo()` and `getSpotOrderBookDepth()` on `RestClientV2`. Classic tickers use `lastPr`, not V3's `lastPrice`. For Classic futures, use the futures methods exposed on `RestClientV2`, with the required product type. Specify the product type along with the symbol to select the market.

## Snapshots and ongoing data

A REST order-book response is a snapshot at one moment. For continuous updates, use [public WebSockets](/guides/websockets). Follow the channel's snapshot, delta, sequence and checksum rules when maintaining a local book. Rebuild after a gap rather than appending updates to stale state.

Use historical endpoints for candles and trades instead of assuming a WebSocket subscription sends complete history. Paginate according to each endpoint's limits and cursor/time fields.

`RestClientV3.getFills()` returns **public market trades**. For your own UTA executions, use authenticated [`getTradeFills()`](/api/classes/RestClientV3#gettradefills).

[Bitget Classic Spot market API](https://www.bitget.com/api-doc/spot/market/Get-Tickers) · [UTA market API](https://www.bitget.com/api-doc/uta/public/Tickers)
