export const operations = {
  rest: 'SpotClient.getTicker()',
  websocket: 'WebsocketClient.subscribe()',
};
export function client(sdk) {
  return new sdk.SpotClient({}, { timeout: 15000 });
}
export async function read(client) {
  const response = await client.getTicker({ symbol: 'btcusdt' });
  return response.tick.close;
}
export function stream(sdk) {
  return new sdk.WebsocketClient();
}
export const event = 'message';
export function value(message) {
  return message.ch === 'market.btcusdt.detail' ? message.tick?.close : undefined;
}
export async function subscribe(ws) {
  ws.subscribe('market.btcusdt.detail', 'spotPublic');
}
export const typeExample = `import { SpotClient, WebsocketClient } from '@siebly/htx-api';
new SpotClient().getTicker({ symbol: 'btcusdt' });
new WebsocketClient().closeAll();
`;
