# Bybit: Bun

Read public market prices with `bybit-api`. No API key is required for public prices.

Install Bun first.

## Run

From this folder:

```sh
bun install
bun run start
```

The script prints a public REST price and exits.

To receive one WebSocket price and close the connection:

```sh
bun run stream
```

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bybit/environments/bun.html).
