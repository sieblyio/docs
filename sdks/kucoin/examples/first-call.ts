import { SpotClient } from 'kucoin-api';

async function main() {
  const client = new SpotClient();
  const response = await client.getTicker({ symbol: 'BTC-USDT' });
  console.log('BTC-USDT last price:', response.data.price);
}

main().catch(() => {
  console.error('Public ticker request failed. Check connectivity and region.');
  process.exitCode = 1;
});
