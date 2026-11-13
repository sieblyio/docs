# Kraken: Vite (plain JavaScript)

Read public market prices with `@siebly/kraken-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page shows a REST price and live WebSocket prices.

Use **Stop stream** to close the price subscription.

The public GET client removes the SDK’s `UserAgent` and `locale` headers because they trigger a CORS preflight that Kraken rejects. Keep this configuration for these public reads only. Run authenticated REST calls on your server, never in a browser bundle. See the guide for the server-side alternative.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/kraken/environments/vite.html).
