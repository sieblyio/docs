import { RestClientV2, RestClientV3 } from 'bitget-api';

export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Set ${name} in your server environment.`);
  }
  return value;
}

export const credentials = {
  apiKey: requiredEnv('BITGET_API_KEY'),
  apiSecret: requiredEnv('BITGET_API_SECRET'),
  apiPass: requiredEnv('BITGET_API_PASSPHRASE'),
};

export const classic = new RestClientV2(credentials);
export const unified = new RestClientV3(credentials);
