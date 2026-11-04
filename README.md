# Siebly SDK documentation

The public `sieblyio/docs` repository owns the shared TypeDoc and VitePress builder, guides, examples and compatibility harness for Hyperliquid, Bybit and Binance. GitHub Actions builds the website from this source and deploys only `dist/` through native GitHub Pages. The published URL is [sieblyio.github.io/docs](https://sieblyio.github.io/docs/), with `/hyperliquid/`, `/bybit/` and `/binance/` sites.

## Build a published release

Use Node.js 24, or Node.js 22 or newer. A fresh checkout needs no adjacent SDK repositories:

```sh
npm ci --ignore-scripts
npm run releases:check
DOCS_SITE_URL=https://sieblyio.github.io/docs/ DOCS_INDEXABLE=1 npm run build:release
```

`releases:check` verifies the exact stable versions in `releases/package.json` against npm and records their metadata in `.work/available-releases.json`. `build:release` resolves those pinned releases once, downloads each npm tarball over HTTPS and verifies its npm SHA-512 integrity. If the tarball contains the configured TypeScript source and compiler config, it uses that source. Otherwise it downloads the allowlisted GitHub repository's archive at the exact `gitHead` recorded by npm. Missing provenance, prerelease or non-exact version inputs, unsafe archives and package name/version mismatches fail the build. No guessed tag or branch is used.

Sources and their compilation dependencies are isolated under `.work/releases/`. SDK lifecycle scripts are disabled. An existing source lockfile uses `npm ci`; otherwise the isolated source uses `npm install`. SDK dependencies are resolved under their release's published dependency constraints. The small `releases/package.json` is an automation-owned build input, not a runtime consumer or an npm workspace; its SDK dependencies are never installed into this project's root. It deliberately has no lockfile or scripts. PR builds use the proposed exact versions, and the release path rejects records that disagree with this manifest. These pins are not requirements for users: installation examples continue to use the latest SDK without version pins. This builder performs no SDK Git operations, SDK repository writes, npm publication or exchange requests.

To build the release records already resolved by `releases:check`:

```sh
DOCS_RELEASE_RECORD=.work/available-releases.json DOCS_SITE_URL=https://sieblyio.github.io/docs/ DOCS_INDEXABLE=1 npm run build:release
```

After sources have been prepared, `npm run build` reuses them. `npm run build -- --sdk bybit` rebuilds one SDK while retaining the other accepted outputs. Changing URL or indexing mode requires a full build. `npm run preview` serves the generated output at http://localhost:4173/; use a default local build first if you need local canonical and base paths. `npm run dev` watches authored content and prepared sources without rerunning compatibility checks.

## Authored sources and output

- `shared/` contains the theme, branding, common config and shared Markdown fragments.
- `sdks/<id>/` contains SDK config, maintained guides and checked TypeScript examples.
- `scripts/` generates the reference, checks examples and assembles the website.
- `releases/package.json` selects the exact published SDK releases used by the build.
- `compatibility/` contains the real-exchange runtime harness and sanitized recorded results.
- `.work/`, `tmp/`, `verification/` and `dist/` are disposable, ignored build data.

Edit authored sources. Generated Markdown is never maintained by hand. Shared fragments use native VitePress includes copied into disposable generation inputs; missing fragments and include cycles fail the build. API contracts come from the release's public TypeScript exports and comments. SDK-specific semantics stay in SDK-specific guides.

The complete candidate must pass before replacing `dist/`. A build lock prevents overlapping local assembly. Failed builds retain the last accepted output. The checks cover examples, internal links, anchors, assets, canonicals, sitemap coverage and generated-output boundaries. `dist/build-manifest.json` records release versions, npm integrity and exact source identifiers for review and rollback. CI also records the documentation source commit as `documentationRevision`, using GitHub's existing `GITHUB_SHA`. It contains no local source paths. The repository source, guides and sanitized compatibility evidence are public. The deployed website contains rendered guides and code examples, including deliberate authentication examples, but no authored Markdown, builder scripts, raw logs, recorded result JSON, credentials or SDK checkout. Authentication examples use placeholders; never put real SDK keys, account secrets, private keys or environment files in this repository or generated output.

```sh
npm run check:content
npm run compat:check-report
npm run check:releases
npm run check:ci
npm run check:site-tests
npm run check:release-update
npm run check
npm run check:public
```

`npm run verify` is the slower builder integration harness. It makes isolated source fixtures and performs multiple builds. It is separate from the normal publication checks.

## Publication automation

Set this repository's **Settings > Pages > Source** to **GitHub Actions**. The `github-pages` environment must allow deployments from `main`. No stored credentials, personal access token, deploy key or GitHub App are required. The workflow uses GitHub's temporary job credentials and OIDC for native Pages deployment; it never commits generated output back to the repository. Keep `.nojekyll` in generated `dist/`, rather than the authored source root.

Dependabot's own version-update service checks the three SDK packages every six hours, using `schedule.interval: cron` in `.github/dependabot.yml`. There is no scheduled GitHub Actions workflow. Dependabot opens a grouped PR only when an SDK release changes the exact versions in `releases/package.json`. The SDK names are allowlisted and excluded from Dependabot's default three-day cooldown. This uses Dependabot's [documented scheduling and grouping options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference), rather than generating repository activity.

`.github/workflows/publish.yml` runs on every push to `main`, pull requests targeting `main`, and manual dispatch. Each run builds the exact SDK versions selected by its source manifest. Every main push is covered so a newer documentation or configuration commit always schedules a replacement for an obsolete deployment. The existing site remains available if a new release fails compilation or website checks.

The build job has only repository Contents read permission. It installs locked documentation dependencies with lifecycle scripts disabled, prepares isolated release sources, runs focused checks, builds all three sites and uploads only the validated `dist/` as a Pages artifact. Pull requests perform that same read-only validation and full build. They receive no deployment permission or Pages environment, and never deploy. Live exchange compatibility checks are not part of CI.

A separate deployment job runs only for successful, required builds on this repository's `main` branch. It has only Pages write and OIDC token permission. The runner performs a fixed HTTPS check against the current public `main` revision, then calls the official Pages deployment action. It does not check out source, install packages or run authored build code. An older workflow revision is skipped if `main` has advanced. Main workflow runs share one concurrency group and finish without canceling an active production run. Each pull request has an independent group, where newer checks cancel superseded checks.

A separate trusted `.github/workflows/release-update.yml` handles successful Dependabot PR builds. It reads only default-branch automation code, never PR code or artifacts. It re-queries GitHub and requires the Dependabot author, this repository as head and base, `main` as target, the same head that passed the current build, a branch up to date with `main`, and exactly one changed file: `releases/package.json`. Only increasing exact stable SDK versions are accepted. Workflow, action-pin and other source changes cannot auto-merge. The job uses the temporary `GITHUB_TOKEN` with Contents write and Pull requests write for merging, plus Actions write to read the completed run and dispatch publication. It has no Pages deployment permission and stores no credentials.

Before enabling this workflow, protect `main` with the required **build** check from **GitHub Actions**, require branches to be up to date, and allow squash merges. Do not give the automation a bypass. This public repository can use [GitHub Free branch protection](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks). The handler merges only after validation, with `--match-head-commit` and no administrator override. It confirms completion, then explicitly dispatches `publish.yml` on `main`: GitHub documents that [`workflow_dispatch` works with the native token even though token-generated pushes do not trigger new runs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow). Transient GitHub API failures receive bounded retries. If merging succeeded but dispatch failed, rerunning the failed automation job validates the same already-merged head and retries only the main dispatch. The read-only manual inspection mode never performs that recovery. Actual failures still need attention; a manual publication run on `main` is also available.

Official actions remain pinned to verified full commit SHAs with version comments: [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [upload-pages-artifact](https://github.com/actions/upload-pages-artifact) and [deploy-pages](https://github.com/actions/deploy-pages). Action-pin upgrades are deliberate reviewed maintenance. Dependabot is scoped to SDK release inputs, so an unrelated tooling-update PR queue cannot pause the release watcher. No security-alert, secret-scanning or push-protection setting is changed by this configuration.

Use a pull request to change guides, examples or the builder. Use **Actions > Build and deploy SDK documentation > Run workflow** on `main` to force a full refresh. **Merge validated SDK release updates > Run workflow** accepts a completed PR run ID for a read-only candidate inspection; it never merges or dispatches in manual mode. To restore a previous version, submit a reviewed source change, including deliberate release-manifest changes when needed. `build-manifest.json` records exact npm versions, source identifiers and the documentation revision. Deployment and search-engine indexing are asynchronous.

This removes the blanket 60-day inactivity limit for Actions cron, but actual failures still require maintenance. Dependabot [can pause updates repository-wide](https://docs.github.com/en/code-security/reference/supply-chain-security/troubleshoot-dependabot/dependabot-updates-stopped) when an update PR remains untouched for more than 90 days; it does not pause merely because no release PR exists. Fix failed SDK updates and resolve stale PRs rather than leaving them unattended. SDK authenticated behavior is outside these build checks, and a newly released SDK without matching recorded compatibility evidence is shown as unverified.

## Compatibility evidence

The three tracked `compatibility/results/<id>.json` reports retain actual suite `2-live` observations from npm packages Hyperliquid 1.0.1, Bybit 4.8.4 and Binance 3.6.11. Raw build log strings and local-path warnings were removed from these public evidence records. Check statuses, failure reasons, runtime versions, timestamps, exchange endpoints and positive observed prices are retained. These are recorded results, never fabricated or silently rerun during a docs build. Results for another release do not become green badges for a new release.

User installation commands use the latest SDK without an exact version pin. Exact versions in compatibility metadata identify what was tested. Node, Bun and Deno have live REST/WebSocket checks and process cleanup checks. Browser, Next.js and Android results state their actual scope. Bybit and Binance require documented browser/native consumer configuration. Android evidence is Expo Go on an emulator with Hermes; iOS Metro results are **Build only**. iOS runtime, physical devices, background lifecycle, authenticated endpoints, accepted signatures, orders and recovery behavior remain unverified.

Manual compatibility work uses real exchange public mainnet APIs. Region restrictions or unavailable APIs remain failures, not mocked passes. Browser driving and Android emulation require an interactive operator; the publication workflow never reruns them. To run an explicit manual check, use repository-local scratch space:

```sh
COMPAT_WORK_ROOT="$PWD/tmp/compat" npm run compat -- --sdk bybit --package-version latest --targets node,bun,deno
```

Read `compatibility/run.mjs` and the generated compatibility guide for the available interactive targets. Review new results before replacing tracked evidence. The native polyfill recipe and exact consumer versions live in `compatibility/native-config/`; the same source is displayed in the guide after actual evidence supports it.

## Known limits

TypeDoc reports existing references to SDK types that are not exported. Warnings remain visible and source exports are not patched. Complete API catalogues and local search bundles are large, so review output size before adding SDKs. Static checks establish website consistency and example compilation; live application permissions, trading behavior, availability and recovery still require consumer integration tests. Indexable output and sitemap generation support crawling, but search-engine indexing is outside the builder's control.
