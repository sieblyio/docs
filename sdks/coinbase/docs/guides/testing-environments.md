---
title: "Coinbase testing environments"
description: "Choose supported Coinbase testing services, configure clients and understand their limitations."
---

# Testing environments

## Available environments

Coinbase sandbox support is **product-specific**. `useSandbox` is not a universal switch for every Coinbase client. Production is the default.

## Advanced Trade static sandbox

Set `useSandbox: true` on `CBAdvancedTradeClient` to select the static REST sandbox. It returns predefined mock responses for [the endpoints listed by Coinbase](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/sandbox). The service does not require authentication, but the SDK's flag changes routing rather than disabling its normal request signing.

Omit credentials when inspecting unauthenticated mock responses. Use this service to inspect supported response shapes. It cannot validate live credentials, account balances, matching or fills. There is **no Advanced Trade WebSocket sandbox**; do not enable `useSandbox` on Advanced Trade streaming clients. Keep public production streams clearly separated from mock REST results.

## Exchange sandbox

`CBExchangeClient` and Exchange WebSocket feeds support `useSandbox: true`. Create a sandbox account and API credentials specifically for that environment; production login sessions and API keys do not carry over. The REST client uses `apiKey`, `apiSecret` and `apiPassphrase`.

<<< @/../examples/sandbox-clients.ts

This example only constructs clients. Use Exchange connection keys when subscribing; the option does not make Advanced Trade or other product streams into Exchange sandbox streams.

The sandbox uses fake funds and a subset of production order books. Transfers are unavailable. The SDK selects its standard Exchange sandbox hosts; it does not automatically select the additional MiCA sandbox hosts listed in Coinbase's documentation. Check current account and regional requirements in the [Exchange sandbox guide](https://docs.cdp.coinbase.com/exchange/introduction/sandbox).

## Coverage and limitations

### Other products

The SDK does not configure sandboxes for App, Prime, legacy Commerce or Advanced Trade Global. A sandbox documented for a different Coinbase API does not imply support in these clients.

`CBInternationalClient` retains legacy sandbox routing, but that is not evidence of an available testing service. Coinbase's [institutional migration FAQ](https://help.coinbase.com/en/international-exchange/deribit/institutional-faqs) says INTX migrated to Deribit and old INTX endpoints no longer support trading. Do not start a new sandbox integration against those retained routes; follow Coinbase's current migration and access guidance.

<!--@include: @/.vitepress/shared/testing/limits.md-->

[Configuration](/guides/configuration) · [Authentication](/guides/authentication) · [Production usage](/guides/production)
