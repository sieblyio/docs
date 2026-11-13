import { WebsocketClientV2 } from 'bitget-api';
import { credentials } from './authenticated-client.js';

const ws = new WebsocketClientV2(credentials);
ws.on('authenticated', () => {
  console.log('Classic private connection authenticated.');
});
ws.on('response', (message) => {
  console.log('Subscription response:', message);
});
ws.on('update', (message) => {
  console.log('Classic account update received:', message.arg);
});
ws.on('exception', () => {
  console.error('Private stream exception; inspect sanitized server diagnostics.');
});
ws.on('reconnect', () => {
  console.log('Mark Classic account state stale.');
});
ws.on('reconnected', () => {
  console.log('Confirm subscriptions, then reconcile missing state through REST.');
});

Promise.all([
  ws.subscribeTopic('SPOT', 'orders', 'default'),
  ws.subscribeTopic('SPOT', 'account', 'default'),
]).catch(() => {
  console.error('Private subscription failed.');
  ws.closeAll();
  process.exitCode = 1;
});

process.once('SIGINT', () => {
  ws.closeAll();
});
