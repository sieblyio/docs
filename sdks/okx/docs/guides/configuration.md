---
title: "OKX SDK configuration and environments"
description: "Configure regions, optional demo trading, timeouts and connection options."
---

# Configuration and environments

`RestClient` accepts SDK options first and Axios request options second. `WebsocketClient` and `WebsocketAPIClient` accept WebSocket options, including credentials in an `accounts` array.

<<< @/../examples/configure-rest.ts

This example selects EEA live services. Remove the `market` option for the default global service, or select the region where your account is registered. No private API credentials are included in this public configuration example.

## Regional services {#environments}

The SDK supports `market: 'GLOBAL'`, `'prod'` (the global default), `'OPENAPI_GLOBAL'`, `'EEA'` and `'US'`. `OPENAPI_GLOBAL` selects the alternative global REST host while using the same WebSocket routing as global.

Set `market` to the region where your account is registered. The SDK selects the URLs for you. Products and endpoints vary by region; choosing another region does not change your account's eligibility. Use the same region for REST, subscriptions and WebSocket API commands.

## Demo trading

Set `demoTrading: true` on each REST and WebSocket client to opt into simulated trading. Use API keys created for OKX demo trading, not live keys. The SDK supplies the REST simulation header and selects demo WebSocket routes; do not add manual headers or endpoint URLs.

The default is live trading. Changing just the REST client does not change an existing WebSocket client. Check OKX's documentation for demo support in your region and product.

## Timeouts and connections

Set Axios `timeout` in milliseconds in the second REST constructor argument. `keepAlive` belongs in the first argument; when enabled it creates an HTTPS agent. Leave it false when providing a custom proxy agent.

WebSocket options include `pingInterval`, `pongTimeout`, `reconnectTimeout` and `wsOptions`. Keep heartbeat handling enabled. Avoid extremely short timeouts that turn transient network delays into reconnect storms.

The REST `parse_exceptions` flag controls error post-processing; see [Error handling](/guides/errors). Read region, demo trading and proxy settings from a shared server configuration to keep clients consistent.

[Proxies](/guides/proxies) · [RestClientOptions reference](/api/interfaces/RestClientOptions)

See [Testing environments](/guides/testing-environments) for supported test services, credentials and limitations.
