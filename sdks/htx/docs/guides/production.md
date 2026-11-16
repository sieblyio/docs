---
title: "HTX SDK production usage"
description: "Manage HTX request limits, private state, reconnection, shutdown and SDK upgrades."
---

# Production usage

Reuse clients and keep credentials server-side with minimum permissions. Match product, account mode and connection keys across REST and WebSockets. Synchronize time and use exchange IP restrictions where appropriate.

<!--@include: @/.vitepress/shared/production/request-policy.md-->

HTX limits vary by endpoint, account and product. Budget startup and recovery traffic as well as steady-state requests. Paginate history reads and account for each endpoint's retention limits rather than assuming an unlimited recovery window.

<!--@include: @/.vitepress/shared/production/account-state.md-->

## HTX recovery events

Mark state stale on `reconnecting` or unexpected closure. After `reconnected`, wait for authentication and subscriptions as needed, then reconcile balances, orders and executions over REST. A reopened socket is not completed recovery. See [Private account updates](/guides/private-streams#recover-after-a-gap).

Scope state by account, product and symbol or contract. Keep legacy and V5 derivatives records separate until your application explicitly reconciles their fields. Preserve decimal strings and distinguish Spot amounts from derivatives contract quantities.

## Shut down cleanly

Stop accepting new commands, record in-flight outcomes and persist recovery identifiers. Call `closeAll()` on subscription clients or `getWSClient().closeAll()` on WebSocket API wrappers. Clear application-owned timers and listeners.

Closing a process or connection does not cancel exchange orders. A cancellation cannot reverse a fill.

## Logging {#observe-failures-without-exposing-credentials}

Log selected operation names, durations, sanitized codes, reconnects and recovery results. Do not log raw request or exception objects, credentials, signatures or private account payloads. Review default logger behavior before exposing logs to other systems.

<!--@include: @/.vitepress/shared/production/upgrading.md-->

After an upgrade, recheck your account mode, endpoint contracts, WebSocket payloads and runtime requirements.
