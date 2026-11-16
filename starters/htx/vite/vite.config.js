import { fileURLToPath } from 'node:url';

export default {
  // htx-api selects its browser transport through its package browser mappings.
  optimizeDeps: {
    exclude: ['@siebly/htx-api'],
    include: ['events', '@siebly/htx-api > isomorphic-ws'],
  },
  resolve: {
    alias: [
      {
        find: /^events$/,
        replacement: fileURLToPath(
          new URL('./node_modules/events/events.js', import.meta.url),
        ),
      },
    ],
  },
};
