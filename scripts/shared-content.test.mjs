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
    const variants = Array.isArray(sidebar) ? [sidebar] : Object.values(sidebar);
    for (const groups of variants) {
      const links = groups.flatMap(group => group.items || []);
      assert.equal(links.filter(item => item.link === '/guides/testing-environments').length, 1, `${sdk.id}: testing guide must be discoverable once in each sidebar`);
    }
    const docs = path.join(root, 'sdks', sdk.id, 'docs');
    const guide = await readFile(path.join(docs, 'guides/testing-environments.md'), 'utf8');
    assert.match(guide, /## Available environments/);
    assert.match(guide, /## Coverage and limitations/);
    assert.match(guide, /<!--@include: @\/\.vitepress\/shared\/testing\/limits.md-->/);
    for (const page of ['getting-started.md', 'guides/configuration.md']) {
      assert.match(await readFile(path.join(docs, page), 'utf8'), /\[Testing environments\]\(\/guides\/testing-environments\)/);
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
