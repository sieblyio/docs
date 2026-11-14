import { RestClient, WebsocketClient } from '@siebly/hyperliquid-api';

// Public clients only. No requests, subscriptions or signed actions are sent.
export const rest = new RestClient({ testnet: true });
export const ws = new WebsocketClient({ testnet: true });
