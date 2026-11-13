---
title: "Bitget REST and WebSocket error handling"
description: "Distinguish Bitget response envelopes, transport failures, command codes and uncertain order outcomes."
---

# Error handling

Handle HTTP and network failures, API errors and per-order results separately. REST and WebSocket APIs use different success codes and payload fields.

## REST responses and exceptions

Successful REST calls retain the envelope: `code: '00000'`, `msg`, `requestTime` and `data`. The SDK rejects a response with a non-success top-level code, including when HTTP status is 200. Batch endpoints may include item-level results; inspect the relevant result type and retain each accepted/rejected item.

With default `parseExceptions: true`, response failures are generally thrown as an object containing the HTTP `code`, `message`, exchange `body`, headers and request options. The exchange error code is in `body.code`; it is not necessarily the same as the outer HTTP `code`. Some setup failures may be strings and network errors may be underlying transport objects, so do not assume every caught value is an `Error`.

Setting `parseExceptions: false` preserves the original exception or wrapper; requests still reject on errors. In either mode, log selected fields. Raw error objects can contain API keys and request details even after the SDK redacts some fields.

## WebSocket events and commands

Listen for `exception`, subscription `response`, connection lifecycle events and data `update`. After a reconnect, [recover missed account changes](/guides/private-streams#recover-after-a-gap) even if subscriptions succeed.

UTA command responses use `code: '0'` and `args`; they are not REST envelopes. Check those codes and batch item results even when the promise resolves. See the [WebSocket API example](/guides/websocket-api).

## Decide whether retrying is safe

- Correct permissions, account type, environment, invalid parameters and insufficient funds before retrying.
- Retry transient read failures with a maximum attempt count, increasing delays and jitter. Respect exchange rate limits.
- For an uncertain order, amendment or cancellation, check private events and targeted REST reads before retrying.
- Check each item's outcome before retrying a partially successful batch. Use a new client ID for each new order.

Keep sanitized operation names, symbol/category, correlation IDs, timestamps and API codes in private diagnostics. Exclude keys, passphrases, signatures, proxy credentials and full account payloads.

[Order recovery](/guides/orders#recover-an-uncertain-outcome) · [Troubleshooting](/guides/troubleshooting)
