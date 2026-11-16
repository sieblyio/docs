import { WebsocketClient } from 'kucoin-api';
import { credentials } from './authenticated-client.js';

const ws = new WebsocketClient(credentials);
ws.on('response', (message) => {
  console.log('Subscription response:', message.type);
});
ws.on('update', (message) => {
  console.log('Private update:', message.topic, message.subject);
});
ws.on('exception', () => console.error('Private WebSocket request failed.'));
ws.on('reconnect', () =>
  console.log('Reconnecting; mark account state stale.'),
);
ws.on('reconnected', () =>
  console.log('Reconnected; reconcile account state.'),
);

ws.subscribe(
  ['/account/balance', '/spotMarket/tradeOrdersV2'],
  'spotPrivateV1',
);
process.once('SIGINT', () => ws.closeAll());
