export default {
  name: 'KuCoin',
  sourceDirectory: 'kucoin-api',
  packageName: 'kucoin-api',
  entryPoint: 'src/index.ts',
  tsconfig: 'tsconfig.cjs.json',
  compatibilityPage: 'authored',
  clients: [
    'SpotClient',
    'FuturesClient',
    'BrokerClient',
    'UnifiedAPIClient',
    'WebsocketClient',
    'WebsocketAPIClient',
  ],
  website: 'https://siebly.io/sdk/kucoin/javascript',
  tutorial: 'https://siebly.io/sdk/kucoin/javascript/tutorial',
  repository: 'https://github.com/sieblyio/kucoin-api',
  // Clarify upstream comments without changing SDK types or behavior.
  referenceDescriptions: {
    UnifiedAPIClient:
      'Unified Trading Account REST client for market data, account balances, positions and trading. Use UTA request types and verify the account requirements of each method.',
    WebsocketAPIClient:
      'Promise-based wrapper for KuCoin WebSocket API order commands. Connections and authentication are handled as needed. Use getWSClient() for lifecycle events and shutdown. This release has no supported testnet constructor option; commands use live services.',
    'WebsocketClient.subscribe':
      'Subscribe to one or more topics on the required wsKey connection. Pass a topic string, a { topic, payload } object, or an array of either form. Connection, authentication and resubscription are automatic. Observe response and exception events to confirm acceptance; the method returns void.',
    'WebsocketClient.unsubscribe':
      'Unsubscribe using the same topic requests and required wsKey connection used for subscribe(). Removed topics are also removed from the reconnect subscription cache.',
  },
  referenceHelp: [
    {
      client: 'SpotClient',
      method: 'getTicker',
      guide: '/getting-started',
      title: 'Read a public ticker',
    },
    ...['getSymbols', 'getOrderBookLevel20', 'getKlines'].map((method) => ({
      client: 'SpotClient',
      method,
      guide: '/guides/market-data',
      title: 'Read public market data',
    })),
    {
      client: 'SpotClient',
      method: 'getBalances',
      guide: '/guides/authentication',
      title: 'Read account balances',
    },
    ...[
      'submitHFOrder',
      'updateHFOrder',
      'cancelHFOrder',
      'cancelHFOrderByClientOId',
      'getHFOrderDetailsByClientOid',
      'getHFOrderDetailsByOrderId',
      'getHFActiveOrdersPaginated',
      'getHFCompletedOrders',
      'getHFFilledOrders',
    ].map((method) => ({
      client: 'SpotClient',
      method,
      guide: '/guides/orders',
      title: 'Manage Spot orders and recover uncertain outcomes',
    })),
    {
      client: 'SpotClient',
      method: 'submitHFOrderTest',
      guide: '/guides/testing-environments#test-order',
      title: 'Validate an order without matching',
    },
    {
      client: 'WebsocketClient',
      method: 'subscribe',
      guide: '/guides/websockets',
      title: 'Subscribe to market updates',
    },
    {
      client: 'SpotClient',
      method: 'getPrivateWSConnectionToken',
      guide: '/guides/private-streams',
      title: 'Follow private account updates',
    },
    {
      client: 'WebsocketClient',
      method: 'closeAll',
      guide: '/guides/production#shut-down-cleanly',
      title: 'Shut down cleanly',
    },
    ...[
      'submitNewSpotOrder',
      'modifySpotOrder',
      'cancelSpotOrder',
      'getWSClient',
    ].map((method) => ({
      client: 'WebsocketAPIClient',
      method,
      guide: '/guides/websocket-api',
      title: 'Send WebSocket API requests',
    })),
  ],
  guides: [
    { text: 'Spot order management', link: '/guides/orders' },
    {
      text: 'Private account updates (WebSocket)',
      link: '/guides/private-streams',
    },
    { text: 'WebSocket API requests', link: '/guides/websocket-api' },
  ],
};
