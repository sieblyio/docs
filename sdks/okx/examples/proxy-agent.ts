import { HttpsProxyAgent } from 'https-proxy-agent';
import { RestClient, WebsocketClient } from 'okx-api';

const proxyUrl = process.env.PROXY_URL;
if (!proxyUrl) {
  throw new Error('Set PROXY_URL to your HTTP or HTTPS proxy URL.');
}
const agent = new HttpsProxyAgent(proxyUrl);

export const client = new RestClient({ keepAlive: false }, {
  httpsAgent: agent,
  proxy: false,
  timeout: 20_000,
});
export const ws = new WebsocketClient({ wsOptions: { agent } });
