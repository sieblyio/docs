import { client } from './authenticated-client.js';

async function main() {
  const balances = await client.getBalances();
  console.log('Account entries:', balances.data.length);
  const orders = await client.getHFActiveOrdersPaginated({
    symbol: 'BTC-USDT',
    pageNum: 1,
    pageSize: 20,
  });
  console.log('Open orders on this page:', orders.data.items.length);
  console.log('Total pages:', orders.data.totalPage);
}

main().catch(() => {
  console.error(
    'Account read failed. Check credentials, permissions and region.',
  );
  process.exitCode = 1;
});
