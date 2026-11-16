import { WebsocketAPIClient } from '@siebly/htx-api';

// Call only after confirming the live order parameters and persisting the ID.
export async function placeSpotOrderOverWebSocket(
  apiKey: string,
  apiSecret: string,
  accountId: string,
  price: string,
  amount: string,
  clientOrderId: string,
) {
  const api = new WebsocketAPIClient({
    apiKey,
    apiSecret,
    attachEventListeners: false,
  });
  api
    .getWSClient()
    .on('exception', () =>
      console.error(
        'WebSocket API exception. Reconcile the order before retrying.',
      ),
    );
  try {
    return await api.submitSpotOrder({
      'account-id': accountId,
      symbol: 'btcusdt',
      type: 'buy-limit-maker',
      amount,
      price,
      source: 'spot-api',
      'client-order-id': clientOrderId,
    });
  } finally {
    api.getWSClient().closeAll();
  }
}
