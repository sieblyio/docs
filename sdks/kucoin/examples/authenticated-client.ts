import { SpotClient } from 'kucoin-api';

export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your server environment.`);
  return value;
}

const region = process.env.KUCOIN_API_REGION || 'global';
if (region !== 'global' && region !== 'EU' && region !== 'AU') {
  throw new Error('KUCOIN_API_REGION must be global, EU or AU.');
}

export const credentials: NonNullable<
  ConstructorParameters<typeof SpotClient>[0]
> = {
  apiKey: requiredEnv('KUCOIN_API_KEY'),
  apiSecret: requiredEnv('KUCOIN_API_SECRET'),
  apiPassphrase: requiredEnv('KUCOIN_API_PASSPHRASE'),
  apiRegion: region,
};

export const client = new SpotClient(credentials, { timeout: 10000 });
