---
title: "OKX authentication and account balances"
description: "Configure server-side API credentials and read trading-account balances."
---

# Authentication and account balances

OKX credentials comprise an API key, API secret and API passphrase. The passphrase is the value associated with the API key, not your account password. Use read permissions for account reads and enable trading only when your application needs order commands. Withdrawal permission is unnecessary for these examples.

Keep credentials server-side. Never embed them in browser, React Native or Expo bundles, commit them, or expose them through public environment-variable prefixes. Use an IP allowlist where supported, and keep the machine's clock synchronized.

## Configure credentials

Store these in a private `.env` file excluded from version control:

```dotenv
OKX_API_KEY=your_api_key
OKX_API_SECRET=your_api_secret
OKX_API_PASSPHRASE=your_api_passphrase
```

Save this helper as `authenticated-client.ts`:

<<< @/../examples/authenticated-client.ts

The SDK signs requests. Do not construct signature headers manually. Defaults use the live global service. Select the account's [region and environment](/guides/configuration) consistently for REST and WebSockets.

## Read starting account state

Save as `account-state.ts` beside the helper:

<<< @/../examples/account-state.ts

### Compile and run the examples

In your project directory, install the SDK and compiler dependencies, then compile these `.ts` files explicitly:

```sh
npm install okx-api
npm install --save-dev typescript @types/node
npx tsc --target ES2022 --module NodeNext --strict --skipLibCheck --outDir dist authenticated-client.ts account-state.ts
node --env-file=.env dist/account-state.js
```

Run with Node.js 24. Keep `.env` in the project directory and run the commands from there. Relative `.js` imports refer to the compiled files. This explicit file list does not depend on the [TypeScript starter](/environments/typescript)'s `.mts` include pattern.

For the other private examples, replace `account-state.ts` in the compile command with `private-stream.ts`, `first-order.ts` or `ws-api.ts`, retaining `authenticated-client.ts`. Run the corresponding emitted `.js` file as shown in its guide. Compilation alone does not send requests.

`getBalance()` reads the trading account, including per-currency `details`. It is different from `getBalances()`, which reads funding-account balances. An empty currency balance or no open orders is not automatically an authentication failure. This example prints one page of open Spot orders; production bootstrap must paginate when necessary.

Use this read for startup or diagnosis, then keep the [private account stream](/guides/private-streams) connected. Do not repeat a full snapshot after every order. Avoid sending account balances or raw authenticated error objects to public logs.

[getBalance reference](/api/classes/RestClient#getbalance) · [Order management](/guides/orders)
