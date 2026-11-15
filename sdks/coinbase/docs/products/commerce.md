---
title: "Legacy Coinbase Commerce SDK"
description: "Identify the legacy Commerce methods retained by coinbase-api and find Coinbase's migration guidance."
---

# Commerce (legacy)

`CBCommerceClient` targets the legacy `api.commerce.coinbase.com` API. It does not implement Coinbase Business Checkout APIs.

Coinbase's [transition notice](https://help.coinbase.com/en/transitioning-from-coinbase-commerce-to-coinbase-business) set 31 March 2026 as the Commerce migration deadline and says charge creation is no longer available after that date. For new payment integrations, follow the [Coinbase Business Checkout documentation](https://docs.cdp.coinbase.com/coinbase-business/checkout-apis/overview). Business uses different endpoints, credentials and schemas; changing this client's `baseUrl` is not a migration.

## SDK scope {#setup}

The methods below describe the legacy Commerce interface for existing integrations. New payment integrations use the Coinbase Business APIs.

## Legacy authentication {#authentication}

Commerce used an API key in `X-CC-Api-Key`, without an API secret or passphrase. The examples below pass that header through the REST client's second constructor argument. These are legacy read examples, not Coinbase Business authentication examples. Do not substitute Business credentials.

## Charge methods {#charges}

`getAllCharges()` requests one page from `/charges`. The historical API requires cursor pagination to retrieve all charges, but this wrapper does not accept a cursor or fetch further pages automatically. The example reads `COINBASE_COMMERCE_API_KEY` from the environment:

<<< @/../examples/commerce-read.ts

## Individual charge {#payment-state}

`getCharge()` takes `charge_code_or_charge_id`. The example also reads `COINBASE_COMMERCE_CHARGE_ID`:

<<< @/../examples/commerce-charge.ts

Preserve charge identifiers when migrating historical records; a checkout ID or on-chain transaction hash is not a substitute for a Commerce charge ID.

## Checkout and event methods {#events}

- `getAllCheckouts()` requests one page of legacy checkout resources, not all checkouts. It does not accept a cursor or fetch further pages automatically.
- `getCheckout({ checkout_id })` requests one legacy checkout.
- `listEvents()` and `showEvent()` require an `X-CC-Version` argument. Event lists were also paginated; `listEvents()` does not fetch all pages automatically.

These are not the Business checkout or webhook APIs. Follow the replacement API's documentation for payment events and signature verification.

## Legacy creation methods {#payments}

`createCharge()` and `createCheckout()` are legacy Commerce methods. Coinbase has ended Commerce charge creation; use the Coinbase Business APIs for new payments.

## Transport and environments {#environments}

This SDK has no Commerce WebSocket feed, Commerce WebSocket request API or mapped Commerce sandbox. `WebsocketClient` does not implement a webhook receiver.

[Commerce client reference](/api/classes/CBCommerceClient) · [Choose another API](/products)
