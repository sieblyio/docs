import { CBAdvancedTradeClient } from 'coinbase-api';

export default {
  async fetch() {
    const client = new CBAdvancedTradeClient(
      {},
      { fetchOptions: { cache: 'no-store' } },
    );
    const ticker = await client.getPublicProduct({ product_id: 'BTC-USD' });
    const price = ticker.price;
    return Response.json({ symbol: 'BTC-USD', price });
  },
};
