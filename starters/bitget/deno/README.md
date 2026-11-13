# Bitget: Deno

A runnable public-price example using `bitget-api`. No API key is required.

Install Deno first.

## Run

From this folder:

```sh
deno install
deno task start
```

To stream WebSocket prices until Ctrl+C:

```sh
deno task stream
```

Keep authenticated calls on your server. Browser projects must retain the Vite configuration and omit Node-only `keepAlive`; browser REST access depends on Bitget CORS policy. See the guide for runtime setup limits.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitget/environments/deno.html).
