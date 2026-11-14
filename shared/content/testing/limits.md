## What these environments can prove

Use test environments to check request formats, credentials, order handling and reconnect recovery within the features they support. Testnet liquidity, prices, fills, fees and availability can differ substantially from production. Accounts, balances and order history may also be reset.

**Testnet is not a reliable place to evaluate strategy performance.** Demo trading may use production market data, but simulated fills do not establish live profitability, slippage, execution quality or capacity. Treat both as integration tests, not evidence that a strategy will succeed with real funds. See the [CEX testnet overview](https://github.com/sieblyio/awesome-crypto-examples/wiki/CEX-Testnets#cex-testnets) for the distinction between testnet and demo trading.

## Before switching environments

- Keep credentials and configuration separate for each account, product and environment. Never fall back to live credentials when a test key is missing.
- Configure every REST, subscription and WebSocket API client separately. Changing one client does not reconfigure another.
- Check the selected environment's supported endpoints and instruments before sending a request. Similar method signatures do not imply identical availability.
- Keep authenticated requests on your server. Confirm the destination and account before enabling any write operation.

Production remains the default. Selecting a test environment is an explicit choice for each client; it is not a global SDK setting.
