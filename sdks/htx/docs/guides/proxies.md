---
title: "HTX SDK HTTP and HTTPS proxies"
description: "Configure Node.js REST and WebSocket proxy agents without exposing proxy credentials."
---

# Proxies

Proxy configuration belongs on the server. Use only networks and exchange access you are authorized to use. A proxy does not change account eligibility or regional restrictions.

## REST HTTP proxy

Pass Axios proxy settings as the second constructor argument:

<<< @/../examples/proxy-rest.ts

This configures REST only, not WebSockets.

## Shared HTTPS proxy agent

Install the agent dependency:

```sh
npm install https-proxy-agent
```

Set `PROXY_URL` in your private server environment:

<<< @/../examples/proxy-agent.ts

`proxy: false` disables Axios's separate proxy handling. `keepAlive: false` prevents the SDK from replacing the custom HTTPS agent. WebSockets receive the agent through `wsOptions`.

Never print or commit credential-bearing proxy URLs. Node.js agents are not browser or Cloudflare Worker transports.

[Configuration](/guides/configuration) · [Production usage](/guides/production)
