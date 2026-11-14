---
title: "OKX testing environments"
description: "Choose supported OKX testing services, configure clients and understand their limitations."
---

# Testing environments

## Available environments

OKX supports **production** and **demo trading**. Regional selection and simulation are separate settings: `market` chooses the account's regional service, while `demoTrading` chooses demo routing. Do not use `market: 'demo'`.

## Demo trading

Create an API key, secret and passphrase from OKX Demo Trading. Set `demoTrading: true` independently on `RestClient`, `WebsocketClient` and `WebsocketAPIClient` as needed. Use the same account region on each client.

<<< @/../examples/demo-clients.ts

This example constructs global demo clients without making requests. For a regional account, set the appropriate `market` on both clients as described in [Configuration](/guides/configuration#environments). Keep demo credentials in server-side environment variables, separate from live credentials.

## Coverage and limitations

The SDK supplies `x-simulated-trading: 1` for REST and selects demo WebSocket routes. No manual simulation header or URL override is needed. The default remains live trading.

Demo trading does not support every API feature. OKX explicitly excludes functions such as deposits, withdrawals and purchase/redemption. Confirm availability for your product and account region in [OKX's demo-trading documentation](https://www.okx.com/docs-v5/en/#overview-demo-trading-services).

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
