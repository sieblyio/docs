# OKX: Next.js

A runnable public-price example using `okx-api`. No API key is required.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm run dev
```

Keep authenticated calls on your server. Browser projects must retain the Vite configuration and omit Node-only `keepAlive`; browser REST access depends on OKX CORS policy. See the guide for runtime setup limits.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/okx/environments/next.html).
