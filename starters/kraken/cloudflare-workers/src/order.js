import { SpotClient } from '@siebly/kraken-api';

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/order') return new Response('Not found', { status: 404 });
    if (request.method !== 'POST') return new Response('Use POST', { status: 405 });
    if (!env.ORDER_TOKEN || request.headers.get('Authorization') !== 'Bearer ' + env.ORDER_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }
    if (env.ALLOW_LIVE_ORDERS !== 'true') return new Response('Live orders disabled', { status: 403 });
    const { price, quantity } = await request.json();
    const positiveDecimal = value => typeof value === 'string' && /^\d+(\.\d+)?$/.test(value) && Number(value) > 0 && Number.isFinite(Number(value));
    if (!positiveDecimal(price) || !positiveDecimal(quantity)) {
      return new Response('Use positive decimal strings for price and quantity', { status: 400 });
    }
    if (!env.KRAKEN_API_KEY || !env.KRAKEN_API_SECRET) return new Response('Missing exchange credentials', { status: 503 });
    const client = new SpotClient({ apiKey: env.KRAKEN_API_KEY, apiSecret: env.KRAKEN_API_SECRET });
    const result = await client.submitOrder({ pair: 'XBTUSD', type: 'buy', ordertype: 'limit', price, volume: quantity });
    return Response.json(result);
  },
};
