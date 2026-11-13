---
title: "Bitget authentication and UTA or Classic balances"
description: "Configure server-side Bitget credentials and read the account matching your API version."
---

# Authentication and account balances

Bitget credentials consist of an API key, API secret and API passphrase. The passphrase belongs to the key; it is not your account password. Give account-read examples read permission only. Enable trading only for applications that need order commands. Withdrawal permission is unnecessary here.

Keep credentials on your server. Never embed them in browser, React Native or Expo bundles, commit them, or expose them through public environment-variable prefixes. Use an IP allowlist where supported and synchronize the server clock.

## Configure credentials

Store these in a private `.env` file excluded from version control:

```dotenv
BITGET_API_KEY=your_api_key
BITGET_API_SECRET=your_api_secret
BITGET_API_PASSPHRASE=your_api_passphrase
```

Save this helper as `authenticated-client.ts`:

<<< @/../examples/authenticated-client.ts

The SDK signs requests automatically. The helper creates both clients without sending requests; use V3 for UTA or V2 for Classic. Both default to production. For simulation, configure [demo trading](/guides/configuration#demo-trading) on every client.

## Read starting account state

Save as `account-state.ts` beside the helper:

<<< @/../examples/account-state.ts

### Compile and run the examples

```sh
npm install bitget-api
npm install --save-dev typescript @types/node
npx tsc --target ES2022 --module NodeNext --strict --skipLibCheck --outDir dist authenticated-client.ts account-state.ts
node --env-file=.env dist/account-state.js uta
```

For an existing Classic account, use `classic` instead of `uta`. Run with Node.js 24 from the project directory containing `.env`. Relative `.js` imports refer to the compiled output. These commands compile the `.ts` files directly. If you use the [TypeScript starter](/environments/typescript), add them to its `include` list, which uses `.mts` files by default.

For the other private examples, replace `account-state.ts` in the compile command with `private-stream.ts`, `classic-private-stream.ts`, `first-order.ts` or `ws-api.ts`, retaining `authenticated-client.ts`. Compilation itself sends no requests.

`getSpotAccountAssets()` reads Classic Spot assets; `getBalances()` reads UTA balances. The example prints one page of open orders. Use pagination to load all orders in your application. A successful request may return empty balances or no open orders.

Load account state at startup, then use the [private account stream](/guides/private-streams) to keep it current. Use REST again for explicit lookups or recovery after a gap. Keep account data out of public logs.
