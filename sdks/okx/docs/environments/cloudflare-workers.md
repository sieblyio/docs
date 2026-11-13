---
title: Cloudflare Workers
description: Read OKX market data from a Cloudflare Worker using the okx-api SDK.
---

# Cloudflare Workers

Use `RestClient` in a Worker request handler to read OKX market data. This example returns the BTC-USDT ticker without API credentials.

## Create the project

Start with an empty directory and install the SDK and Cloudflare's local development tool:

```sh
mkdir okx-worker
cd okx-worker
npm init -y
npm install okx-api
npm install --save-dev wrangler
```

Create `wrangler.jsonc`:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "okx-market-data",
  "main": "src/index.js",
  "compatibility_date": "2026-11-01"
}
```

With a [compatibility date of 2026-08-04 or later](https://developers.cloudflare.com/workers/runtime-apis/nodejs/), Workers enables Node.js compatibility by default. No additional compatibility flags or browser polyfills are needed for this example. Projects using dates from 2024-09-23 through 2026-08-03 must add `"compatibility_flags": ["nodejs_compat"]`.

## Read a ticker

Create `src/index.js`:

```js
import { RestClient } from 'okx-api';

export default {
  async fetch() {
    const client = new RestClient(
      {},
      { fetchOptions: { cache: 'no-store' } },
    );
    const ticker = await client.getTicker({ instId: 'BTC-USDT' });
    return Response.json(ticker);
  },
};
```

The SDK selects the exchange endpoint. You do not need to hard-code an API URL or create a custom HTTP adapter.

Run locally:

```sh
npx wrangler dev
```

Open the local URL printed by Wrangler. Each incoming request makes one SDK ticker request and returns its JSON result.

### Why set `cache: 'no-store'`?

`okx-api@3.2.9` uses Axios 1.20.0. Its fetch adapter sets `cache: 'default'`, which Workers rejects with `Unsupported cache mode: default`. Passing `fetchOptions` as the **second constructor argument** overrides that value with a [cache mode Workers supports](https://developers.cloudflare.com/workers/runtime-apis/request/).

Keep this option while using the affected Axios version. Axios 1.21.1 fixes the default request path, but the SDK's dependency update must first pass review under [Siebly's dependency security policy](https://siebly.io/security). New dependency releases are typically held for at least 30 days; that is a review window, not a guaranteed SDK release date. There is no need to override the SDK's dependency yourself to follow this guide.

## Scope and next steps

This recipe was checked with `okx-api@3.2.9`, Axios 1.20.0 and Wrangler 4.161.0 in the local Workers runtime, including a live public ticker response. The test environment used its existing proxy for outbound connectivity; no Worker was deployed to Cloudflare. Authenticated requests and other SDKs are not covered by that check.

For credentials, use [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/) rather than source files. See [Account access and balances](/guides/authentication) for the SDK's authentication options.

For streaming, see [Public streams](/guides/websockets). A Worker request handler is not an always-running Node.js process: do not start a background subscription and assume it will continue after the response. Cloudflare's [`waitUntil()`](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) extends work only for a limited time. Persistent streams need a separate lifecycle design; outgoing WebSocket connections in Durable Objects [do not support hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).
