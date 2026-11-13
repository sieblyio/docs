---
title: "OKX SDK error handling"
description: "Separate transport failures, API errors and per-order rejection codes."
---

# Error handling

Check the API result as well as HTTP errors. An order request can resolve with individual orders rejected.

## REST responses

On a successful top-level `code: '0'`, the SDK returns the nested `data` array. A nonzero top-level code rejects the request. Order and batch results can still contain item-level `sCode` and `sMsg`; inspect each result even when the promise resolves.

With default `parse_exceptions: true`, API errors are generally thrown as the response body, while some network failures are thrown as strings. Do not assume every caught value is an `Error` with `.message`. In TypeScript, check the type of the caught value before reading its fields.

Setting `parse_exceptions: false` preserves the underlying exception or wrapper. It does not convert rejected requests into successful responses. Raw Axios objects can contain signed headers and request configuration, so redact them before writing diagnostics.

## WebSocket responses

Listen for `exception` as well as subscription `response` and data `update` events. WebSocket API commands can reject or return an envelope whose top-level `code` and per-item `sCode` require inspection. See the [checked cancellation example](/guides/websocket-api).

## Decide whether a retry is safe

- Correct missing permissions, wrong region/environment, invalid increments or insufficient funds before retrying.
- Rate-limit requests and honor exchange retry guidance. Back off with jitter for transient reads rather than retrying every client simultaneously.
- If an order or cancellation times out, check private events for its saved ID. Query REST if the result is still unknown before retrying.
- Batch operations are not necessarily atomic. Record accepted and rejected items separately; retry only after checking each item's outcome.

Keep sanitized operation names, instrument IDs, client/exchange order IDs, timestamps and API codes in diagnostics. Keep secrets, signatures and full account payloads out of shared logs.

[Order recovery](/guides/orders#recover-an-uncertain-outcome) · [Troubleshooting](/guides/troubleshooting)
