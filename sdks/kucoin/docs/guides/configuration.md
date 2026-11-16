---
title: "KuCoin SDK configuration and regions"
description: "Configure REST timeouts, regional routing and WebSocket connection options in kucoin-api."
---

# Configuration and environments

REST clients accept SDK options first and Axios request options second. `WebsocketClient` and `WebsocketAPIClient` accept WebSocket options in their first argument.

<<< @/../examples/configure-rest.ts

## Live services and regions {#environments}

The SDK uses live services. There is no supported `testnet`, `useTestnet` or `demoTrading` constructor option. See [Test order validation](/guides/testing-environments#test-order) for the validation endpoint, or [Testing without orders](/guides/testing-environments#test-without-placing-orders) for offline recovery tests.

`apiRegion` accepts `global` (the default), `EU` or `AU`. Set it consistently on REST and WebSocket clients. Use the region that owns your credentials and check product availability there. In this SDK release, EU routing changes Spot and Unified REST hosts. Broker and futures do not receive an EU host override. AU adds the required site header. Regional routing does not grant access to unavailable products.

WebSocket V1 connection URLs and tokens are obtained through REST; Pro V2 and WebSocket API connections use fixed global hosts in this release. Do not assume `apiRegion` changes those URLs or makes those services available to a regional account.

## Timeouts and connections

Set Axios `timeout` in milliseconds in the second REST constructor argument. The default is five minutes, so choose a timeout suitable for your application. A timeout during an order command leaves the outcome uncertain; [check its status before retrying](/guides/orders#recover-an-uncertain-outcome).

`keepAlive` belongs in the first argument. Leave it false when using a custom HTTPS proxy agent, because enabling it creates a new HTTPS agent.

WebSocket options include `pingInterval`, `pongTimeout`, `reconnectTimeout` and `wsOptions`. Keep heartbeat handling enabled and avoid extremely short timeouts. The `requestOptions` property configures REST calls made by the WebSocket client, including V1 connection-token requests. Configure both transports when using a proxy.

The REST `parseExceptions` option controls error post-processing. See [Error handling](/guides/errors) before logging failures.

[Proxies](/guides/proxies) · [SpotClient reference](/api/classes/SpotClient) · [WebsocketClientOptions reference](/api/interfaces/WebsocketClientOptions)
