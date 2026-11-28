# KuCoin: React

Read public market prices with `kucoin-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page shows a REST price and live WebSocket prices.

Use **Stop stream** to close the price subscription.

Keep authenticated calls on your server. Keep the supplied Vite configuration and omit Node-only `keepAlive`. Browser REST access depends on KuCoin CORS policy; use a server route if requests are blocked.

## Try it in the browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/kucoin/react?title=KuCoin%20React%20starter)

Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/kucoin/environments/react.html).
