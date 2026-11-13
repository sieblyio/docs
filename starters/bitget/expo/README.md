# Bitget: React Native / Expo

A runnable public-price example using `bitget-api`. No API key is required.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm start
```

Open the project in a matching Expo Go installation. Press **i** for an iOS simulator or **a** for an Android emulator.

Use **Stop stream** to close the price subscription.

Keep authenticated calls on your server. Browser projects must retain the Vite configuration and omit Node-only `keepAlive`; browser REST access depends on Bitget CORS policy. See the guide for runtime setup limits.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/bitget/environments/expo.html).
