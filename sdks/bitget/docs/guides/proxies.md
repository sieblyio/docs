---
title: "Bitget SDK HTTP and HTTPS proxies"
description: "Configure server-side REST and WebSocket proxy agents without exposing credentials."
---

# Proxies

Proxy configuration belongs on the server. Use proxies only for networks and exchange access you are authorized to use; they do not change account eligibility or regional restrictions.

## REST HTTP proxy

Pass Axios proxy options as the second REST constructor argument:

<<< @/../examples/proxy-rest.ts

This routes REST only. It does not configure WebSockets.

## Shared HTTPS proxy agent

Install the agent dependency:

```sh
npm install https-proxy-agent
```

Set `PROXY_URL` in your private server environment, then use an agent for both transports:

<<< @/../examples/proxy-agent.ts

`proxy: false` disables Axios's separate proxy handling so the supplied agent routes requests. `keepAlive: false` prevents the SDK from replacing the custom agent. The examples use V3 clients; the same approach applies to Classic V2 clients.

Do not print proxy URLs containing credentials, commit them, or put them in a browser bundle. These Node.js agents are not supported in browsers or Cloudflare Workers.

[Configuration](/guides/configuration) · [Production usage](/guides/production)
