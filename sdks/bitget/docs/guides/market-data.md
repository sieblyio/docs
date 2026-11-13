---
title: "Bitget public market data with REST"
description: "Read Classic Spot tickers, symbols and depth, and UTA instrument metadata."
---

# Public market data with REST

Use `RestClientV2` for Classic market endpoints and `RestClientV3` for UTA market endpoints. Public reads do not require credentials. Symbols such as `BTCUSDT` do not contain the separator used by some other exchanges.

<<< @/../examples/market-data.ts

Save as `market-data.ts` and run with `node market-data.ts` on Node.js 24 after installing `bitget-api`, or compile it with your TypeScript project.

## Read the response envelope

Both clients return the exchange envelope. Read the payload from `response.data`; do not index the response itself or apply another SDK's automatic unwrapping rules. Prices and quantities are commonly decimal strings. Preserve their precision for accounting and order validation.

## Select the right instrument rules

Classic Spot uses [`getSpotSymbolInfo()`](/api/classes/RestClientV2#getspotsymbolinfo). UTA uses [`getInstruments()`](/api/classes/RestClientV3#getinstruments) with the matching category. Read current price/quantity precision, minimums and instrument status before submitting an order. Futures have different quantity and contract rules from Spot.

For UTA prices, use [`getTickers()`](/api/classes/RestClientV3#gettickers); for Classic futures, use the futures methods exposed on `RestClientV2`, with the required product type. Do not assume the same symbol alone identifies the same market.

## Snapshots and ongoing data

A REST order-book response is a snapshot at one moment. For continuous updates, use [public WebSockets](/guides/websockets). Follow the channel-specific snapshot/delta, sequencing and checksum contract when maintaining a local book. Rebuild after a gap rather than appending updates to stale state.

Use historical endpoints for candles and trades instead of assuming a WebSocket subscription sends complete history. Paginate according to each endpoint's limits and cursor/time fields.

`RestClientV3.getFills()` returns **public market trades**. For your own UTA executions, use authenticated [`getTradeFills()`](/api/classes/RestClientV3#gettradefills).

[Bitget Classic Spot market API](https://www.bitget.com/api-doc/spot/market/Get-Tickers) · [UTA market API](https://www.bitget.com/api-doc/uta/public/Tickers)
