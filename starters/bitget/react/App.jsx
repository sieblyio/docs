import { useEffect, useState } from 'react';
import { RestClientV3, WebsocketClientV3 } from 'bitget-api';

function Prices() {
  const [restPrice, setRestPrice] = useState('Loading');
  const [livePrice, setLivePrice] = useState('Connecting');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const ws = new WebsocketClientV3();

    function showError(error) {
      console.error(error);
      if (mounted) {
        setError(error instanceof Error ? error.message : String(error));
      }
    }

    async function loadPrice() {
      const client = new RestClientV3();
      const response = await client.getTickers({
        category: 'SPOT',
        symbol: 'BTCUSDT',
      });
      const price = response.data[0]?.lastPrice;

      if (!price) {
        throw new Error('No price was returned.');
      }

      if (mounted) {
        setRestPrice(String(price));
      }
    }

    loadPrice().catch(showError);

    const timeout = setTimeout(() => {
      showError(new Error('No BTCUSDT update within 30 seconds.'));
    }, 30_000);

    ws.on('update', (message) => {
      if (message.arg?.topic !== 'ticker') {
        console.log('WebSocket update:', message);
        return;
      }

      const price = message.data?.[0]?.lastPrice;

      if (mounted && price) {
        clearTimeout(timeout);
        setLivePrice(String(price));
      }
    });
    ws.on('exception', showError);

    // React can clean up an effect before its subscription starts.
    Promise.resolve().then(async () => {
      if (!mounted) {
        return;
      }

      try {
        await ws.subscribe({
          topic: 'ticker',
          payload: {
            instType: 'spot',
            symbol: 'BTCUSDT',
          },
        }, 'v3Public');
      } finally {
        // Close again if pending setup completed after unmount.
        if (!mounted) {
          ws.closeAll();
        }
      }
    }).catch(showError);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      ws.closeAll();
    };
  }, []);

  return (
    <section>
      <p>BTCUSDT REST price: <output aria-label="REST price">{restPrice}</output></p>
      <p>BTCUSDT WebSocket price: <output aria-label="WebSocket price">{livePrice}</output></p>
      <p role="alert">{error}</p>
    </section>
  );
}

export default function App({ pageActive = true }) {
  const [running, setRunning] = useState(true);

  return (
    <main>
      <h1>BTCUSDT price</h1>
      {running && pageActive ? <Prices /> : <p>Stream stopped. WebSocket closed.</p>}
      <button type="button" onClick={() => setRunning(!running)}>
        {running ? 'Stop stream' : 'Start stream'}
      </button>
    </main>
  );
}
