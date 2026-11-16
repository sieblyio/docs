---
title: "Gate.io TestNet"
description: "Configure gateio-api for TestNet REST and WebSocket services with separate testing credentials."
---

# TestNet {#testing-environments}

## Available environments

Gate.io provides production services and TestNet. The SDK defaults to production. Select TestNet with `useTestnet: true`; there is no separate `demoTrading` option.

## Connect to TestNet {#testnet}

Create API credentials in Gate's TestNet environment and keep them separate from live credentials. Set `useTestnet: true` on every REST, subscription and WebSocket API client you use:

<<< @/../examples/testnet-clients.ts

The example constructs clients without sending requests. The SDK selects the TestNet REST host and the matching WebSocket endpoint for each connection key. Spot and USDT perpetual futures have TestNet routes; check current product coverage in [Gate's REST reference](https://www.gate.com/docs/developers/apiv4/en/) and the [Spot WebSocket reference](https://www.gate.com/docs/developers/apiv4/ws/en/).

For this documentation's private examples, set `GATEIO_USE_TESTNET=true` in `.env` and supply TestNet credentials in `GATEIO_API_KEY` and `GATEIO_API_SECRET`. The shared helper passes the same setting to each client.

## Coverage and limitations

Check Gate’s current TestNet documentation for the products and operations available to your account. Announcements WebSockets are production-only.

Avoid overriding `baseUrl` or `baseUrlKey` when using automatic REST TestNet routing: those overrides take precedence over `useTestnet`. Keep the environment consistent for placement, status queries and private subscriptions.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
