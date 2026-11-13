---
title: "Bitget SDK runtime setup and compatibility"
description: "Set up bitget-api for Node.js, browsers, frameworks, Expo and Cloudflare Workers."
---

# Runtime setup

Each setup guide starts from an empty directory and includes installation commands, configuration and a public price example.

## Server-side JavaScript and TypeScript

- [Node.js / JavaScript](/environments/node): ES modules and CommonJS.
- [Node.js / TypeScript](/environments/typescript): typed imports with build/run commands.
- [Next.js](/environments/next): a server route that keeps SDK requests off the browser.
- [Bun](/environments/bun): npm dependencies and Bun scripts.
- [Deno](/environments/deno): npm dependencies and explicit permissions.
- [Cloudflare Workers](/environments/cloudflare-workers): public REST reads and an optional authenticated order route with deployment guidance.

Keep credentials and authenticated operations server-side. Use the same account type and production/demo settings for REST and WebSockets. In Workers, create connections within the request as shown in the guide; the command-line streaming example is intended for a long-running Node.js process.

## Browser applications

The [React](/environments/react) and [Vite](/environments/vite) recipes include their required browser configuration. Keep those files together rather than copying only the component. Public browser examples contain no credentials.

REST access still depends on the exchange's CORS policy, network and regional availability. When direct browser access is unavailable, use a server route with appropriate access controls. A development proxy is not a production backend. Never add API secrets to a frontend bundle to work around an authentication failure.

## React Native and Expo

The [Expo guide](/environments/expo) includes native setup and polyfills. Use the complete configuration and test it on your target device. Keep credentials and private account operations on a server.

## Verification limits

The setup guides use UTA V3. The examples are type-checked, and browser and Worker builds check bundling. Live V3 REST and WebSocket connections, native devices, Worker deployment and private trading have not been tested here. These checks also do not cover account permissions or recovery.

Test the examples with the SDK version, runtime, network and region you will deploy. Check a public REST request, a market-data subscription and connection shutdown, then test private account operations separately. Bun, Deno, Next.js and mobile projects also need testing in their intended environments. A timeout alone cannot tell you whether the cause is the SDK, the network or the exchange; an access rejection may reflect account or regional restrictions.

## Streaming lifecycle

Command-line streams run until Ctrl+C. Browser/mobile views must stop connections when removed or when Stop is selected. The SDK reconnects and restores subscriptions automatically. Wait for fresh market data and reconcile missed account changes before using cached state.

[WebSocket subscriptions](/guides/websockets) · [Production usage](/guides/production) · [Troubleshooting](/guides/troubleshooting)
