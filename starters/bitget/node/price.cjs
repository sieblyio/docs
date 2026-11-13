const { RestClientV2 } = require('bitget-api');

async function main() {
  const client = new RestClientV2();
  const response = await client.getSpotTicker({
    symbol: 'BTCUSDT',
  });
  const price = response.data[0]?.lastPr;

  if (!price) {
    throw new Error('No BTCUSDT price was returned.');
  }

  console.log('BTCUSDT REST price:', price);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
