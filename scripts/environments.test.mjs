import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { create } from 'tar';
import ts from 'typescript';
import { root, catalogue } from './context.mjs';
import { checkPublic } from './check-public.mjs';
import { generateEnvironments, environments, environmentFiles, checkStarter } from './environments.mjs';

function checkProgram(name, content, files) {
  const kind = /\.[cm]?ts$/.test(name) ? ts.ScriptKind.TS : ts.ScriptKind.JSX;
  const parsed = ts.createSourceFile(name, content, ts.ScriptTarget.Latest, true, kind);
  assert.equal(parsed.parseDiagnostics.length, 0, `Invalid program: ${name}`);
  for (const [, target] of content.matchAll(/(?:from\s*|require\()['"]([^'"]+)['"]/g)) {
    if (!target.startsWith('.')) continue;
    const relative = path.posix.normalize(path.posix.join(path.posix.dirname(name), target));
    assert(files.has(relative) || files.has(`${relative}.js`), `Missing local import: ${name} -> ${target}`);
  }
}

test('generated guides match the starter programs and publish valid archives', async () => {
  await mkdir(path.join(root, 'tmp'), { recursive: true });
  const work = await mkdtemp(path.join(root, 'tmp/environment-test-'));
  try {
    const publicRoot = path.join(work, 'public');
    const manifest = { sdks: {}, releases: {} };
    const sdks = await catalogue();
    for (const sdk of sdks) {
      const projectRoot = path.join(work, sdk.id);
      const docs = path.join(projectRoot, 'docs');
      await generateEnvironments({ id: sdk.id, sdk, docs, projectRoot });
      await cp(path.join(docs, 'public/starters'), path.join(publicRoot, sdk.id, 'starters'), { recursive: true });
      manifest.sdks[sdk.id] = manifest.releases[sdk.id] = { version: '1.0.0' };
      for (const environment of environments) {
        const files = await environmentFiles(sdk.id, sdk, environment);
        const guide = await readFile(path.join(docs, 'environments', `${environment}.md`), 'utf8');
        assert(!/@@[A-Z_]+@@/.test(guide));
        assert(guide.includes(`https://github.com/sieblyio/docs/tree/main/starters/${sdk.id}/${environment}`));
        const automaticPackage = ['node', 'typescript', 'bun'].includes(environment);
        for (const [name, content] of files) {
          if (!(name === 'package.json' && automaticPackage)) {
            assert(guide.includes(content.trimEnd()), `Walkthrough differs from source: ${sdk.id}/${environment}/${name}`);
          }
          if (/\.(?:[cm]?js|jsx|[cm]?ts)$/.test(name)) checkProgram(name, content, files);
        }
      }
    }
    await writeFile(path.join(publicRoot, 'build-manifest.json'), JSON.stringify(manifest));
    await writeFile(path.join(publicRoot, '.nojekyll'), '');
    await checkPublic(publicRoot);
    await cp(path.join(publicRoot, 'bybit/starters/node.tar.gz'), path.join(publicRoot, 'bybit/starters/unexpected.tar.gz'));
    await assert.rejects(checkPublic(publicRoot), /Unexpected public archive/);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});

test('starter archives reject extra, changed and missing files', async () => {
  await mkdir(path.join(root, 'tmp'), { recursive: true });
  const work = await mkdtemp(path.join(root, 'tmp/starter-guard-'));
  const archive = path.join(work, 'starter.tar.gz');
  const expected = new Map([['package.json', '{"private":true}\n'], ['price.mjs', 'console.log("price");\n']]);
  try {
    for (const [name, content] of expected) await writeFile(path.join(work, name), content);
    await create({ file: archive, cwd: work, gzip: true }, [...expected.keys()]);
    await checkStarter(archive, expected);
    await writeFile(path.join(work, '.env'), 'SECRET=private\n');
    await create({ file: archive, cwd: work, gzip: true }, [...expected.keys(), '.env']);
    await assert.rejects(checkStarter(archive, expected), /Unexpected starter entry: .env/);
    await create({ file: archive, cwd: work, gzip: true }, ['package.json']);
    await assert.rejects(checkStarter(archive, expected), /missing required files/);
    await writeFile(path.join(work, 'price.mjs'), 'console.log("changed");\n');
    await create({ file: archive, cwd: work, gzip: true }, [...expected.keys()]);
    await assert.rejects(checkStarter(archive, expected), /content differs/);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});

test('KuCoin recipes retain response envelopes, subscription keys and persisted order IDs', async () => {
  const sdk = { id: 'kucoin', ...(await import('../sdks/kucoin/sdk.config.mjs')).default };
  const cli = await environmentFiles(sdk.id, sdk, 'node');
  assert.match(cli.get('price.mjs'), /response.data.price/);
  assert.match(cli.get('stream.mjs'), /spotPublicV1/);
  assert.match(cli.get('stream.mjs'), /process.once\('SIGINT', stop\)/);
  assert.doesNotMatch(cli.get('stream.mjs'), /Promise.all\(ws.subscribe/);
  const worker = await environmentFiles(sdk.id, sdk, 'cloudflare-workers');
  const order = worker.get('src/order.js');
  for (const pattern of [/request.method !== 'POST'/, /env.ORDER_TOKEN/, /apiPassphrase: env.KUCOIN_API_PASSPHRASE/, /clientOid: clientOrderId/, /submitHFOrder/, /typeof clientOrderId !== 'string'/, /postOnly: true/, /size: quantity/, /cache: 'no-store'/]) {
    assert.match(order, pattern);
  }
  assert.doesNotMatch(order, /client\.submitOrder\(/);
  const browser = await environmentFiles(sdk.id, sdk, 'vite');
  assert.match(browser.get('vite.config.js'), /kucoin-browser-transport/);
  assert.match(browser.get('vite.config.js'), /Node.js-only/);
});

test('KuCoin compatibility adapter reads the public ticker and routes the Spot stream', async () => {
  const adapter = await import('../compatibility/adapters/kucoin.mjs');
  assert.equal(await adapter.read({ async getTicker(params) {
    assert.deepEqual(params, { symbol: 'BTC-USDT' });
    return { data: { price: '123.45' } };
  } }), '123.45');
  assert.equal(adapter.value({ topic: '/market/ticker:BTC-USDT', data: { price: '123.45' } }), '123.45');
  assert.equal(adapter.value({ topic: '/market/ticker:ETH-USDT', data: { price: '123.45' } }), undefined);
  await adapter.subscribe({ subscribe(topic, key) {
    assert.equal(topic, '/market/ticker:BTC-USDT');
    assert.equal(key, 'spotPublicV1');
  } });
});

test('Gate.io recipes retain public Spot subscriptions and separate authenticated Workers orders', async () => {
  const sdk = (await catalogue()).find(sdk => sdk.id === 'gateio');
  assert(sdk);
  const adapter = await import('../compatibility/adapters/gateio.mjs');
  const calls = [];
  assert.equal(await adapter.read({ async getSpotTicker(params) {
    calls.push(params);
    return [{ last: '123.45' }];
  } }), '123.45');
  assert.deepEqual(calls, [{ currency_pair: 'BTC_USDT' }]);
  await adapter.subscribe({ subscribe(...args) { calls.push(args); } });
  assert.deepEqual(calls[1], [{ topic: 'spot.tickers', payload: ['BTC_USDT'] }, 'spotV4']);
  assert.equal(adapter.value({ channel: 'spot.tickers', result: { last: '123.45' } }), '123.45');
  assert.equal(adapter.value({ channel: 'spot.orders', result: { last: '123.45' } }), undefined);

  const workers = await environmentFiles(sdk.id, sdk, 'cloudflare-workers');
  assert.match(workers.get('src/index.js'), /getSpotTicker/);
  assert.doesNotMatch(workers.get('src/index.js'), /apiKey|apiSecret|submitSpotOrder/);
  const order = workers.get('src/order.js');
  for (const pattern of [/request.method !== 'POST'/, /env.ORDER_TOKEN/, /env.GATEIO_API_KEY/, /env.GATEIO_API_SECRET/, /submitSpotOrder/, /time_in_force: 'poc'/, /amount: quantity/, /cache: 'no-store'/]) {
    assert.match(order, pattern);
  }
  const browser = await environmentFiles(sdk.id, sdk, 'vite');
  assert.match(browser.get('vite.config.js'), /gateio-browser-transport/);
  assert.match(browser.get('vite.config.js'), /Node.js-only/);
  const cli = await environmentFiles(sdk.id, sdk, 'node');
  assert.match(cli.get('stream.mjs'), /process.once\('SIGINT', stop\)/);
  assert.doesNotMatch(cli.get('stream.mjs'), /Promise.all\(ws.subscribe/);
});
