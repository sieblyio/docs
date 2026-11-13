import { MainClient } from 'binance';

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/order') return new Response('Not found', { status: 404 });
    if (request.method !== 'POST') return new Response('Use POST', { status: 405 });
    if (!env.ORDER_TOKEN || request.headers.get('Authorization') !== 'Bearer ' + env.ORDER_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }
    const { price, quantity } = await request.json();
    const positiveDecimal = value => typeof value === 'string' && /^\d+(\.\d+)?$/.test(value) && Number(value) > 0 && Number.isFinite(Number(value));
    if (!positiveDecimal(price) || !positiveDecimal(quantity)) {
      return new Response('Use positive decimal strings for price and quantity', { status: 400 });
    }
    if (!env.BINANCE_API_KEY || !env.BINANCE_API_SECRET) return new Response('Missing exchange credentials', { status: 503 });
    const client = new MainClient({ testnet: true, api_key: env.BINANCE_API_KEY, api_secret: env.BINANCE_API_SECRET }, { fetchOptions: { cache: 'no-store' } });
    const result = await client.submitNewOrder({ symbol: 'BTCUSDT', side: 'BUY', type: 'LIMIT_MAKER', price: Number(price), quantity: Number(quantity) });
    return Response.json(result);
  },
};
