import { RestClientV3, WebsocketClientV3 } from 'bitget-api';

export const client = new RestClientV3(
  {
    keepAlive: true,
  },
  {
    timeout: 20_000,
  },
);
export const ws = new WebsocketClientV3();
