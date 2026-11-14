---
title: "Troubleshoot Bitget SDK requests and subscriptions"
description: "Diagnose wrong clients, response fields, authentication, WebSocket topics and runtime issues."
---

# Troubleshooting

## A client or method from an old example is missing

Use the [client guide](/clients). The default guides use `RestClientV3` and `WebsocketClientV3`. The release also exports `WebsocketAPIClient` and Classic `RestClientV2`/`WebsocketClientV2`. Legacy V1 clients and the unversioned WebSocket client are no longer exported.

## The ticker is undefined

UTA `getTickers()` returns an envelope. Read the price from `response.data[0]?.lastPrice`. Classic V2 `getSpotTicker()` instead uses `response.data[0]?.lastPr`. Check that the response contains the requested symbol; `BTCUSDT` has no hyphen.

## Private requests fail

Check the API key, secret and key passphrase, minimum permissions, account type, IP restrictions, clock synchronization and consistent live/demo settings. UTA requests do not migrate a Classic account. Check `body.code` and `body.msg` in parsed REST exceptions for the API error, along with the HTTP status. Log only the fields needed for diagnosis.

## The stream opens but no updates arrive

Observe `authenticated`, subscription `response` and `exception` events. Check API version and topic names. Classic uses `orders`; UTA uses `order` with `instType: 'UTA'` on `WS_KEY_MAP.v3Private`. Check subscription acknowledgements even if the socket opened successfully. A quiet account may produce no updates.

The SDK sends heartbeats automatically; application timers are unnecessary. The SDK restores subscriptions after reconnection; [recover missing state](/guides/private-streams#recover-after-a-gap).

## A WebSocket command response looks different from REST

UTA WebSocket command success is `code: '0'` with payload in `args`. REST success is `code: '00000'` with payload in `data`. WebSocket category arguments are lowercase; REST categories are uppercase. See [WebSocket API requests](/guides/websocket-api).

## An order timed out or appears missing

Do not immediately resubmit it. Check private events using saved `clientOid`/`orderId`, then reconcile through the matching order and execution history endpoints. For UTA private executions use `getTradeFills()`, not public `getFills()`. Delayed or empty history is not proof of failure.

## A browser, mobile or Workers build fails

Use the matching [runtime recipe](/compatibility) and include its polyfills, aliases and configuration. Keep API secrets on the server. Node.js HTTPS agents cannot be used in browsers. Production access also depends on exchange CORS policy, your network and regional service availability.

When reporting an issue, include the SDK/runtime versions, client and method, sanitized code/message and a minimal reproducible example. Remove credentials, signed headers and private account payloads.
