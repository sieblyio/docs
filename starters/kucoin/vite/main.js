import { SpotClient, WebsocketClient } from 'kucoin-api';

const restOutput = document.querySelector('#rest');
const liveOutput = document.querySelector('#live');
const errorOutput = document.querySelector('#error');
const stopButton = document.querySelector('#stop');
let stopStream;
let userStopped = false;

function startStream() {
  const ws = new WebsocketClient();
  let stopped = false;
  liveOutput.textContent = 'Connecting';
  errorOutput.textContent = '';

  function showError(error) {
    console.error(error);
    if (!stopped) {
      errorOutput.textContent = error instanceof Error ? error.message : String(error);
    }
  }

  async function loadPrice() {
    const client = new SpotClient();
    const response = await client.getTicker({ symbol: 'BTC-USDT' });
    const price = response.data.price;

    if (!stopped) {
      restOutput.textContent = String(price);
    }
  }

  loadPrice().catch(showError);

  const timeout = setTimeout(() => {
    showError(new Error('No BTC-USDT update within 30 seconds.'));
  }, 30_000);

  ws.on('update', (message) => {
    if (message.topic !== '/market/ticker:BTC-USDT') {
      console.log('WebSocket update:', message);
      return;
    }

    const price = message.data?.price;

    if (!stopped && price) {
      clearTimeout(timeout);
      liveOutput.textContent = String(price);
    }
  });
  ws.on('exception', showError);

  Promise.resolve().then(async () => {
    if (stopped) {
      return;
    }

    try {
      await Promise.resolve(ws.subscribe('/market/ticker:BTC-USDT', 'spotPublicV1'));
    } finally {
      if (stopped) {
        ws.closeAll();
      }
    }
  }).catch(showError);

  return function stop() {
    if (stopped) {
      return;
    }

    stopped = true;
    clearTimeout(timeout);
    ws.closeAll();
    liveOutput.textContent = 'Stopped';
  };
}

function start() {
  if (!stopStream && !userStopped) {
    stopStream = startStream();
  }
}

function stop() {
  stopStream?.();
  stopStream = undefined;
}

function stopByUser() {
  userStopped = true;
  stop();
}

function restore(event) {
  if (event.persisted) {
    start();
  }
}

stopButton.addEventListener('click', stopByUser);
window.addEventListener('pagehide', stop);
window.addEventListener('pageshow', restore);
start();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    stopButton.removeEventListener('click', stopByUser);
    window.removeEventListener('pagehide', stop);
    window.removeEventListener('pageshow', restore);
    stop();
  });
}
