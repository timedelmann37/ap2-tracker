import { createHash } from 'node:crypto';
import { access, copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const localRoot = path.join(repoRoot, 'knowledge-base', 'local');
const sourceCatalogPath = path.join(repoRoot, 'content', 'sources.json');
const allowedExtensions = new Set(['.md', '.json', '.jpeg', '.jpg', '.png', '.webp']);

function parseSourceArgs(argv) {
  const pairs = [];
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] !== '--source') continue;
    const value = argv[index + 1];
    if (!value || !value.includes('=')) {
      throw new Error('Nach --source wird ID=ORDNER erwartet.');
    }
    const separator = value.indexOf('=');
    pairs.push({ id: value.slice(0, separator), sourceRoot: path.resolve(value.slice(separator + 1)) });
    index += 1;
  }
  if (!pairs.length) throw new Error('Mindestens eine --source ID=ORDNER-Angabe ist erforderlich.');
  return pairs;
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function walk(root, current = root) {
  const { readdir } = await import('node:fs/promises');
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(current, entry.name);
    if (entry.isDirectory()) files.push(...await walk(root, absolute));
    else if (entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push({ absolute, relative: path.relative(root, absolute) });
    }
  }
  return files.sort((left, right) => left.relative.localeCompare(right.relative, 'de'));
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function normalizeSearchText(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_#$>|\\{}\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractChunks(sourceId, markdown) {
  const lines = markdown.split(/\r?\n/);
  const chunks = [];
  let heading = 'Dokumentanfang';
  let level = 0;
  let startLine = 1;
  let buffer = [];

  const flush = endLine => {
    const body = buffer.join('\n').trim();
    if (!body) return;
    chunks.push({
      sourceId,
      chunkId: `${sourceId}:${String(chunks.length + 1).padStart(5, '0')}`,
      heading,
      level,
      startLine,
      endLine,
      markdown: body,
      searchText: normalizeSearchText(`${heading}\n${body}`)
    });
  };

  lines.forEach((line, index) => {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) {
      buffer.push(line);
      return;
    }
    flush(index);
    heading = match[2].replace(/\s+#+$/, '').trim();
    level = match[1].length;
    startLine = index + 1;
    buffer = [line];
  });
  flush(lines.length);
  return chunks;
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
}

function extractTables(sourceId, markdown) {
  const lines = markdown.split(/\r?\n/);
  const tables = [];
  let heading = 'Dokumentanfang';
  for (let index = 0; index < lines.length; index += 1) {
    const headingMatch = /^(#{1,6})\s+(.+?)\s*$/.exec(lines[index]);
    if (headingMatch) heading = headingMatch[2].trim();
    if (!lines[index].includes('|') || index + 1 >= lines.length) continue;
    const divider = lines[index + 1].trim();
    if (!/^\|?\s*:?-{3,}/.test(divider) || !divider.includes('|')) continue;

    const startLine = index + 1;
    const rows = [splitTableRow(lines[index])];
    index += 2;
    while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
      rows.push(splitTableRow(lines[index]));
      index += 1;
    }
    tables.push({
      sourceId,
      tableId: `${sourceId}:table:${String(tables.length + 1).padStart(4, '0')}`,
      heading,
      startLine,
      endLine: index,
      columns: rows[0],
      rows: rows.slice(1)
    });
    index -= 1;
  }
  return tables;
}

async function importSource(definition, sourceRoot) {
  if (!await exists(sourceRoot)) throw new Error(`Quellordner nicht gefunden: ${sourceRoot}`);
  const files = await walk(sourceRoot);
  const markdownFiles = files.filter(file => path.extname(file.relative).toLowerCase() === '.md');
  if (!markdownFiles.length) throw new Error(`Keine Markdown-Datei in ${sourceRoot} gefunden.`);

  const targetRoot = path.join(localRoot, definition.id);
  const rawRoot = path.join(targetRoot, 'raw');
  await mkdir(rawRoot, { recursive: true });

  const records = [];
  for (const file of files) {
    const buffer = await readFile(file.absolute);
    const destination = path.join(rawRoot, file.relative);
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(file.absolute, destination);
    const info = await stat(file.absolute);
    records.push({
      path: file.relative.replaceAll('\\', '/'),
      bytes: info.size,
      sha256: sha256(buffer),
      type: path.extname(file.relative).slice(1).toLowerCase()
    });
  }

  const largestMarkdown = (await Promise.all(markdownFiles.map(async file => ({
    ...file,
    size: (await stat(file.absolute)).size
  })))).sort((left, right) => right.size - left.size)[0];
  const markdown = await readFile(largestMarkdown.absolute, 'utf8');
  const chunks = extractChunks(definition.id, markdown);
  const tables = extractTables(definition.id, markdown);
  const assets = records.filter(record => ['jpeg', 'jpg', 'png', 'webp'].includes(record.type));

  await writeFile(path.join(targetRoot, 'chunks.jsonl'), `${chunks.map(item => JSON.stringify(item)).join('\n')}\n`, 'utf8');
  await writeFile(path.join(targetRoot, 'tables.jsonl'), `${tables.map(item => JSON.stringify(item)).join('\n')}\n`, 'utf8');
  await writeFile(path.join(targetRoot, 'assets.jsonl'), `${assets.map(item => JSON.stringify(item)).join('\n')}\n`, 'utf8');

  const manifest = {
    source: definition,
    originalPath: sourceRoot,
    primaryMarkdown: largestMarkdown.relative.replaceAll('\\', '/'),
    stats: {
      files: records.length,
      markdownFiles: markdownFiles.length,
      images: assets.length,
      chunks: chunks.length,
      tables: tables.length,
      bytes: records.reduce((total, record) => total + record.bytes, 0)
    },
    files: records
  };
  await writeFile(path.join(targetRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

const requested = parseSourceArgs(process.argv.slice(2));
const catalog = JSON.parse(await readFile(sourceCatalogPath, 'utf8'));
const definitions = new Map(catalog.sources.map(source => [source.id, source]));
await mkdir(localRoot, { recursive: true });

const manifests = [];
for (const request of requested) {
  const definition = definitions.get(request.id);
  if (!definition) throw new Error(`Unbekannte Quellen-ID: ${request.id}`);
  process.stdout.write(`Importiere ${definition.title} ... `);
  const manifest = await importSource(definition, request.sourceRoot);
  manifests.push(manifest);
  process.stdout.write(`${manifest.stats.files} Dateien, ${manifest.stats.chunks} Abschnitte, ${manifest.stats.tables} Tabellen\n`);
}

let previousSources = [];
const combinedCatalogPath = path.join(localRoot, 'catalog.json');
if (await exists(combinedCatalogPath)) {
  try {
    previousSources = JSON.parse(await readFile(combinedCatalogPath, 'utf8')).sources || [];
  } catch {
    previousSources = [];
  }
}
const combinedById = new Map(previousSources.map(source => [source.id, source]));
for (const manifest of manifests) {
  combinedById.set(manifest.source.id, {
    id: manifest.source.id,
    title: manifest.source.title,
    originalPath: manifest.originalPath,
    stats: manifest.stats
  });
}
const sourceOrder = new Map(catalog.sources.map((source, index) => [source.id, index]));
const combined = {
  version: 1,
  sources: [...combinedById.values()].sort((left, right) => (sourceOrder.get(left.id) ?? 999) - (sourceOrder.get(right.id) ?? 999))
};
await writeFile(combinedCatalogPath, `${JSON.stringify(combined, null, 2)}\n`, 'utf8');
console.log(`Lokale Wissensbasis: ${localRoot}`);
