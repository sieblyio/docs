# Coinbase: Vite (plain JavaScript)

Read public market prices with `coinbase-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page shows a REST price and live WebSocket prices.

Use **Stop stream** to close the price subscription.

These examples use Advanced Trade public market data. Keep authenticated calls on your Node.js server.

Keep `sdk.vite.config.js`: it excludes Node-only JWT signing from this public-data application. Browser REST access depends on Coinbase CORS policy.

## Try it in the browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/coinbase/vite?title=Coinbase%20Vite%20(plain%20JavaScript)%20starter)

Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/coinbase/environments/vite.html).
