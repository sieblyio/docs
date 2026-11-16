import { WebsocketClient } from 'kucoin-api';

const ws = new WebsocketClient();
ws.on('response', (message) => {
  console.log('Subscription response:', message.type);
});
ws.on('update', (message) => {
  if (message.topic === '/market/ticker:BTC-USDT') {
    console.log('BTC-USDT last price:', message.data?.price);
  }
});
ws.on('exception', () =>
  console.error('WebSocket request or connection failed.'),
);
ws.on('reconnect', () =>
  console.log('Reconnecting; cached prices may be stale.'),
);
ws.on('reconnected', () =>
  console.log('Reconnected; waiting for fresh prices.'),
);

ws.subscribe('/market/ticker:BTC-USDT', 'spotPublicV1');
process.once('SIGINT', () => ws.closeAll());
