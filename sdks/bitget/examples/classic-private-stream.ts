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
  console.error('Private stream exception; check the error code and message without logging credentials.');
});
ws.on('reconnect', () => {
  console.log('Reconnecting; Classic account state may be stale.');
});
ws.on('reconnected', () => {
  console.log('Connection restored; the SDK restores subscriptions automatically. Recover missed account updates through REST.');
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
