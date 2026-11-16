import { WebsocketClient } from '@siebly/htx-api';
import process from 'node:process';

async function main() {
  const ws = new WebsocketClient();
  let timeout;
  let stopped = false;

  try {
    const firstPrice = new Promise((resolve, reject) => {
      timeout = setTimeout(() => {
        reject(new Error('No btcusdt update within 30 seconds.'));
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

        if (price) {
          resolve(String(price));
        }
      });
      ws.on('exception', reject);

      const subscription = Promise.resolve(ws.subscribe('market.btcusdt.detail', 'spotPublic'));
      subscription.catch(reject).finally(() => {
        if (stopped) {
          ws.closeAll();
        }
      });
    });

    console.log('btcusdt WebSocket price:', await firstPrice);
  } finally {
    stopped = true;
    clearTimeout(timeout);
    ws.closeAll();
    console.log('WebSocket closed.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
