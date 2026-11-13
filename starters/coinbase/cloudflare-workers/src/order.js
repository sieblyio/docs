import { CBAdvancedTradeClient } from 'coinbase-api';

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/order') return new Response('Not found', { status: 404 });
    if (request.method !== 'POST') return new Response('Use POST', { status: 405 });
    if (!env.ORDER_TOKEN || request.headers.get('Authorization') !== 'Bearer ' + env.ORDER_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }
    const { price, quantity, clientOrderId } = await request.json();
    const positiveDecimal = value => typeof value === 'string' && /^\d+(\.\d+)?$/.test(value) && Number(value) > 0 && Number.isFinite(Number(value));
    if (!positiveDecimal(price) || !positiveDecimal(quantity)) {
      return new Response('Use positive decimal strings for price and quantity', { status: 400 });
    }
    if (typeof clientOrderId !== 'string' || !clientOrderId.trim()) return new Response('Provide your persisted clientOrderId', { status: 400 });
    if (!env.COINBASE_API_KEY || !env.COINBASE_API_SECRET) return new Response('Missing exchange credentials', { status: 503 });
    const client = new CBAdvancedTradeClient({ apiKey: env.COINBASE_API_KEY, apiSecret: env.COINBASE_API_SECRET }, { fetchOptions: { cache: 'no-store' } });
    const result = await client.submitOrder({ client_order_id: clientOrderId, product_id: 'BTC-USD', side: 'BUY', order_configuration: { limit_limit_gtc: { base_size: quantity, limit_price: price, post_only: true } } });
    return Response.json(result);
  },
};
