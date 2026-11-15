---
title: "Legacy Coinbase International Exchange SDK"
description: "Understand retained INTX methods, historical records and the institutional migration to Deribit."
---

# International Exchange (legacy)

`CBInternationalClient` retains the old `api.international.coinbase.com` routes. Coinbase's [institutional migration FAQ](https://help.coinbase.com/en/international-exchange/deribit/institutional-faqs) says accounts, positions and balances migrated to Deribit on **1 October 2026**. The migrated INTX accounts are view-only and the old API endpoints no longer support trading.

Institutional trading now uses the [Deribit API](https://docs.deribit.com/) and new Deribit API keys. The [Advanced Trade Global client](/products/global) connects to Coinbase’s retail gateway, not the institutional Deribit API.

## SDK scope {#setup}

The examples below document legacy INTX integrations, which use INTX instruments, portfolio IDs and credentials. A Deribit integration requires its own API keys and request formats.

## Legacy market data {#market-data}

The public REST example shows how the SDK constructs requests:

<<< @/../examples/international-market-data.ts

The legacy market-data methods are `getInstruments()`, `getInstrumentDetails()` and `getQuotePerInstrument()`. For current market data, use the Deribit API.

## Legacy authentication {#authentication}

The SDK's INTX authentication uses an API key, secret and passphrase. Historical public REST discovery did not require credentials, but INTX market WebSocket subscriptions did. Do not reuse these API keys with the replacement venue.

## Legacy market subscriptions {#public-streams}

The example subscribes to `LEVEL1` on the SDK's `internationalMarketData` connection:

<<< @/../examples/international-stream.ts

The SDK signs subscription requests for the legacy market-data URL `wss://ws-md.international.coinbase.com`. This subscription is for market data, not portfolio or order updates.

## Historical records {#account-state}

Coinbase says historical INTX trade and order data will remain accessible for **approximately 12 months after migration**. INTX history does not appear in Deribit. Export the records you need within that retention period.

The account example shows portfolio-scoped reads:

<<< @/../examples/international-account.ts

`getOrderDetails()` and `getPortfolioFills()` are the SDK’s legacy order and fill queries. Keep the INTX portfolio identifier with each historical record and paginate the results.

## Retired trading {#orders}

Do not use `submitOrder()`, `updateOpenOrder()` or the cancellation methods as a new INTX trading integration. Coinbase states that old INTX endpoints no longer support trading. Margin loans did not migrate.

## Legacy environments {#environments}

`useSandbox: true` selects the legacy INTX sandbox hosts. For Deribit development, use Deribit’s test environment and API keys.

[Legacy INTX client reference](/api/classes/CBInternationalClient) · [Institutional migration FAQ](https://help.coinbase.com/en/international-exchange/deribit/institutional-faqs) · [Choose another API](/products)
