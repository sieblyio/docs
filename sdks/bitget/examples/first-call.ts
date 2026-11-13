import { RestClientV2 } from 'bitget-api';

const client = new RestClientV2();

async function main() {
  const response = await client.getSpotTicker({
    symbol: 'BTCUSDT',
  });
  console.log('BTCUSDT last price:', response.data[0]?.lastPr);
}

main().catch((error) => {
  console.error('Public request failed:', error);
  process.exitCode = 1;
});
