---
title: "Legacy Coinbase Commerce SDK"
description: "Identify the legacy Commerce methods retained by coinbase-api and find Coinbase's migration guidance."
---

# Commerce (legacy)

`CBCommerceClient` targets the legacy `api.commerce.coinbase.com` API. It does not implement Coinbase Business Checkout APIs.

Coinbase's [transition notice](https://help.coinbase.com/en/transitioning-from-coinbase-commerce-to-coinbase-business) set 31 March 2026 as the Commerce migration deadline and says charge creation is no longer available after that date. For new payment integrations, follow the [Coinbase Business Checkout documentation](https://docs.cdp.coinbase.com/coinbase-business/checkout-apis/overview). Business uses different endpoints, credentials and schemas; changing this client's `baseUrl` is not a migration.

## SDK scope {#setup}

The methods below remain exported by `coinbase-api`. Their presence does not establish that a legacy endpoint is still available to your account. This page describes the SDK interface for maintaining or identifying old integrations, not a new Commerce setup.

## Legacy authentication {#authentication}

Commerce used an API key in `X-CC-Api-Key`, without an API secret or passphrase. The examples below pass that header through the REST client's second constructor argument. These are legacy read examples, not Coinbase Business authentication examples. Do not substitute Business credentials.

## Charge methods {#charges}

`getAllCharges()` requests `/charges`. The retained example reads `COINBASE_COMMERCE_API_KEY` from the environment:

<<< @/../examples/commerce-read.ts

## Individual charge {#payment-state}

`getCharge()` takes `charge_code_or_charge_id`. The retained example also reads `COINBASE_COMMERCE_CHARGE_ID`:

<<< @/../examples/commerce-charge.ts

The SDK types these responses as `any`. It does not validate payment state or establish that an invoice was paid. Preserve charge identifiers when migrating historical records; a checkout ID or on-chain transaction hash is not a substitute for a Commerce charge ID.

## Checkout and event methods {#events}

- `getAllCheckouts()` requests legacy checkout resources.
- `getCheckout({ checkout_id })` requests one legacy checkout.
- `listEvents()` and `showEvent()` require an `X-CC-Version` argument.

These are not the Business checkout or webhook APIs. Follow the replacement API's documentation for payment events and signature verification.

## Legacy creation methods {#payments}

`createCharge()` and `createCheckout()` remain in the SDK, but do not use them to build a new payment integration. Follow Coinbase's transition guidance rather than assuming an exported method means the service still accepts new resources.

## Transport and environments {#environments}

This SDK has no Commerce WebSocket feed, Commerce WebSocket request API or mapped Commerce sandbox. `WebsocketClient` does not implement a webhook receiver.

[Commerce client reference](/api/classes/CBCommerceClient) · [Choose another API](/products)
