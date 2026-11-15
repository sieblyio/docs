---
title: "Bybit SDK authentication"
description: "Configure Bybit credentials and select the matching environment."
---

# Account access and balances {#authentication}

Public market data needs no credentials. Account queries and trading require an API key with the relevant permissions.

## Configure credentials

The examples use Mainnet, the SDK default. Set Mainnet credentials through environment variables. To use Testnet or demo trading instead, select that environment explicitly and use matching credentials; see [configuration](/guides/configuration#select-an-environment).

<<< @/../examples/authenticated-client.ts

Keep API credentials in a secure server-side environment, supplied through protected environment variables or a secret manager, outside source files and browser bundles. Creating the client alone does not verify credentials or permissions.

## Verify account access

Use Mainnet credentials with permission to read the account. For local development, create a private `.env` file:

```dotenv
# Use your own Bybit Mainnet credentials.
BYBIT_API_KEY=example_key
BYBIT_API_SECRET=example_secret
```

Exclude `.env` from version control and leave `BYBITTRACE` unset to avoid logging signed requests.

The read-only example below queries a Unified Trading Account with `accountType: 'UNIFIED'`. Use an account type supported by your account; see the [wallet-balance endpoint documentation](https://bybit-exchange.github.io/docs/v5/account/wallet-balance).

After installing the SDK, save this plain JavaScript example as `account.mjs`:

<<< @/../examples/account-state.ts{js}

Run it with Node.js 24:

```sh
node --env-file=.env account.mjs
```

If you already supplied the variables through your server environment, use `node account.mjs` instead. A successful request prints `Account access verified.` and the number of returned coin records. Balances are in `result.list[].coin`. See [`getWalletBalance()`](/api/classes/RestClientV5#getwalletbalance) for the response type and [Error handling](/guides/errors) for safe diagnostics.

## Match the environment and account

Mainnet, Testnet and demo trading use separate credentials. REST and WebSocket clients default to Mainnet. Select Testnet with `testnet: true`, or demo trading with `demoTrading: true` and `testnet: false`. Match credentials, permissions and IP restrictions to the selected environment; see [configuration](/guides/configuration#select-an-environment).

## Place an order

Once account access works, follow [Order management](/guides/orders). Start [Private order updates](/guides/private-streams) first, then submit and cancel through REST. Follow lifecycle changes through the stream and use REST status queries when an outcome remains unclear.

## Signing and timestamps

The SDK signs private requests. Keep the host clock synchronized, since signed requests include a timestamp.

[Configuration](/guides/configuration) · [Troubleshooting](/guides/troubleshooting) · [Exchange authentication documentation](https://bybit-exchange.github.io/docs/v5/intro)
