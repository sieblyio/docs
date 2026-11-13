import { RestClient } from 'okx-api';

export const client = new RestClient({}, {
  timeout: 20_000,
  proxy: { protocol: 'http', host: '127.0.0.1', port: 8080 },
});
