import { RestClientV3 } from 'bitget-api';

export default {
  async fetch() {
    const client = new RestClientV3(
      {},
      { fetchOptions: { cache: 'no-store' } },
    );
    const response = await client.getTickers({
      category: 'SPOT',
      symbol: 'BTCUSDT',
    });
    const price = response.data[0]?.lastPrice;
    return Response.json({ symbol: 'BTCUSDT', price });
  },
};
