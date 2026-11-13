import { RestClientV3 } from 'bitget-api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = new RestClientV3();
    const response = await client.getTickers({
      category: 'SPOT',
      symbol: 'BTCUSDT',
    });
    const price = response.data[0]?.lastPrice;

    if (!price) {
      throw new Error('No price was returned.');
    }

    return Response.json({
      symbol: 'BTCUSDT',
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
