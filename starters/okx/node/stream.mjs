import { WebsocketClient } from 'okx-api';
import process from 'node:process';

const ws = new WebsocketClient();

ws.on('update', (message) => {
  if (message.arg?.channel !== 'tickers') {
    console.log('WebSocket update:', message);
    return;
  }

  const price = message.data?.[0]?.last;

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

Promise.all(ws.subscribe({ channel: 'tickers', instId: 'BTC-USDT' })).catch((error) => {
  console.error('WebSocket subscription failed:', error);
});
