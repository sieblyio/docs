import { client } from './authenticated-client.js';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Set ${name} before running this command.`);
  }
  return value;
}

function reportResults(results: { sCode: string; sMsg: string; ordId: string }[]) {
  for (const result of results) {
    console.log(result);
    if (result.sCode !== '0') {
      throw new Error(`Order request rejected: ${result.sCode} ${result.sMsg}`);
    }
  }
}

async function main() {
  const command = process.argv[2];
  const instId = 'BTC-USDT';
  const clOrdId = requiredEnv('OKX_CLIENT_ORDER_ID');

  switch (command) {
    case 'place': {
      // Persist this ID before sending. Do not automatically retry an uncertain request.
      console.log('Submitting client order ID:', clOrdId);
      reportResults(await client.submitOrder({
        instId,
        clOrdId,
        tdMode: 'cash',
        side: 'buy',
        ordType: 'post_only',
        px: requiredEnv('OKX_LIMIT_PRICE'),
        sz: requiredEnv('OKX_ORDER_SIZE'),
      }));
      break;
    }
    case 'status': {
      console.log(await client.getOrderDetails({ instId, clOrdId }));
      break;
    }
    case 'amend': {
      reportResults(await client.amendOrder({
        instId,
        clOrdId,
        newPx: requiredEnv('OKX_NEW_PRICE'),
        cxlOnFail: false,
      }));
      break;
    }
    case 'cancel': {
      reportResults(await client.cancelOrder({ instId, clOrdId }));
      break;
    }
    default: {
      throw new Error('Choose place, status, amend or cancel. These commands use live funds.');
    }
  }
}

main().catch((error) => {
  console.error('Order command failed; resolve the outcome before retrying:', error);
  process.exitCode = 1;
});
