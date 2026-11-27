import { RestClient } from '@siebly/hyperliquid-api';

// Address-based limits count signed actions, not info requests.
// Query the trading account (master or subaccount), not the API wallet.

async function main() {
  const user = process.env.HYPERLIQUID_ACCOUNT_ADDRESS;
  if (!user) {
    throw new Error('Set HYPERLIQUID_ACCOUNT_ADDRESS.');
  }

  const client = new RestClient();
  const limit = await client.getUserRateLimit({ user });
  // nRequestsUsed is net of reserved actions; nRequestsSurplus is reserved and unused.
  const remaining =
    limit.nRequestsCap - limit.nRequestsUsed + limit.nRequestsSurplus;

  console.log('Cumulative volume (USDC):', limit.cumVlm);
  console.log('Action cap:', limit.nRequestsCap);
  console.log('Actions used:', limit.nRequestsUsed);
  console.log('Reserved, unused:', limit.nRequestsSurplus);
  console.log('Actions remaining:', remaining);
  if (remaining <= 0) {
    console.log('Rate limited: one action every 10 seconds until volume raises the cap.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
