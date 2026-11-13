---
title: "Legacy Coinbase International Exchange SDK"
description: "Understand retained INTX methods, historical records and the institutional migration to Deribit."
---

# International Exchange (legacy)

`CBInternationalClient` retains the old `api.international.coinbase.com` routes. Coinbase's [institutional migration FAQ](https://help.coinbase.com/en/international-exchange/deribit/institutional-faqs) says accounts, positions and balances migrated to Deribit on **1 October 2026**. The migrated INTX accounts are view-only and the old API endpoints no longer support trading.

For institutional trading, follow the FAQ and the [Deribit API documentation](https://docs.deribit.com/). New Deribit API keys are required. The retail [Advanced Trade Global client](/products/global) uses a different Coinbase gateway; do not assume it replaces an institutional INTX integration.

## SDK scope {#setup}

These methods and examples remain available to identify or maintain legacy integrations. Their exported signatures do not establish current service availability. The SDK still uses INTX-specific instruments, portfolio IDs and credentials; changing a base URL is not a migration.

## Legacy market data {#market-data}

The retained public REST example shows how the SDK constructs requests:

<<< @/../examples/international-market-data.ts

`getInstruments()`, `getInstrumentDetails()` and `getQuotePerInstrument()` describe historical INTX market-data operations. Their former availability is not a promise that these endpoints still return market data after migration. Use the replacement venue's current instrument and market-data contracts.

## Legacy authentication {#authentication}

The SDK's INTX authentication uses an API key, secret and passphrase. Historical public REST discovery did not require credentials, but INTX market WebSocket subscriptions did. Do not reuse these API keys with the replacement venue.

## Legacy market subscriptions {#public-streams}

The retained example subscribes to `LEVEL1` on the SDK's `internationalMarketData` connection:

<<< @/../examples/international-stream.ts

The SDK signs subscription requests and maps the feed to `wss://ws-md.international.coinbase.com`. This is historical market-data integration code, not confirmation that the feed remains operational. It is not a portfolio/order stream, and the SDK does not map a separate INTX private-account feed or INTX WebSocket order API.

## Historical records {#account-state}

Coinbase says historical INTX trade and order data will remain accessible for **approximately 12 months after migration**. INTX history does not appear in Deribit. Keep a copy of required records and consult Coinbase's current retention guidance; this statement does not guarantee that every legacy account endpoint remains available.

The retained account example shows portfolio-scoped reads:

<<< @/../examples/international-account.ts

`getOrderDetails()` and `getPortfolioFills()` are legacy order and fill methods. Confirm the supported history routes for your account before relying on them. Keep the INTX portfolio identifier with each historical record and respect endpoint pagination.

## Retired trading and known SDK mismatch {#orders}

Do not use `submitOrder()`, `updateOpenOrder()` or the cancellation methods as a new INTX trading integration. Coinbase states that old INTX endpoints no longer support trading. Margin loans did not migrate.

There is also a historical route mismatch in this SDK release: `updatePortfolioParameters()` sends `PATCH /api/v1/portfolios`, while the [archived official contract](https://web.archive.org/web/20260412070122/https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/intx-spec.yaml) requires `/api/v1/portfolios/{portfolio}`. Its request type lacks that identifier. Do not treat this method's presence as evidence that it can update a portfolio.

## Legacy environments {#environments}

`useSandbox: true` still selects the SDK's INTX sandbox REST and WebSocket host mappings. Those mappings do not establish current sandbox availability. Follow the replacement API's test environment, credentials and recovery guidance.

[Legacy INTX client reference](/api/classes/CBInternationalClient) · [Institutional migration FAQ](https://help.coinbase.com/en/international-exchange/deribit/institutional-faqs) · [Choose another API](/products)
