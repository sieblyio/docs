import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFile, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { root } from './context.mjs';
import { checkSite } from './check-site.mjs';
import { searchConsoleFile } from '../shared/site-services.mjs';
import { docsStartupHtml } from '../shared/page-modules.mjs';

test('SDK startup leaves the article alone if its page module cannot run', async (t) => {
  const base = '/docs/gateio/';
  const entry = `<script type="module" src="${base}assets/app.js"></script>`;
  const context = {
    page: 'guides/example.md', siteData: { base },
    head: [['link', { rel: 'modulepreload', href: base + 'assets/example.lean.js' }]],
  };
  const html = docsStartupHtml(entry, '', context);
  const [, page, app] = html.match(/data-page="([^"]+)" data-app="([^"]+)"/);
  assert.ok(html.includes(`src="${base}start-docs.js"`));
  assert.equal(docsStartupHtml(entry, '', { ...context, page: '404.md' }), entry);

  const scratch = path.join(root, 'tmp');
  await mkdir(scratch, { recursive: true });
  const dir = await mkdtemp(path.join(scratch, 'docs-start-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await mkdir(path.join(dir, 'assets'));
  await writeFile(path.join(dir, 'package.json'), '{"type":"module"}');
  await copyFile(new URL('../shared/start-docs.js', import.meta.url), path.join(dir, 'start-docs.js'));
  await writeFile(path.join(dir, app), 'console.log("router started")');
  const runner = `globalThis.document = { getElementById: () => ({ dataset: ${JSON.stringify({ page, app })} }) };
    await import('./start-docs.js');`;
  const run = () => promisify(execFile)(process.execPath, ['--input-type=module', '-e', runner], { cwd: dir });
  assert.equal((await run()).stdout, '');
  await writeFile(path.join(dir, page), '{ import {} from "./other.js"; }');
  assert.equal((await run()).stdout, '');
  await writeFile(path.join(dir, page), 'export default {}');
  assert.equal((await run()).stdout.trim(), 'router started');
});

test('asset checks handle multiple rel tokens and either HTML quote style', async () => {
  const scratch = path.join(root, 'tmp');
  await mkdir(scratch, { recursive: true });
  const directory = await mkdtemp(path.join(scratch, 'site-check-'));
  try {
    await writeFile(path.join(directory, 'build-manifest.json'), JSON.stringify({ siteUrl: 'http://localhost:4173/', indexable: false, sdks: {} }));
    const page = (links) => `<html><head><title>Check</title><meta name="description" content="Test"><meta name="robots" content="noindex,nofollow">${links}</head><body><h1>Check</h1></body></html>`;
    await writeFile(path.join(directory, 'index.html'), page(`<link rel='preload stylesheet' href='missing.css'>`));
    await assert.rejects(checkSite(directory), /missing file missing.css/);
    await writeFile(path.join(directory, 'style.css'), 'body { color: black; }');
    await writeFile(path.join(directory, 'index.html'), page(`<link rel='preload stylesheet' href='style.css'><link rel="STYLESHEET preload" href="style.css">`));
    const result = await checkSite(directory);
    assert.equal(result.assets, 2);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('Search Console verification stays exact and is excluded from page metadata and sitemap counts', async () => {
  const scratch = path.join(root, 'tmp');
  await mkdir(scratch, { recursive: true });
  const directory = await mkdtemp(path.join(scratch, 'verification-check-'));
  try {
    const siteUrl = 'https://sieblyio.github.io/docs/';
    await writeFile(path.join(directory, 'build-manifest.json'), JSON.stringify({ siteUrl, indexable: true, sdks: {} }));
    await writeFile(path.join(directory, 'index.html'), `<html><head><title>Docs</title><meta name="description" content="SDK docs"><link rel="canonical" href="${siteUrl}"><script type="application/ld+json">{}</script></head><body><h1>Docs</h1></body></html>`);
    await writeFile(path.join(directory, 'sitemap.xml'), `<urlset><url><loc>${siteUrl}</loc></url></urlset>`);
    const filename = path.join(directory, searchConsoleFile);
    await writeFile(filename, `google-site-verification: ${searchConsoleFile}`);
    assert.equal((await checkSite(directory)).pages, 1);
    await writeFile(filename, 'incorrect verification');
    await assert.rejects(checkSite(directory), /Incorrect Search Console/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
