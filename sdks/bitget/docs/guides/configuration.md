---
title: "Bitget SDK configuration and demo trading"
description: "Configure production defaults, optional demo trading, timeouts and connection options."
---

# Configuration and environments

`RestClientV3` and `RestClientV2` take SDK options first and Axios request options second. Both versioned WebSocket clients and `WebsocketAPIClient` accept credentials directly as `apiKey`, `apiSecret` and `apiPass` options, not inside an accounts array.

<<< @/../examples/configure-rest.ts

This public V3 configuration uses production defaults. `keepAlive` belongs in the first REST argument; `timeout` is an Axios option in the second argument, in milliseconds.

## Production endpoints {#environments}

The SDK selects the endpoints. Set `baseUrl` only when your deployment requires a custom endpoint; it does not change account or regional restrictions. Use the same account, API version and environment for REST, subscriptions and WebSocket commands.

Bitget uses `demoTrading`, not `testnet`, to select simulated trading.

## Demo trading

To opt into simulation, set `demoTrading: true` on **every** REST and WebSocket client and use API credentials created for the demo environment. The SDK supplies the REST demo header and selects demo WebSocket routes. Do not manually add simulation headers or copy production credentials into a demo example.

Live trading is the default. Changing only one client leaves the other clients unchanged. Check Bitget's documentation for demo support on your account and product.

## Connection options

Keep heartbeat handling enabled. WebSocket options include `pingInterval`, `pongTimeout`, `reconnectTimeout` and `wsOptions`. Extremely short settings can turn transient delays into reconnect storms.

Node.js `keepAlive` uses an HTTPS agent. Disable it when supplying your own proxy agent. Browsers and Workers do not use Node.js HTTPS agents; follow the relevant [setup guide](/compatibility).

`parseExceptions` controls REST error post-processing. The current request builder removes undefined parameters before sending requests; validate required fields in your application. Keep the server clock synchronized and handle rejected requests as described in [Error handling](/guides/errors).

[Proxies](/guides/proxies) · [RestClientOptions reference](/api/interfaces/RestClientOptions) · [Bitget demo trading](https://www.bitget.com/docs/uta/demo-trading/rest-api)
