import { WebsocketClientV3, WS_KEY_MAP } from 'bitget-api';
import { credentials } from './authenticated-client.js';

const ws = new WebsocketClientV3(credentials);
ws.on('authenticated', () => {
  console.log('UTA private connection authenticated.');
});
ws.on('response', (message) => {
  console.log('Subscription response:', message);
});
ws.on('update', (message) => {
  // Handle account data on the server; keep it out of public logs.
  console.log('UTA account update received:', message.arg);
});
ws.on('exception', () => {
  console.error('Private stream exception; check the error code and message without logging credentials.');
});
ws.on('reconnect', () => {
  console.log('Reconnecting; account state may be stale. Pause trading decisions until recovery completes.');
});
ws.on('reconnected', () => {
  console.log('Connection restored; the SDK restores subscriptions automatically. Recover missed account updates through REST.');
});

ws.subscribe([
  {
    topic: 'account',
    payload: {
      instType: 'UTA',
    },
  },
  {
    topic: 'order',
    payload: {
      instType: 'UTA',
    },
  },
  {
    topic: 'fill',
    payload: {
      instType: 'UTA',
    },
  },
  {
    topic: 'position',
    payload: {
      instType: 'UTA',
    },
  },
], WS_KEY_MAP.v3Private).catch(() => {
  console.error('Private subscription failed.');
  ws.closeAll();
  process.exitCode = 1;
});

process.once('SIGINT', () => {
  ws.closeAll();
});
