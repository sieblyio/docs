import { WebsocketAPIClient } from 'gateio-api';
import { clientOptions, requiredEnv } from './authenticated-client.js';

async function main() {
  const api = new WebsocketAPIClient({
    ...clientOptions,
    attachEventListeners: false,
  });
  api.getWSClient().on('exception', () => {
    console.error('WebSocket API request or connection failed.');
  });
  try {
    const response = await api.getSpotOrderStatus({
      currency_pair: 'BTC_USDT',
      order_id: requiredEnv('GATEIO_ORDER_ID'),
      account: 'spot',
    });
    console.log('Order state:', response.data.result);
  } finally {
    api.getWSClient().closeAll();
  }
}

main().catch(() => {
  console.error(
    'Unable to read the order. Check its ID, credentials and environment.',
  );
  process.exitCode = 1;
});
