---
title: "Kraken Node.js quickstart with JavaScript"
description: "Install @siebly/kraken-api and read a public Bitcoin price in Node.js, without API credentials."
---

# Node.js quickstart with JavaScript

Install [`@siebly/kraken-api`](https://www.npmjs.com/package/@siebly/kraken-api) and read the Bitcoin/USD Spot ticker with `SpotClient`. This example uses plain JavaScript, with no TypeScript compiler or API credentials.

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

<!--@include: @/.vitepress/shared/getting-started/runtime-compatibility.md-->

## Make a request

Save this as `prices.mjs`:

<<< @/../examples/first-call.ts{js}

Run it with:

```sh
node prices.mjs
```

## Example output {#verify-the-result}

```text
XXBTZUSD last price: 65000.00000
```

Your price will differ. The loop reads each returned pair name from `result`, since Kraken may return a different name from the requested alias. The first entry in `c` is the last trade price.

## Module formats

The `.mjs` extension selects ES modules. In a CommonJS `.cjs` file, use `const { SpotClient } = require('@siebly/kraken-api')` and retain the async `main()` function. TypeScript uses the same imports with the package's included types.

## Next steps

[Market data](/guides/market-data) · [WebSocket subscriptions](/guides/websockets) · [Choose a client](/clients) · [Troubleshooting](/guides/troubleshooting)

## TypeScript integrations

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->

For optional non-production services and their limitations, see [Testing environments](/guides/testing-environments).
