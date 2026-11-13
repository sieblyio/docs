---
title: "OKX Node.js quickstart with JavaScript"
description: "Install okx-api and read a public BTC-USDT ticker with plain JavaScript."
---

# Node.js quickstart with JavaScript

Read the live BTC-USDT last price. This public request needs no API key, secret or passphrase.

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
BTC-USDT last price: 65000.1
```

Your price will differ. `getTicker()` returns an array of ticker objects, not the raw REST envelope. Numeric values such as `last` are decimal strings.

If your account belongs to a regional OKX service, [select its market](/guides/configuration) before adding authenticated requests.

## Module formats

The `.mjs` extension selects ES modules. For CommonJS, save a `.cjs` file, replace the import with `const { RestClient } = require('okx-api')`, and keep the async function. TypeScript uses the same import with included types.

[Market data](/guides/market-data) · [Streaming](/guides/websockets) · [Runtime setup](/compatibility) · [API reference](/reference)
