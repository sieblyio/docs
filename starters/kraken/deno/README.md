# Kraken: Deno

Read public market prices with `@siebly/kraken-api`. No API key is required for public prices.

Install Deno first.

## Run

From this folder:

```sh
deno install
deno task start
```

The script prints a public REST price and exits.

To receive one WebSocket price and close the connection:

```sh
deno task stream
```

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/kraken/environments/deno.html).
