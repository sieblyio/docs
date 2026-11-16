import { SpotClient } from '@siebly/htx-api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = new SpotClient();
    const response = await client.getTicker({ symbol: 'btcusdt' });
    const price = response.tick.close;

    if (!price) {
      throw new Error('No price was returned.');
    }

    return Response.json({
      symbol: 'btcusdt',
      price: String(price),
    });
  } catch (error) {
    console.error('Price request failed:', error);

    return Response.json(
      { error: 'Exchange price request failed. Check the server logs.' },
      { status: 502 },
    );
  }
}
