# OKX: Node.js / TypeScript

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

This example uses public market data. Keep authenticated account and trading calls on your server. See the guide for this runtime’s requirements and limitations.

## Try it in the browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/okx/typescript?title=OKX%20Node.js%20%2F%20TypeScript%20starter) [![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/sieblyio/docs/tree/main/starters/okx/typescript)

Quickest way to run it: Open in StackBlitz, no account needed, and the output appears in its terminal. CodeSandbox opens a read-only copy until you sign in (free) and fork it, because it only runs code in your own copy. After forking, run the Start task from the Devtools panel to see the output. Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/okx/environments/typescript.html).
