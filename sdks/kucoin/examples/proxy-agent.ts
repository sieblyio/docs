import { HttpsProxyAgent } from 'https-proxy-agent';
import { SpotClient, WebsocketClient } from 'kucoin-api';

const proxyUrl = process.env.PROXY_URL;
if (!proxyUrl) throw new Error('Set PROXY_URL in your server environment.');
const agent = new HttpsProxyAgent(proxyUrl);
const requestOptions = {
  httpsAgent: agent,
  proxy: false as const,
  timeout: 10000,
};

const rest = new SpotClient({ keepAlive: false }, requestOptions);
const ws = new WebsocketClient({
  restOptions: { keepAlive: false },
  requestOptions,
  wsOptions: { agent },
});
