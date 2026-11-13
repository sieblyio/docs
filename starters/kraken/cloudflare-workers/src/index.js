import { SpotClient } from '@siebly/kraken-api';

export default {
  async fetch() {
    const client = new SpotClient({});
    const response = await client.getTicker({ pair: 'XBTUSD' });
    const ticker = Object.values(response.result)[0];
    const price = ticker?.c[0];
    return Response.json({ symbol: 'BTC/USD', price });
  },
};
