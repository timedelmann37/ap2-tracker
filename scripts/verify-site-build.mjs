import { execFileSync } from 'node:child_process';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const assetExtensions = new Set(['.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.woff', '.woff2', '.ttf', '.txt', '.ico', '.webmanifest']);
const pageRoots = ['uebersicht/', 'konzeption-administration/', 'netzwerke/', 'sowi/', 'lernpfad/', 'lernen/', 'simulation/', 'tracker/'];

function assert(value, message) {
  if (!value) throw new Error(message);
  console.log(`PASS ${message}`);
}

function isRuntimePath(relative) {
  if (relative === 'index.html' || relative === 'exam_2023_1_GA2.js') return true;
  if (relative.startsWith('assets/')) return assetExtensions.has(path.extname(relative).toLowerCase());
  return pageRoots.some(root => relative.startsWith(root)) && ['.html', '.js'].includes(path.extname(relative).toLowerCase());
}

async function listFiles(root, prefix = '') {
  const files = [];
  for (const entry of await readdir(path.join(root, prefix), { withFileTypes: true })) {
    const relative = path.posix.join(prefix.replaceAll('\\', '/'), entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(root, relative));
    else files.push(relative);
  }
  return files;
}

for (const relative of [
  'index.html', 'uebersicht/index.html', 'konzeption-administration/index.html',
  'netzwerke/index.html', 'sowi/index.html', 'lernpfad/index.html',
  'lernen/raid/index.html', 'lernen/storage-types/index.html',
  'assets/ap2-learning.js', 'assets/ap2-learning-catalog.js'
]) await access(path.join(distRoot, relative));
assert(true, 'Publish-Verzeichnis enthaelt alle Laufzeit-Seiten');

const expected = new Set(
  execFileSync('git', ['ls-files', '-z'], { cwd: repoRoot, encoding: 'utf8' })
    .split('\0').filter(Boolean).map(file => file.replaceAll('\\', '/')).filter(isRuntimePath)
);
expected.add('assets/ap2-learning-catalog.js');
expected.add('assets/ap2-learning.css');
expected.add('assets/ap2-learning.js');
expected.add('assets/ap2-progress-merge.js');
const learningManifest = JSON.parse(await readFile(path.join(repoRoot, 'content', 'learning-manifest.json'), 'utf8'));
for (const topic of learningManifest.topics) {
  const pagePath = `lernen/${topic.slug}/index.html`;
  expected.add(pagePath);
  const page = await readFile(path.join(repoRoot, pagePath), 'utf8');
  for (const match of page.matchAll(/(?:src|href)="\/(assets\/learning\/[a-z0-9._/-]+)"/gi)) expected.add(match[1]);
}

const actual = (await listFiles(distRoot)).sort();
const unexpected = actual.filter(file => !expected.has(file));
const missing = [...expected].filter(file => !actual.includes(file));
assert(unexpected.length === 0, `keine unerwarteten Dateien im Publish-Verzeichnis${unexpected.length ? `: ${unexpected.join(', ')}` : ''}`);
assert(missing.length === 0, `alle allowlisteten Laufzeit-Dateien wurden veroeffentlicht${missing.length ? `; fehlen: ${missing.join(', ')}` : ''}`);
assert(!actual.some(file => /(?:^|\/)(?:knowledge-base|content|scripts|node_modules|\.git)(?:\/|$)/.test(file)), 'private Quellen und Build-Eingaben sind nicht im Publish-Verzeichnis');
assert(!actual.some(file => /CameraPlainVariable|Inter-Latin|RhymesDisplay|RobotoMono/i.test(file)), 'unversionierte Workspace-Schriften werden nicht lokal mitveroeffentlicht');

const netlifyConfig = await readFile(path.join(repoRoot, 'netlify.toml'), 'utf8');
assert(/publish\s*=\s*"dist"/.test(netlifyConfig), 'Netlify veroeffentlicht ausschliesslich dist');
