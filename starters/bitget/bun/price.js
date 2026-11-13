import { RestClientV3 } from 'bitget-api';

const client = new RestClientV3();
const response = await client.getTickers({
  category: 'SPOT',
  symbol: 'BTCUSDT',
});
const price = response.data[0]?.lastPrice;

if (!price) {
  throw new Error('No BTCUSDT price was returned.');
}

console.log('BTCUSDT REST price:', price);
