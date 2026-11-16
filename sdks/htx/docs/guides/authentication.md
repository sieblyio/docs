---
title: "HTX API authentication and Spot balances"
description: "Configure API credentials server-side, select a Spot account and read balances with @siebly/htx-api."
---

# Account access and balances

Public prices do not require credentials. Private methods require an HTX API key and secret with the relevant permissions. Start with read-only access and keep withdrawal permission disabled unless your application specifically needs it.

## Create an authenticated client

Set `HTX_API_KEY` and `HTX_API_SECRET` in your server environment. Do not put secrets in frontend code, mobile apps, logs or committed files.

<<< @/../examples/authenticated-client.ts

The SDK signs private requests with the API key and secret. The access-token setters do not replace those credentials. Keep the server clock synchronized and use credentials for the same account and product as the selected endpoint.

## Select a Spot account and read balances

HTX Spot trading uses an account ID in addition to the API credentials. Discover it with `getAccounts()` rather than substituting your user ID:

<<< @/../examples/account-state.ts

Select the intended account explicitly if your application uses more than one. Balance rows distinguish currency and balance type; a frozen amount is not spendable. Preserve string amounts when storing balances.

## Futures and private streams

`FuturesClient` uses the same credential option names, but account modes, endpoints and permissions differ. Configure a separate `WebsocketClient` for private streams; constructing a REST client does not authenticate another client.

[Private account updates](/guides/private-streams) · [Configuration](/guides/configuration) · [Error handling](/guides/errors)
