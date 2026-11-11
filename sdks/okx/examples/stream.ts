import { WebsocketClient } from 'okx-api';

const ws = new WebsocketClient();
ws.on('update', (message) => {
  console.log('Market update:', message);
});
ws.on('response', (message) => {
  console.log('Subscription response:', message);
});
ws.on('exception', (error) => {
  console.error('WebSocket exception:', error);
});
ws.on('reconnect', () => {
  console.log('Reconnecting; market data may be stale.');
});
ws.on('reconnected', () => {
  console.log('Connection restored; wait for fresh market data.');
});

Promise.all(ws.subscribe({ channel: 'tickers', instId: 'BTC-USDT' })).catch((error) => {
  console.error('Subscription failed:', error);
  ws.closeAll();
  process.exitCode = 1;
});

process.once('SIGINT', () => {
  ws.closeAll();
});
