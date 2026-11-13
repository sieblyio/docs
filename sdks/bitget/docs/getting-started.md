---
title: "Bitget Node.js quickstart with JavaScript"
description: "Install bitget-api and read a public BTCUSDT Spot ticker with RestClientV2."
---

# Node.js quickstart with JavaScript

Read a live BTCUSDT Spot price using Bitget Classic V2 public market data. No API key, secret or passphrase is required.

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

<!--@include: @/.vitepress/shared/getting-started/runtime-compatibility.md-->

## Make a request

Save this as `prices.mjs`:

<<< @/../examples/first-call.ts{js}

```sh
node prices.mjs
```

## Example output {#verify-the-result}

```text
BTCUSDT last price: 65000.1
```

The price is illustrative. `getSpotTicker()` returns the REST envelope. Its `data` is an array, and `lastPr` is a decimal string. An empty array means this example has no ticker to print; do not interpret `undefined` as a price.

## Module formats

The `.mjs` extension selects ES modules. For CommonJS, save a `.cjs` file and replace the import with `const { RestClientV2 } = require('bitget-api')`, retaining the async function. TypeScript uses the same import with the SDK's included types.

[Market data](/guides/market-data) · [Streaming](/guides/websockets) · [Choose Classic or UTA](/clients) · [Runtime setup](/compatibility)
