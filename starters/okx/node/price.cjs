const { RestClient } = require('okx-api');

async function main() {
  const client = new RestClient();
  const tickers = await client.getTicker({ instId: 'BTC-USDT' });
  const price = tickers[0]?.last;

  if (!price) {
    throw new Error('No BTC-USDT price was returned.');
  }

  console.log('BTC-USDT REST price:', price);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
