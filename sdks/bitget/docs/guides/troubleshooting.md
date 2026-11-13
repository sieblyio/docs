---
title: "Troubleshoot Bitget SDK requests and subscriptions"
description: "Diagnose wrong clients, response fields, authentication, WebSocket topics and runtime issues."
---

# Troubleshooting

## A client or method from an old example is missing

Use the [client guide](/clients). The documented release exports `RestClientV2`, `RestClientV3`, `WebsocketClientV2`, `WebsocketClientV3` and `WebsocketAPIClient`. Do not assume a legacy V1 class or an unversioned WebSocket client remains available.

## The ticker is undefined

Classic `getSpotTicker()` returns an envelope. Read `response.data[0]?.lastPr`, not `response[0].last` or another exchange's ticker field. Check that the response contains the requested symbol; `BTCUSDT` has no hyphen.

## Private requests fail

Check the API key, secret and key passphrase, minimum permissions, account generation, IP restrictions, clock synchronization and consistent live/demo settings. UTA requests do not migrate a Classic account. Inspect sanitized `body.code` and `body.msg` from parsed REST exceptions rather than relying solely on the outer HTTP status.

## The stream opens but no updates arrive

Observe `authenticated`, subscription `response` and `exception` events. Check API generation and topic names. Classic uses `orders`; UTA uses `order` with `instType: 'UTA'` on `WS_KEY_MAP.v3Private`. A socket opening or a quiet private account is not proof of subscription success or failure.

Do not invent heartbeats in application timers. The SDK handles connection liveness. After reconnection, confirm acknowledgements and [recover missing state](/guides/private-streams#recover-after-a-gap).

## A WebSocket command response looks different from REST

UTA WebSocket command success is `code: '0'` with payload in `args`. REST success is `code: '00000'` with payload in `data`. WebSocket category arguments are lowercase; REST categories are uppercase. See [WebSocket API requests](/guides/websocket-api).

## An order timed out or appears missing

Do not immediately resubmit it. Check private events using saved `clientOid`/`orderId`, then reconcile through the matching order and execution history endpoints. For UTA private executions use `getTradeFills()`, not public `getFills()`. Delayed or empty history is not proof of failure.

## A browser, mobile or Workers build fails

Use the matching [runtime recipe](/compatibility) and keep its polyfills, aliases and configuration together. Never solve a browser authentication issue by adding API secrets to the bundle. Node HTTPS agents do not provide browser networking. Production access also depends on exchange CORS policy, your network and regional service availability.

When reporting an issue, include the SDK/runtime versions, client and method, sanitized code/message and a minimal reproducible example. Remove credentials, signed headers and private account payloads.
