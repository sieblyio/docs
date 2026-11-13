import { RestClient } from 'okx-api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = new RestClient();
    const tickers = await client.getTicker({ instId: 'BTC-USDT' });
    const price = tickers[0]?.last;

    if (!price) {
      throw new Error('No price was returned.');
    }

    return Response.json({
      symbol: 'BTC-USDT',
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
