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

test('deployment revision guard is credential-free and fails closed', async () => {
  const { readFileSync, mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { spawnSync } = await import('node:child_process');
  const workflow = readFileSync(new URL('../.github/workflows/publish.yml', import.meta.url), 'utf8');
  const deploy = workflow.split('\n  deploy:\n')[1];
  assert.doesNotMatch(deploy, /contents:|GH_TOKEN|github.token|Authorization:/);
  assert.match(deploy, /GIT_TERMINAL_PROMPT: '0'/);
  const script = deploy.split('        run: |\n')[1].split('      - name:')[0]
    .split('\n').map(line => line.replace(/^          /, '')).join('\n');
  const dir = mkdtempSync(join(tmpdir(), 'docs-deploy-guard-'));
  const sha = 'a'.repeat(40);
  try {
    writeFileSync(join(dir, 'git'), `#!/bin/bash
[[ "$*" == "-c credential.helper= -c http.extraHeader= ls-remote --exit-code https://github.com/sieblyio/docs.git refs/heads/main" ]] || exit 90
[[ "$GIT_TERMINAL_PROMPT" == 0 ]] || exit 91
if [ "$MOCK_FAILURE" = 1 ]; then exit 128; fi
printf '%s' "$MOCK_REF"
`, { mode: 0o755 });
    // Exercise timeout invocation on platforms without GNU timeout as well.
    writeFileSync(join(dir, 'timeout'), `#!/bin/bash
[[ "$1" == 30s ]] || exit 92
shift
if [ "$MOCK_FAILURE" = timeout ]; then exit 124; fi
exec "$@"
`, { mode: 0o755 });
    for (const [ref, failure, expected] of [
      [`${sha}\trefs/heads/main`, '0', 'true'],
      [`${'b'.repeat(40)}\trefs/heads/main`, '0', 'false'],
      ['', '1', null],
      ['', 'timeout', null],
      ['', '0', null],
      ['malformed', '0', null],
      [`${sha}\trefs/heads/other`, '0', null],
      [`${sha}\trefs/heads/main\n${sha}\trefs/heads/main`, '0', null],
    ]) {
      const output = join(dir, 'output');
      writeFileSync(output, '');
      const result = spawnSync('bash', ['-e', '-c', script], {
        encoding: 'utf8',
        env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, GIT_TERMINAL_PROMPT: '0',
          EXPECTED_SHA: sha, MOCK_REF: ref, MOCK_FAILURE: failure,
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
