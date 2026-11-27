# Binance: Node.js / JavaScript

Read public market prices with `binance`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm start
```

The script prints a public REST price and exits.

To receive one WebSocket price and close the connection:

```sh
npm run stream
```

For CommonJS instead, run `node price.cjs` or `node stream.cjs`.

## Try it in the browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/binance/node?title=Binance%20Node.js%20%2F%20JavaScript%20starter)

Opens a copy of this folder in StackBlitz, installs dependencies and runs the start script. No account is needed. Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/binance/environments/node.html).
