# Coinbase: React

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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/coinbase/react?title=Coinbase%20React%20starter) [![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/sieblyio/docs/tree/main/starters/coinbase/react)

Quickest way to run it: Open in StackBlitz, no account needed, and the output appears in its terminal. CodeSandbox opens a read-only copy until you sign in (free) and fork it, because it only runs code in your own copy. After forking, run the Dev Server task and open the preview on port 5173. Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/coinbase/environments/react.html).
