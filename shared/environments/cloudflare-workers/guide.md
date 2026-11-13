---
title: @@SDK@@ API with Cloudflare Workers
description: Use the @@SDK@@ JavaScript SDK in Cloudflare Workers to read market prices and submit authenticated orders with server-side secrets.
---

# @@SDK@@ API with Cloudflare Workers

Use the [@@SDK@@ JavaScript SDK](https://www.npmjs.com/package/@@PACKAGE@@) in a Worker request handler. Start with a public @@SYMBOL@@ price, then add a separate authenticated order handler when needed. No hard-coded exchange URL or custom HTTP adapter is required.

[Browse the complete @@SDK@@ Workers starter](@@EXAMPLE_URL@@) or [download the runnable project](/starters/cloudflare-workers.tar.gz).

## Create the project

Use Node.js 24 and npm. Create an empty directory:

```sh
mkdir sdk-worker
cd sdk-worker
```

Create `package.json`:

@@WORKER_PACKAGE@@

Install dependencies:

```sh
npm install
```

Create `wrangler.jsonc`:

@@WORKER_CONFIG@@

[Compatibility dates from 2026-08-04](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) enable Node.js compatibility by default. Dates from 2024-09-23 through 2026-08-03 need `"compatibility_flags": ["nodejs_compat"]`. Use the date above for this recipe; no extra browser polyfills are needed.

## Read a public price

Create the `src` directory and `src/index.js`:

```sh
mkdir src
```

@@WORKER_PUBLIC@@

Run `npm run dev`, then open the local URL Wrangler prints. Each incoming request reads a price through the SDK and returns JSON.

### Request cache configuration

@@WORKER_CACHE@@

## Submit an order

This separate handler submits a limit buy on **@@WORKER_ORDER_ENVIRONMENT@@**. Review the symbol, price, quantity, exchange filters and key permissions before sending a request. @@WORKER_LIVE_NOTE@@

Create `src/order.js`:

@@WORKER_ORDER@@

Use [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/) for the exchange credentials and a separate strong `ORDER_TOKEN`:

```sh
@@WORKER_SECRETS@@
```

For local development, put those same names in an untracked `.dev.vars` file. Keep it out of source control. `ORDER_TOKEN` protects your application endpoint; it is not your exchange API key. Do not expose it in a public browser app. See [authentication](/guides/authentication) for your SDK’s credential format.

Run `npm run dev:orders` to select the private handler. The public default entrypoint does not accept orders. A deliberate `POST /order` with `Authorization: Bearer <your ORDER_TOKEN>` and a JSON body containing positive decimal strings `price` and `quantity` submits one order. Starting the server does not submit anything. @@WORKER_ORDER_ID_NOTE@@

Inspect the exchange’s response, including per-order rejection fields. Acknowledgement is not a fill. Use [account authentication](/guides/authentication) and [order management](/guides/orders) for account events and order state. If a request times out, resolve its outcome before retrying; do not blindly resubmit.

## WebSocket lifecycle and production use

A request handler is not an always-running Node.js process. Do not open a background subscription and assume it continues after the response. [`waitUntil()`](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) extends work only for a limited time. Persistent streams need a separate lifecycle design; outgoing WebSockets in Durable Objects [do not support hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

See [WebSocket subscriptions](/guides/websockets), [authentication](/guides/authentication), and [production usage](/guides/production). Exchange region restrictions still apply to your Worker’s outbound requests.
