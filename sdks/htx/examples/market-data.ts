import { SpotClient } from '@siebly/htx-api';

async function main() {
  const client = new SpotClient();
  const ticker = await client.getTicker({ symbol: 'btcusdt' });
  const depth = await client.getMarketDepth({
    symbol: 'btcusdt',
    type: 'step0',
  });
  const candles = await client.getKlines({
    symbol: 'btcusdt',
    period: '1min',
    size: 10,
  });
  console.log('Last price:', ticker.tick.close);
  console.log('Best bid:', depth.tick.bids[0]);
  console.log('Latest candles:', candles.data);
}

main().catch(() => {
  console.error('Public market-data request failed.');
  process.exitCode = 1;
});
