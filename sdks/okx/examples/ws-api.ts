import { WebsocketAPIClient } from 'okx-api';
import { credentials } from './authenticated-client.js';

const api = new WebsocketAPIClient({ accounts: [credentials] });

async function main() {
  const clOrdId = process.env.OKX_CLIENT_ORDER_ID;
  if (!clOrdId) {
    throw new Error('Set OKX_CLIENT_ORDER_ID to the existing BTC-USDT order to cancel.');
  }
  const response = await api.cancelOrder({ instId: 'BTC-USDT', clOrdId });
  console.log('Cancellation response:', response);
  if (response.code !== '0') {
    throw new Error(`Cancellation failed: ${response.code}`);
  }
  for (const result of response.data) {
    if (result.sCode !== '0') {
      throw new Error(`Cancellation rejected: ${result.sCode} ${result.sMsg}`);
    }
  }
}

main().catch((error) => {
  console.error('WS API request failed; reconcile before retrying:', error);
  process.exitCode = 1;
}).finally(() => {
  api.getWSClient().closeAll();
});
