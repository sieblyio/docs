# Bitget: Vite (plain JavaScript)

Read public market prices with `bitget-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page shows a REST price and live WebSocket prices.

Use **Stop stream** to close the price subscription.

Keep authenticated calls on your server. Keep the supplied Vite configuration and omit Node-only `keepAlive`. Browser REST access depends on Bitget CORS policy; use a server route if requests are blocked.

## Try it in the browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/sieblyio/docs/tree/main/starters/bitget/vite?title=Bitget%20Vite%20(plain%20JavaScript)%20starter) [![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/sieblyio/docs/tree/main/starters/bitget/vite)

Opens a copy of this folder in StackBlitz or CodeSandbox, installs dependencies and runs the start script. StackBlitz does not need an account. In CodeSandbox, the running page appears in the preview pane on port 5173. Keep API keys out of public sandboxes.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitget/environments/vite.html).
