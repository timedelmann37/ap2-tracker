import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const [script, ...forwarded] = process.argv.slice(2);
if (!script) throw new Error('Python-Skript fehlt.');

const runtimePath = path.join(repoRoot, 'knowledge-base', 'local', '.ocr-runtime');
const pythonPath = [runtimePath, process.env.PYTHONPATH].filter(Boolean).join(path.delimiter);
const bundledPython = path.resolve(path.dirname(process.execPath), '..', '..', 'python', 'python.exe');
const codexPython = path.join(homedir(), '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'python', 'python.exe');
const candidates = process.platform === 'win32'
  ? [[bundledPython, []], [codexPython, []], ['py', ['-3']], ['python', []], ['python3', []]]
  : [['python3', []], ['python', []]];

for (const [command, prefix] of candidates) {
  const probe = spawnSync(command, [...prefix, '--version'], { stdio: 'ignore' });
  if (probe.error?.code === 'ENOENT' || probe.status !== 0) continue;
  const result = spawnSync(command, [...prefix, path.resolve(repoRoot, script), ...forwarded], {
    cwd: repoRoot,
    stdio: 'inherit',
    env: { ...process.env, PYTHONPATH: pythonPath, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' }
  });
  if (result.error?.code === 'ENOENT') continue;
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}

throw new Error('Keine Python-3-Laufzeit gefunden (py -3, python3 oder python).');
