import { RestClient, WebsocketClient } from 'okx-api';

// Set both REST and WebSocket clients to the region where your account is registered.
export const client = new RestClient(
  { market: 'EEA', demoTrading: false, keepAlive: true },
  { timeout: 20_000 },
);
export const ws = new WebsocketClient({ market: 'EEA', demoTrading: false });
