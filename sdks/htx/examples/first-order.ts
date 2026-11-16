import { client } from './authenticated-client';

// This function submits a live order only when explicitly called.
export async function placeSpotLimitOrder(
  accountId: string,
  price: string,
  amount: string,
  clientOrderId: string,
) {
  return client.submitOrder({
    'account-id': accountId,
    symbol: 'btcusdt',
    type: 'buy-limit-maker',
    price,
    amount,
    source: 'spot-api',
    'client-order-id': clientOrderId,
  });
}

export async function readSpotOrder(orderId: string) {
  return client.getOrder({ orderId });
}

export async function cancelSpotOrder(orderId: string) {
  return client.cancelOrderById({ orderId, symbol: 'btcusdt' });
}
