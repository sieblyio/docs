export default {
  name: 'Bitget',
  sourceDirectory: 'bitget-api',
  packageName: 'bitget-api',
  entryPoint: 'src/index.ts',
  tsconfig: 'tsconfig.cjs.json',
  compatibilityPage: 'authored',
  clients: ['RestClientV3', 'WebsocketClientV3', 'WebsocketAPIClient', 'RestClientV2', 'WebsocketClientV2'],
  website: 'https://siebly.io/sdk/bitget/javascript',
  tutorial: 'https://siebly.io/sdk/bitget/javascript/tutorial',
  repository: 'https://github.com/sieblyio/bitget-api',
  referenceHelp: [
    { client: 'RestClientV3', method: 'getTickers', guide: '/getting-started', title: 'Read a public ticker' },
    { client: 'RestClientV3', method: 'getOrderBook', guide: '/guides/market-data', title: 'Read an order book' },
    { client: 'RestClientV3', method: 'getBalances', guide: '/guides/authentication', title: 'Read Unified Trading Account balances' },
    { client: 'RestClientV2', method: 'getSpotAccountAssets', guide: '/guides/authentication', title: 'Read Classic Spot balances' },
    ...['submitNewOrder', 'modifyOrder', 'cancelOrder', 'getOrderInfo', 'getUnfilledOrders', 'getHistoryOrders', 'getTradeFills'].map((method) => ({
      client: 'RestClientV3', method, guide: '/guides/orders', title: 'UTA order management',
    })),
    { client: 'WebsocketClientV3', method: 'subscribe', guide: '/guides/websockets', title: 'Subscribe to public market data' },
    { client: 'WebsocketClientV2', method: 'subscribeTopic', guide: '/guides/private-streams', title: 'Subscribe to Classic account updates' },
    { client: 'WebsocketAPIClient', method: 'submitNewOrder', guide: '/guides/websocket-api', title: 'WebSocket API requests' },
  ],
  guides: [
    { text: 'UTA order management', link: '/guides/orders' },
    { text: 'Private account updates (WebSocket)', link: '/guides/private-streams' },
    { text: 'WebSocket API requests', link: '/guides/websocket-api' },
  ],
};
