# Coinbase: Node.js / TypeScript

Read public market prices with `coinbase-api`. No API key is required for public prices.

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

These examples use Advanced Trade public market data. Keep authenticated calls on your Node.js server.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/coinbase/environments/typescript.html).
