import { SpotClient } from 'kucoin-api';

const client = new SpotClient();
const response = await client.getTicker({ symbol: 'BTC-USDT' });
const price = response.data.price;

if (!price) {
  throw new Error('No BTC-USDT price was returned.');
}

console.log('BTC-USDT REST price:', price);
