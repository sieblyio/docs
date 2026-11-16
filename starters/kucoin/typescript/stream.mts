import { WebsocketClient } from 'kucoin-api';
import process from 'node:process';

const ws = new WebsocketClient();

ws.on('update', (message) => {
  if (message.topic !== '/market/ticker:BTC-USDT') {
    console.log('WebSocket update:', message);
    return;
  }

  const price = message.data?.price;

  if (price) {
    console.log('BTC-USDT WebSocket price:', String(price));
  }
});

ws.on('response', (message) => {
  console.log('WebSocket response:', message);
});
ws.on('exception', (error) => {
  console.error('WebSocket exception:', error);
});
ws.on('reconnect', (event) => {
  console.log('WebSocket reconnecting:', event);
});
ws.on('reconnected', (event) => {
  console.log('WebSocket reconnected:', event);
});

function stop() {
  ws.closeAll();
  console.log('WebSocket closed.');
}

process.once('SIGINT', stop);
process.once('SIGTERM', stop);

ws.subscribe('/market/ticker:BTC-USDT', 'spotPublicV1');
