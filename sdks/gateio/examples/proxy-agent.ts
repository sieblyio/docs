import { HttpsProxyAgent } from 'https-proxy-agent';
import { RestClient, WebsocketClient } from 'gateio-api';

const proxyUrl = process.env.PROXY_URL;
if (!proxyUrl) {
  throw new Error('Set PROXY_URL in your server environment.');
}
const agent = new HttpsProxyAgent(proxyUrl);

const rest = new RestClient(
  { keepAlive: false },
  {
    httpsAgent: agent,
    proxy: false,
    timeout: 10000,
  },
);
const ws = new WebsocketClient({ wsOptions: { agent } });
