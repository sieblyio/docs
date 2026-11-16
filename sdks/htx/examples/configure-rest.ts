import { SpotClient, WebsocketClient } from '@siebly/htx-api';

export const client = new SpotClient(
  {
    baseUrlKey: 'spotAWS',
    keepAlive: true,
  },
  {
    timeout: 20_000,
  },
);

export const ws = new WebsocketClient({
  wsEnvironment: 'aws',
  reconnectTimeout: 2_000,
});
