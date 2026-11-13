---
title: "OKX SDK runtime setup"
description: "Set up okx-api in Node.js, a browser, a framework or a mobile project."
---

# Runtime setup

Each setup guide starts from an empty directory and includes installation commands, configuration and a public price example.

## Server-side JavaScript and TypeScript

- [Node.js / JavaScript](/environments/node): ES modules and CommonJS.
- [Node.js / TypeScript](/environments/typescript): typed imports with build and run commands.
- [Next.js](/environments/next): a Node.js server route that keeps SDK calls off the browser.
- [Bun](/environments/bun): npm dependencies and Bun scripts.
- [Deno](/environments/deno): npm dependencies and explicit runtime permissions.

Keep all account credentials and authenticated requests server-side. Use the [authentication guide](/guides/authentication) for account reads. Regional routing and live/demo settings must match the account.

## Browser applications

The [React](/environments/react) and [Vite](/environments/vite) guides include browser configuration for EventEmitter and the SDK's Node-only HTTPS agent import. Keep that configuration with the examples. The browser adapter rejects `keepAlive`, which requires a Node.js HTTPS agent.

Browser examples use public market data only. Never put API keys, secrets or passphrases in a browser bundle. REST access still depends on OKX's CORS policy and regional restrictions. If a browser cannot call the exchange, use a server route with the SDK. A local development proxy is not a production backend.

## React Native and Expo

The [Expo guide](/environments/expo) includes mobile setup and polyfills. Use the complete configuration and test it on your target device. Keep credentials and private account operations on a server.

## Verification limits

The examples are type-checked against the SDK, and browser builds check bundling. These checks do not test live connections, account permissions, trading or recovery. Test Bun, Deno, Next.js and mobile projects in your deployment environment.

Before deployment, test a public REST request, a market-data subscription and connection shutdown from your intended network and region. Test private account operations separately. A public request timeout alone cannot tell you whether the cause is the SDK, the network or the exchange.

## Streaming lifecycle

Command-line streams run until Ctrl+C. Browser and mobile views must stop connections when removed or when the user chooses Stop. Let the SDK reconnect after transient loss, but wait for fresh market data and reconcile account state before using the data.

[WebSocket subscriptions](/guides/websockets) · [Production usage](/guides/production) · [Troubleshooting](/guides/troubleshooting)
