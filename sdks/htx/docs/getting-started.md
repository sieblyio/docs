---
title: "HTX Node.js quickstart with JavaScript"
description: "Install @siebly/htx-api and read a public Bitcoin/USDT price in Node.js without credentials."
---

# Node.js quickstart with JavaScript

Install [`@siebly/htx-api`](https://www.npmjs.com/package/@siebly/htx-api) and read the Bitcoin/USDT Spot ticker with `SpotClient`. This example uses plain JavaScript, with no TypeScript compiler or API credentials.

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
btcusdt last price: 65000
```

Your price will differ. The ticker payload is in `tick`, and `close` is the last traded price. Other endpoints may return `data`; retain the response shape for the method you call.

## Module formats

The `.mjs` extension selects ES modules. In a CommonJS `.cjs` file, use `const { SpotClient } = require('@siebly/htx-api')` and retain the async `main()` function. TypeScript uses the same imports with the package's included types.

## Next steps

[Market data](/guides/market-data) · [Public streams](/guides/websockets) · [Choose a client](/clients) · [Troubleshooting](/guides/troubleshooting)

## TypeScript integrations

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->

See [Testing without orders](/guides/testing-environments#test-without-placing-orders) for checks that do not submit trades.
