---
title: "OKX SDK proxy configuration"
description: "Route REST and WebSocket traffic through HTTP, HTTPS or SOCKS proxies."
---

# Use a proxy

<!--@include: @/.vitepress/shared/proxies/scope.md-->

Allow the proxy's egress IP when your API key uses an IP allowlist. Do not log proxy credentials.

## HTTP or HTTPS proxy for REST

Pass Axios proxy options in the REST client's second constructor argument:

<<< @/../examples/proxy-rest.ts

<!--@include: @/.vitepress/shared/proxies/rest-options.md-->

## Proxy agents for REST and WebSockets

<!--@include: @/.vitepress/shared/proxies/agent-setup.md-->

<<< @/../examples/proxy-agent.ts

`proxy: false` disables Axios proxy handling, including environment-variable proxy routing, so the custom agent controls the route. Keep `keepAlive: false`; enabling it replaces the custom HTTPS agent.

REST configuration does not route WebSocket traffic. Set `wsOptions.agent` separately, including on `WebsocketAPIClient` when using WebSocket commands. Unlike token-based exchange SDKs, OKX private WebSockets authenticate with signed login messages rather than fetching a REST token.

## SOCKS5

<!--@include: @/.vitepress/shared/proxies/socks.md-->

Use the SOCKS agent for both `httpsAgent` and `wsOptions.agent`, retaining `proxy: false` and `keepAlive: false` for REST.

## Verify both transports

Make a public `getTicker({ instId: 'BTC-USDT' })` request and a public ticker subscription using the configured clients. Confirm REST and WebSocket connections separately in proxy logs. A successful REST request alone does not verify the WebSocket path.

<!--@include: @/.vitepress/shared/proxies/troubleshooting.md-->
