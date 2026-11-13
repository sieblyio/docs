import { unified, requiredEnv } from './authenticated-client.js';

async function main() {
  const command = process.argv[2];
  const clientOid = requiredEnv('BITGET_CLIENT_ORDER_ID');

  switch (command) {
    case 'place': {
      // Save this ID before sending. Check the order status before retrying a timed-out request.
      console.log('Submitting client order ID:', clientOid);
      const response = await unified.submitNewOrder({
        category: 'SPOT',
        symbol: 'BTCUSDT',
        clientOid,
        side: 'buy',
        orderType: 'limit',
        timeInForce: 'post_only',
        qty: requiredEnv('BITGET_ORDER_SIZE'),
        price: requiredEnv('BITGET_LIMIT_PRICE'),
        autoBorrow: 'no',
      });
      console.log('Accepted order:', response.data);
      break;
    }
    case 'status': {
      const response = await unified.getOrderInfo({
        clientOid,
      });
      console.log('Order state:', response.data);
      break;
    }
    case 'amend': {
      const response = await unified.modifyOrder({
        category: 'SPOT',
        symbol: 'BTCUSDT',
        clientOid,
        price: requiredEnv('BITGET_NEW_PRICE'),
        autoCancel: 'no',
      });
      console.log('Amendment response:', response.data);
      break;
    }
    case 'cancel': {
      const response = await unified.cancelOrder({
        category: 'SPOT',
        clientOid,
      });
      console.log('Cancellation response:', response.data);
      break;
    }
    default: {
      throw new Error('Choose place, status, amend or cancel. These commands use live funds.');
    }
  }
}

main().catch(() => {
  console.error('Order command failed. Resolve its outcome before retrying.');
  process.exitCode = 1;
});
