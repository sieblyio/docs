# HTX: Vite (plain JavaScript)

Read public market prices with `@siebly/htx-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page shows a REST price and live WebSocket prices.

Use **Stop stream** to close the price subscription.

Public WebSocket streams require `DecompressionStream`. Browser REST access depends on HTX CORS policy. Keep credentials and trading operations on your server.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/htx/environments/vite.html).
