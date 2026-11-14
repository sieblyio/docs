import { RestClientV3, WebsocketClientV3 } from 'bitget-api';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your server environment.`);
  return value;
}

// Configure clients only. No requests, subscriptions or orders are sent.
const options = {
  apiKey: requiredEnv('BITGET_DEMO_API_KEY'),
  apiSecret: requiredEnv('BITGET_DEMO_API_SECRET'),
  apiPass: requiredEnv('BITGET_DEMO_API_PASSPHRASE'),
  demoTrading: true,
};

export const rest = new RestClientV3(options);
export const ws = new WebsocketClientV3(options);
