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

## Try it in the browser

[![Run in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/8k5lmp) [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/kraken/vite?title=Kraken%20Vite%20(plain%20JavaScript)%20starter)

Run in CodeSandbox opens a live copy that runs straight away in your browser, no account needed. Open in StackBlitz runs the full Vite project, also without an account. Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/kraken/environments/vite.html).
