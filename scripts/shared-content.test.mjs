import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { root } from './context.mjs';
import { copySharedContent, validateIncludes } from './shared-content.mjs';

test('shared includes resolve privately and fail on missing or circular dependencies', async () => {
  await mkdir(path.join(root, 'tmp'), { recursive: true });
  const work = await mkdtemp(path.join(root, 'tmp/shared-content-test-'));
  try {
    const docs = path.join(work, 'docs');
    await copySharedContent(root, docs);
    const fragment = '.vitepress/shared/getting-started/runtime-compatibility.md';
    assert.match(await readFile(path.join(docs, fragment), 'utf8'), /Runtime compatibility/);
    await writeFile(path.join(docs, 'index.md'), `<!--@include: @/${fragment}-->`);
    await validateIncludes(docs);

    await writeFile(path.join(docs, 'index.md'), '<!--@include: ./nested.md-->');
    await assert.rejects(validateIncludes(docs), /Invalid Markdown include "\.\/nested.md".*ENOENT/);
    await writeFile(path.join(docs, 'nested.md'), `<!--@include: @/${fragment}-->`);
    await validateIncludes(docs);

    await writeFile(path.join(docs, 'nested.md'), '<!--@include: ./missing.md-->');
    await assert.rejects(validateIncludes(docs), /Invalid Markdown include "\.\/missing.md".*ENOENT/);
    await writeFile(path.join(docs, 'nested.md'), '<!--@include: ./index.md-->');
    await assert.rejects(validateIncludes(docs), /Circular Markdown include/);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
});

test('Coinbase navigation keeps references scoped and its runtime setups expanded', async () => {
  const { default: siteConfig } = await import('../shared/config.mjs');
  const { catalogue } = await import('./context.mjs');
  const sdks = await catalogue();
  for (const sdk of sdks) {
    const config = siteConfig({ sdk, catalogue: sdks, siteUrl: `http://localhost/${sdk.id}/`, originUrl: 'http://localhost/', indexable: false }, '.');
    assert.equal(config.themeConfig.notFound.title, 'Page not found');
    assert.equal(config.themeConfig.notFound.linkText, `${sdk.name} documentation`);
    const sidebar = config.themeConfig.sidebar;
    const groups = Array.isArray(sidebar) ? sidebar : sidebar['/'];
    const runtimeLink = groups.find(group => group.text === 'Resources').items.find(item => item.link === '/compatibility');
    assert.equal(runtimeLink.text, sdk.compatibilityPage === 'authored' ? 'Runtime setup' : 'Runtime compatibility');
    if (!sdk.productGroups) continue;
    assert.equal(groups.find(group => group.text.startsWith('Frameworks and runtimes')).collapsed, undefined);
    const defaultReferences = groups.find(group => group.text === 'API reference').items;
    for (const product of sdk.productGroups) {
      const productGroups = sidebar[`/products/${product.slug}`];
      const references = productGroups.find(group => group.text === 'API reference').items;
      for (const client of product.clients) {
        assert(!defaultReferences.some(item => item.link === `/api/classes/${client}`));
        assert(references.some(item => item.link === `/api/classes/${client}`));
        assert.equal(sidebar[`/api/classes/${client}`], productGroups);
      }
    }
  }
});

test('every SDK exposes its testing guide and shares testing limits and TypeScript guidance', async () => {
  const { default: siteConfig } = await import('../shared/config.mjs');
  const { catalogue } = await import('./context.mjs');
  const sdks = await catalogue();
  for (const sdk of sdks) {
    const config = siteConfig({ sdk, catalogue: sdks, siteUrl: `http://localhost/${sdk.id}/`, originUrl: 'http://localhost/', indexable: false }, '.');
    const sidebar = config.themeConfig.sidebar;
    const testingPage = { relativePath: 'guides/testing-environments.md', frontmatter: {} };
    config.transformPageData(testingPage);
    assert.deepEqual(testingPage.frontmatter.prev, { text: 'Configuration', link: '/guides/configuration' });
    assert.deepEqual(testingPage.frontmatter.next, { text: 'Production usage', link: '/guides/production' });
    const expectedModes = {
      htx: [['Testing without orders', 'test-without-placing-orders']],
      binance: [['Spot Testnet', 'spot-testnet'], ['Demo trading', 'demo-trading']],
      bybit: [['Testnet', 'testnet'], ['Demo trading', 'demo-trading']],
      hyperliquid: [['Testnet', 'testnet']],
      bitget: [['Demo trading', 'demo-trading']],
      gateio: [['TestNet', 'testnet']],
      okx: [['Demo trading', 'demo-trading']],
      coinbase: [['Advanced Trade sandbox', 'advanced-trade-static-sandbox'], ['Exchange sandbox', 'exchange-sandbox']],
      kucoin: [['Test order validation', 'test-order'], ['Testing without orders', 'test-without-placing-orders']],
      kraken: [['Testing without orders', 'test-without-placing-orders']],
    };
    const expected = expectedModes[sdk.id].map(([text, anchor]) => ({ text, link: `/guides/testing-environments#${anchor}` }));
    const entries = Array.isArray(sidebar) ? [['/', sidebar]] : Object.entries(sidebar);
    for (const [route, groups] of entries) {
      const links = groups.flatMap(group => group.items || []).filter(item => item.link?.startsWith('/guides/testing-environments'));
      const isExchange = route === '/products/exchange' || route === '/api/classes/CBExchangeClient';
      const supported = sdk.id === 'coinbase' && route !== '/' ? (isExchange ? [expected[1]] : []) : expected;
      assert.deepEqual(links, supported, `${sdk.id}${route}: expose only supported modes with clear labels`);
    }
    const docs = path.join(root, 'sdks', sdk.id, 'docs');
    const guide = await readFile(path.join(docs, 'guides/testing-environments.md'), 'utf8');
    assert.match(guide, /## Available environments/);
    assert.match(guide, /## Coverage and limitations/);
    assert.match(guide, /<!--@include: @\/\.vitepress\/shared\/testing\/limits.md-->/);
    assert.doesNotMatch(guide, /^# Testing environments$/m);
    const { createMarkdownRenderer } = await import('vitepress');
    const renderer = await createMarkdownRenderer(root);
    assert.doesNotThrow(() => renderer.render(guide.split('\n').filter(line => /^#{1,6} /.test(line)).join('\n')), `${sdk.id}: headings must render without duplicate anchors`);
    for (const [, anchor] of expectedModes[sdk.id]) assert(guide.includes(`{#${anchor}}`), `${sdk.id}: missing stable anchor ${anchor}`);
    for (const page of ['getting-started.md', 'guides/configuration.md']) {
      const content = await readFile(path.join(docs, page), 'utf8');
      for (const {text, link} of expected) assert(content.includes(`[${text}](${link})`), `${sdk.id}/${page}: missing direct mode entry`);
      assert(!content.includes('[Testing environments]'), `${sdk.id}/${page}: vague entry label`);
    }
    for (const page of ['getting-started.md', 'guides/troubleshooting.md']) {
      assert.match(await readFile(path.join(docs, page), 'utf8'), /<!--@include: @\/\.vitepress\/shared\/getting-started\/typescript.md-->/);
    }
  }
  const limits = await readFile(path.join(root, 'shared/content/testing/limits.md'), 'utf8');
  assert.match(limits, /Testnet is not a reliable place to evaluate strategy performance/);
  assert.match(limits, /Production remains the default/);
});

test('TypeScript guidance recommends type checking without requiring TypeScript', async () => {
  const { catalogue } = await import('./context.mjs');
  const guidance = await readFile(path.join(root, 'shared/content/getting-started/typescript.md'), 'utf8');
  assert.match(guidance, /JavaScript and TypeScript/);
  assert.match(guidance, /TypeScript is optional/);
  assert.match(guidance, /strongly recommend/);
  assert.match(guidance, /Some runtimes can execute TypeScript directly/);
  assert.match(guidance, /does \*\*not\*\* check types/);
  assert.match(guidance, /Plain JavaScript usage does not need any TypeScript tooling/);
  for (const sdk of await catalogue()) {
    const troubleshooting = await readFile(path.join(root, 'sdks', sdk.id, 'docs/guides/troubleshooting.md'), 'utf8');
    assert.doesNotMatch(troubleshooting, /(?:Examples with TypeScript annotations need|Older runtimes may need) a TypeScript compiler or runner/);
    assert.doesNotMatch(troubleshooting, /the TypeScript examples need a compiler or runner/);
  }
});

test('HTX recipes preserve released package identity and transport requirements', async () => {
  const { default: sdk } = await import('../sdks/htx/sdk.config.mjs');
  const { environmentFiles, environments } = await import('./environments.mjs');
  assert.equal(sdk.packageName, '@siebly/htx-api');
  for (const environment of environments) {
    const files = await environmentFiles('htx', sdk, environment);
    assert.equal(JSON.parse(files.get('package.json')).dependencies['@siebly/htx-api'], 'latest');
    for (const [filename, content] of files) {
      assert.doesNotMatch(content, /from ['"]htx-api['"]|require\(['"]htx-api['"]\)/, filename);
    }
  }
  const node = await environmentFiles('htx', sdk, 'node');
  assert.match(node.get('stream.mjs'), /ws\.on\('message'/);
  assert.match(node.get('stream.mjs'), /market\.btcusdt\.detail.*spotPublic/);
  assert.match(node.get('stream.mjs'), /ws\.closeAll\(\)/);
  const browser = await environmentFiles('htx', sdk, 'vite');
  assert.match(browser.get('vite.config.js'), /find: \/\^events\$\//);
  const worker = await environmentFiles('htx', sdk, 'cloudflare-workers');
  assert.match(worker.get('src/order.js'), /'client-order-id': clientOrderId/);
  assert.match(worker.get('src/order.js'), /'account-id': env\.HTX_SPOT_ACCOUNT_ID/);
  assert.match(worker.get('src/order.js'), /Provide your persisted clientOrderId/);
  const docs = path.join(root, 'sdks/htx/docs');
  assert.match(await readFile(path.join(docs, 'compatibility.md'), 'utf8'), /does \*\*not\*\* polyfill `DecompressionStream`/);
  assert.match(await readFile(path.join(docs, 'guides/configuration.md'), 'utf8'), /`SpotClient` defaults to `spotAWS`; `FuturesClient` defaults to `futuresAWS`/);
});
