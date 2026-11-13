export const websocketExport = 'WebsocketClientV3';
export const operations = {
  rest: 'RestClientV3.getTickers()',
  websocket: 'WebsocketClientV3.subscribe()',
};
export function client(sdk) {
  return new sdk.RestClientV3({}, { timeout: 15000 });
}
export async function read(client) {
  const response = await client.getTickers({ category: 'SPOT', symbol: 'BTCUSDT' });
  return response.data[0]?.lastPrice;
}
export function stream(sdk) {
  return new sdk.WebsocketClientV3();
}
export const event = 'update';
export function value(message) {
  return message.arg?.topic === 'ticker' ? message.data?.[0]?.lastPrice : undefined;
}
export async function subscribe(ws) {
  await ws.subscribe({
    topic: 'ticker',
    payload: {
      instType: 'spot',
      symbol: 'BTCUSDT',
    },
  }, 'v3Public');
}
export const typeExample = `import { RestClientV3, WebsocketClientV3 } from 'bitget-api';
new RestClientV3().getTickers({ category: 'SPOT', symbol: 'BTCUSDT' });
new WebsocketClientV3().closeAll();
`;
