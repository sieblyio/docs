# OKX: Bun

Read public market prices with `okx-api`. No API key is required for public prices.

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

This example uses public market data. Keep authenticated account and trading calls on your server. See the guide for this runtime’s requirements and limitations.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/okx/environments/bun.html).
