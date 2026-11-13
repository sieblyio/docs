---
title: "Bitget Node.js quickstart with JavaScript"
description: "Install bitget-api and read a public BTCUSDT Spot ticker with RestClientV3."
---

# Node.js quickstart with JavaScript

Read a live BTCUSDT Spot price using Bitget's Unified Trading Account (UTA) V3 API. No API key, secret or passphrase is required.

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

Your price will differ. `getTickers()` returns tickers in `data`. The example reads `data[0]?.lastPrice`, a decimal string, or `undefined` if no ticker is returned.

## Module formats

The `.mjs` extension selects ES modules. For CommonJS, save a `.cjs` file and replace the import with `const { RestClientV3 } = require('bitget-api')`, retaining the async function. TypeScript uses the same import with the SDK's included types.

[Market data](/guides/market-data) · [Streaming](/guides/websockets) · [Choose UTA or Classic](/clients) · [Runtime setup](/compatibility)
