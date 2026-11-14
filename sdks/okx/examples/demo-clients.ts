import { RestClient, WebsocketClient } from 'okx-api';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your server environment.`);
  return value;
}

// Configure clients only. No requests, subscriptions or orders are sent.
const credentials = {
  apiKey: requiredEnv('OKX_DEMO_API_KEY'),
  apiSecret: requiredEnv('OKX_DEMO_API_SECRET'),
  apiPass: requiredEnv('OKX_DEMO_API_PASSPHRASE'),
};

export const rest = new RestClient({ ...credentials, demoTrading: true });
export const ws = new WebsocketClient({
  accounts: [credentials],
  demoTrading: true,
});
