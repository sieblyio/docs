import { RestClient } from 'gateio-api';

const client = new RestClient({}, { timeout: 10000 });

async function main() {
  const tickers = await client.getSpotTicker({ currency_pair: 'BTC_USDT' });
  const ticker = tickers[0];
  if (!ticker) {
    throw new Error('No BTC_USDT ticker returned.');
  }
  console.log('BTC_USDT last price:', ticker.last);
}

main().catch(() => {
  console.error('Unable to read the public ticker.');
  process.exitCode = 1;
});
