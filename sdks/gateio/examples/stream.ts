import { WebsocketClient } from 'gateio-api';

const ws = new WebsocketClient();
ws.on('response', (message) => {
  console.log('Subscription response:', message);
});
ws.on('update', (message) => {
  if (message.channel === 'spot.tickers') {
    console.log('Ticker:', message.result);
  }
});
ws.on('exception', () => {
  console.error('WebSocket request or connection failed.');
});
ws.on('reconnect', () => {
  console.log('Reconnecting; cached prices may be stale.');
});
ws.on('reconnected', () => {
  console.log('Reconnected; waiting for fresh prices.');
});

ws.subscribe({ topic: 'spot.tickers', payload: ['BTC_USDT'] }, 'spotV4');
process.once('SIGINT', () => {
  ws.closeAll();
});
