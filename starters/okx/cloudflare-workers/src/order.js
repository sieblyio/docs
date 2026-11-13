import { RestClient } from 'okx-api';

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
    if (!env.OKX_API_KEY || !env.OKX_API_SECRET || !env.OKX_API_PASSPHRASE) return new Response('Missing exchange credentials', { status: 503 });
    const client = new RestClient({ demoTrading: true, apiKey: env.OKX_API_KEY, apiSecret: env.OKX_API_SECRET, apiPass: env.OKX_API_PASSPHRASE }, { fetchOptions: { cache: 'no-store' } });
    const result = await client.submitOrder({ instId: 'BTC-USDT', tdMode: 'cash', side: 'buy', ordType: 'post_only', px: price, sz: quantity });
    return Response.json(result);
  },
};
