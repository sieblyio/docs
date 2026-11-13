import { RestClient } from 'okx-api';

const client = new RestClient();

async function main() {
  const tickers = await client.getTicker({ instId: 'BTC-USDT' });
  for (const ticker of tickers) {
    console.log(`${ticker.instId} last price: ${ticker.last}`);
  }
}

main().catch((error) => {
  console.error('Ticker request failed:', error);
  process.exitCode = 1;
});
