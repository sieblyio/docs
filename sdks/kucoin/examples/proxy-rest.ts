import { SpotClient } from 'kucoin-api';

const client = new SpotClient(
  {},
  {
    timeout: 10000,
    proxy: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8080,
    },
  },
);
