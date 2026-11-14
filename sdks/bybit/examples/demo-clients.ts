import { RestClientV5, WebsocketClient } from 'bybit-api';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your server environment.`);
  return value;
}

// Configure clients only. No requests, subscriptions or orders are sent.
const options = {
  key: requiredEnv('BYBIT_DEMO_API_KEY'),
  secret: requiredEnv('BYBIT_DEMO_API_SECRET'),
  testnet: false,
  demoTrading: true,
};

export const rest = new RestClientV5(options);
export const ws = new WebsocketClient(options);
