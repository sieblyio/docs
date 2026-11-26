import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collectPages } from './search-pages.mjs';
import { sync } from './publish-search.mjs';

const base = 'https://sieblyio.github.io/docs/';
test('the sitemap selects the rendered article, keeps code and canonical links, and skips API pages', async t => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'search-pages-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await writeFile(path.join(dir, 'build-manifest.json'), JSON.stringify({ indexable: true, siteUrl: base, documentationRevision: '123' }));
  await writeFile(path.join(dir, 'sitemap.xml'), '<urlset><url><loc>' + base + '</loc></url><url><loc>' + base + 'sdk/api/classes/Foo.html</loc></url></urlset>');
  await writeFile(path.join(dir, 'index.html'), '<title>SDK guides</title><link rel="canonical" href="' + base + '"><nav>Unrelated navigation</nav><main><h1>SDK docs</h1><pre><code><span>const </span><span>ready = n &lt; 2;</span></code></pre><a href="bybit/">Bybit</a></main>');
  const bundle = await collectPages(dir);
  assert.equal(bundle.pages.length, 1);
  assert.equal(bundle.pages[0].url, base);
  assert.match(bundle.pages[0].text, /const ready = n < 2;/);
  assert.ok(bundle.pages[0].text.includes(base + 'bybit/'));
  assert.ok(!bundle.pages[0].text.includes('Unrelated navigation'));
});

test('sync updates changed guides and prunes only its own retired pages after successful ingestion', async () => {
  const records = new Map();
  const operations = [];
  const items = {
    list: async () => [...records.values()],
    async upload(form) {
      const key = form.get('file').name;
      operations.push('upload');
      records.set(key, { id: key, key, source_id: 'builtin', metadata: JSON.parse(form.get('metadata')), status: 'completed', chunks_count: 2 });
    },
    async remove(id) { operations.push('delete'); records.delete(id); },
  };
  const bundle = { siteUrl: base, pages: [{ url: base, text: 'docs' }, { url: base + 'bybit/', text: 'Bybit' }] };
  await sync(bundle, items);
  await sync(bundle, items);
  assert.deepEqual(operations, ['upload', 'upload']);
  records.set('other', { id: 'other', source_id: 'builtin', key: 'other' });
  bundle.pages.pop();
  bundle.pages[0].text = 'updated';
  const failure = { ...items, upload: async () => { throw new Error('rate limit'); } };
  await assert.rejects(sync(bundle, failure), /rate limit/);
  assert.equal(records.size, 3);
  await sync(bundle, items);
  assert.deepEqual(operations, ['upload', 'upload', 'upload', 'delete']);
  assert.ok(records.has('other'));
  assert.equal(records.get('siebly-docs__home.md').metadata.source_url, base);
});
