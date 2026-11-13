import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { RestClientV2, WebsocketClientV2 } from 'bitget-api';

function Prices() {
  const [restPrice, setRestPrice] = useState('Loading');
  const [livePrice, setLivePrice] = useState('Connecting');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const ws = new WebsocketClientV2();

    function showError(error) {
      console.error(error);
      if (mounted) {
        setError(error instanceof Error ? error.message : String(error));
      }
    }

    async function loadPrice() {
      const client = new RestClientV2();
      const response = await client.getSpotTicker({
        symbol: 'BTCUSDT',
      });
      const price = response.data[0]?.lastPr;

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
      if (message.arg?.channel !== 'ticker') {
        console.log('WebSocket update:', message);
        return;
      }

      const price = message.data?.[0]?.lastPr;

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
        await ws.subscribeTopic('SPOT', 'ticker', 'BTCUSDT');
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
    <View style={{ gap: 12, paddingVertical: 24 }}>
      <Text>BTCUSDT REST price: {restPrice}</Text>
      <Text>BTCUSDT WebSocket price: {livePrice}</Text>
      <Text accessibilityRole="alert">{error}</Text>
    </View>
  );
}

export default function App() {
  const [running, setRunning] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24 }}>BTCUSDT price</Text>
        {running ? (
          <Prices />
        ) : (
          <Text style={{ paddingVertical: 24 }}>
            Stream stopped. WebSocket closed.
          </Text>
        )}
        <Button
          title={running ? 'Stop stream' : 'Start stream'}
          onPress={() => setRunning(!running)}
        />
      </View>
    </SafeAreaView>
  );
}
