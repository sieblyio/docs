import { RestClient } from '@siebly/hyperliquid-api';

async function main() {
  const client = new RestClient();

  // Current funding for every perpetual. `funding` is an hourly rate.
  const [meta, contexts] = await client.getPerpAssetContexts();
  const index = meta.universe.findIndex((asset) => asset.name === 'ETH');
  const hourly = Number(contexts[index].funding);
  console.log({
    hourly,
    per8h: hourly * 8,
    annualisedPct: hourly * 24 * 365 * 100,
  });

  // Settled funding over the last 24 hours: one entry per hour.
  const history = await client.getFundingHistory({
    coin: 'ETH',
    startTime: Date.now() - 24 * 60 * 60 * 1000,
  });
  console.log(history.slice(-3));

  // Predicted rates by venue. Divide by `fundingIntervalHours` before
  // comparing venues that settle on different schedules.
  const predicted = await client.getPredictedFundingRates();
  const venues = predicted.find(([coin]) => coin === 'ETH')?.[1] ?? [];
  for (const [venue, rate] of venues) {
    if (rate?.fundingIntervalHours) {
      const perHour = Number(rate.fundingRate) / rate.fundingIntervalHours;
      console.log(venue, { perHour, intervalHours: rate.fundingIntervalHours });
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
