import { SpotClient } from '@siebly/htx-api';

const apiKey = process.env.HTX_API_KEY;
const apiSecret = process.env.HTX_API_SECRET;
if (!apiKey || !apiSecret) {
  throw new Error('Set HTX_API_KEY and HTX_API_SECRET on your server.');
}

export const client = new SpotClient({ apiKey, apiSecret });
