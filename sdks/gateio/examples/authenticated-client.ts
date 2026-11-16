import { RestClient } from 'gateio-api';

export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Set ${name} in your server environment.`);
  }
  return value;
}

export const credentials = {
  apiKey: requiredEnv('GATEIO_API_KEY'),
  apiSecret: requiredEnv('GATEIO_API_SECRET'),
};

// Set GATEIO_USE_TESTNET=true and use TestNet keys to switch all private examples.
export const clientOptions = {
  ...credentials,
  useTestnet: process.env.GATEIO_USE_TESTNET === 'true',
};

export const client = new RestClient(clientOptions, { timeout: 10000 });
