import { fileURLToPath } from 'node:url';

const browserAgent = '\0okx-browser-agent';
const sdkRoot = fileURLToPath(new URL('./node_modules/okx-api/', import.meta.url));

export default {
  // Keep the same SDK transform during development and production builds.
  optimizeDeps: {
    exclude: ['okx-api'],
    include: ['events', 'okx-api > isomorphic-ws'],
  },
  resolve: {
    alias: {
      events: fileURLToPath(new URL('./node_modules/events/events.js', import.meta.url)),
    },
  },
  plugins: [{
    name: 'okx-browser-transport',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source === 'https' && importer?.startsWith(sdkRoot)) {
        return browserAgent;
      }
    },
    load(id) {
      if (id === browserAgent) {
        // Browsers manage connections themselves. Reject an unsupported option
        // rather than presenting a Node Agent as a working browser transport.
        return `export class Agent {
  constructor() {
    throw new Error('keepAlive and HTTPS agents are Node.js-only. Omit keepAlive in a browser.');
  }
}`;
      }
    },
  }],
};
