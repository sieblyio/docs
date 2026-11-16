const { SpotClient } = require('kucoin-api');

async function main() {
  const client = new SpotClient();
  const response = await client.getTicker({ symbol: 'BTC-USDT' });
  const price = response.data.price;

  if (!price) {
    throw new Error('No BTC-USDT price was returned.');
  }

  console.log('BTC-USDT REST price:', price);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
