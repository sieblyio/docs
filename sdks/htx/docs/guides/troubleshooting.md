---
title: "HTX SDK troubleshooting"
description: "Resolve HTX import, authentication, account, WebSocket and runtime setup problems."
---

# Troubleshooting

## Imports and module formats

Install `@siebly/htx-api` in the application directory. Use `.mjs` for ES modules or `.cjs` for CommonJS. Follow a complete [runtime setup](/compatibility) rather than copying a component without its configuration files.

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->

## Authentication failures

Confirm the API key's permissions, account access and IP restrictions. Check the host clock and selected product. Do not substitute a user ID for the Spot account ID returned by `getAccounts()`. Inspect sanitized exchange codes without printing request headers or signatures.

## No WebSocket data

Use `message`, not `update`, for channel data. Match the topic and connection key, and inspect `response` and `exception` events. `subscribe()` returns `void`; it does not confirm server acceptance. Keep the process alive and close the client only when the stream is no longer needed.

Public market channels carry compressed data and require `DecompressionStream`. Check that API in the actual runtime, especially in React Native. Bundling does not install a decompressor. If the target lacks it, provide an appropriate runtime implementation or relay market data from a backend.

## Browser REST and CORS {#browser-rest-and-cors}

The SDK provides browser transport mappings, but direct REST requests still depend on HTX's CORS policy and regional access. Keep the supplied Vite configuration. If public reads are blocked, use a server route with suitable access controls. Do not move private credentials into a browser to solve an authentication error.

## Order timeouts and rejected orders

Check current instrument precision and limits, account mode, order type and the meaning of `amount`. Treat an unknown submission result as uncertain, not automatically rejected. [Recover the order](/guides/orders#recover-an-uncertain-outcome) before retrying. A batch can partially succeed.

## Testing and connectivity

AWS and alternative domains remain production services. See [Testing without orders](/guides/testing-environments#test-without-placing-orders). A timeout alone does not identify the SDK as the cause; verify network, exchange availability and account or regional restrictions separately.

[Error handling](/guides/errors) · [Configuration](/guides/configuration) · [API reference](/reference)
