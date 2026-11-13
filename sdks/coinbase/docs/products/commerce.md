---
title: "Coinbase Commerce SDK"
description: "Read Commerce charges and checkouts, inspect payment state, and keep payment identifiers separate."
---

# Commerce

`CBCommerceClient` targets `api.commerce.coinbase.com`. Its resources are payment charges and checkouts, not exchange accounts or orders.

## Setup {#setup}

Install `coinbase-api` with `npm install coinbase-api` and use Node.js 24 to run the examples. Add the credentials below to a private `.env` file excluded from Git. Run each saved example with `node --env-file=.env filename.ts`, replacing `filename.ts` with its filename. Keep account output private.

## Configure your Commerce key {#authentication}

Set a Commerce API key in your private environment:

```dotenv
COINBASE_COMMERCE_API_KEY=your-commerce-api-key
```

No API secret or passphrase is required. For these GET requests, supply `X-CC-Api-Key` explicitly through the REST client's second constructor argument. Do not supply an API secret.

## List charges {#charges}

Save as `commerce-read.ts`:

<<< @/../examples/commerce-read.ts

Inspect the charge resources and returned pagination metadata. Save the charge ID or code used by your application; do not substitute a checkout ID or an on-chain transaction hash.

## Read one payment {#payment-state}

Set `COINBASE_COMMERCE_CHARGE_ID` to a charge ID or code from the list, then save as `commerce-charge.ts`:

<<< @/../examples/commerce-charge.ts

Inspect the charge's current payment state and timeline according to the Commerce schema before treating an invoice as paid. Retrieving a charge does not mean it has been paid.

Use this targeted read for a specific unresolved payment or to recover missing state. If a webhook integration supplies payment events, validate those events according to Commerce's webhook requirements, deduplicate them and update local payment state. Do not mistake a duplicate event for an additional payment.

## Checkouts and events {#events}

- `getAllCheckouts()` lists checkout resources.
- `getCheckout({ checkout_id })` retrieves a specific checkout.
- `listEvents()` and `showEvent()` expose event resources; their signatures require an `X-CC-Version` argument. Use the Commerce API version selected for your integration.

Charges, checkouts and events have different identifiers. Store their relationships explicitly so a payment event updates the right invoice or purchase. Handle pagination and API errors, and check payment state explicitly; the response types do not validate it.

## Creating payment resources {#payments}

The reference includes `createCharge()` and `createCheckout()`. They create payment resources rather than submit exchange orders. Review currency, amount, pricing mode, metadata and redirect/cancel destinations before exposing a checkout to a customer. A created charge is not a completed payment.

## Transport and environments {#environments}

This SDK has no Commerce WebSocket feed, Commerce WebSocket request API or mapped Commerce sandbox. A webhook receiver is a separate part of your application; `WebsocketClient` does not manage it.

Keep API keys and customer/payment data out of public logs. Use durable payment identifiers and targeted recovery reads when a response or event leaves the outcome unclear.

[Commerce client reference](/api/classes/CBCommerceClient) · [Choose another API](/products)
