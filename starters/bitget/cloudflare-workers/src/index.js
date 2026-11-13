import { RestClientV2 } from 'bitget-api';

export default {
  async fetch() {
    const client = new RestClientV2(
      {},
      { fetchOptions: { cache: 'no-store' } },
    );
    const response = await client.getSpotTicker({
      symbol: 'BTCUSDT',
    });
    const price = response.data[0]?.lastPr;
    return Response.json({ symbol: 'BTCUSDT', price });
  },
};
