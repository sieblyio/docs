---
title: "KuCoin SDK error handling"
description: "Handle REST errors, WebSocket failures and uncertain order outcomes safely."
---

# Error handling

Separate transport failures from exchange rejections and inspect individual results for batch operations.

## REST errors

Successful REST methods normally retain the KuCoin response envelope with `code: '200000'` and `data`. The SDK rejects non-success string codes even when the HTTP status is 200. Default error processing produces objects containing `code`, `message`, `body`, `headers`, `requestOptions` and `requestParams` for failures with an HTTP response.

The outer `code` is the HTTP status. Read the exchange code and message from `body.code` and `body.msg`. Failures without an HTTP response can be underlying errors or strings. Do not assume every caught value is an `Error` with a `.message` property.

Record only the fields needed for diagnosis; request context can contain credentials or private account data. Set `parseExceptions: false` to retain the underlying error instead of the SDK's processed form. This changes error representation, not whether failed requests reject.

## WebSocket errors

Listen for `exception` alongside subscription `response` and data `update` events. Confirm subscription acknowledgements before relying on a topic. WebSocket API requests reject on errors or a lost connection; successful method results are nested in `data`.

Keep diagnostics limited to operation names, response codes and identifiers needed by your application. Do not send raw authenticated responses, failures or token-bearing connection URLs to shared logs.

## Decide whether a retry is safe

- Correct invalid credentials, passphrase, permissions, region or pair rules before retrying.
- Back off with jitter for transient reads and honor exchange rate-limit guidance.
- Treat timed-out order commands as unknown until private events or REST queries resolve the outcome.
- Inspect every batch item. Retry only after determining which operations were accepted.

[Order recovery](/guides/orders#recover-an-uncertain-outcome) · [Troubleshooting](/guides/troubleshooting)
