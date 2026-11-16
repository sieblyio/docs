---
title: "HTX private account WebSocket updates"
description: "Receive Spot account, order and trade updates and reconcile missed events after a connection gap."
---

# Private account updates

Subscribe to private Spot updates through `spotPrivateV2`. The SDK authenticates the connection using its configured API key and secret. Keep these clients on your server.

## Subscribe to accounts, orders and trades

<<< @/../examples/private-stream.ts

The example subscribes to account changes, Bitcoin/USDT orders and trade clearing. These are different event types; store their payloads separately.

`accounts.update#2` selects combined account/available-balance updates. `orders#btcusdt` and `trade.clearing#btcusdt#0` select symbol-specific order and execution events. Use the [Spot WebSocket reference](https://huobiapi.github.io/docs/spot/v1/en/) for the current channel fields and mode behavior.

## Recover after a gap {#recover-after-a-gap}

1. Mark affected state stale on `reconnecting` or unexpected closure.
2. After authentication and resubscription, buffer new private events while reading balances, open orders and recent fills over REST.
3. Reconcile with your persisted order IDs and execution identifiers. Paginate the history reads and account for their retention windows.
4. Apply buffered events without duplicating executions, then allow trading decisions to use the recovered state.

Automatic resubscription does not guarantee replay of missed events. A reopened socket or authentication acknowledgment does not mean balances and orders have been reconciled.

## Derivatives accounts

Use the connection and topics for your derivatives account mode. `linearSwapPrivate`, `coinDeliveryPrivate`, `coinSwapPrivate` and `derivativesPrivateV5` are distinct choices. Do not send Spot `orders#...` topics to a derivatives connection or mix legacy and unified account state.

[Spot orders](/guides/orders) · [Production usage](/guides/production) · [Error handling](/guides/errors)
