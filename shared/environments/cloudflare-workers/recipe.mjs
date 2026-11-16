import { format } from 'prettier';
import { exchanges } from '../direct/exchanges.mjs';
import { codeBlock } from '../../../scripts/environment-guides.mjs';

const orders = {
  htx: {
    credentials: ['HTX_API_KEY', 'HTX_API_SECRET', 'HTX_SPOT_ACCOUNT_ID'],
    options: 'apiKey: env.HTX_API_KEY, apiSecret: env.HTX_API_SECRET',
    environment: 'HTX Spot production',
    request: "await client.submitOrder({ 'account-id': env.HTX_SPOT_ACCOUNT_ID, symbol: 'btcusdt', type: 'buy-limit-maker', price, amount: quantity, source: 'spot-api', 'client-order-id': clientOrderId })",
  },
  kucoin: {
    credentials: ['KUCOIN_API_KEY', 'KUCOIN_API_SECRET', 'KUCOIN_API_PASSPHRASE'],
    options: 'apiKey: env.KUCOIN_API_KEY, apiSecret: env.KUCOIN_API_SECRET, apiPassphrase: env.KUCOIN_API_PASSPHRASE',
    environment: 'KuCoin Spot production',
    request: "await client.submitHFOrder({ clientOid: clientOrderId, symbol: 'BTC-USDT', side: 'buy', type: 'limit', price, size: quantity, postOnly: true })",
  },
  gateio: {
    credentials: ['GATEIO_API_KEY', 'GATEIO_API_SECRET'],
    options: 'apiKey: env.GATEIO_API_KEY, apiSecret: env.GATEIO_API_SECRET',
    environment: 'Gate.io Spot production',
    request: "await client.submitSpotOrder({ currency_pair: 'BTC_USDT', account: 'spot', side: 'buy', type: 'limit', time_in_force: 'poc', price, amount: quantity })",
  },
  bitget: {
    credentials: ['BITGET_API_KEY', 'BITGET_API_SECRET', 'BITGET_API_PASSPHRASE'],
    options: 'apiKey: env.BITGET_API_KEY, apiSecret: env.BITGET_API_SECRET, apiPass: env.BITGET_API_PASSPHRASE',
    environment: 'Bitget UTA Spot production',
    request: "await client.submitNewOrder({ category: 'SPOT', symbol: 'BTCUSDT', side: 'buy', orderType: 'limit', timeInForce: 'post_only', price, qty: quantity, autoBorrow: 'no' })",
  },
  hyperliquid: {
    credentials: ['HYPERLIQUID_PRIVATE_KEY', 'HYPERLIQUID_ACCOUNT_ADDRESS'],
    options: 'privateKey: env.HYPERLIQUID_PRIVATE_KEY, accountAddress: env.HYPERLIQUID_ACCOUNT_ADDRESS',
    environment: 'Hyperliquid production',
    request: "await client.submitLimitOrder({ symbol: 'BTC', side: 'buy', price, size: quantity, postOnly: true })",
  },
  bybit: {
    credentials: ['BYBIT_API_KEY', 'BYBIT_API_SECRET'],
    options: 'key: env.BYBIT_API_KEY, secret: env.BYBIT_API_SECRET',
    environment: 'Bybit production',
    request: "await client.submitOrder({ category: 'spot', symbol: 'BTCUSDT', side: 'Buy', orderType: 'Limit', price, qty: quantity, timeInForce: 'PostOnly' })",
  },
  binance: {
    credentials: ['BINANCE_API_KEY', 'BINANCE_API_SECRET'],
    options: 'api_key: env.BINANCE_API_KEY, api_secret: env.BINANCE_API_SECRET',
    environment: 'Binance Spot production',
    request: "await client.submitNewOrder({ symbol: 'BTCUSDT', side: 'BUY', type: 'LIMIT_MAKER', price: Number(price), quantity: Number(quantity) })",
  },
  okx: {
    credentials: ['OKX_API_KEY', 'OKX_API_SECRET', 'OKX_API_PASSPHRASE'],
    options: 'apiKey: env.OKX_API_KEY, apiSecret: env.OKX_API_SECRET, apiPass: env.OKX_API_PASSPHRASE',
    environment: 'OKX production',
    request: "await client.submitOrder({ instId: 'BTC-USDT', tdMode: 'cash', side: 'buy', ordType: 'post_only', px: price, sz: quantity })",
  },
  kraken: {
    credentials: ['KRAKEN_API_KEY', 'KRAKEN_API_SECRET'],
    options: 'apiKey: env.KRAKEN_API_KEY, apiSecret: env.KRAKEN_API_SECRET',
    environment: 'Kraken Spot production',
    request: "await client.submitOrder({ pair: 'XBTUSD', type: 'buy', ordertype: 'limit', price, volume: quantity })",
  },
  coinbase: {
    credentials: ['COINBASE_API_KEY', 'COINBASE_API_SECRET'],
    options: 'apiKey: env.COINBASE_API_KEY, apiSecret: env.COINBASE_API_SECRET',
    environment: 'Coinbase Advanced Trade production',
    request: "await client.submitOrder({ client_order_id: clientOrderId, product_id: 'BTC-USD', side: 'BUY', order_configuration: { limit_limit_gtc: { base_size: quantity, limit_price: price, post_only: true } } })",
  },
};
const transport = id => id === 'kraken' ? '' : ", { fetchOptions: { cache: 'no-store' } }";
const indent = text => text.split('\n').map(line => '    ' + line).join('\n');

