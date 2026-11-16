import { SpotClient } from '@siebly/htx-api';

export const client = new SpotClient(
  {},
  {
    timeout: 20_000,
    proxy: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8080,
    },
  },
);
