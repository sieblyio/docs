import { RestClientV2 } from 'bitget-api';

export const client = new RestClientV2({}, {
  timeout: 20_000,
  proxy: {
    protocol: 'http',
    host: '127.0.0.1',
    port: 8080,
  },
});
