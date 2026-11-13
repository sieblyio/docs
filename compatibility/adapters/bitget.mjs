export const websocketExport = 'WebsocketClientV2';
export const operations = {
  rest: 'RestClientV2.getSpotTicker()',
  websocket: 'WebsocketClientV2.subscribeTopic()',
};
export function client(sdk) {
  return new sdk.RestClientV2({}, { timeout: 15000 });
}
export async function read(client) {
  const response = await client.getSpotTicker({ symbol: 'BTCUSDT' });
  return response.data[0]?.lastPr;
}
export function stream(sdk) {
  return new sdk.WebsocketClientV2();
}
export const event = 'update';
export function value(message) {
  return message.arg?.channel === 'ticker' ? message.data?.[0]?.lastPr : undefined;
}
export async function subscribe(ws) {
  await ws.subscribeTopic('SPOT', 'ticker', 'BTCUSDT');
}
export const typeExample = `import { RestClientV2, WebsocketClientV2 } from 'bitget-api';
new RestClientV2().getSpotTicker({ symbol: 'BTCUSDT' });
new WebsocketClientV2().closeAll();
`;
