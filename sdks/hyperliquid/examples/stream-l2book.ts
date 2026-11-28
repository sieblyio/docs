import { WebsocketClient } from '@siebly/hyperliquid-api';

async function main() {
  const client = new WebsocketClient();
  const timer = setTimeout(stop, 30_000);
  function stop() {
    clearTimeout(timer);
    client.closeAll();
    process.removeListener('SIGINT', stop);
    process.removeListener('SIGTERM', stop);
  }

  client.on('exception', (event) => console.error(event));
  client.on('message', (event) => {
    if (event.channel !== 'l2Book') {
      return;
    }

    // Each l2Book message is a full snapshot of the top 20 levels per side.
    const [bids, asks] = event.data.levels;
    const bestBid = bids[0];
    const bestAsk = asks[0];
    if (!bestBid || !bestAsk) {
      return;
    }

    const spread = Number(bestAsk.px) - Number(bestBid.px);
    console.log({
      coin: event.data.coin,
      time: event.data.time,
      bestBid: bestBid.px,
      bestAsk: bestAsk.px,
      spread,
      levels: [bids.length, asks.length],
    });
  });
  process.once('SIGINT', stop);
  process.once('SIGTERM', stop);

  try {
    await client.subscribe({ type: 'l2Book', coin: 'BTC' });
  } catch (error) {
    stop();
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
