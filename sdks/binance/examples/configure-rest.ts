import { MainClient } from 'binance';

export const client = new MainClient(
  { recvWindow: 5000 },
  { timeout: 10000 },
);
