# Bybit: Node.js / JavaScript

Read public market prices with `bybit-api`. No API key is required for public prices.

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

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bybit/environments/node.html).
