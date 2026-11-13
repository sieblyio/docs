import { client } from './authenticated-client.js';

async function main() {
  const [balances, orders, positions] = await Promise.all([
    client.getBalance(),
    client.getOrderList({ instType: 'SPOT' }),
    client.getPositions(),
  ]);
  console.log('Trading account balances:', balances);
  console.log('Open Spot orders (one page):', orders);
  console.log('Positions:', positions);
}

main().catch((error) => {
  console.error('Account read failed:', error);
  process.exitCode = 1;
});
