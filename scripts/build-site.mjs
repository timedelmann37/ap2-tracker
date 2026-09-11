import { execFileSync } from 'node:child_process';
import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const outputRoot = path.resolve(repoRoot, 'dist');

if (path.dirname(outputRoot) !== repoRoot || path.basename(outputRoot) !== 'dist') {
  throw new Error(`Unsicheres Build-Ziel: ${outputRoot}`);
}

await import('./build-learning.mjs');
await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const assetExtensions = new Set(['.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.woff', '.woff2', '.ttf', '.txt', '.ico', '.webmanifest']);
const pageRoots = ['uebersicht/', 'konzeption-administration/', 'netzwerke/', 'sowi/', 'lernpfad/', 'lernen/', 'simulation/', 'tracker/'];

function isRuntimePath(relative) {
  const normalized = relative.replaceAll('\\', '/');
  if (normalized === 'index.html' || normalized === 'exam_2023_1_GA2.js') return true;
  if (normalized.startsWith('assets/')) return assetExtensions.has(path.extname(normalized).toLowerCase());
  return pageRoots.some(root => normalized.startsWith(root)) && ['.html', '.js'].includes(path.extname(normalized).toLowerCase());
}

const trackedFiles = execFileSync('git', ['ls-files', '-z'], { cwd: repoRoot, encoding: 'utf8' })
  .split('\0').filter(Boolean).filter(isRuntimePath);

// Diese Dateien entstehen beziehungsweise werden erstmals Teil dieses Features.
// Lernbilder werden nur übernommen, wenn eine generierte Seite sie tatsächlich referenziert.
const generatedFiles = new Set([
  'assets/ap2-learning-catalog.js',
  'assets/ap2-learning.css',
  'assets/ap2-learning.js',
  'assets/ap2-progress-merge.js'
]);
const learningManifest = JSON.parse(await readFile(path.join(repoRoot, 'content', 'learning-manifest.json'), 'utf8'));
for (const topic of learningManifest.topics) {
  const pagePath = `lernen/${topic.slug}/index.html`;
  generatedFiles.add(pagePath);
  const page = await readFile(path.join(repoRoot, pagePath), 'utf8');
  for (const match of page.matchAll(/(?:src|href)="\/(assets\/learning\/[a-z0-9._/-]+)"/gi)) {
    if (match[1].includes('..')) throw new Error(`Unsicherer Lern-Asset-Pfad: ${match[1]}`);
    generatedFiles.add(match[1]);
  }
}

const publicFiles = [...new Set([...trackedFiles, ...generatedFiles])].sort();
for (const relative of publicFiles) {
  const source = path.join(repoRoot, relative);
  try {
    const info = await stat(source);
    if (!info.isFile()) throw new Error('kein regulaeres Datei-Artefakt');
  } catch (error) {
    throw new Error(`Oeffentliches Build-Artefakt fehlt: ${relative} (${error.message})`);
  }
  const target = path.join(outputRoot, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target);
}

console.log(`Site-Build bereit: ${outputRoot} (${publicFiles.length} Dateien)`);
