import { WebsocketClient } from '@siebly/htx-api';

const apiKey = process.env.HTX_API_KEY;
const apiSecret = process.env.HTX_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new Error('Set HTX_API_KEY and HTX_API_SECRET.');
}
const ws = new WebsocketClient({ apiKey, apiSecret });

ws.on('message', (message) => {
  if (Array.isArray(message)) {
    return;
  }
  console.log(
    'Private update channel:',
    message.ch,
    'connection:',
    message.wsKey,
  );
  // Apply the channel payload to private application state. Do not publish it.
});
ws.on('authenticated', ({ wsKey }) => console.log('Authenticated:', wsKey));
ws.on('exception', () =>
  console.error('Private stream exception. Check credentials and permissions.'),
);
ws.subscribe(
  ['accounts.update#2', 'orders#btcusdt', 'trade.clearing#btcusdt#0'],
  'spotPrivateV2',
);

process.once('SIGINT', () => ws.closeAll());
process.once('SIGTERM', () => ws.closeAll());
