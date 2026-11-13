import { RestClientV2 } from 'bitget-api';

const client = new RestClientV2();
const response = await client.getSpotTicker({
  symbol: 'BTCUSDT',
});
const price = response.data[0]?.lastPr;

if (!price) {
  throw new Error('No BTCUSDT price was returned.');
}

console.log('BTCUSDT REST price:', price);
