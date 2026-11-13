import { RestClientV3 } from 'bitget-api';

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

    const { price, quantity } = await request.json();

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
    if (
      !env.BITGET_API_KEY ||
      !env.BITGET_API_SECRET ||
      !env.BITGET_API_PASSPHRASE
    ) {
      return new Response('Missing exchange credentials', { status: 503 });
    }

    const client = new RestClientV3(
      {
        apiKey: env.BITGET_API_KEY,
        apiSecret: env.BITGET_API_SECRET,
        apiPass: env.BITGET_API_PASSPHRASE,
      },
      { fetchOptions: { cache: 'no-store' } },
    );

    const result = await client.submitNewOrder({
      category: 'SPOT',
      symbol: 'BTCUSDT',
      side: 'buy',
      orderType: 'limit',
      timeInForce: 'post_only',
      price,
      qty: quantity,
      autoBorrow: 'no',
    });

    return Response.json(result);
  },
};
