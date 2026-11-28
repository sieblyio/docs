import { MainClient } from 'binance';

async function main() {
  const client = new MainClient();
  const info = await client.getExchangeInfo({ symbol: 'BTCUSDT' });
  const weightLimit = info.rateLimits.find(
    (limit) => limit.rateLimitType === 'REQUEST_WEIGHT',
  );

  await client.getServerTime();
  const states = client.getRateLimitStates();
  console.log('Weight limit per minute:', weightLimit?.limit);
  console.log('Weight used this minute:', states['x-mbx-used-weight-1m']);
}
main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Request failed. See the troubleshooting guide.');
  process.exitCode = 1;
});
