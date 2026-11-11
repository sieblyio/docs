import { RestClient } from 'okx-api';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Set ${name} in your server environment.`);
  }
  return value;
}

export const credentials = {
  apiKey: requiredEnv('OKX_API_KEY'),
  apiSecret: requiredEnv('OKX_API_SECRET'),
  apiPass: requiredEnv('OKX_API_PASSPHRASE'),
};

export const client = new RestClient(credentials);
