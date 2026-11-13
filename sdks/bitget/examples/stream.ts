import { WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';

const ws = new WebsocketClientV3();
ws.on('update', (message) => {
  console.log('Market update:', message);
});
ws.on('response', (message) => {
  console.log('Subscription response:', message);
});
ws.on('exception', (error) => {
  console.error('Public WebSocket exception:', error);
});
ws.on('reconnect', () => {
  console.log('Reconnecting; market data may be stale.');
});
ws.on('reconnected', () => {
  console.log('Connection restored; wait for subscriptions and fresh data.');
});

ws.subscribe({
  topic: 'ticker',
  payload: {
    instType: 'spot',
    symbol: 'BTCUSDT',
  },
}, WS_KEY_MAP.v3Public).catch((error) => {
  console.error('Public subscription failed:', error);
  ws.closeAll();
  process.exitCode = 1;
});

process.once('SIGINT', () => {
  ws.closeAll();
});
