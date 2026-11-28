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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/binance/node?title=Binance%20Node.js%20%2F%20JavaScript%20starter) [![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/sieblyio/docs/tree/main/starters/binance/node)

Quickest way to run it: Open in StackBlitz, no account needed, and the output appears in its terminal. CodeSandbox opens a read-only copy until you sign in (free) and fork it, because it only runs code in your own copy. After forking, run the Start task from the Devtools panel to see the output.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/binance/environments/node.html).
