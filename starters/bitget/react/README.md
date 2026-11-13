# Bitget: React

Read public market prices with `bitget-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page shows a REST price and live WebSocket prices.

Use **Stop stream** to close the price subscription.

Keep authenticated calls on your server. Keep the supplied Vite configuration and omit Node-only `keepAlive`. Browser REST access depends on Bitget CORS policy; use a server route if requests are blocked.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitget/environments/react.html).
