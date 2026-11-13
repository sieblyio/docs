---
title: "Troubleshoot the OKX SDK"
description: "Diagnose authentication, regions, missing updates and uncertain orders."
---

# Troubleshooting

## Public request works but account read fails

Check all three credential fields: `apiKey`, `apiSecret` and `apiPass`. Confirm the key's read permissions, IP allowlist and the server's clock. Match the account's regional `market` and live/demo environment. Never paste credentials into an issue or diagnostic screenshot.

## Successful response but order rejected

REST returns the unwrapped `data` array. Check each order result's `sCode` and `sMsg`, not a nonexistent top-level `response.code`. For WebSocket API commands, check both the envelope code and item codes. Verify instrument metadata, trading mode, available balance and current exchange limits.

## No private order updates after connecting

An open connection is not an authenticated, subscribed connection. Check login and subscription responses and the exact instrument type. The orders channel sends changes, not an initial open-order snapshot. An account with no new activity can legitimately be quiet. Initialize orders through REST without polling after each submission.

## Reconnected but state is wrong

The SDK restores connections and subscriptions, not missed fills or your local store. Reconcile open orders, recent history, fills, balances and positions, accounting for events arriving during those reads. Do not overwrite a newer terminal order with an older snapshot.

## Timeout during an order command

Treat the outcome as unknown. Look for matching private events, then query by the saved order/client ID. Do not submit a replacement until the original outcome is resolved. History can lag and empty results are inconclusive.

## Browser or mobile request fails

Keep private requests on a server. Browser CORS, mobile network policy and framework bundling are separate concerns from whether a package can be imported. Follow the relevant [runtime guide](/compatibility); do not expose secrets or disable transport security to make a client-side request work.

## Proxy or connection problem

Verify REST and WebSocket routes independently. Check the proxy agent, TLS trust, outbound rules and IP allowlist. Keep SDK `keepAlive` disabled with a custom agent. See [Proxies](/guides/proxies).

<!--@include: @/.vitepress/shared/troubleshooting/reproduction.md-->
