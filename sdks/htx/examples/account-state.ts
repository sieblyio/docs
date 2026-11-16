import { client } from './authenticated-client';

async function main() {
  const accounts = await client.getAccounts();
  const account = accounts.data.find(
    (item) => item.type === 'spot' && item.state === 'working',
  );
  if (!account) {
    throw new Error('No active Spot account found.');
  }
  const balances = await client.getAccountBalance({ accountId: account.id });
  console.log('Spot account:', account.id);
  console.log('Balance rows received:', balances.data.list.length);
}

main().catch(() => {
  console.error(
    'Account read failed. Check credentials, permissions and account access.',
  );
  process.exitCode = 1;
});
