---
title: "OKX SDK runtime setup"
description: "Choose a Node.js, browser, framework or mobile project and understand runtime verification limits."
---

# Runtime setup

Choose a project for your application. Each guide starts from an empty directory and supplies installation commands, configuration and a public price example. A setup recipe is not a guarantee of exchange access from every network or region.

## Server-side JavaScript and TypeScript

- [Node.js / JavaScript](/environments/node): ES modules and CommonJS.
- [Node.js / TypeScript](/environments/typescript): typed imports with build and run commands.
- [Next.js](/environments/next): a Node.js server route that keeps SDK calls off the browser.
- [Bun](/environments/bun): npm dependencies and Bun scripts.
- [Deno](/environments/deno): npm dependencies and explicit runtime permissions.

Keep all account credentials and authenticated requests server-side. Use the [authentication guide](/guides/authentication) for account reads. Regional routing and live/demo settings must match the account.

## Browser applications

The [React](/environments/react) and [Vite](/environments/vite) guides include browser configuration for EventEmitter and the SDK's Node-only HTTPS agent import. Keep that configuration with the examples. Node-only `keepAlive` is not available in these browser projects; the supplied adapter rejects its use rather than silently pretending to enable it.

Browser examples use public market data only. Never put API keys, secrets or passphrases in a browser bundle. REST access still depends on OKX's CORS policy and regional restrictions. If a browser cannot call the exchange, use a server route with the SDK. A local development proxy is not a production backend.

## React Native and Expo

The [Expo guide](/environments/expo) supplies mobile setup and polyfills. Keep those files together and test on your target device. Browser bundle success does not establish native-device support. Private account operations still belong on a server, not in the mobile bundle.

## Verification limits

Type checking verifies compatibility with the documented SDK's exported types. Production browser builds verify bundling, not live REST or WebSocket connectivity. Neither establishes that authentication, order placement, recovery or account-specific permissions work.

Bun, Deno, Next.js and mobile setup instructions must be validated in your deployment environment. Treat a public request timeout as an unresolved network or service outcome, not proof of SDK incompatibility or successful access. Before relying on any runtime, check a public REST request, a market-data subscription and clean connection shutdown from the network and region you will use.

## Streaming lifecycle

Command-line streams run until Ctrl+C. Browser and mobile views must stop connections when removed or when the user chooses Stop. Let the SDK reconnect after transient loss, but wait for fresh market data and reconcile account state before resuming dependent actions.

[WebSocket subscriptions](/guides/websockets) · [Production usage](/guides/production) · [Troubleshooting](/guides/troubleshooting)
