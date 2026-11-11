import { RestClient, WebsocketClient } from 'okx-api';

// Select the region where your account is registered on both transports.
export const client = new RestClient(
  { market: 'EEA', demoTrading: false, keepAlive: true },
  { timeout: 20_000 },
);
export const ws = new WebsocketClient({ market: 'EEA', demoTrading: false });
