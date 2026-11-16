import { SpotClient, WebsocketClient } from 'kucoin-api';

const rest = new SpotClient(
  { apiRegion: 'global', keepAlive: true },
  { timeout: 10000 },
);

const ws = new WebsocketClient({
  apiRegion: 'global',
  requestOptions: { timeout: 10000 },
  reconnectTimeout: 1000,
});
