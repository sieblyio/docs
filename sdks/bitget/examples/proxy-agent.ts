import { HttpsProxyAgent } from 'https-proxy-agent';
import { RestClientV2, WebsocketClientV2 } from 'bitget-api';

const proxyUrl = process.env.PROXY_URL;
if (!proxyUrl) {
  throw new Error('Set PROXY_URL to your HTTP or HTTPS proxy URL.');
}
const agent = new HttpsProxyAgent(proxyUrl);

export const client = new RestClientV2({
  keepAlive: false,
}, {
  httpsAgent: agent,
  proxy: false,
  timeout: 20_000,
});
export const ws = new WebsocketClientV2({
  wsOptions: {
    agent,
  },
});
