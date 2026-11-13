export default {
  referenceDescriptions: {
    "WebsocketClient.sendWSAPIRequest.wsKey": "The Binance WebSocket API connection to use. Choose a supported `WSAPIWsKey` for the product and environment.",
    "WebsocketClient.sendWSAPIRequest.operation": "The WebSocket API operation to send, such as `order.place` to place an order.",
    "WebsocketClient.sendWSAPIRequest.params": "Parameters for the selected operation, as defined by `WsAPITopicRequestParamMap`. Pass only the operation parameters; the SDK handles the request envelope.",
    "WebsocketClient.subscribe": "Subscribe to one or more topics on the connection identified by `wsKey`. Pass topic strings or `WsTopicRequest` objects containing `topic` and optional `payload`.\n\nThe SDK opens the connection, handles authentication when required, and resubscribes after a reconnect. Call `unsubscribe(requests, wsKey)` to remove topics.",
    "WsTopicRequest": "Normalized internal request for a WebSocket topic. `topic` identifies the topic; optional `payload` contains its request parameters.",
    "isAlgoUpdateRaw": "Type guard for a raw `ALGO_UPDATE` event.",
    "parseRawWsMessage": "Extract a JSON event from a raw WebSocket message. Mapping and additional processing belong in separate functions.",
    "MainClient.withdrawTravelRule": "Submit a withdrawal request for local entities that require travel rule\n\nSee the documentation for the questionnaire format:\nhttps://developers.binance.com/docs/wallet/travel-rule/withdraw-questionnaire",
    "MainClient.submitTravelRuleDepositQuestionnaire": "Submit questionnaire for local entities that require travel rule\n\nSee the documentation for the questionnaire format:\nhttps://developers.binance.com/docs/wallet/travel-rule/deposit-questionnaire",
    "MainClient.fetchLatencySummary": "Estimate request latency and the clock offset between the client and server. This SDK diagnostic is intended for internal testing and is not an exchange API endpoint. Values are estimates and can vary with network conditions. Suggestions and improvements are welcome as GitHub issues or pull requests.",
    "RestClientOptions.customSignMessageFn": "Provide a custom `signMessage` function. See the examples for using Node.js `createHmac`.",
    "RestClientOptions.keepAliveMsecs": "Delay before the first TCP keep-alive probe on an idle socket, in milliseconds. Applies only when `keepAlive` is enabled. Default: `1000`.",
    "WSClientConfigurableOptions.customSignMessageFn": "Provide a custom `signMessage` function. See the examples for using Node.js `createHmac`.",
    "WsStoredState.didAuthWSAPI": "Whether this connection has completed authentication before for the Websocket API, so the SDK can authenticate again after reconnecting",
    "WebsocketClientOptions.customSignMessageFn": "Provide a custom `signMessage` function. See the examples for using Node.js `createHmac`.",
    "isWSPingFrameAvailable": "Check whether the WebSocket implementation supports native ping/pong frames. Browsers do not expose these methods, so the SDK cannot send native heartbeat frames there.",
    "isWSPongFrameAvailable": "Check whether the WebSocket implementation supports native ping/pong frames. Browsers do not expose these methods, so the SDK cannot send native heartbeat frames there.",
    "WebsocketClient": "WebSocket client for Binance streams and WebSocket API requests. Connection keys select the product and environment.\n\nAfter an unexpected close, the SDK attempts to reconnect and resubscribe to cached topics. It emits `reconnecting` when recovery is scheduled and `reconnected` when the replacement socket opens. `reconnected` occurs before authentication and subscription recovery finish; it does not confirm that account state is current. Check subscription responses and reconcile any data missed during the disconnect.",
    "WebsocketClientV1.subscribeSpotUserDataStream": "Subscribe to spot user data stream - listen key is automatically generated. Calling multiple times only opens one connection.",
    "isWsFormatted24hrTickerArray": {"deprecated": "The `!ticker@arr` stream is deprecated. Binance announced March 26, 2026 as its retirement date. Use `<symbol>@ticker` or `!miniTicker@arr` instead. See the [Binance announcement](https://www.binance.com/en/support/announcement/detail/38bde1c632bf41ac90c5f3361dc5cc7d)."},
    "WsMessage24hrTickerFormatted.eventType": {"deprecated": "The `!ticker@arr` stream is deprecated. Binance announced March 26, 2026 as its retirement date. Use `<symbol>@ticker` or `!miniTicker@arr` instead. See the [Binance announcement](https://www.binance.com/en/support/announcement/detail/38bde1c632bf41ac90c5f3361dc5cc7d)."},
    "MainClient.getOnboardedVASPList": "Get the onboarded VASP list for local entities that require the Travel Rule. Use the returned `identifier` field for `vasp` in deposit and withdrawal questionnaires.",
    "VASPInfo.identifier": "Identifier for the `vasp` field in deposit and withdrawal questionnaires. Use this field instead of `vaspCode`.",
    "RestClientOptions.keepAlive": "Reuse HTTPS connections for REST requests in Node.js. When enabled, the SDK creates an HTTPS agent, preserving options from an existing agent and applying `keepAlive` and `keepAliveMsecs`. Browser connection pooling is handled by the browser.",
    "FuturesKline": {"deprecated": "Use `Kline` instead."},
    "MainClient.mintPortfolioMarginBFUSD": {"deprecated": "Use the Simple Earn endpoints instead."},
    "MainClient.redeemPortfolioMarginBFUSD": {"deprecated": "Use the Simple Earn endpoints instead."},
    "WebsocketClient.subscribeCoinIndexPrice": "Subscribe to the coin index for a symbol in COIN-M Futures markets.\n\n`_updateSpeedMs` is ignored because the `<pair>@indexPrice@1s` stream was removed.",
  },
  "name": "Binance",
  "sourceDirectory": "binance",
  "packageName": "binance",
  "entryPoint": "src/index.ts",
  "tsconfig": "tsconfig.json",
  "clients": [
    "MainClient",
    "USDMClient",
    "CoinMClient",
    "PortfolioClient",
    "WebsocketClient",
    "WebsocketAPIClient"
  ],
  "website": "https://siebly.io/sdk/binance/javascript",
  "tutorial": "https://siebly.io/sdk/binance/javascript/tutorial",
  "repository": "https://github.com/sieblyio/binance",
  "referenceHelp": [
    {
      "client": "MainClient",
      "method": "getSymbolPriceTicker",
      "example": "first-call.ts",
      "guide": "/getting-started",
      "title": "Quickstart"
    },
    {
      "client": "MainClient",
      "method": "getOrderBook",
      "example": "order-book.ts",
      "guide": "/guides/market-data",
      "title": "Read an order book"
    },
    {
      "client": "WebsocketClient",
      "method": "subscribeSpotSymbol24hrTicker",
      "example": "stream.ts",
      "guide": "/guides/websockets",
      "title": "Subscribe to market data"
    },
    {
      "client": "WebsocketClient",
      "method": "closeAll",
      "guide": "/guides/production#shut-down-cleanly",
      "title": "Shut down cleanly"
    },
    {
      "client": "MainClient",
      "method": "getAccountInformation",
      "example": "account-state.ts",
      "guide": "/guides/authentication#verify-account-access",
      "title": "Verify Testnet account access"
    },
    {
      "client": "MainClient",
      "method": "submitNewOrder",
      "guide": "/guides/orders",
      "title": "Order management"
    },
    {
      "client": "MainClient",
      "method": "getOrder",
      "guide": "/guides/orders",
      "title": "Manage a Testnet order"
    },
    {
      "client": "MainClient",
      "method": "cancelOrder",
      "guide": "/guides/orders",
      "title": "Manage a Testnet order"
    },
    {
      "client": "WebsocketAPIClient",
      "method": "subscribeUserDataStream",
      "guide": "/guides/private-streams",
      "title": "Receive private order updates"
    },
    {
      "client": "USDMClient",
      "method": "getAccountInformationV3",
      "example": "usdm-account.ts",
      "guide": "/guides/usdm-orders#read-account-state",
      "title": "Read futures account state"
    },
    {
      "client": "USDMClient",
      "method": "getBalanceV3",
      "example": "usdm-account.ts",
      "guide": "/guides/usdm-orders#read-account-state",
      "title": "Read futures account state"
    },
    {
      "client": "USDMClient",
      "method": "getPositionsV3",
      "example": "usdm-account.ts",
      "guide": "/guides/usdm-orders#read-account-state",
      "title": "Read futures account state"
    },
    {
      "client": "USDMClient",
      "method": "submitNewOrder",
      "guide": "/guides/usdm-orders",
      "title": "USD-M futures order management"
    },
    {
      "client": "USDMClient",
      "method": "getOrder",
      "guide": "/guides/usdm-orders",
      "title": "USD-M futures order management"
    },
    {
      "client": "USDMClient",
      "method": "cancelOrder",
      "guide": "/guides/usdm-orders",
      "title": "USD-M futures order management"
    }
  ],
  "guides": [
    {
      "text": "Order management",
      "link": "/guides/orders"
    },
    {
      "text": "USD-M futures order management",
      "link": "/guides/usdm-orders"
    },
    {
      "text": "Private account updates (WebSocket)",
      "link": "/guides/private-streams"
    },
    {
      "text": "WebSocket API requests",
      "link": "/guides/websocket-api"
    }
  ]
};
