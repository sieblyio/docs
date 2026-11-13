---
title: "OKX API SDK for Node.js, JavaScript and TypeScript"
description: "Use okx-api for OKX REST, market streams, private account updates and WebSocket trading requests."
---

<script setup>
import sdk from './.vitepress/generated.json';
</script>

# OKX API SDK

[`okx-api`](https://www.npmjs.com/package/okx-api) provides JavaScript and TypeScript clients for OKX Spot, margin and derivatives APIs. Read prices, subscribe to account updates and manage orders through typed REST and WebSocket methods.

<p class="sdk-release">JavaScript &amp; TypeScript <span>·</span> v{{ sdk.version }} <span>·</span> {{ sdk.license }} license</p>

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

## First request {#usage}

Follow the [Node.js quickstart](/getting-started) to read a public Bitcoin price without credentials. Examples use live services by default. To use simulated funds, configure [demo trading](/guides/configuration#demo-trading).

## Choose a client

<!--@include: ./clients.md#client-list-->

## Next steps

- [Read market data](/guides/market-data) or [stream tickers](/guides/websockets).
- [Read account balances](/guides/authentication) and [subscribe to private account changes](/guides/private-streams).
- [Place, amend and cancel orders](/guides/orders).
- [Send WebSocket API requests](/guides/websocket-api).
- [Configure regional services](/guides/configuration), [prepare for production](/guides/production) or [browse the reference](/reference).
