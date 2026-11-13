import { RestClient } from '@siebly/hyperliquid-api';

export default {
  async fetch() {
    const client = new RestClient({}, { fetchOptions: { cache: 'no-store' } });
    const mids = await client.getAllMids();
    const price = mids.BTC;
    return Response.json({ symbol: 'BTC', price });
  },
};
