import { SpotClient } from '@siebly/htx-api';

async function main() {
  const client = new SpotClient();
  const response = await client.getTicker({ symbol: 'btcusdt' });
  console.log('btcusdt last price:', response.tick.close);
}

main().catch(() => {
  console.error('Public ticker request failed. Check connectivity and access.');
  process.exitCode = 1;
});
