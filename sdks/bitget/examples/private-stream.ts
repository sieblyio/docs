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
  // Account payloads are private. Send only to your server-side state handler.
  console.log('UTA account update received:', message.arg);
});
ws.on('exception', () => {
  console.error('Private stream exception; inspect sanitized server diagnostics.');
});
ws.on('reconnect', () => {
  console.log('Mark account state stale; pause dependent actions.');
});
ws.on('reconnected', () => {
  console.log('Confirm subscriptions, then reconcile missing state through REST.');
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
