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

it('works', async (t: TestContext) => {
  const { exitCode, stderr } = await runBiome([
    'pnpm',
    'biome',
    'lint',
    './src',
  ]);

  t.assert.strictEqual(exitCode, 1);
  t.assert.snapshot(stderr.split('\n'));
});
