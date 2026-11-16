import { client, requiredEnv } from './authenticated-client.js';

async function main() {
  await client.submitHFOrderTest({
    symbol: 'BTC-USDT',
    clientOid: requiredEnv('KUCOIN_CLIENT_ORDER_ID'),
    side: 'buy',
    type: 'limit',
    price: requiredEnv('KUCOIN_LIMIT_PRICE'),
    size: requiredEnv('KUCOIN_ORDER_SIZE'),
    timeInForce: 'GTC',
    postOnly: true,
  });
  console.log('Test request accepted. No matching-engine order was created.');
}

main().catch(() => {
  console.error(
    'Order validation failed. Check parameters and authentication.',
  );
  process.exitCode = 1;
});
