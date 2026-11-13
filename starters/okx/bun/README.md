# OKX: Bun

A runnable public-price example using `okx-api`. No API key is required.

Install Bun first.

## Run

From this folder:

```sh
bun install
bun run start
```

To stream WebSocket prices until Ctrl+C:

```sh
bun run stream
```

Keep authenticated calls on your server. Browser projects must retain the Vite configuration and omit Node-only `keepAlive`; browser REST access depends on OKX CORS policy. See the guide for runtime setup limits.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/okx/environments/bun.html).
