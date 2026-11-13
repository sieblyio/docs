import { RestClientV2, WebsocketClientV2 } from 'bitget-api';

export const client = new RestClientV2(
  {
    keepAlive: true,
  },
  {
    timeout: 20_000,
  },
);
export const ws = new WebsocketClientV2();
