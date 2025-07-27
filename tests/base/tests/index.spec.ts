import { spawn } from 'node:child_process';
import { it, type TestContext } from 'node:test';

interface RunBiomeResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

function runBiome(_args: [string, ...Array<string>]): Promise<RunBiomeResult> {
  const [command, ...args] = _args;
  const task = spawn(command, args);

  return new Promise((resolve) => {
    let stdout: RunBiomeResult['stdout'] = '';
    let stderr: RunBiomeResult['stderr'] = '';
    let exitCode: RunBiomeResult['exitCode'] = null;

    task.stdout.on('data', (data: string) => {
      stdout += data;
    });

    task.stderr.on('data', (data) => {
      stderr += data;
    });

    task.on('exit', (code) => {
      exitCode = code;
      // console.info({ stdout, stderr, exitCode });
      resolve({ stdout, stderr, exitCode });
    });
  });
}

it('simple file', async (t: TestContext) => {
  const { exitCode, stderr } = await runBiome([
    'pnpm',
    'biome',
    'lint',
    './src/utils.ts',
  ]);

  t.assert.strictEqual(exitCode, 1);
  t.assert.snapshot(stderr.split('\n'));
});

it('import extensions', async (t: TestContext) => {
  const { exitCode, stderr } = await runBiome([
    'pnpm',
    'biome',
    'lint',
    './src/import-extensions.ts',
  ]);

  t.assert.strictEqual(exitCode, 1);
  t.assert.snapshot(stderr.split('\n'));
});

it('no imports cycle', async (t: TestContext) => {
  const { exitCode, stderr } = await runBiome([
    'pnpm',
    'biome',
    'lint',
    './src/no-imports-cycle',
  ]);

  t.assert.strictEqual(exitCode, 1);
  t.assert.snapshot(stderr.split('\n'));
});

/** @see https://github.com/marcalexiei/biome-config/issues/8 */
it('should not report useNamingConvention on test files mocks', async (t: TestContext) => {
  const { exitCode } = await runBiome([
    'pnpm',
    'biome',
    'lint',
    './src/header.spec.ts',
  ]);

  t.assert.strictEqual(exitCode, 0);
});
