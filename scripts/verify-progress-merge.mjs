import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { runInNewContext } from 'node:vm';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(repoRoot, 'assets', 'ap2-progress-merge.js'), 'utf8');
const context = { window: {} };
runInNewContext(source, context);
const merge = context.window.AP2_mergeProgress;

function assert(value, message) {
  if (!value) throw new Error(message);
  console.log(`PASS ${message}`);
}

const localNewer = merge(
  { 'ga1-3__3': true, 'mark__ga1-3__3': false, 'ts__ga1-3__3': 200, __activity: { a: 3 } },
  { 'ga1-3__3': false, 'mark__ga1-3__3': true, 'ts__ga1-3__3': 100, 'ga2-1__0': true, __activity: { a: 1, b: 2 } }
);
assert(localNewer['ga1-3__3'] === true && localNewer['mark__ga1-3__3'] === false, 'neuerer lokaler Kernthema-Stand gewinnt vollständig');
assert(localNewer['ga2-1__0'] === true, 'fremde Cloud-Schlüssel bleiben bei der Zusammenführung erhalten');
assert(localNewer.__activity.a === 3 && localNewer.__activity.b === 2, 'Aktivitätswerte werden ohne Rückschritt zusammengeführt');

const remoteNewer = merge(
  { 'ga1-3__3': true, 'ts__ga1-3__3': 100 },
  { 'ga1-3__3': false, 'ts__ga1-3__3': 300 }
);
assert(remoteNewer['ga1-3__3'] === false, 'neuerer Cloud-Kernthema-Stand gewinnt');
