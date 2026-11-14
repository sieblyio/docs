---
title: "Kraken testing environments"
description: "Choose supported Kraken testing services, configure clients and understand their limitations."
---

# Testing environments

## Available environments

Kraken Spot has no public testnet. The public Futures demo environment has been retired. In this SDK, `testnet: true` rejects the retired environment rather than selecting a usable test service. Production remains the default.

Kraken offers a separate testing environment to qualified clients through its API team. This SDK's `testnet` option does not configure that access. Consult [Kraken's current testing-environment notice](https://support.kraken.com/articles/360024809011-api-testing-environment-derivatives) rather than following older public-demo signup instructions.

## Test without placing orders

Use [public market-data requests](/guides/market-data) and [public streams](/guides/websockets) to check connectivity without account credentials.

For authenticated Spot order checks, use `validate: true` as shown in [Order validation](/guides/orders). This sends a real authenticated validation request to production without submitting the order to the market. It requires production Spot credentials and appropriate permissions; it does not use fake funds or a sandbox account.

## Coverage and limitations

Order validation checks a request, not execution. It does not simulate fills, partial fills, cancellation races or a full order lifecycle. Use local fixtures and application tests for those paths, while recognizing that fixtures cannot prove live behavior. Never remove `validate: true` merely to make a test pass: doing so can place a real order.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
