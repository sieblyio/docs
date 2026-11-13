---
title: "Bitget SDK configuration and demo trading"
description: "Configure production defaults, optional demo trading, timeouts and connection options."
---

# Configuration and environments

`RestClientV3` and `RestClientV2` take SDK options first and Axios request options second. Both versioned WebSocket clients and `WebsocketAPIClient` accept credentials directly as `apiKey`, `apiSecret` and `apiPass` options, not inside an accounts array.

<<< @/../examples/configure-rest.ts

This public V3 configuration uses production defaults. `keepAlive` belongs in the first REST argument; `timeout` is an Axios option in the second argument, in milliseconds.

## Production endpoints {#environments}

Leave endpoint selection to the SDK unless a documented deployment requirement needs `baseUrl`. An endpoint override is not a way to bypass account or regional access restrictions. Match the account, API generation and environment across REST, subscriptions and WebSocket commands.

Do not copy a `testnet` flag from another SDK. Bitget uses the documented `demoTrading` option. Selecting a V3 client also does not change an account to UTA or adjust its trading permissions.

## Demo trading

To opt into simulation, set `demoTrading: true` on **every** REST and WebSocket client and use API credentials created for the demo environment. The SDK supplies the REST demo header and selects demo WebSocket routes. Do not manually add simulation headers or copy production credentials into a demo example.

Live trading is the default. Changing only one client leaves the other clients unchanged. Check Bitget's current demo support for your account and product before relying on it; an SDK flag does not guarantee every endpoint is available in demo.

## Connection options

Keep heartbeat handling enabled. WebSocket options include `pingInterval`, `pongTimeout`, `reconnectTimeout` and `wsOptions`. Extremely short settings can turn transient delays into reconnect storms.

Node.js `keepAlive` uses an HTTPS agent. Disable it when supplying your own proxy agent. Browser/Workers networking follows its runtime's facilities rather than Node's socket-agent configuration; use the relevant [setup guide](/compatibility).

`parseExceptions` controls REST error post-processing. `strictParamValidation` can reject undefined parameters, and `recvWindow` controls the request window. These do not replace server clock synchronization, precise request validation or [error handling](/guides/errors).

[Proxies](/guides/proxies) · [RestClientOptions reference](/api/interfaces/RestClientOptions) · [Bitget demo trading](https://www.bitget.com/api-doc/common/demotrading/restapi)
