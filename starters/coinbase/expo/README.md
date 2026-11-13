# Coinbase: React Native / Expo

Read public market prices with `coinbase-api`. No API key is required for public prices.

Use Node.js 24 and npm.

## Run

From this folder:

```sh
npm install
npm start
```

Use an Expo Go version that supports the Expo SDK in `package.json`. Press **i** for an iOS simulator or **a** for an Android emulator. iOS simulators require macOS and Xcode. Keep Expo Go in the foreground.

Use **Stop stream** to close the price subscription.

These examples use Advanced Trade public market data. Keep authenticated calls on your Node.js server.

Keep `coinbase-public-auth.cjs` and both Metro configuration files. They configure the app for public market data and disable Node-only JWT signing.

[Follow the complete step-by-step guide](https://sieblyio.github.io/docs/coinbase/environments/expo.html).
