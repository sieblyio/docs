---
title: "Bitget SDK runtime setup and compatibility"
description: "Set up bitget-api for Node.js, browsers, frameworks, Expo and Cloudflare Workers with explicit verification limits."
---

# Runtime setup

Choose the runtime matching your application. Each guide starts from an empty directory and supplies installation commands, configuration and a public price example. A setup recipe does not guarantee exchange access from every network or region.

## Server-side JavaScript and TypeScript

- [Node.js / JavaScript](/environments/node): ES modules and CommonJS.
- [Node.js / TypeScript](/environments/typescript): typed imports with build/run commands.
- [Next.js](/environments/next): a server route that keeps SDK requests off the browser.
- [Bun](/environments/bun): npm dependencies and Bun scripts.
- [Deno](/environments/deno): npm dependencies and explicit permissions.
- [Cloudflare Workers](/environments/cloudflare-workers): public REST reads and an optional authenticated order route with deployment guidance.

Keep credentials and authenticated operations server-side. Match Classic/UTA account generation and production/demo settings across all transports. Workers are not long-lived Node.js processes; follow their guide's request-scoped networking and security requirements instead of moving the command-line streaming example into a fetch handler.

## Browser applications

The [React](/environments/react) and [Vite](/environments/vite) recipes include their required browser configuration. Keep those files together rather than copying only the component. Public browser examples contain no credentials.

REST access still depends on the exchange's CORS policy, network and regional availability. When direct browser access is unavailable, call your own authenticated/authorized server route. A development proxy is not a production backend. Never add API secrets to a frontend bundle to work around an authentication failure.

## React Native and Expo

The [Expo guide](/environments/expo) supplies the native setup and polyfills. Keep them together and test on your target device. A successful browser bundle does not establish native-device support. Private account operations still belong on a server.

## Verification limits

During this documentation update, the generated TypeScript starter passed `tsc --noEmit`, the configured Vite 5.4.21 starter produced a production bundle, and Wrangler 4.161.0 dry runs bundled the public and order Worker examples against `bitget-api` 3.2.8. These are type/bundle checks, not deployment or trading tests. No Worker was deployed by those checks.

A live Node.js public REST ticker request also succeeded. Live WebSocket connectivity and native-device execution were not verified in this update.

Type checking verifies exported request/response types. Browser and Worker bundling does not establish live REST/WebSocket connectivity, private permissions, successful trading or recovery. Validate Bun, Deno, Next.js and mobile projects in their intended environments before relying on them.

A timeout or service rejection is an unresolved connectivity/access result, not proof of SDK incompatibility or successful access. On the network and region you will deploy from, check public REST, a passive market subscription and clean shutdown separately from private account tests.

## Streaming lifecycle

Command-line streams run until Ctrl+C. Browser/mobile views must stop connections when removed or when Stop is selected. Let the SDK recover transient connections, but wait for restored subscriptions, fresh market data and reconciled account state before resuming dependent actions.

[WebSocket subscriptions](/guides/websockets) · [Production usage](/guides/production) · [Troubleshooting](/guides/troubleshooting)
