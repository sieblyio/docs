---
title: "KuCoin testing environments"
description: "Understand live services, test-order validation and the limits of KuCoin testing."
---

# Testing environments {#testing-environments}

## Available environments

The SDK uses KuCoin's live services. It does not expose a `testnet`, `useTestnet` or `demoTrading` constructor flag. The `apiRegion` option selects `global`, `EU` or `AU` routing, not simulated trading.

## Validate a Spot order {#test-order}

`SpotClient.submitHFOrderTest()` calls the Spot test-order endpoint. It uses live API credentials but does not submit the order to the matching engine. Test orders cannot be queried later and do not produce a simulated order lifecycle.

Configure the [credential helper](/guides/authentication) and the price, size and client identifier described in [Order management](/guides/orders). Save this as `test-order.ts` beside the helper, then follow the [compile instructions](/guides/authentication#compile-and-run-the-examples):

<<< @/../examples/test-order.ts

```sh
node --env-file=.env dist/test-order.js
```

This tests request acceptance and signing. It does not prove that a real order will fill, that a live account has enough funds for the intended trade, or that cancellation, private events and recovery work. See [KuCoin's Spot test-order reference](https://www.kucoin.com/docs-new/rest/spot-trading/orders/add-order-test) for its validation scope.

## Testing without orders {#test-without-placing-orders}

Use recorded or synthetic responses to exercise reconnects, timeouts, duplicate events and uncertain order outcomes without submitting trades. Keep these fixtures separate from production clients and credentials.

Validate public connectivity, permissions and order-management behavior separately. If you choose to test real orders, use explicit limits and monitor their status.

## Coverage and limitations

KuCoin's [sandbox notice](https://www.kucoin.tr/docs/beginners/sandbox) describes its independent sandbox as temporarily offline with maintenance stopped. Do not rely on old sandbox URLs. The test-order endpoint above validates a request, not a simulated trading environment.

The general guidance below applies when an exchange provides a supported testnet or demo environment; it does not imply this KuCoin SDK offers one.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
