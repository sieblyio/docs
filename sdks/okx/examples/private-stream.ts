import { WebsocketClient } from 'okx-api';
import { credentials } from './authenticated-client.js';

const ws = new WebsocketClient({ accounts: [credentials] });
ws.on('authenticated', () => {
  console.log('Private connection authenticated.');
});
ws.on('response', (message) => {
  console.log('Subscription response:', message);
});
ws.on('update', (message) => {
  console.log('Account update:', message);
});
ws.on('exception', (error) => {
  console.error('Private stream exception:', error);
});
ws.on('reconnect', () => {
  console.log('Mark account state stale; pause dependent actions.');
});
ws.on('reconnected', () => {
  console.log('Confirm subscriptions, then reconcile missing state through REST.');
});

Promise.all(ws.subscribe([
  { channel: 'orders', instType: 'SPOT' },
  { channel: 'account' },
  { channel: 'positions', instType: 'ANY' },
])).catch((error) => {
  console.error('Private subscription failed:', error);
  ws.closeAll();
  process.exitCode = 1;
});

process.once('SIGINT', () => {
  ws.closeAll();
});
