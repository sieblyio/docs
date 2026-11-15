import { RestClientV5 } from 'bybit-api';

export const client = new RestClientV5(
  {
    recv_window: 5000,
    parseAPIRateLimits: true,
  },
  {
    timeout: 10_000,
  },
);
