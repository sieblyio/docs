import test from 'node:test';
import assert from 'node:assert/strict';
import { canDeploy } from './ci-plan.mjs';
const main = { repository: 'sieblyio/docs', ref: 'refs/heads/main' };
test('only push and manual runs on this repository main branch can deploy', () => {
  for (const eventName of ['push', 'workflow_dispatch']) assert.equal(canDeploy({ ...main, eventName }), true);
  for (const context of [
    { ...main, eventName: 'pull_request' },
    { ...main, eventName: 'pull_request_target' },
    { ...main, eventName: 'workflow_run' },
    { ...main, eventName: 'schedule' },
    { ...main, eventName: 'push', repository: 'someone/docs' },
    { ...main, eventName: 'workflow_dispatch', ref: 'refs/heads/feature' },
    { ...main, eventName: 'workflow_dispatch', ref: 'refs/tags/release' },
  ]) assert.equal(canDeploy(context), false);
});

test('deployment revision guard authenticates and fails closed', async () => {
  const { readFileSync, mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { spawnSync } = await import('node:child_process');
  const workflow = readFileSync(new URL('../.github/workflows/publish.yml', import.meta.url), 'utf8');
  const deploy = workflow.split('\n  deploy:\n')[1];
  assert.match(deploy, /permissions:\n\s+contents: read/);
  assert.match(deploy, /GH_TOKEN: \$\{\{ github.token \}\}/);
  const script = deploy.split('        run: |\n')[1].split('      - name:')[0]
    .split('\n').map(line => line.replace(/^          /, '')).join('\n');
  const dir = mkdtempSync(join(tmpdir(), 'docs-deploy-guard-'));
  try {
    writeFileSync(join(dir, 'curl'), `#!/bin/bash
[[ "$*" == *"Authorization: Bearer test-token"* ]] || exit 90
if [ "$MOCK_HTTP_FAILURE" = 1 ]; then exit 22; fi
printf '{"sha":"%s"}\\n' "$MOCK_SHA"
`, { mode: 0o755 });
    for (const [sha, failure, expected] of [['current', '0', 'true'], ['newer', '0', 'false'], ['current', '1', null]]) {
      const output = join(dir, 'output');
      writeFileSync(output, '');
      const result = spawnSync('bash', ['-e', '-c', script], {
        encoding: 'utf8',
        env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, GH_TOKEN: 'test-token',
          EXPECTED_SHA: 'current', MOCK_SHA: sha, MOCK_HTTP_FAILURE: failure,
          GITHUB_OUTPUT: output, GITHUB_STEP_SUMMARY: join(dir, 'summary') },
      });
      if (expected === null) {
        assert.notEqual(result.status, 0);
        assert.equal(readFileSync(output, 'utf8'), '');
      } else {
        assert.equal(result.status, 0, result.stderr);
        assert.equal(readFileSync(output, 'utf8'), `deploy=${expected}\n`);
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
