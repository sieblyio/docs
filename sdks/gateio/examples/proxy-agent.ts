import { HttpsProxyAgent } from 'https-proxy-agent';
import { RestClient, WebsocketClient } from 'gateio-api';

const proxyUrl = process.env.HTTPS_PROXY;
if (!proxyUrl) {
  throw new Error('Set HTTPS_PROXY in your server environment.');
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
