export const operations = {
  rest: 'SpotClient.getTicker()',
  websocket: 'WebsocketClient.subscribe()',
};
export function client(sdk) {
  return new sdk.SpotClient({}, { timeout: 15000 });
}
export async function read(client) {
  const response = await client.getTicker({ symbol: 'BTC-USDT' });
  return response.data.price;
}
export function stream(sdk) {
  return new sdk.WebsocketClient();
}
export const event = 'update';
export function value(message) {
  return message.topic === '/market/ticker:BTC-USDT' ? message.data?.price : undefined;
}
export async function subscribe(ws) {
  ws.subscribe('/market/ticker:BTC-USDT', 'spotPublicV1');
}
export const typeExample = `import { SpotClient, WebsocketClient } from 'kucoin-api';
new SpotClient().getTicker({ symbol: 'BTC-USDT' });
new WebsocketClient().subscribe('/market/ticker:BTC-USDT', 'spotPublicV1');
new WebsocketClient().closeAll();
`;
