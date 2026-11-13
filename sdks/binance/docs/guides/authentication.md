---
title: "Binance SDK authentication"
description: "Configure Binance credentials and select the matching environment."
---

# Account access and balances {#authentication}

Public market data needs no credentials. Account queries and trading require an API key with the relevant permissions.

## Configure credentials

The examples below select Spot Testnet with `testnet: true`. Set the matching credentials through environment variables. Set `testnet: false` (or omit it) and use production credentials to connect to the production Spot APIs.

<<< @/../examples/authenticated-client.ts

Supply API credentials through protected server-side environment variables or a secret manager. Keep them out of source files and browser bundles. Creating the client alone does not verify credentials or permissions.

## Verify account access

To run these examples on Spot Testnet, use credentials created for **Binance Spot Testnet**, with permission to read the account. For local development, create a private `.env` file:

```dotenv
# Fictitious values; use your own Spot Testnet credentials.
BINANCE_API_KEY=example_testnet_key # API key
BINANCE_API_SECRET=example_testnet_secret # API secret
```

Add `.env` to `.gitignore`. This server-side request reads account data; it does not place orders.

This example queries a Spot Testnet account. Futures and Portfolio Margin use different clients and account endpoints.

After installing the SDK, save this plain JavaScript example as `account.mjs`:

<<< @/../examples/account-state.ts{js}

Run it with Node.js 24:

```sh
node --env-file=.env account.mjs
```

If you already supplied the variables through your server environment, use `node account.mjs` instead. A successful request prints `Account access verified.` and the number of returned balances. Read `account.balances` to inspect them. See [`getAccountInformation()`](/api/classes/MainClient#getaccountinformation) for the response type and [Error handling](/guides/errors) for safe diagnostics.

## Match the environment and account

Use keys for the selected Binance product and environment. Check key permissions and IP restrictions if an account request fails.

## Place an order

Once account access works, start [Private order updates](/guides/private-streams), then follow [Order management](/guides/orders) to submit and cancel through REST. Follow WebSocket events for status changes and fills; use REST status queries for diagnosis and recovery.

## Signing and timestamps

The SDK signs private requests. Keep the host clock synchronized, since signed requests include a timestamp.

[Configuration](/guides/configuration) · [Troubleshooting](/guides/troubleshooting) · [Exchange authentication documentation](https://developers.binance.com/docs/binance-spot-api-docs)
