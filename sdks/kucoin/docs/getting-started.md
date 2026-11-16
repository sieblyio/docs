---
title: "KuCoin Node.js quickstart with JavaScript"
description: "Install kucoin-api and read a public BTC-USDT ticker with plain JavaScript."
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

Your price will differ. `getTicker()` returns an envelope with `code` and `data`; the last price is `response.data.price`. Price and quantity fields are decimal strings. Spot symbols use hyphens, as in `BTC-USDT`.

## Module formats

The `.mjs` extension selects ES modules. For CommonJS, save a `.cjs` file, replace the import with `const { SpotClient } = require('kucoin-api')`, and keep the async function. TypeScript uses the same import with included types.

[Market data](/guides/market-data) · [Streaming](/guides/websockets) · [Runtime setup](/compatibility) · [API reference](/reference)

## TypeScript integrations

<!--@include: @/.vitepress/shared/getting-started/typescript.md-->

See [Test order validation](/guides/testing-environments#test-order) for the validation endpoint, or [Testing without orders](/guides/testing-environments#test-without-placing-orders) for offline recovery tests.
