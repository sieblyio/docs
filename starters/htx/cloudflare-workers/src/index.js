import { SpotClient } from '@siebly/htx-api';

export default {
  async fetch() {
    const client = new SpotClient({}, { fetchOptions: { cache: 'no-store' } });
    const response = await client.getTicker({ symbol: 'btcusdt' });
    const price = response.tick.close;
    return Response.json({ symbol: 'btcusdt', price });
  },
};
