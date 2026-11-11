import { RestClient } from 'okx-api';

const client = new RestClient();

async function main() {
  const instruments = await client.getInstruments({ instType: 'SPOT', instId: 'BTC-USDT' });
  const book = await client.getOrderBook({ instId: 'BTC-USDT', sz: '5' });
  const swaps = await client.getTickers({ instType: 'SWAP' });
  console.log('Spot instrument rules:', instruments);
  console.log('Five book levels:', book);
  console.log('Swap tickers:', swaps);
}

main().catch((error) => {
  console.error('Market data request failed:', error);
  process.exitCode = 1;
});
