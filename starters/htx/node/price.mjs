import { SpotClient } from '@siebly/htx-api';

const client = new SpotClient();
const response = await client.getTicker({ symbol: 'btcusdt' });
const price = response.tick.close;

if (!price) {
  throw new Error('No btcusdt price was returned.');
}

console.log('btcusdt REST price:', price);
