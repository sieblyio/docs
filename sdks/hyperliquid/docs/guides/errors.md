---
title: Hyperliquid SDK error handling
description: Handle Hyperliquid HTTP and WebSocket errors, inspect status and response fields, and check individual order results.
---

# Error handling

Handle rejected request promises with `try` / `catch`. Streaming clients also report failures through the `exception` event.

| Failure | Where to handle it |
| --- | --- |
| An HTTP request or top-level API rejection | Catch the request promise. |
| A WebSocket request failure | Catch the request promise; observe connection events as well. |
| A subscription or connection failure | Catch `subscribe()` failures and listen for `exception`. |
| An individual rejected order | Inspect each entry in the successful action response. |

## HTTP requests

`RestClient` throws `HyperliquidApiError` for HTTP transport failures and top-level Hyperliquid responses with `status: 'err'`.

<<< @/../examples/request-errors.ts

| Property | Meaning |
| --- | --- |
| `message` | The error message from the API or HTTP client. |
| `status` | HTTP status, if a response was received. An API error can still have HTTP status `200`. |
| `code` | Transport error code, when supplied by the HTTP client. |
| `response` | Response body, when available. |
| `cause` | Original error, when available. |

Configuration and input errors can use other types, so keep a fallback in the error handler. HTTP requests are not retried automatically.

[HyperliquidApiError reference](/api/classes/HyperliquidApiError)

## WebSocket requests and subscriptions

`HyperliquidWebSocketError` represents transport and protocol failures, including connection errors, request timeouts and error responses to WebSocket POST requests. An Exchange action response with `status: 'err'` instead rejects with `HyperliquidApiError`. Catch both types when using `WebsocketAPIClient`, and register an `exception` listener for connection and protocol events.

Handle rejected `subscribe()` promises and subsequent `exception` events. The server acknowledges subscriptions through `response`. The [subscription example](/guides/websockets#subscribe-to-mid-prices) shows the handlers.

Reconnection restores subscriptions without replaying requests. After a timeout or disconnect during an action, [check its outcome before resubmitting](/guides/production#check-an-order-after-a-timeout).

[HyperliquidWebSocketError reference](/api/classes/HyperliquidWebSocketError) · [WebsocketExceptionEvent](/api/interfaces/WebsocketExceptionEvent)

## Order results

A successful request can contain rejected individual orders. Inspect each entry in `response.data.statuses` returned by `submitOrder()`: an entry can be `resting`, `filled` or `error`.

[`submitOrder()`](/api/classes/RestClient#submitorder) · [`OrderResponseData`](/api/interfaces/OrderResponseData)

## Common rejection messages

Hyperliquid reports most rejections as text. Match on the stable words, because several messages include an address or a value.

### Whole request rejected

These arrive as a top-level `status: 'err'`, so `submitOrder()` and the other Exchange methods reject with `HyperliquidApiError`. The HTTP status is still `200`.

| Message starts with | Usual cause | What to check |
| --- | --- | --- |
| `User or API Wallet 0x... does not exist.` | The signature recovered to an address Hyperliquid does not know. | The private key belongs to the main wallet or an approved API wallet on the same network (mainnet and testnet approvals are separate), the API wallet has not expired, and `accountAddress` is the main account. A wallet that has never deposited on that network also gives this error. |
| `Must deposit before performing actions.` | The account exists but has never deposited. | Deposit on the network you are calling. |

Some payload problems are caught before matching and reject the whole batch with one message, for example an order priced too far from the reference price. With a batch, treat that single error as applying to every order in it.

### Individual orders rejected

These arrive in a successful response: the matching entry in `response.data.statuses` has an `error` string instead of `resting` or `filled`.

| Message | What to check |
| --- | --- |
| `Price must be divisible by tick size.` | At most 5 significant figures and at most `6 - szDecimals` decimals for perps (`8 - szDecimals` for spot). Whole-number prices are always valid. |
| `Order must have minimum value of $10.` | Price multiplied by size is below the minimum. Spot orders use the quote token instead of `$`. |
| `Insufficient margin to place order.` | Available margin on the account or sub-account that places the order. |
| `Reduce only order would increase position.` | The side and size of a `reduceOnly` order against the current position. |
| `Post only order would have immediately matched, bbo was ...` | A `postOnly` price that crosses the book. |
| `Order could not immediately match against any resting orders.` | An IOC order with no liquidity at its price. |
| `Invalid TP/SL price.` | The trigger price relative to the order side. |
| `Order price too far from oracle` | Prices far from the oracle price. |

```ts
const result = await client.submitOrder(/* ... */);
if (result.status === 'ok') {
  result.response.data.statuses.forEach((status, index) => {
    if ('error' in status) {
      console.error(`Order ${index} rejected:`, status.error);
    }
  });
}
```

Hyperliquid's [error responses](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/error-responses) page lists every order and cancel error.
