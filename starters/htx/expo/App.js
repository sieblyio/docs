import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { SpotClient, WebsocketClient } from '@siebly/htx-api';

function Prices() {
  const [restPrice, setRestPrice] = useState('Loading');
  const [livePrice, setLivePrice] = useState('Connecting');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const ws = new WebsocketClient();

    function showError(error) {
      console.error(error);
      if (mounted) {
        setError(error instanceof Error ? error.message : String(error));
      }
    }

    async function loadPrice() {
      const client = new SpotClient();
      const response = await client.getTicker({ symbol: 'btcusdt' });
      const price = response.tick.close;

      if (!price) {
        throw new Error('No price was returned.');
      }

      if (mounted) {
        setRestPrice(String(price));
      }
    }

    loadPrice().catch(showError);

    const timeout = setTimeout(() => {
      showError(new Error('No btcusdt update within 30 seconds.'));
    }, 30_000);

    ws.on('message', (message) => {
      if (Array.isArray(message) || message.ch !== 'market.btcusdt.detail') {
        return;
      }
      const tick = message.tick;
      if (!tick || typeof tick !== 'object' || !('close' in tick)) {
        return;
      }
      const price = tick.close;

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
        await Promise.resolve(ws.subscribe('market.btcusdt.detail', 'spotPublic'));
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
      <Text>btcusdt REST price: {restPrice}</Text>
      <Text>btcusdt WebSocket price: {livePrice}</Text>
      <Text accessibilityRole="alert">{error}</Text>
    </View>
  );
}

export default function App() {
  const [running, setRunning] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24 }}>btcusdt price</Text>
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
