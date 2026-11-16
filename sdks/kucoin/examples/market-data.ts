import { SpotClient } from 'kucoin-api';

async function main() {
  const client = new SpotClient({}, { timeout: 10000 });
  const symbol = 'BTC-USDT';
  const rules = await client.getSymbols();
  console.log(
    'Pair rules:',
    rules.data.find((pair) => pair.symbol === symbol),
  );
  const book = await client.getOrderBookLevel20({ symbol });
  console.log('Best bid:', book.data.bids[0], 'Best ask:', book.data.asks[0]);
  const candles = await client.getKlines({ symbol, type: '1hour' });
  console.log('Candles:', candles.data);
}

main().catch(() => {
  console.error('Public market-data request failed.');
  process.exitCode = 1;
});
