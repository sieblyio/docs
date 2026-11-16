---
title: "HTX Spot order management"
description: "Validate Spot orders, preserve client identifiers, cancel orders and recover uncertain outcomes."
---

# Spot order management

These methods submit live production orders. Before calling them, confirm the intended account, permissions, symbol constraints and order values. The exported functions below do not run automatically.

## Prepare the order

Read [your Spot account ID](/guides/authentication) and current symbol metadata. For a limit order, `amount` is base-asset quantity and `price` is the quote price. A `buy-market` order uses quote-currency value for `amount`; do not reuse limit-order sizing without adapting it.

Generate a client order ID with `client.generateNewOrderID()` and persist it with the intended parameters **before** submission. Pass it as `'client-order-id'`. Keep the returned exchange order ID for later queries.

## Place, query and cancel

<<< @/../examples/first-order.ts

The example uses `buy-limit-maker`. An order acknowledgment is not a fill, and a cancellation request is not proof that nothing filled. Read `getOrder()` and `getOrderMatch()` and reconcile private order and execution updates. A replacement order is a separate trade; cancellation cannot reverse earlier fills.

## Recover an uncertain outcome {#recover-an-uncertain-outcome}

If a timeout or disconnection leaves submission uncertain, do not immediately place another order. Query `getOrderByClientId({ clientOrderId })`, inspect private events and reconcile fills. Observe the exchange's query retention windows. A missing result alone is not proof that no order was accepted.

Use a new client order ID for each new trading intent. Client IDs help correlate requests and recovery; do not assume every endpoint guarantees idempotency merely because it accepts one.

## Batch and futures orders

Batch requests can contain accepted and rejected items. Check each item's result before retrying only the operations that remain necessary.

Futures orders use different contract quantities, account modes and method families. Start from the relevant [FuturesClient method](/api/classes/FuturesClient), not a Spot request with renamed fields.

[Private account updates](/guides/private-streams) · [Error handling](/guides/errors) · [Testing without orders](/guides/testing-environments#test-without-placing-orders)
