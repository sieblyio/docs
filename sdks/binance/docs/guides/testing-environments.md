---
title: "Binance testing environments"
description: "Choose supported Binance testing services, configure clients and understand their limitations."
---

# Testing environments

## Available environments

- **Spot Testnet:** a separate Spot API testing service with virtual balances and independent order books.
- **Demo trading:** the SDK has demo routing for Spot, USDⓈ-M Futures and COIN-M Futures.

Choose the product and environment together. An option on `MainClient` does not imply support for all of its endpoint families. Production is the default when `testnet` and `demoTrading` are false or omitted.

## Spot Testnet

Create API credentials at [Spot Testnet](https://testnet.binance.vision/). Set `testnet: true` and `demoTrading: false` on `MainClient` and any Spot WebSocket clients. Supply the Testnet key and secret as `api_key` and `api_secret`.

Spot Testnet supports `/api` endpoints, not `/sapi`. Its data and virtual balances are periodically reset; consult the [Spot Testnet documentation](https://developers.binance.com/en/docs/products/spot/testnet/general-info) before depending on persistent account state.

## Demo trading

Create API credentials in [Binance Demo Trading](https://developers.binance.com/en/docs/products/spot/demo-mode/general-info). Set `demoTrading: true` and `testnet: false` on every client used for that environment:

<<< @/../examples/demo-clients.ts

This example constructs Spot clients without sending requests. For Futures, choose `USDMClient` or `CoinMClient` and the corresponding WebSocket market. Keep demo credentials separate from production and Spot Testnet credentials.

## Coverage and limitations

Do not enable both flags. The REST and WebSocket clients handle that combination differently. Avoid manual `baseUrl` or `wsUrl` overrides when using the environment flags; overrides can bypass SDK routing.

Binance's Futures documentation calls its demo host a “testnet”. Do not infer two independent Futures services or interchangeable credentials from the SDK's two flag names. Follow the [Futures environment documentation](https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info) for the selected product and verify the destination before authenticated operations.

Demo support does not extend automatically to Margin, Portfolio Margin, Options or every account endpoint. The [Spot demo documentation](https://developers.binance.com/en/docs/products/spot/demo-mode/general-info) also cautions that simulated market data and strategy outcomes do not represent live execution.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
