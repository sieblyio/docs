---
title: "HTX API SDK for Node.js, JavaScript and TypeScript"
description: "Use @siebly/htx-api for HTX Spot and futures REST APIs, market streams, private updates and WebSocket trading."
---

<script setup>
import sdk from './.vitepress/generated.json';
</script>

# HTX API SDK

[`@siebly/htx-api`](https://www.npmjs.com/package/@siebly/htx-api) provides JavaScript and TypeScript clients for HTX Spot and futures APIs. Read market data, access account balances, manage orders and subscribe to public and private WebSocket channels.

<p class="sdk-release">JavaScript &amp; TypeScript <span>·</span> v{{ sdk.version }} <span>·</span> {{ sdk.license }} license</p>

## Installation

<!--@include: ./.vitepress/snippets/installation.md-->

## First request {#usage}

Start with the [Node.js quickstart](/getting-started) to read a public Bitcoin/USDT Spot price without credentials. The guides begin with Spot and explain where futures clients and connection keys differ. Examples use production services. See [Testing without orders](/guides/testing-environments#test-without-placing-orders) before enabling trading.

## Choose a client

<!--@include: ./clients.md#client-list-->

## Next steps

- [Read market data](/guides/market-data) or [subscribe to prices](/guides/websockets).
- [Read Spot balances](/guides/authentication) and [receive private updates](/guides/private-streams).
- [Manage Spot orders](/guides/orders) or [send WebSocket trading requests](/guides/websocket-api).
- Choose a [runtime setup](/compatibility), including [Cloudflare Workers](/environments/cloudflare-workers), or browse the [API reference](/reference).
