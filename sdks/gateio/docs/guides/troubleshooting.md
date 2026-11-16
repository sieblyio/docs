---
title: "Troubleshoot the Gate.io SDK"
description: "Diagnose credentials, TestNet settings, missing WebSocket updates and uncertain orders."
---

# Troubleshooting

## Public request works but account read fails

Check `apiKey`, `apiSecret`, key permissions, IP restrictions and the server clock. Confirm the keys belong to the selected live or TestNet environment. Never paste credentials into an issue or screenshot.

## TestNet request reaches live services

Set `useTestnet: true` on every client, not `testnet` or `demoTrading`. Check for `baseUrl` or `baseUrlKey` overrides on REST clients, because they take precedence. The private examples read `GATEIO_USE_TESTNET` from the shared credential helper.

## No private updates after connecting

Check each subscription acknowledgement. Private subscriptions are signed individually; an `authenticated` event is not required for ordinary subscriptions. Confirm the connection key, topic and payload match the product. A healthy account stream can be quiet when no activity occurs.

## Reconnected but state is stale

The SDK restores connections and subscriptions, not missed trades or your local store. Reconcile balances, open orders, finished orders and fills while buffering new events. Preserve newer terminal states when merging older REST results.

## Order command timed out

Treat the result as unknown. Check private events, then query with saved order identifiers. Use the exchange order ID for durable lookups, since custom `text` lookups have retention limits after completion. Do not submit a replacement until the original outcome is resolved.

## Browser or mobile request fails

Keep private operations on a server. Check CORS, network access and the full configuration in the [runtime guide](/compatibility). Do not expose API secrets or disable transport security to work around a connection failure.

## Proxy or connection problem

Check REST and WebSocket routes independently, including the proxy agent, TLS trust and egress IP allowlist. Leave SDK `keepAlive` disabled when providing a custom agent. See [Proxies](/guides/proxies).

<!--@include: @/.vitepress/shared/troubleshooting/reproduction.md-->

## TypeScript checks

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->
