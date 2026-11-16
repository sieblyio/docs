import { WebsocketClient } from '@siebly/htx-api';

const ws = new WebsocketClient();
ws.on('message', (message) => {
  if (Array.isArray(message) || message.ch !== 'market.btcusdt.detail') {
    return;
  }
  const tick = message.tick;
  if (tick && typeof tick === 'object' && 'close' in tick) {
    console.log('btcusdt last price:', tick.close);
  }
});
ws.on('exception', () =>
  console.error('WebSocket exception. Check connection and subscription.'),
);
ws.on('reconnecting', ({ wsKey }) => console.log('Reconnecting:', wsKey));
ws.on('reconnected', ({ wsKey }) => console.log('Reconnected:', wsKey));
ws.subscribe('market.btcusdt.detail', 'spotPublic');

process.once('SIGINT', () => ws.closeAll());
process.once('SIGTERM', () => ws.closeAll());
