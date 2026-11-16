import { SpotClient } from '@siebly/htx-api';

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== '/order') {
      return new Response('Not found', { status: 404 });
    }
    if (request.method !== 'POST') {
      return new Response('Use POST', { status: 405 });
    }
    if (
      !env.ORDER_TOKEN ||
      request.headers.get('Authorization') !== 'Bearer ' + env.ORDER_TOKEN
    ) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { price, quantity, clientOrderId } = await request.json();

    const positiveDecimal = (value) =>
      typeof value === 'string' &&
      /^\d+(\.\d+)?$/.test(value) &&
      Number(value) > 0 &&
      Number.isFinite(Number(value));
    if (!positiveDecimal(price) || !positiveDecimal(quantity)) {
      return new Response(
        'Use positive decimal strings for price and quantity',
        { status: 400 },
      );
    }
    if (typeof clientOrderId !== 'string' || !clientOrderId.trim()) {
      return new Response('Provide your persisted clientOrderId', {
        status: 400,
      });
    }
    if (!env.HTX_API_KEY || !env.HTX_API_SECRET || !env.HTX_SPOT_ACCOUNT_ID) {
      return new Response('Missing exchange credentials', { status: 503 });
    }

    const client = new SpotClient(
      {
        apiKey: env.HTX_API_KEY,
        apiSecret: env.HTX_API_SECRET,
      },
      { fetchOptions: { cache: 'no-store' } },
    );

    const result = await client.submitOrder({
      'account-id': env.HTX_SPOT_ACCOUNT_ID,
      symbol: 'btcusdt',
      type: 'buy-limit-maker',
      price,
      amount: quantity,
      source: 'spot-api',
      'client-order-id': clientOrderId,
    });

    return Response.json(result);
  },
};
