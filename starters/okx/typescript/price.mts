import { RestClient } from 'okx-api';

const client = new RestClient();
const tickers = await client.getTicker({ instId: 'BTC-USDT' });
const price = tickers[0]?.last;

if (!price) {
  throw new Error('No BTC-USDT price was returned.');
}

console.log('BTC-USDT REST price:', price);
