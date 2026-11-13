import { MainClient } from 'binance';

export default {
  async fetch() {
    const client = new MainClient({}, { fetchOptions: { cache: 'no-store' } });
    const ticker = await client.getSymbolPriceTicker({
      symbol: 'BTCUSDT',
    });
    
    if (Array.isArray(ticker)) {
      throw new Error('Expected a single-symbol ticker.');
    }
    
    const price = ticker.price;
    return Response.json({ symbol: 'BTCUSDT', price });
  },
};
