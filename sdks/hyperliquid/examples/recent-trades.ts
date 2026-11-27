import { RestClient } from '@siebly/hyperliquid-api';

async function main() {
  const client = new RestClient();
  const trades = await client.getRecentTrades({ coin: 'BTC' });

  console.log(`Received ${trades.length} recent BTC trades`);
  for (const trade of trades.slice(0, 5)) {
    console.log({
      time: new Date(trade.time).toISOString(),
      side: trade.side === 'B' ? 'buy' : 'sell',
      px: trade.px,
      sz: trade.sz,
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
