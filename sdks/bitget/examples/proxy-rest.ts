import { RestClientV3 } from 'bitget-api';

export const client = new RestClientV3({}, {
  timeout: 20_000,
  proxy: {
    protocol: 'http',
    host: '127.0.0.1',
    port: 8080,
  },
});
