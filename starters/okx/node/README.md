# OKX: Node.js / JavaScript

Read public market prices with `okx-api`. No API key is required for public prices.

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

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/okx/environments/node.html).
