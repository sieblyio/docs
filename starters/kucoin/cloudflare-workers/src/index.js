import { SpotClient } from 'kucoin-api';

export default {
  async fetch() {
    const client = new SpotClient({}, { fetchOptions: { cache: 'no-store' } });
    const response = await client.getTicker({ symbol: 'BTC-USDT' });
    const price = response.data.price;
    return Response.json({ symbol: 'BTC-USDT', price });
  },
};
