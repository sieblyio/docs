import { classic, unified } from './authenticated-client.js';

async function main() {
  const account = process.argv[2];
  if (account === 'classic') {
    const balances = await classic.getSpotAccountAssets();
    const orders = await classic.getSpotOpenOrders({
      symbol: 'BTCUSDT',
    });
    console.log('Classic Spot balances:', balances.data);
    console.log('Classic open orders (one page):', orders.data);
  } else if (account === 'uta') {
    const balances = await unified.getBalances();
    const orders = await unified.getUnfilledOrders({
      category: 'SPOT',
      symbol: 'BTCUSDT',
    });
    console.log('UTA balances:', balances.data);
    console.log('UTA open orders (one page):', orders.data);
  } else {
    throw new Error('Choose classic or uta to match your account.');
  }
}

main().catch(() => {
  console.error('Account read failed. Inspect sanitized API diagnostics on your server.');
  process.exitCode = 1;
});
