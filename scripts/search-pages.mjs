import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'node-html-parser';
import { NodeHtmlMarkdown } from 'node-html-markdown';

const markdown = new NodeHtmlMarkdown();

export function article(html, url) {
  const doc = parse(html);
  const main = doc.querySelector('main');
  if (!main?.querySelector('h1') || doc.querySelector('link[rel=canonical]')?.getAttribute('href') !== url.href) {
    throw new Error('Missing article or incorrect canonical: ' + url.href);
  }
  for (const node of main.querySelectorAll('.header-anchor, button.copy, span.lang, script, style')) node.remove();
  for (const link of main.querySelectorAll('a[href]')) link.setAttribute('href', new URL(link.getAttribute('href'), url).href);
  // Syntax highlighting splits code across spans. Preserve the rendered code and line breaks.
  for (const code of main.querySelectorAll('pre code')) code.set_content(code.rawText);
  return [doc.querySelector('title').text.trim(), url.href, '', markdown.translate(main.toString()), ''].join('\n');
}

export async function collectPages(dist) {
  const manifest = JSON.parse(await readFile(path.join(dist, 'build-manifest.json'), 'utf8'));
  if (!manifest.indexable) throw new Error('Search requires an indexable Pages build.');
  const base = new URL(manifest.siteUrl);
  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  const pages = [];
  for (const entry of parse(sitemap).querySelectorAll('loc')) {
    const url = new URL(entry.text);
    if (!url.href.startsWith(base.href) || url.search || url.hash) throw new Error('Unexpected sitemap URL: ' + url);
    const route = url.pathname.slice(base.pathname.length);
    if (route.split('/').includes('api')) continue;
    const file = path.join(dist, !route || route.endsWith('/') ? route + 'index.html' : route);
    pages.push({ url: url.href, text: article(await readFile(file, 'utf8'), url) });
  }
  if (!pages.length || new Set(pages.map(p => p.url)).size !== pages.length) throw new Error('Empty or duplicate search pages.');
  return { revision: manifest.documentationRevision, siteUrl: base.href, pages };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const bundle = await collectPages(process.argv[2]);
  await writeFile(process.argv[3], JSON.stringify(bundle));
  console.log('Prepared ' + bundle.pages.length + ' documentation pages for AI Search.');
}
