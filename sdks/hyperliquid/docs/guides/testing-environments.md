---
title: "Hyperliquid testing environments"
description: "Choose supported Hyperliquid testing services, configure clients and understand their limitations."
---

# Testing environments

## Available environments

Hyperliquid provides **mainnet** and **Testnet**. This SDK does not expose a separate demo-trading mode. Mainnet is the default.

## Testnet

Set `testnet: true` on each `RestClient`, `WebsocketClient` and `WebsocketAPIClient` you use:

<<< @/../examples/testnet-clients.ts

This example constructs public clients without sending requests or signing actions. The option selects both network routing and the signing network for authenticated actions. Changing only a URL is not sufficient to configure signed Testnet actions correctly.

## Wallets and account access

Hyperliquid uses wallet signing rather than an exchange API key/secret pair. For authenticated calls, configure a server-side `privateKey` or external `signer`. If using an API/agent wallet, approve it on the selected network. Query account state with the master account address, not the agent wallet address; use `accountAddress` where required by your integration. Follow [Authentication](/guides/authentication) and Hyperliquid's [API wallet guidance](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/nonces-and-api-wallets).

## Coverage and limitations

Testnet has its own balances, markets and activity. Do not assume symbols, asset identifiers or account state are identical across networks. Check the selected network's metadata before creating an order.

Read the current [Testnet faucet eligibility rules](https://hyperliquid.gitbook.io/hyperliquid-docs/onboarding/testnet-faucet) before expecting test funds; a new wallet is not automatically eligible. Email-login wallets can also differ between networks. See the official [API](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api) and [WebSocket documentation](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/websocket) for network endpoints.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
