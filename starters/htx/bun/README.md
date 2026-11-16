# HTX: Bun

Read public market prices with `@siebly/htx-api`. No API key is required for public prices.

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

The WebSocket example requires `DecompressionStream` support in your runtime.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/htx/environments/bun.html).
