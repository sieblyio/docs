export const operations = {
  rest: 'RestClient.getTicker()',
  websocket: 'WebsocketClient.subscribe()',
};
export function client(sdk) {
  return new sdk.RestClient({}, { timeout: 15000 });
}
export async function read(client) {
  const tickers = await client.getTicker({ instId: 'BTC-USDT' });
  return tickers[0]?.last;
}
export function stream(sdk) {
  return new sdk.WebsocketClient();
}
export const event = 'update';
export function value(message) {
  return message.arg?.channel === 'tickers' ? message.data?.[0]?.last : undefined;
}
export async function subscribe(ws) {
  await Promise.all(ws.subscribe({ channel: 'tickers', instId: 'BTC-USDT' }));
}
export const typeExample = `import { RestClient, WebsocketClient } from 'okx-api';
new RestClient().getTicker({ instId: 'BTC-USDT' });
new WebsocketClient().closeAll();
`;
