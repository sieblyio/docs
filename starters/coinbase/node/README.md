# Coinbase: Node.js / JavaScript

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

For CommonJS instead, run `node price.cjs` or `node stream.cjs`.

These examples use Advanced Trade public market data. Keep authenticated calls on your Node.js server.

## Try it in the browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/coinbase/node?title=Coinbase%20Node.js%20%2F%20JavaScript%20starter) [![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/sieblyio/docs/tree/main/starters/coinbase/node)

Opens a copy of this folder in StackBlitz or CodeSandbox, installs dependencies and runs the start script. StackBlitz does not need an account. In CodeSandbox, the script output appears in the terminal tab. Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/coinbase/environments/node.html).
