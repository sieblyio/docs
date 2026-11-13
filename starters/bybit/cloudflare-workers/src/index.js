import { RestClientV5 } from 'bybit-api';

export default {
  async fetch() {
    const client = new RestClientV5(
      {},
      { fetchOptions: { cache: 'no-store' } },
    );
    const response = await client.getTickers({
      category: 'spot',
      symbol: 'BTCUSDT',
    });

    if (response.retCode !== 0) {
      throw new Error(response.retMsg);
    }

    const price = response.result.list[0]?.lastPrice;
    return Response.json({ symbol: 'BTCUSDT', price });
  },
};
