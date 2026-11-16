---
title: "Gate.io authentication and account balances"
description: "Configure server-side API credentials and read Spot balances and open orders."
---

# Authentication and account balances

Gate.io private requests require an API key and secret. Enable read permission for account data and trading permission only when your application needs order commands. These examples do not need withdrawal permission.

Keep credentials server-side. Never embed them in browser, React Native or Expo bundles, commit them, or expose them through public environment-variable prefixes. Use an IP allowlist where supported and keep the server's clock synchronized.

## Configure credentials

Store these in a private `.env` file excluded from version control:

```dotenv
GATEIO_API_KEY=your_api_key
GATEIO_API_SECRET=your_api_secret
GATEIO_USE_TESTNET=false
```

Save this helper as `authenticated-client.ts`:

<<< @/../examples/authenticated-client.ts

The SDK signs private REST requests and WebSocket subscriptions automatically. The helper defaults to live trading. To use [TestNet](/guides/testing-environments), set `GATEIO_USE_TESTNET=true` and replace both credentials with TestNet credentials. All private examples import this shared configuration.

## Read starting account state

Save as `account-state.ts` beside the helper:

<<< @/../examples/account-state.ts

### Compile and run the examples

In your project directory, install the SDK and compiler dependencies, then compile these files:

```sh
npm install gateio-api
npm install --save-dev typescript @types/node
npx tsc --ignoreConfig --target ES2022 --module NodeNext --strict --skipLibCheck --outDir dist authenticated-client.ts account-state.ts
node --env-file=.env dist/account-state.js
```

Run with Node.js 24 from the project directory containing `.env`. Relative `.js` imports refer to compiled files. The command compiles the listed files independently of any existing `tsconfig.json`. To use your project configuration instead, add these `.ts` files to its `include` list and run `npx tsc` without file arguments. The [TypeScript starter](/environments/typescript) includes only `.mts` files by default.

For other private examples, replace `account-state.ts` in the compile command with `private-stream.ts`, `first-order.ts` or `ws-api.ts`, retaining `authenticated-client.ts`. Run the emitted `.js` file as shown in its guide.

`getSpotAccounts()` returns currency balances with `available` and `locked` amounts. The example reads one page of open BTC_USDT Spot orders; paginate to load all relevant orders. An empty result can be valid when the account has no balances or open orders.

Load initial account state through REST, then use [private updates](/guides/private-streams) to keep it current. Keep balances and raw authenticated errors out of shared logs.
