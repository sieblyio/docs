---
title: "Hyperliquid SDK proxies"
description: "Configure HTTP, HTTPS and SOCKS proxies for the Hyperliquid SDK in Node.js."
---

# Use a proxy

<!--@include: @/.vitepress/shared/proxies/scope.md-->

## HTTP or HTTPS proxy for REST

Axios accepts a `proxy` object in the REST client's second constructor argument:

<<< @/../examples/proxy-rest.ts

<!--@include: @/.vitepress/shared/proxies/rest-options.md-->
## Proxy agents for REST

<!--@include: @/.vitepress/shared/proxies/agent-setup.md-->
<<< @/../examples/proxy-agent.ts

`keepAlive: false` is required here because the SDK enables its own REST HTTPS agent by default. `proxy: false` disables Axios's own proxy routing, including proxy environment variables, so the custom agent controls the route.

## HTTP or HTTPS proxy for WebSockets

Install Node's WebSocket implementation and the proxy agent. TypeScript projects also need its declarations:

```sh
npm install ws https-proxy-agent
npm install --save-dev @types/ws
```

Hyperliquid uses `webSocketConstructor`, not `wsOptions.agent`. This constructor gives every new or reconnected socket the same proxy agent. The metadata REST route is configured separately with `requestOptions.proxy`:

<<< @/../examples/proxy-websocket.ts

The type assertion lets the SDK use the Node `ws` constructor despite differences in their WebSocket event types. The same `webSocketConstructor` option configures `WebsocketAPIClient`'s WebSocket transport.

## SOCKS5

<!--@include: @/.vitepress/shared/proxies/socks.md-->
For WebSockets, use that SOCKS agent inside the custom constructor. Do not copy the HTTP-only URL parser from the preceding example.

**Metadata routing:** configure the separate asset-metadata REST route with `requestOptions.proxy` using an HTTP/HTTPS proxy. Verify both metadata and socket traffic in your proxy logs. If your network requires SOCKS for every request, verify metadata routing before using helpers that resolve assets. For a direct `RestClient`, set `keepAlive: false` with the SOCKS agent as shown above.

## Verify the route

Start with a public REST request such as `client.getAllMids()` and a [public subscription](/guides/websockets) using the configured clients. No API credentials are needed for these checks. Confirm both connections in your proxy logs; a successful REST request alone does not prove WebSocket routing.

<!--@include: @/.vitepress/shared/proxies/troubleshooting.md-->