---
title: "KuCoin authentication and account balances"
description: "Configure API key, secret and passphrase, then read Classic Spot balances and open orders."
---

# Authentication and account balances

Private KuCoin requests require an API key, secret and API passphrase. The passphrase is the value chosen when creating the API key, not your KuCoin account password. Enable read permission for account data and trading permission only when your application needs order commands. These examples do not need withdrawal permission.

Keep credentials server-side. Never embed them in browser, React Native or Expo bundles, commit them, or expose them through public environment-variable prefixes. Use an IP allowlist where supported and keep the server's clock synchronized.

## Configure credentials

Store these in a private `.env` file excluded from version control:

```dotenv
KUCOIN_API_KEY=your_api_key
KUCOIN_API_SECRET=your_api_secret
KUCOIN_API_PASSPHRASE=your_api_passphrase
KUCOIN_API_REGION=global
```

Save this helper as `authenticated-client.ts`:

<<< @/../examples/authenticated-client.ts

The helper uses live services and keeps the same credentials and region for REST and WebSockets. `apiRegion` accepts `global`, `EU` or `AU`; choose the region that owns your account. A region is not a testing environment.

The REST SDK defaults `apiKeyVersion` to `2`. Check your key's version in API management if authentication fails. WebSocket token requests can receive REST options through `restOptions`; do not confuse the key version with the WebSocket connection version.

## Read starting account state

Save as `account-state.ts` beside the helper:

<<< @/../examples/account-state.ts

### Compile and run the examples

In your project directory, install the SDK and compiler dependencies, then compile these files:

```sh
npm install kucoin-api
npm install --save-dev typescript @types/node
npx tsc --target ES2022 --module NodeNext --strict --skipLibCheck --outDir dist authenticated-client.ts account-state.ts
node --env-file=.env dist/account-state.js
```

Run with Node.js 24 from the project directory containing `.env`. Relative `.js` imports refer to compiled files. If you use the [TypeScript starter](/environments/typescript), add these `.ts` files to its `include` list, which uses `.mts` files by default.

For other private examples, replace `account-state.ts` in the compile command with `private-stream.ts`, `first-order.ts`, `test-order.ts` or `ws-api.ts`, retaining `authenticated-client.ts`. Run the emitted `.js` file as shown in its guide. Compilation alone does not send requests.

`getBalances()` returns account entries in `data`, including account type, currency, available balance and held funds. The example also reads one page of open BTC-USDT orders. Paginate to load all relevant orders. An empty result can be valid.

Use this workflow for a Classic Spot account. For UTA, choose [UnifiedAPIClient](/api/classes/UnifiedAPIClient) and its account methods. Load initial state through REST, then use [private updates](/guides/private-streams) to keep it current. Keep account data out of shared logs.
