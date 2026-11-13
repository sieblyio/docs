---
title: "Bitget REST and WebSocket error handling"
description: "Distinguish Bitget response envelopes, transport failures, command codes and uncertain order outcomes."
---

# Error handling

Separate HTTP/network failures, exchange response errors and individual command outcomes. REST and WebSocket APIs use different success codes and payload fields.

## REST responses and exceptions

Successful REST calls retain the envelope: `code: '00000'`, `msg`, `requestTime` and `data`. The SDK rejects a response with a non-success top-level code, including when HTTP status is 200. Batch endpoints may include item-level results; inspect the relevant result type and retain each accepted/rejected item.

With default `parseExceptions: true`, response failures are generally thrown as an object containing the HTTP `code`, `message`, exchange `body`, headers and request options. The exchange error code is in `body.code`; it is not necessarily the same as the outer HTTP `code`. Some setup failures may be strings and network errors may be underlying transport objects, so do not assume every caught value is an `Error`.

Setting `parseExceptions: false` preserves underlying exceptions/wrappers, not successful responses. Neither mode makes raw error objects safe to publish. Although selected fields are redacted by the SDK, API keys and other request context can remain. Select only required diagnostic fields rather than serializing the whole object.

## WebSocket events and commands

Listen for `exception`, subscription `response`, connection lifecycle events and data `update`. Subscription acknowledgement does not establish that your local state is current.

UTA command responses use `code: '0'` and `args`; they are not REST envelopes. Check those codes and batch item results even when the promise resolves. See the [WebSocket API example](/guides/websocket-api).

## Decide whether retrying is safe

- Correct permissions, account generation, environment, invalid parameters and insufficient funds before retrying.
- Back off bounded transient reads with jitter and respect exchange rate-limit guidance.
- For an uncertain order, amendment or cancellation, check private events and targeted REST reads before retrying.
- Do not blindly replay a partially successful batch or reuse an old client ID for a new intended order.

Keep sanitized operation names, symbol/category, correlation IDs, timestamps and API codes in private diagnostics. Exclude keys, passphrases, signatures, proxy credentials and full account payloads.

[Order recovery](/guides/orders#recover-an-uncertain-outcome) · [Troubleshooting](/guides/troubleshooting)
