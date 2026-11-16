# HTX: Deno

Read public market prices with `@siebly/htx-api`. No API key is required for public prices.

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

The WebSocket example requires `DecompressionStream` support in your runtime.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/htx/environments/deno.html).
