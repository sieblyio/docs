# KuCoin: Node.js / JavaScript

Read public market prices with `kucoin-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm start
```

The script prints a public REST price and exits.

To stream WebSocket prices until Ctrl+C:

```sh
npm run stream
```

For CommonJS instead, run `node price.cjs` or `node stream.cjs`.

This example uses public market data. Keep authenticated account and trading calls on your server. See the guide for this runtime’s requirements and limitations.

## Try it in the browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/kucoin/node?title=KuCoin%20Node.js%20%2F%20JavaScript%20starter)

Opens a copy of this folder in StackBlitz, installs dependencies and runs the start script. No account is needed. Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/kucoin/environments/node.html).
