---
title: "Bybit testing environments"
description: "Choose supported Bybit testing services, configure clients and understand their limitations."
---

# Testing environments

## Available environments

- **Testnet:** a separate testing service with its own account and credentials.
- **Demo trading:** a demo account created from your mainnet account, with simulated orders and production public market data.

These are different services. Do not create a demo account on Testnet for the configuration below. Production is the default when both flags are false or omitted.

## Testnet

Create credentials in [Bybit Testnet API management](https://testnet.bybit.com/app/user/api-management). Set `testnet: true` and `demoTrading: false` on each `RestClientV5`, `WebsocketClient` or supported `WebsocketAPIClient` you use. Pass Testnet credentials through `key` and `secret`.

## Demo trading

Switch your mainnet account to Demo Trading and create an API key there. Set `demoTrading: true` and `testnet: false` on each REST and subscription client, with that demo key and secret:

<<< @/../examples/demo-clients.ts

This example only constructs clients; it does not send requests or place orders. Keep credentials in server-side environment variables and exclude `.env` files from version control.

## Coverage and limitations

Demo REST and private subscriptions use demo endpoints; public subscriptions use mainnet market data. Only the endpoints listed in [Bybit's demo documentation](https://bybit-exchange.github.io/docs/v5/demo) are available. Demo trading does **not** support the WebSocket Trade API: use REST for supported demo order commands, not `WebsocketAPIClient`.

Do not enable `testnet` and `demoTrading` together. In this SDK, that combination can select demo for REST/private streams but Testnet for public streams. Check [Bybit's integration guide](https://bybit-exchange.github.io/docs/v5/guide) for current environment and key requirements.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
