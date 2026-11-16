---
title: "HTX JavaScript and TypeScript API reference"
description: "Browse @siebly/htx-api clients, method signatures, request parameters, responses and WebSocket types."
---

# API reference

The reference is generated from the exact released SDK source. Use the guides for workflow examples, then open the relevant client or type for parameters and response fields.

## Clients

<!--@include: ./clients.md#client-list-->

## Types and helpers

[All exports](/api/) lists request and response types, WebSocket connection keys and helpers. Spot responses may carry `data` or `tick`; derivatives endpoints can use different envelopes. Read the return type of the specific method you call.

The clients handle signatures, connection recovery and message decompression. Transport helpers are also exported for custom integrations.

[Choose a client](/clients) · [Configuration](/guides/configuration) · [Error handling](/guides/errors)
