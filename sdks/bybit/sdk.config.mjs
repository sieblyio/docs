export default {
  referenceDescriptions: {
    "RestClientV5.borrowFlexible": "Borrow a flexible-rate crypto loan.",
    "RestClientV5.getHistoricOrders": "Get order history. Order creation and cancellation are asynchronous, so recent changes may not appear immediately.\n\nFor current order status, use `getActiveOrders()` or subscribe to private order updates.\n\nFrom 2026-12-03 (postponed from 2026-11-12), omitting orderStatus excludes Cancelled, Rejected and Deactivated orders from the last 24 hours.\nPass orderStatus explicitly to retrieve matching orders from that period.",
    "RestClientV5.getP2PAccountCoinsBalance": "Get coin balance of all account types under the master account, and sub account.\n\nFor `accountType=UNIFIED`, `coin` is required. Specify up to 10 coins per request.",
    "RestClientV5.setSubUIDFrozenState": "Freeze or unfreeze a subaccount. Requires the main account's API key.\n\nTIP: The API key must have one of the permissions to be allowed to call the following API endpoint.\n- master API key: \"Account Transfer\", \"Subaccount Transfer\", \"Withdrawal\"",
    "APIMarket": "API market identifier. Use the V5 APIs for new integrations.",
    "APIRateLimit.maxRequests": "Maximum requests for this endpoint per rate-limit window, before the next reset.",
    "RestClientV5.getDCPInfo": "Query the DCP configuration of the account's contracts (USDT perpetual, USDC perpetual and USDC Futures) / spot / options.\n\nRequires DCP configuration for the account. Arrange setup with your Bybit account manager before calling this method.\n\nINFO\nsupport linear contract (USDT, USDC Perp & USDC Futures) / Spot / Options only\nUnified account only",
    "RestClientV5.manualRepay": "Manual Repay\n\nIf neither coin nor amount is passed, then repay all the liabilities.\nIf coin is passed and amount is not, the coin will be repaid in full.\n\nWhen repaying, the system will first use the spot available balance of the debt currency.\nIf that's not enough, the remaining amount will be repaid by converting other assets.\n\nManual repayment is unavailable from 4 minutes past each hour until 5 minutes and 30 seconds past the hour (for example, 08:04:00 to 08:05:30).\n\nWhen `coin` and `amount` are both set, validation depends on `repaymentType` (e.g. amount must not\nexceed the matching liability pool). If neither `coin` nor `amount` is set, `repaymentType` must be\nALL. Response timing: ALL and FIXED are asynchronous; FLEXIBLE is synchronous.\nFor repay-without-convert (spot balance only), use `manualRepayWithoutConversion`.\nFrom 2026-03-17 (full 2026-03-24), BYUSDT can be used for repayment. MNT: not via convert-repay;\nuse `manualRepayWithoutConversion` for MNT with existing balance. From 2026-02-10 08:00 UTC,\ncoin-conversion cap 300,000 USD equivalent per transaction applies.",
    "RestClientV5.manualRepayWithoutConversion": "Manual repay without asset conversion\n\nIMPORTANT: Manual repayment is unavailable from 4 minutes past each hour until 5 minutes and 30 seconds past the hour (for example, 08:04:00 to 08:05:30).\nWhen repaying, system will only use the spot available balance of the debt currency.\n\nUse `getAvailableAmountToRepay` to check spot available amount. Response timing: ALL and FIXED\nasynchronous; FLEXIBLE synchronous. From 2026-03-17 (full 2026-03-24), BYUSDT can be used for\nrepayment, including MNT using existing spot balance.",
    "RestClientV5.getKline": "Query the kline data. Returns candlesticks for the requested interval.\n\nCovers: Spot / Linear contract / Inverse contract",
    "RestClientV5.getMarkPriceKline": "Query the mark price kline data. Returns candlesticks for the requested interval.\n\nCovers: USDT contract / USDC contract / Inverse contract / Options\n\n`category` defaults to linear if omitted. For options, `limit` max is 500; futures max is 1000.",
    "RestClientV5.getIndexPriceKline": "Query the index price kline data. Returns candlesticks for the requested interval.\n\nCovers: Linear contract / Inverse contract",
    "RestClientV5.getPremiumIndexPriceKline": "Retrieve the premium index price kline data. Returns candlesticks for the requested interval.\n\nCovers: Linear contract",
    "RestClientV5.getInstrumentsInfo": "List available trading instruments.\n\nCovers: Spot / Linear contract / Inverse contract / Option\n\nNote: Spot does not support pagination, so limit & cursor are invalid.\nNote: e.g. `symbolType: 'commodity'`, and for linear also `stock`, `forex` (see Bybit Get Instruments Info).",
    "RestClientV5.batchSubmitOrders": "This endpoint allows you to place more than one order in a single request.\nCovers: Option (UTA, UTA Pro) / USDT Perpetual, USDC Perpetual, USDC Futures (UTA Pro)\n\nMake sure you have sufficient funds in your account when placing an order.\nOnce an order is placed, according to the funds required by the order,\nthe funds in your account will be frozen by the corresponding amount during the life cycle of the order.\n\nA maximum of 20 orders can be placed per request. The returned data list is divided into two lists.\nThe first list indicates whether or not the order creation was successful and the second list details the created order information.\nThe structure of the two lists are completely consistent.",
    "RestClientV5.batchAmendOrders": "This endpoint allows you to amend more than one open order in a single request.\nCovers: Option (UTA, UTA Pro) / USDT Perpetual, USDC Perpetual, USDC Futures (UTA Pro)\n\nYou can modify unfilled or partially filled orders. Conditional orders are not supported.\n\nA maximum of 20 orders can be amended per request.",
    "RestClientV5.batchCancelOrders": "This endpoint allows you to cancel more than one open order in a single request.\nCovers: Option (UTA, UTA Pro) / USDT Perpetual, USDC Perpetual, USDC Futures (UTA Pro)\n\nYou must specify orderId or orderLinkId. If `orderId` and `orderLinkId` identify different orders, `orderId` takes precedence.\n\nYou can cancel unfilled or partially filled orders. A maximum of 20 orders can be cancelled per request.",
    "RestClientV5.getClosedOptionsPositions": "Get Closed Options Positions\nQuery user's closed options positions, sorted by closeTime in descending order\n\nINFO\nReturns closed options positions from the last six months.\nFees and prices use eight decimal places, including trailing zeros.",
    "RestClientV5.getPreUpgradeTransactions": "Query transaction logs which occurred in the USDC Derivatives wallet before the account was upgraded to a Unified account.\n\nYou can get USDC Perpetual, Option records.\n\nINFO\nReturns the last six months of USDC perpetual and options records. Download older records from the Bybit website.",
    "RestClientV5.getAccountInstrumentsInfo": "Get Account Instruments Info\nGet instrument specifications for trading pairs available to your account.\n\nCovers: SPOT / USDT contract / USDC contract / Inverse contract\n\nIncludes RPI permission information (isPublicRpi, myRpiPermission)\nNote: e.g. `symbolType: 'commodity'`, and for linear also `stock`, `forex`.",
    "RestClientV5.getQueryApiKey": "Get the information of the api key. Call this endpoint with the API key you want to inspect.\nBoth master and sub user's api key are applicable.\n\nTIP: Any permission can access this endpoint.\n\nResponse `permissions` may include `FiatBitPay` (not `FiatBybitPay`).",
    "RestClientV5.updateMasterApiKey": "Modify the settings of a master API key. Call this endpoint with the API key you want to modify. Use master user's API key only.\n\nTIP: The API key must have one of the permissions to be allowed to call the following API endpoint.\n- master API key: \"Account Transfer\", \"Subaccount Transfer\", \"Withdrawal\"\n\n`permissions` may include `FiatBitPay` (not `FiatBybitPay`).",
    "RestClientV5.updateSubApiKey": "This endpoint modifies the settings of a sub API key.\nUse the subaccount API key you want to modify, or use the main account API key to manage a subaccount key.\nThe API key must have one of the below permissions in order to call this endpoint\n\n - sub API key: \"Account Transfer\", \"Sub Member Transfer\"\n - master API Key: \"Account Transfer\", \"Sub Member Transfer\", \"Withdrawal\"",
    "RestClientV5.deleteMasterApiKey": "Delete the api key of master account. Call this endpoint with the API key you want to delete. Use master user's api key only.\n\nTIP:\nThe API key must have one of the permissions to be allowed to call the following API endpoint.\n- master API key: \"Account Transfer\", \"Subaccount Transfer\", \"Withdrawal\"\n\nDANGER: BE CAREFUL! The API key used to call this interface will be invalid immediately.",
    "RestClientV5.deleteSubApiKey": "Delete a subaccount API key.\n\nThe API key used for authentication must have one of these permissions:\n- Subaccount key: \"Account Transfer\" or \"Sub Member Transfer\".\n- Main account key: \"Account Transfer\", \"Sub Member Transfer\", or \"Withdrawal\".\n\nThe target subaccount API key is invalidated immediately.",
    "RestClientV5.getAffiliateUserInfo": "Get Affiliate User Info.\n\nGet information about users referred by your affiliate account.\n\nTIP\nUse master UID only\nThe api key can only have \"Affiliate\" permission\nTrading volume and deposit amounts reflect the user's total activity on Bybit. For volume used to calculate commissions, refer to the Affiliate Portal.",
    "RestClientV5.updateCollateralAmount": "Adjust Collateral Amount New\nYou can increase or reduce your collateral amount. Before reducing collateral, query the maximum allowed reduction and keep the requested reduction within that limit.",
    "RestClientV5.getExchangeBrokerEarnings": "Get Exchange Broker Earning.\n\nINFO\nUse exchange broker master account to query\nReturns data for the past month through yesterday. Contact your Relationship Manager for older data.\nProvide both `begin` and `end`, or omit both to return the last seven days.\nAPI rate limit: 10 req / sec",
    "RestClientV5.cancelRFQQuote": "Cancel Quote\nCancel a quotation\nProvide at least one of `quoteId`, `rfqId`, or `quoteLinkId`.",
    "RestClientV5.getRFQRealtimeInfo": "Get Real-time RFQ Information\nObtain the inquiry information sent or received by the user, query from rfq-engine without delay\nIf both `rfqId` and `rfqLinkId` are provided, `rfqId` takes precedence.\nSort in reverse order according to the creation time of rfq and return it",
    "RestClientV5.getRFQHistory": "Get Historical RFQ Information\nObtain the information of the inquiry form sent or received by the user, query from the database\nIf both `rfqId` and `rfqLinkId` are provided, `rfqId` takes precedence.\nSort in reverse order according to the creation time of rfq and return it",
    "RestClientV5.getRFQRealtimeQuote": "Get Real-time Quote Information\nObtain quotation information sent or received by users, query from rfq-engine without delay\nIf both `quoteId` and `quoteLinkId` are provided, `quoteId` takes precedence.\nIf both `rfqId` and `rfqLinkId` are provided, `rfqId` takes precedence.\nSort in reverse order according to the creation time of the quotation\nReturn all non-final quotes",
    "RestClientV5.getRFQHistoryQuote": "Get Historical Quote Information\nObtain the quotation information sent or received by the user, query from the database\nIf both `quoteId` and `quoteLinkId` are provided, `quoteId` takes precedence.\nIf both `rfqId` and `rfqLinkId` are provided, `rfqId` takes precedence.\nSort in reverse order according to the creation time of the quotation",
    "RestClientV5.getRFQPublicTrades": "Get RFQ Public Transaction Data\nGet recently executed RFQ trades.",
    "RestClientV5.fetchLatencySummary": "Estimate request latency and the clock offset between the client and server. This SDK diagnostic is intended for internal testing and is not an exchange API endpoint. Values are estimates and can vary with network conditions. Suggestions and improvements are welcome as GitHub issues or pull requests.",
    "RestClientOptions.customSignMessageFn": "Provide a custom `signMessage` function. See the examples for using Node.js `createHmac`.",
    "RestClientOptions.keepAliveMsecs": "Interval between TCP keep-alive probes, in milliseconds. Applies only when `keepAlive` is enabled. Default: `1000`.",
    "WSClientConfigurableOptions.customSignMessageFn": "Provide a custom `signMessage` function. See the examples for using Node.js `createHmac`.",
    "WsStoredState.didAuthWSAPI": "Whether this connection has completed authentication before for the Websocket API, so the SDK can authenticate again after reconnecting",
    "WebsocketClientOptions.customSignMessageFn": "Provide a custom `signMessage` function. See the examples for using Node.js `createHmac`.",
    "LinearPositionIdx": "Identifies a position within the selected position mode: `0` for one-way mode, `1` for the hedge-mode buy side, and `2` for the hedge-mode sell side. Check each endpoint’s `positionIdx` requirements.",
    "OHLCVKlineV5": "V5 candle tuple. All seven values are strings:\n\n- `[0]`: candle start time in milliseconds.\n- `[1]`: opening price.\n- `[2]`: highest price.\n- `[3]`: lowest price.\n- `[4]`: closing price, or the last traded price while the candle is open.\n- `[5]`: trading volume. For USDT and USDC contracts, the unit is the base coin; for inverse contracts, it is the quote coin.\n- `[6]`: turnover. For USDT and USDC contracts, the unit is the quote coin; for inverse contracts, it is the base coin.",
    "RestClientV5.repayCryptoLoan": {"deprecated": "Use the \"Crypto Loan - New\" endpoints instead.\n\nRepay all or part of a loan. Accrued interest is repaid before principal. Requires the \"Spot trade\" permission. The repayment is deducted from the Funding account. Collateral is not released automatically after a partial repayment; use the collateral-adjustment endpoint to change it."},
  },
  "name": "Bybit",
  "sourceDirectory": "bybit-api",
  "packageName": "bybit-api",
  "entryPoint": "src/index.ts",
  "tsconfig": "tsconfig.build.json",
  "clients": [
    "RestClientV5",
    "WebsocketClient",
    "WebsocketAPIClient"
  ],
  "website": "https://siebly.io/sdk/bybit/javascript",
  "tutorial": "https://siebly.io/sdk/bybit/javascript/tutorial",
  "repository": "https://github.com/sieblyio/bybit-api",
  "referenceHelp": [
    {
      "client": "RestClientV5",
      "method": "getTickers",
      "example": "first-call.ts",
      "guide": "/getting-started",
      "title": "Quickstart"
    },
    {
      "client": "RestClientV5",
      "method": "getOrderbook",
      "example": "order-book.ts",
      "guide": "/guides/market-data",
      "title": "Read an order book"
    },
    {
      "client": "WebsocketClient",
      "method": "subscribeV5",
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
      "client": "RestClientV5",
      "method": "getWalletBalance",
      "example": "account-state.ts",
      "guide": "/guides/authentication#verify-account-access",
      "title": "Verify Testnet account access"
    },
    {
      "client": "RestClientV5",
      "method": "submitOrder",
      "guide": "/guides/orders",
      "title": "Order management"
    },
    {
      "client": "RestClientV5",
      "method": "getActiveOrders",
      "guide": "/guides/orders",
      "title": "Manage a Testnet order"
    },
    {
      "client": "RestClientV5",
      "method": "getHistoricOrders",
      "guide": "/guides/orders",
      "title": "Manage a Testnet order"
    },
    {
      "client": "RestClientV5",
      "method": "cancelOrder",
      "guide": "/guides/orders",
      "title": "Manage a Testnet order"
    },
    {
      "client": "WebsocketClient",
      "method": "subscribeV5",
      "guide": "/guides/private-streams",
      "title": "Receive private order updates"
    }
  ],
  "guides": [
    {
      "text": "Order management",
      "link": "/guides/orders"
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
