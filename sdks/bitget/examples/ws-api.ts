import { WebsocketAPIClient } from 'bitget-api';
import { credentials, requiredEnv } from './authenticated-client.js';

const api = new WebsocketAPIClient(credentials);

async function main() {
  const response = await api.cancelOrder('spot', {
    clientOid: requiredEnv('BITGET_CLIENT_ORDER_ID'),
  });
  if (response.code !== '0') {
    throw new Error(`Cancellation rejected: ${response.code}`);
  }
  console.log('Cancellation acknowledgement:', response.args);
}

main().catch(() => {
  console.error('WS API command failed. Reconcile the order before retrying.');
  process.exitCode = 1;
}).finally(() => {
  api.getWSClient().closeAll();
});
