---
title: "Troubleshoot the OKX SDK"
description: "Diagnose authentication, regions, missing updates and uncertain orders."
---

# Troubleshooting

## Public request works but account read fails

Check all three credential fields: `apiKey`, `apiSecret` and `apiPass`. Confirm the key's read permissions, IP allowlist and the server's clock. Match the account's regional `market` and live/demo environment. Never paste credentials into an issue or diagnostic screenshot.

## Successful response but order rejected

REST returns the unwrapped `data` array. Check each order result's `sCode` and `sMsg`, rather than `response.code`, which is removed by the REST client. For WebSocket API commands, check both the envelope code and item codes. Verify instrument metadata, trading mode, available balance and current exchange limits.

## No private order updates after connecting

Check login and subscription responses, then confirm the instrument type. Opening a connection alone does not authenticate it or confirm a subscription. The orders channel sends changes, not an initial open-order snapshot. An account with no new activity can legitimately be quiet. Initialize orders through REST without polling after each submission.

## Reconnected but state is wrong

The SDK restores connections and subscriptions, not missed fills or your local store. Reconcile open orders, recent history, fills, balances and positions, accounting for events arriving during those reads. Do not overwrite a newer terminal order with an older snapshot.

## Timeout during an order command

Treat the outcome as unknown. Look for matching private events, then query by the saved order/client ID. Do not submit a replacement until the original outcome is resolved. History can lag and empty results are inconclusive.

## Browser or mobile request fails

Keep private requests on a server. A successful import does not guarantee a working connection. Check browser CORS, mobile network restrictions and the framework configuration in the [runtime guide](/compatibility). Do not expose secrets or disable transport security to make a client-side request work.

## WebSocket connection fails on port 8443 {#port-8443}

OKX stopped accepting WebSocket connections on port 8443 on 31 October 2026 (Colo on 16 November 2026). Code or config that still uses a URL such as `wss://ws.okx.com:8443/ws/v5/public` now fails to connect, while REST keeps working. Remove `:8443` and keep the host and path: `wss://ws.okx.com/ws/v5/public`. This applies to every OKX WebSocket domain, including demo trading and the EEA and US domains. See the [OKX announcement](https://www.okx.com/en-us/help/okx-websocket-port-8443-discontinuation-announcement).

`WebsocketClient` already connects on port 443 by default. If you set `wsUrl` yourself, check that it has no `:8443`.

## Proxy or connection problem

Verify REST and WebSocket routes independently. Check the proxy agent, TLS trust, outbound rules and IP allowlist. Keep SDK `keepAlive` disabled with a custom agent. See [Proxies](/guides/proxies).

<!--@include: @/.vitepress/shared/troubleshooting/reproduction.md-->

## TypeScript checks

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->
