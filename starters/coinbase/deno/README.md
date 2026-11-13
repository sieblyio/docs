# Coinbase: Deno

Read public market prices with `coinbase-api`. No API key is required for public prices.

Install Deno first.

## Run

From this folder:

```sh
deno install
deno task start
```

The script prints a public REST price and exits.

To stream WebSocket prices until Ctrl+C:

```sh
deno task stream
```

These examples use Advanced Trade public market data. Keep authenticated calls on your Node.js server.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/coinbase/environments/deno.html).
