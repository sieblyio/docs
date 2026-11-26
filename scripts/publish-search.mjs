import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';

const publisher = 'sieblyio/docs';
const prefix = 'siebly-docs__';

export async function sync(bundle, items) {
  const remote = await items.list();
  const existing = new Map(remote.map(item => [item.key, item]));
  const desired = new Map();
  for (const page of bundle.pages) {
    if (!page.url.startsWith(bundle.siteUrl)) throw new Error('Unexpected documentation URL: ' + page.url);
    const key = prefix + (page.url.slice(bundle.siteUrl.length).replaceAll('/', '__') || 'home') + '.md';
    if (desired.has(key) || key.length > 128) throw new Error('Invalid or duplicate item key: ' + key);
    if (existing.has(key) && existing.get(key).metadata?.publisher !== publisher) throw new Error('Item key is already in use: ' + key);
    // Compare the published Markdown so unrelated SDK releases do not re-embed every page.
    desired.set(key, { ...page, digest: createHash('sha256').update(page.text).digest('hex') });
  }
  if (!desired.size) throw new Error('Refusing to sync an empty publication.');
  let changed = 0;
  for (const [key, page] of desired) {
    const old = existing.get(key);
    if (old?.status === 'completed' && !old.next_action && old.metadata?.content_digest === page.digest && old.metadata?.source_url === page.url) continue;
    const form = new FormData();
    form.set('file', new Blob([page.text], { type: 'text/markdown' }), key);
    form.set('metadata', JSON.stringify({ publisher, source_url: page.url, content_digest: page.digest }));
    await items.upload(form);
    changed++;
  }
  const deadline = Date.now() + 15 * 60_000;
  while (true) {
    const indexed = new Map((await items.list()).map(item => [item.key, item]));
    const pending = [];
    for (const [key, page] of desired) {
      const item = indexed.get(key);
      if (item?.status === 'error' || item?.status === 'skipped') throw new Error(key + ': ' + (item.error || item.status));
      if (item?.status !== 'completed' || item.next_action || !item.chunks_count ||
          item.metadata?.content_digest !== page.digest || item.metadata?.source_url !== page.url) pending.push(key);
    }
    if (!pending.length) break;
    if (Date.now() >= deadline) throw new Error('Still waiting for ' + pending.length + ' documents, including ' + pending[0]);
    console.log('Waiting for ' + pending.length + ' indexed documents.');
    await delay(10_000);
  }
  let removed = 0;
  for (const item of remote) {
    if (item.source_id !== 'builtin' || item.metadata?.publisher !== publisher || !item.key.startsWith(prefix) || desired.has(item.key)) continue;
    await items.remove(item.id);
    removed++;
  }
  console.log('Indexed ' + desired.size + ' documentation pages (' + changed + ' uploaded, ' + removed + ' removed).');
}

async function main() {
  const bundle = JSON.parse(await readFile(process.argv[2], 'utf8'));
  const { CLOUDFLARE_AI_SEARCH_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: account, CLOUDFLARE_AI_SEARCH_INSTANCE: instance, GITHUB_SHA: revision } = process.env;
  if (!account || !instance || !token || !revision || revision !== bundle.revision) throw new Error('Missing AI Search configuration or mismatched build revision.');
  const live = new URL('build-manifest.json', bundle.siteUrl);
  live.searchParams.set('revision', revision);
  const published = await fetch(live, { signal: AbortSignal.timeout(30_000) });
  if (!published.ok || (await published.json()).documentationRevision !== revision) throw new Error('GitHub Pages does not serve the expected build revision.');
  const endpoint = 'https://api.cloudflare.com/client/v4/accounts/' + encodeURIComponent(account) +
    '/ai-search/namespaces/default/instances/' + encodeURIComponent(instance) + '/items';
  async function request(suffix, options = {}) {
    for (let attempt = 0; ; attempt++) {
      const response = await fetch(endpoint + suffix, { ...options, headers: { Authorization: 'Bearer ' + token }, redirect: 'error', signal: AbortSignal.timeout(60_000) });
      if ((response.status === 429 || response.status >= 500) && attempt < 4) {
        await delay(Math.max(2 ** attempt, Number(response.headers.get('retry-after')) || 0) * 1000);
        continue;
      }
      if (!response.ok) throw new Error('Cloudflare Items API ' + response.status + ': ' + (await response.text()).slice(0, 500));
      if (response.status === 204) return;
      const body = await response.json();
      if (!body.success) throw new Error('Cloudflare Items API: ' + JSON.stringify(body.errors));
      return body;
    }
  }
  await sync(bundle, {
    async list() {
      const all = [];
      for (let page = 1; ; page++) {
        const body = await request('?source=builtin&per_page=100&page=' + page);
        all.push(...body.result);
        if (!body.result.length || all.length >= body.result_info?.total_count) return all;
      }
    },
    upload: form => request('', { method: 'POST', body: form }),
    remove: id => request('/' + encodeURIComponent(id), { method: 'DELETE' }),
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
