// Legacy INTX example. Institutional trading migrated to Deribit on 1 October 2026.
// Retained SDK routes do not guarantee current endpoint or feed availability.
import { CBInternationalClient } from 'coinbase-api';

async function main() {
  const client = new CBInternationalClient();
  const instruments = await client.getInstruments();
  console.log(instruments);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
