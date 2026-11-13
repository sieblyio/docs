import { RestClient } from 'okx-api';

export default {
  async fetch() {
    const client = new RestClient({}, { fetchOptions: { cache: 'no-store' } });
    const tickers = await client.getTicker({ instId: 'BTC-USDT' });
    const price = tickers[0]?.last;
    return Response.json({ symbol: 'BTC-USDT', price });
  },
};
