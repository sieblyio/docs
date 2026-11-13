import { RestClientV2, RestClientV3 } from 'bitget-api';

const classic = new RestClientV2();
const unified = new RestClientV3();

async function main() {
  const symbols = await classic.getSpotSymbolInfo({
    symbol: 'BTCUSDT',
  });
  const book = await classic.getSpotOrderBookDepth({
    symbol: 'BTCUSDT',
    limit: '5',
  });
  const instruments = await unified.getInstruments({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });
  console.log('Classic Spot rules:', symbols.data);
  console.log('Classic order book:', book.data);
  console.log('UTA instrument rules:', instruments.data);
}

main().catch((error) => {
  console.error('Public market request failed:', error);
  process.exitCode = 1;
});
