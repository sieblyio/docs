---
title: "HTX integration testing without orders"
description: "Test @siebly/htx-api public data and read-only account access without assuming a supported API sandbox."
---

# Testing without orders {#testing-environments}

## Available environments

The released `@siebly/htx-api` clients use production services and do not expose a `testnet` or `demoTrading` switch. The [Spot API reference](https://huobiapi.github.io/docs/spot/v1/en/) marks its legacy Testnet as stopped.

HTX also advertises [Unified Account demo trading](https://square.htx.com/htx-unified-account-demo-trading-is-now-live/). The SDK does not provide demo routing for this service.

## Test without placing orders {#test-without-placing-orders}

- Start with public tickers, instrument metadata and subscriptions. No credentials are required.
- Test read-only account access with the minimum necessary API permissions.
- Validate request construction and your own order-state transitions with local fixtures or a mock transport that cannot send production requests.
- Exercise timeout handling, reconnect recovery, duplicate events and graceful shutdown before enabling writes.

## Coverage and limitations

`baseUrlKey` and `wsEnvironment` choose production connectivity routes; AWS is not a test environment. Use the supported routing options for the product you need.

Read-only checks leave trading disabled. To test order submission and cancellation, use a separate integration with explicitly configured account permissions and order limits.

The following general guidance applies when a supported testing service is available for the API you use. It does not add a simulation mode to these clients.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
