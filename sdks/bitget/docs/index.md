---
title: "Bitget API SDK for Node.js, JavaScript and TypeScript"
description: "Use bitget-api for Unified Trading Account V3 REST, streams and WebSocket trading, with Classic V2 alternatives."
---

<script setup>
import sdk from './.vitepress/generated.json';
</script>

# Bitget API SDK

[`bitget-api`](https://www.npmjs.com/package/bitget-api) provides JavaScript and TypeScript clients for Bitget Unified Trading Account (UTA) V3 and Classic V2 APIs. Read Spot and futures prices, observe private account updates and manage orders with typed REST and WebSocket methods.

<p class="sdk-release">JavaScript &amp; TypeScript <span>·</span> v{{ sdk.version }} <span>·</span> {{ sdk.license }} license</p>

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

## First request {#usage}

Start with the [Node.js quickstart](/getting-started), which uses V3 to read a public Bitcoin ticker without credentials. New integrations start with UTA V3 here; [Classic V2 clients](/clients) remain available for existing Classic integrations. The examples use production services by default; [demo trading](/guides/configuration#demo-trading) is an optional separate configuration.

## Choose a client

<!--@include: ./clients.md#client-list-->

## Next steps

- [Read public market data](/guides/market-data) or [subscribe to tickers](/guides/websockets).
- [Read UTA or Classic account balances](/guides/authentication) and [observe private updates](/guides/private-streams).
- [Place, amend and cancel a UTA Spot order](/guides/orders).
- [Send UTA WebSocket API commands](/guides/websocket-api).
- Choose a [runtime setup](/compatibility), including [Cloudflare Workers](/environments/cloudflare-workers), or browse the [API reference](/reference).
