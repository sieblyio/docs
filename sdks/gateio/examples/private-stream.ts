import { WebsocketClient } from 'gateio-api';
import { clientOptions } from './authenticated-client.js';

const ws = new WebsocketClient(clientOptions);
ws.on('response', (message) => {
  console.log('Subscription response:', {
    channel: message.channel,
    event: message.event,
    status: message.result?.status,
    errorCode: message.error?.code,
  });
});
ws.on('update', (message) => {
  console.log('Private update:', message.channel, message.result);
});
ws.on('exception', () => {
  console.error('Private WebSocket request or connection failed.');
});
ws.on('reconnect', () => {
  console.log('Reconnecting; account state is stale.');
});
ws.on('reconnected', () => {
  console.log('Reconnected; reconcile missed orders and fills through REST.');
});

ws.subscribe(
  [
    'spot.balances',
    { topic: 'spot.orders', payload: ['BTC_USDT'] },
    { topic: 'spot.usertrades', payload: ['BTC_USDT'] },
  ],
  'spotV4',
);

process.once('SIGINT', () => {
  ws.closeAll();
});
