# Coinbase: Bun

Read public market prices with `coinbase-api`. No API key is required for public prices.

Install Bun first.

## Run

From this folder:

```sh
bun install
bun run start
```

The script prints a public REST price and exits.

To stream WebSocket prices until Ctrl+C:

```sh
bun run stream
```

These examples use Advanced Trade public market data. Keep authenticated calls on your Node.js server.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/coinbase/environments/bun.html).
