import { CBExchangeClient, WebsocketClient } from 'coinbase-api';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your server environment.`);
  return value;
}

// Configure clients only. No requests, subscriptions or orders are sent.
const options = {
  apiKey: requiredEnv('COINBASE_EXCHANGE_SANDBOX_API_KEY'),
  apiSecret: requiredEnv('COINBASE_EXCHANGE_SANDBOX_API_SECRET'),
  apiPassphrase: requiredEnv('COINBASE_EXCHANGE_SANDBOX_API_PASSPHRASE'),
  useSandbox: true,
};

export const rest = new CBExchangeClient(options);
export const ws = new WebsocketClient(options);
