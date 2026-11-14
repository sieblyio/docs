import { MainClient, WebsocketClient } from 'binance';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your server environment.`);
  return value;
}

// Configure clients only. No requests, subscriptions or orders are sent.
const options = {
  api_key: requiredEnv('BINANCE_DEMO_API_KEY'),
  api_secret: requiredEnv('BINANCE_DEMO_API_SECRET'),
  testnet: false,
  demoTrading: true,
};

export const rest = new MainClient(options);
export const ws = new WebsocketClient(options);
