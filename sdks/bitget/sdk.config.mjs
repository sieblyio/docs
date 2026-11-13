export default {
  name: 'Bitget',
  sourceDirectory: 'bitget-api',
  packageName: 'bitget-api',
  entryPoint: 'src/index.ts',
  tsconfig: 'tsconfig.cjs.json',
  compatibilityPage: 'authored',
  clients: ['RestClientV2', 'RestClientV3', 'WebsocketClientV2', 'WebsocketClientV3', 'WebsocketAPIClient'],
  website: 'https://siebly.io/sdk/bitget/javascript',
  tutorial: 'https://siebly.io/sdk/bitget/javascript/tutorial',
  repository: 'https://github.com/sieblyio/bitget-api',
  referenceHelp: [
    { client: 'RestClientV2', method: 'getSpotTicker', guide: '/getting-started', title: 'Read a public ticker' },
    { client: 'RestClientV2', method: 'getSpotOrderBookDepth', guide: '/guides/market-data', title: 'Read an order book' },
    { client: 'RestClientV2', method: 'getSpotAccountAssets', guide: '/guides/authentication', title: 'Read Classic Spot balances' },
    { client: 'RestClientV3', method: 'getBalances', guide: '/guides/authentication', title: 'Read Unified Trading Account balances' },
    ...['submitNewOrder', 'modifyOrder', 'cancelOrder', 'getOrderInfo', 'getUnfilledOrders', 'getHistoryOrders', 'getTradeFills'].map((method) => ({
      client: 'RestClientV3', method, guide: '/guides/orders', title: 'UTA order management',
    })),
    { client: 'WebsocketClientV2', method: 'subscribeTopic', guide: '/guides/websockets', title: 'Subscribe to public market data' },
    { client: 'WebsocketClientV3', method: 'subscribe', guide: '/guides/private-streams', title: 'Subscribe to UTA account updates' },
    { client: 'WebsocketAPIClient', method: 'submitNewOrder', guide: '/guides/websocket-api', title: 'WebSocket API requests' },
  ],
  guides: [
    { text: 'UTA order management', link: '/guides/orders' },
    { text: 'Private account updates (WebSocket)', link: '/guides/private-streams' },
    { text: 'WebSocket API requests', link: '/guides/websocket-api' },
  ],
};
