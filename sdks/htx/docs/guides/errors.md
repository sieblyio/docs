---
title: "HTX REST and WebSocket error handling"
description: "Distinguish HTX response envelopes, normalized errors, per-item failures and uncertain order outcomes."
---

# Error handling

Handle transport errors, exchange rejections and batch-item failures separately. Spot and futures endpoints do not all use the same response fields.

## REST responses and exceptions

The SDK returns the response envelope rather than unwrapping `data` or `tick`. It rejects HTTP failures and recognized exchange error formats, including `status: 'error'`, a populated `'err-code'`, `result: 'error'` and numeric `code` values of at least 403. Check the success and per-item result fields for the endpoint, especially for batch requests.

With default `parseExceptions: true`, server errors are generally normalized to an object with HTTP `code`, `message`, exchange `body`, headers and request details. The outer HTTP code can be 200 for an exchange rejection. Read the exchange code from the appropriate body field. Setup failures can be strings and network failures can remain transport objects, so a caught value is not always an `Error`.

`parseExceptions: false` preserves the underlying exception or request wrapper. It does not disable rejection. Log selected fields rather than whole error objects, which can contain credentials and private request data.

## WebSocket events and commands

Listen for `exception` and subscription `response` events. Channel data arrives on `message`, not `update`. Treat authentication, subscription acceptance and receipt of fresh data as separate milestones.

Trading promises reject on recognized command errors and disconnects. A timeout or disconnect does not establish that a command failed to reach the exchange. Inspect per-item results for batches even when the outer request succeeds.

## Choose a safe retry policy

Retry transient public reads with bounded attempts, backoff and jitter. Correct invalid parameters, permissions and account-mode errors before retrying. For an uncertain order or cancellation, [reconcile the existing intent](/guides/orders#recover-an-uncertain-outcome) before sending another command.

Keep sanitized operation names, identifiers, timestamps and codes in private diagnostics. Exclude credentials, signatures, proxy authentication and account payloads.
