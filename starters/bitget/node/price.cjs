const { RestClientV3 } = require('bitget-api');

async function main() {
  const client = new RestClientV3();
  const response = await client.getTickers({
    category: 'SPOT',
    symbol: 'BTCUSDT',
  });
  const price = response.data[0]?.lastPrice;

  if (!price) {
    throw new Error('No BTCUSDT price was returned.');
  }

  console.log('BTCUSDT REST price:', price);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
