import { client, requiredEnv } from './authenticated-client.js';

async function main() {
  const command = process.argv[2];
  const clientOid = requiredEnv('KUCOIN_CLIENT_ORDER_ID');
  const orderId = process.env.KUCOIN_ORDER_ID;
  const symbol = 'BTC-USDT';

  switch (command) {
    case 'place': {
      console.log('Submitting client order ID:', clientOid);
      const result = await client.submitHFOrder({
        symbol,
        clientOid,
        side: 'buy',
        type: 'limit',
        price: requiredEnv('KUCOIN_LIMIT_PRICE'),
        size: requiredEnv('KUCOIN_ORDER_SIZE'),
        timeInForce: 'GTC',
        postOnly: true,
      });
      console.log('Save KUCOIN_ORDER_ID:', result.data.orderId);
      break;
    }
    case 'status': {
      const result = orderId
        ? await client.getHFOrderDetailsByOrderId({ symbol, orderId })
        : await client.getHFOrderDetailsByClientOid({ symbol, clientOid });
      console.log('Order state:', result.data);
      break;
    }
    case 'amend': {
      const result = await client.updateHFOrder({
        symbol,
        ...(orderId ? { orderId } : { clientOid }),
        newPrice: requiredEnv('KUCOIN_NEW_PRICE'),
      });
      console.log('Save new KUCOIN_ORDER_ID:', result.data.newOrderId);
      break;
    }
    case 'cancel': {
      const result = orderId
        ? await client.cancelHFOrder({ symbol, orderId })
        : await client.cancelHFOrderByClientOId({ symbol, clientOid });
      console.log('Cancellation accepted:', result.data);
      console.log(
        'Check private updates or order status to confirm the outcome.',
      );
      break;
    }
    default:
      throw new Error(
        'Choose place, status, amend or cancel. These are live operations.',
      );
  }
}

main().catch(() => {
  console.error('Order command failed. Resolve its outcome before retrying.');
  process.exitCode = 1;
});
