import { MainClient } from 'binance';

const PAGE_SIZE = 1000;
const SAFETY_FRACTION = 0.8;
const STALE_AFTER_MS = 5000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const client = new MainClient();
  const info = await client.getExchangeInfo({ symbol: 'BTCUSDT' });
  const weightLimit = info.rateLimits.find(
    (limit) =>
      limit.rateLimitType === 'REQUEST_WEIGHT' &&
      limit.interval === 'MINUTE' &&
      limit.intervalNum === 1,
  )?.limit;
  if (!weightLimit) {
    throw new Error('REQUEST_WEIGHT limit missing from exchange info.');
  }

  const candles: Awaited<ReturnType<MainClient['getKlines']>> = [];
  let startTime = Date.now() - 3 * 24 * 60 * 60 * 1000;

  while (candles.length < 3000) {
    let states = client.getRateLimitStates();
    if (!states.lastUpdated || Date.now() - states.lastUpdated > STALE_AFTER_MS) {
      await client.getServerTime();
      states = client.getRateLimitStates();
    }
    if (states['x-mbx-used-weight-1m'] >= weightLimit * SAFETY_FRACTION) {
      await sleep(2000);
      continue;
    }

    const page = await client.getKlines({
      symbol: 'BTCUSDT',
      interval: '1m',
      startTime,
      limit: PAGE_SIZE,
    });
    if (!page.length) break;
    candles.push(...page);
    if (page.length < PAGE_SIZE) break;
    startTime = page[page.length - 1][0] + 60_000;
  }

  console.log('Fetched candles:', candles.length);
  console.log('Weight used this minute:', client.getRateLimitStates()['x-mbx-used-weight-1m']);
}
main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Request failed. See the troubleshooting guide.');
  process.exitCode = 1;
});