export async function workerFiles(id, sdk) {
  const recipe = orders[id];
  const { restClient, request } = exchanges[id];
  const publicRequest = request.replace(`new ${restClient}()`, `new ${restClient}({}${transport(id)})`);
  const publicCode = `import { ${restClient} } from '${sdk.packageName}';\n\nexport default {\n  async fetch() {\n${indent(publicRequest)}\n    return Response.json({ symbol: '${exchanges[id].symbol}', price });\n  },\n};\n`;
  const orderCode = `import { ${restClient} } from '${sdk.packageName}';\n\nexport default {\n  async fetch(request, env) {\n    if (new URL(request.url).pathname !== '/order') {\n      return new Response('Not found', { status: 404 });\n    }\n    if (request.method !== 'POST') {\n      return new Response('Use POST', { status: 405 });\n    }\n    if (!env.ORDER_TOKEN || request.headers.get('Authorization') !== 'Bearer ' + env.ORDER_TOKEN) {\n      return new Response('Unauthorized', { status: 401 });\n    }\n\n    const { price, quantity${['coinbase', 'kucoin', 'htx'].includes(id) ? ', clientOrderId' : ''} } = await request.json();\n\n    const positiveDecimal = value => typeof value === 'string' && /^\\d+(\\.\\d+)?$/.test(value) && Number(value) > 0 && Number.isFinite(Number(value));\n    if (!positiveDecimal(price) || !positiveDecimal(quantity)) {\n      return new Response('Use positive decimal strings for price and quantity', { status: 400 });\n    }\n${['coinbase', 'kucoin', 'htx'].includes(id) ? "    if (typeof clientOrderId !== 'string' || !clientOrderId.trim()) {\n      return new Response('Provide your persisted clientOrderId', { status: 400 });\n    }\n" : ''}    if (${recipe.credentials.map(key => `!env.${key}`).join(' || ')}) {\n      return new Response('Missing exchange credentials', { status: 503 });\n    }\n\n    const client = new ${restClient}({\n${recipe.options.split(', ').join(',\n')},\n}${transport(id)});\n\n    const result = ${recipe.request};\n\n    return Response.json(result);\n  },\n};\n`;
  return new Map([
    ['src/index.js', await format(publicCode, { parser: 'babel', tabWidth: 2, singleQuote: true, trailingComma: 'all' })],
    ['src/order.js', await format(orderCode, { parser: 'babel', tabWidth: 2, singleQuote: true, trailingComma: 'all' })],
    ['wrangler.jsonc', JSON.stringify({ '$schema': 'node_modules/wrangler/config-schema.json', name: `${id}-market-data`, main: 'src/index.js', compatibility_date: '2026-11-01' }, null, 2) + '\n'],
  ]);
}

export function workerGuideFields(id, files) {
  const recipe = orders[id];
  return {
    WORKER_CONFIG: codeBlock('wrangler.jsonc', files.get('wrangler.jsonc')),
    WORKER_PUBLIC: codeBlock('src/index.js', files.get('src/index.js')),
    WORKER_ORDER: codeBlock('src/order.js', files.get('src/order.js')),
    WORKER_PACKAGE: codeBlock('package.json', files.get('package.json')),
    WORKER_SECRETS: ['ORDER_TOKEN', ...recipe.credentials].map(name => `npx wrangler secret put ${name}`).join('\n'),
    WORKER_ORDER_ENVIRONMENT: recipe.environment,
    WORKER_LIVE_NOTE: 'The example uses production credentials and submits a live order.',
    WORKER_ORDER_ID_NOTE: ['coinbase', 'kucoin', 'htx'].includes(id) ? 'Also supply `clientOrderId`: generate a unique ID in your calling application and persist it before sending. Use that same ID to resolve an uncertain order outcome before submitting another order.' : '',
    WORKER_CACHE: id === 'htx' ? 'The second constructor argument explicitly disables fetch caching. This recipe uses the released SDK dependency and does not override it. Keep Node-only agents and keepAlive out of Workers.' : id === 'kraken'
      ? 'This Kraken recipe uses the SDK’s native request configuration without an Axios cache override.'
      : "The second constructor argument sets `fetchOptions.cache` to `no-store`, a [cache mode Workers supports](https://developers.cloudflare.com/workers/runtime-apis/request/). Axios 1.20.0 otherwise requests `default`, which Workers rejects. Keep this option while using that affected version. [Axios 1.21.0](https://github.com/axios/axios/releases/tag/v1.21.0) fixes this default cache behavior. SDK dependency upgrades follow [Siebly’s security policy](https://siebly.io/security), which generally includes at least 30 days of review. You do not need to override the SDK dependency.",
  };
}
