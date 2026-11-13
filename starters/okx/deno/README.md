# OKX: Deno

Read public market prices with `okx-api`. No API key is required for public prices.

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

This example uses public market data. Keep authenticated account and trading calls on your server. See the guide for this runtime’s requirements and limitations.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/okx/environments/deno.html).
