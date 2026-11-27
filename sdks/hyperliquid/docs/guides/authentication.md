---
title: Hyperliquid SDK authentication and account addresses
description: Query Hyperliquid accounts by address, find the Hyperliquid equivalent of an API key, and configure private keys, API wallets, vaults or custom signers for signed actions.
---

# Account access and balances {#authentication}

Public market data and account queries do not require a signature. Exchange actions, such as placing or cancelling an order, require a private key or signer.

## Read account state

Set `accountAddress` to query an account without configuring a signer. This example reads its perpetual positions.

<<< @/../examples/account-state.ts

Set `HYPERLIQUID_ACCOUNT_ADDRESS` before running the example. It uses Mainnet by default; add `testnet: true` to the constructor options to query Testnet. Perpetual positions are in `assetPositions`. For unified accounts or portfolio margin, [`getSpotBalances()`](/api/classes/RestClient#getspotbalances) returns balances across Spot and perps.

Account methods resolve addresses in this order: request `user`, `vaultAddress`, `accountAddress`, then the configured signer.

[getPerpAccountSummary](/api/classes/RestClient#getperpaccountsummary) · [AccountRequest](/api/interfaces/AccountRequest)

## Configure a private key

Pass `privateKey` and the managed account address to `RestClient`. This example uses Mainnet. Use the managed account address and a signer authorized for that account. For Testnet, set `testnet: true` and use the corresponding account and signer.

<<< @/../examples/authenticated-client.ts

Keep the private key in a secure server-side environment, supplied through a protected environment variable or a secret manager, outside source files and browser bundles.

## Hyperliquid API keys {#api-keys}

Hyperliquid does not issue an API key and secret pair. The equivalent is an API wallet, also called an agent wallet: a separate private key that your main account approves to sign on its behalf. Create one on the [API page of the Hyperliquid app](https://app.hyperliquid.xyz/API) on the network you trade on, because Mainnet and Testnet approvals are separate.

| Exchange-style setting | Hyperliquid equivalent | SDK option |
| --- | --- | --- |
| API secret | API wallet private key | `privateKey` |
| API key or account ID | Main account or subaccount address | `accountAddress` |

The API wallet only signs. Account data belongs to the main account, so always set `accountAddress`. Without it, account methods throw `The signer is not a Hyperliquid account on this network. Set accountAddress when using an API wallet.` A key that is not approved for the account is rejected with `User or API Wallet 0x... does not exist.` (see [common rejection messages](/guides/errors)).

Use a separate API wallet for each trading process, because Hyperliquid tracks nonces per signer. After an API wallet is replaced or expires, generate a new one instead of reusing the old address.

## API wallets and vaults

An API wallet signs for another account. Set `accountAddress` to the managed account so queries return its balances and positions.

`vaultAddress` selects a vault or subaccount for supported actions and takes precedence over `accountAddress` for account queries. The signer must be authorized for the requested action. See the [Hyperliquid tutorial](https://siebly.io/sdk/hyperliquid/javascript/tutorial) for the account and API wallet setup workflow.

## Custom signers

Pass `signer` instead of `privateKey` to supply a [`HyperliquidSigner`](/api/interfaces/HyperliquidSigner). The interface requires `signTypedData()` and supports an `address` or `getAddress()` for address resolution. An ethers Wallet can satisfy this interface.

`WebsocketAPIClient` accepts the same signing options. `WebsocketClient` subscriptions use account addresses and do not need a private key.

[RestClientOptions](/api/interfaces/RestClientOptions) · [WebsocketAPIClientOptions](/api/type-aliases/WebsocketAPIClientOptions) · [Order results and errors](/guides/errors#order-results)

## Next steps

[Place and cancel an order](/guides/orders), or [subscribe to account order updates](/guides/private-streams).
