---
title: "Bitget API SDK for Node.js, JavaScript and TypeScript"
description: "Use bitget-api for Classic V2 and Unified Trading Account V3 REST, streams and WebSocket trading."
---

<script setup>
import sdk from './.vitepress/generated.json';
</script>

# Bitget API SDK

[`bitget-api`](https://www.npmjs.com/package/bitget-api) provides JavaScript and TypeScript clients for Bitget Classic V2 and Unified Trading Account (UTA) V3 APIs. Read Spot and futures prices, observe private account updates and manage orders with typed REST and WebSocket methods.

<p class="sdk-release">JavaScript &amp; TypeScript <span>·</span> v{{ sdk.version }} <span>·</span> {{ sdk.license }} license</p>

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

## First request {#usage}

Start with the [Node.js quickstart](/getting-started), which reads a public Bitcoin ticker without credentials. The examples use production services by default; [demo trading](/guides/configuration#demo-trading) is an optional separate configuration.

## Choose a client

<!--@include: ./clients.md#client-list-->

## Next steps

- [Read public market data](/guides/market-data) or [subscribe to tickers](/guides/websockets).
- [Read Classic or UTA account balances](/guides/authentication) and [observe private updates](/guides/private-streams).
- [Place, amend and cancel a UTA Spot order](/guides/orders).
- [Send UTA WebSocket API commands](/guides/websocket-api).
- Choose a [runtime setup](/compatibility), including [Cloudflare Workers](/environments/cloudflare-workers), or browse the [API reference](/reference).
