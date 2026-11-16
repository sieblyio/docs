---
title: "Gate.io SDK configuration and environments"
description: "Configure REST timeouts, WebSocket connections and TestNet routing in gateio-api."
---

# Configuration and environments

`RestClient` accepts SDK options first and Axios request options second. `WebsocketClient` and `WebsocketAPIClient` accept WebSocket options in their first argument.

<<< @/../examples/configure-rest.ts

## Live and TestNet services {#environments}

Clients use live services by default. Set `useTestnet: true` separately on each REST and WebSocket client for [TestNet](/guides/testing-environments#testnet). Use keys created for that environment. The option is `useTestnet`, not `testnet` or `demoTrading`.

Product availability can differ between live and TestNet services.

## Timeouts and connections

Set Axios `timeout` in milliseconds in the second REST constructor argument. The SDK's default is five minutes, so choose a timeout suitable for your application. A timeout during an order command leaves the outcome uncertain; [check its status before retrying](/guides/orders#recover-an-uncertain-outcome).

`keepAlive` belongs in the first argument. Leave it false when using a custom HTTPS proxy agent, because enabling it creates a new HTTPS agent.

WebSocket options include `pingInterval`, `pongTimeout`, `reconnectTimeout` and `wsOptions`. Keep heartbeat handling enabled and avoid extremely short timeouts. Configure proxies separately for each transport.

The REST `parseExceptions` option controls error post-processing. See [Error handling](/guides/errors) before logging failures.

[Proxies](/guides/proxies) · [RestClient reference](/api/classes/RestClient) · [WebsocketClientOptions reference](/api/interfaces/WebsocketClientOptions)
