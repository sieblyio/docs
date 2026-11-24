import { readFile } from 'node:fs/promises';

// VitePress emits its browser entry and page modules in the same assets directory.
// A relative module import keeps the archive's replay prefix and ES module mode.
export const relativePageImports = {
  name: 'docs-relative-page-imports',
  apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
  async generateBundle() {
    const source = await readFile(new URL('./start-docs.js', import.meta.url), 'utf8');
    this.emitFile({ type: 'asset', fileName: 'start-docs.js', source });
  },
  renderDynamicImport({ moduleId, targetModuleId }) {
    if (!targetModuleId && moduleId.endsWith('/vitepress/dist/client/app/index.js')) {
      return { left: "import('./' + ", right: ".split('/').pop())" };
    }
  },
};

export function docsStartupHtml(html, _file, { page, head, siteData }) {
  // The built-in 404 has no prerendered article and needs VitePress to render it.
  if (page === '404.md') return html;
  const preload = head.find(([tag, attrs]) =>
    tag === 'link' && attrs.rel === 'modulepreload' && attrs.href.endsWith('.lean.js'));
  const entry = /<script type="module" src="([^"]+)"><\/script>/;
  if (!preload || !entry.test(html)) throw new Error(`Missing VitePress startup assets for ${page}`);
  const base = siteData.base;
  return html.replace(entry, (_, appUrl) =>
    `<link rel="modulepreload" href="${appUrl}">\n    ` +
    `<script type="module" id="docs-start" src="${base}start-docs.js" ` +
    `data-page="${preload[1].href.slice(base.length)}" data-app="${appUrl.slice(base.length)}"></script>`);
}
