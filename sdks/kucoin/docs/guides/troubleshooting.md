---
title: "Troubleshoot the KuCoin SDK"
description: "Diagnose API credentials, regional routing, missing WebSocket updates and uncertain orders."
---

# Troubleshooting

## Public request works but account read fails

Check all three credentials: `apiKey`, `apiSecret` and `apiPassphrase`. The passphrase is not your account password. Check key version, permissions, IP restrictions and the server clock. Confirm the account region matches `apiRegion`. Never paste credentials into an issue or screenshot.

## Expected a sandbox but reached live services

The SDK has no supported testnet or demo constructor switch. Regions select live services. Use the [test-order endpoint](/guides/testing-environments#test-order) for supported validation, and never assume a URL override provides simulated funds.

## Socket does not open

Classic V1 subscriptions require a REST token request before the WebSocket opens. Check both HTTP and WebSocket routes. When using a proxy, configure `requestOptions` for token requests as well as `wsOptions.agent`. See [Proxies](/guides/proxies).

## No private updates after connecting

Check subscription acknowledgements and `exception` events. Confirm the credentials, region, connection key and topic version. A quiet stream can be normal when no account activity occurs. A socket opening does not prove subscriptions succeeded.

## Reconnected but state is stale

The SDK restores connections and subscriptions, not missed trades or your local store. Reconcile balances, open orders, completed orders and fills while buffering new events. Preserve newer terminal states when merging older REST results.

## Order command timed out

Treat the result as unknown. Check private events and query with saved order identifiers. Keep a returned `newOrderId` after amendment. Do not submit a replacement until the original outcome is resolved.

## Browser or mobile request fails

Keep private operations on a server. Check CORS, network access and the full configuration in the [runtime guide](/compatibility). A successful import or bundle does not prove live connectivity. Do not expose API secrets or disable transport security to work around a connection failure.

<!--@include: @/.vitepress/shared/troubleshooting/reproduction.md-->

## TypeScript checks

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->
