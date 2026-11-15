// Only expose supported modes; the canonical guide retains its stable URL.
export const testingNavigation = {
  binance: [
    { text: 'Spot Testnet', link: '/guides/testing-environments#spot-testnet' },
    { text: 'Demo trading', link: '/guides/testing-environments#demo-trading' },
  ],
  bybit: [
    { text: 'Testnet', link: '/guides/testing-environments#testnet' },
    { text: 'Demo trading', link: '/guides/testing-environments#demo-trading' },
  ],
  hyperliquid: [
    { text: 'Testnet', link: '/guides/testing-environments#testnet' },
  ],
  bitget: [
    { text: 'Demo trading', link: '/guides/testing-environments#demo-trading' },
  ],
  okx: [
    { text: 'Demo trading', link: '/guides/testing-environments#demo-trading' },
  ],
  coinbase: [
    { text: 'Advanced Trade sandbox', link: '/guides/testing-environments#advanced-trade-static-sandbox' },
    { text: 'Exchange sandbox', link: '/guides/testing-environments#exchange-sandbox' },
  ],
  kraken: [
    { text: 'Testing without orders', link: '/guides/testing-environments#test-without-placing-orders' },
  ],
};
