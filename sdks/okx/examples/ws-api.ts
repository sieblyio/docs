import { WebsocketAPIClient } from 'okx-api';
import { client, credentials } from './authenticated-client.js';

const api = new WebsocketAPIClient({ accounts: [credentials] });

async function main() {
  const clOrdId = process.env.OKX_CLIENT_ORDER_ID;
  if (!clOrdId) {
    throw new Error('Set OKX_CLIENT_ORDER_ID to the client order ID of the existing BTC-USDT order to cancel.');
  }
  const instruments = await client.getInstruments({ instType: 'SPOT', instId: 'BTC-USDT' });
  const instIdCode = instruments.find((instrument) => instrument.instId === 'BTC-USDT')?.instIdCode;
  if (instIdCode === undefined) {
    throw new Error('BTC-USDT instrument code was not returned; no cancellation was sent.');
  }
  const response = await api.cancelOrder({ instIdCode, clOrdId });
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
