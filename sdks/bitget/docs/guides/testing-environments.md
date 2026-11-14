---
title: "Bitget testing environments"
description: "Choose supported Bitget testing services, configure clients and understand their limitations."
---

# Testing environments

## Available environments

Bitget supports **production** and **demo trading**. The SDK uses `demoTrading`, not a `testnet` flag. Demo configuration is available for both Unified Trading Account (UTA) and Classic clients; endpoint availability still depends on the account and product.

## Demo trading

Complete Bitget's account requirements, switch to Demo mode and create a demo API key, secret and passphrase. The official setup currently requires KYC. Do not reuse production credentials.

Set `demoTrading: true` on each REST and WebSocket client. This UTA example only constructs clients and makes no requests:

<<< @/../examples/demo-clients.ts

For Classic APIs, use `RestClientV2` and `WebsocketClient` with the same explicit demo option and the appropriate demo credentials. See [Choose UTA or Classic](/clients) before selecting a client.

## Coverage and limitations

The SDK supplies the REST `paptrading` header and selects demo WebSocket routes. Do not add simulation headers or hardcode URLs alongside the option. Omitting `demoTrading` selects production, and configuring REST does not change a separate WebSocket client.

Check the current instructions for your API family:

- UTA: [REST demo setup](https://www.bitget.com/docs/uta/demo-trading/rest-api) and [WebSocket demo setup](https://www.bitget.com/docs/uta/demo-trading/websocket).
- Classic: [REST demo setup](https://www.bitget.com/docs/classic/demo-trading/rest-api) and [WebSocket demo setup](https://www.bitget.com/docs/classic/demo-trading/websocket).

Demo trading does not imply that every account, transfer or trading endpoint available in production is supported in simulation.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
