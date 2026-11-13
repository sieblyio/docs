import { RestClientV3 } from 'bitget-api';

const client = new RestClientV3();

async function main() {
  const instruments = await client.getInstruments({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });
  const book = await client.getOrderBook({
    category: 'SPOT',
    symbol: 'BTCUSDT',
    limit: '5',
  });
  console.log('UTA instrument rules:', instruments.data);
  console.log('UTA order book:', book.data);
}

main().catch((error) => {
  console.error('Public market request failed:', error);
  process.exitCode = 1;
});
