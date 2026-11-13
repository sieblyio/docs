import { RestClientV3 } from 'bitget-api';

const client = new RestClientV3();

async function main() {
  const response = await client.getTickers({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });
  console.log('BTCUSDT last price:', response.data[0]?.lastPrice);
}

main().catch((error) => {
  console.error('Public request failed:', error);
  process.exitCode = 1;
});
