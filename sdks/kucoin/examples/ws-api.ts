import { WebsocketAPIClient } from 'kucoin-api';
import { credentials, requiredEnv } from './authenticated-client.js';

async function main() {
  const orderId = requiredEnv('KUCOIN_ORDER_ID');
  const wsApi = new WebsocketAPIClient({
    ...credentials,
    attachEventListeners: false,
  });
  wsApi.getWSClient().on('exception', () => {
    console.error('WebSocket API connection or request failed.');
  });
  try {
    const result = await wsApi.cancelSpotOrder({ symbol: 'BTC-USDT', orderId });
    console.log('Cancellation response:', result.code, result.data.orderId);
    console.log(
      'Check private updates or REST order status for the final outcome.',
    );
  } finally {
    wsApi.getWSClient().closeAll();
  }
}

main().catch(() => {
  console.error(
    'Cancellation outcome is uncertain. Check order status before retrying.',
  );
  process.exitCode = 1;
});
