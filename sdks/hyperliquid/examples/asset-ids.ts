import { RestClient } from '@siebly/hyperliquid-api';

async function main() {
  const client = new RestClient();

  // Orders, cancels and leverage updates take a numeric asset ID.
  // resolveAsset maps a readable name to that ID using live metadata.
  for (const name of ['BTC', 'HYPE/USDC', 'xyz:TSLA']) {
    const asset = await client.resolveAsset(name);
    console.log(name, asset);
  }

  // HIP-3 IDs depend on the DEX's position in perpDexs, so read them at
  // runtime rather than hard-coding an offset for one DEX.
  const dexs = await client.getPerpDexs();
  dexs.forEach((dex, index) => {
    if (dex) console.log(dex.name, 'first asset ID', 100000 + index * 10000);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
