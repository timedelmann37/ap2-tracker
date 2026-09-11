import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const repoRoot = path.resolve(scriptDir, '..', '..');
export const DEFAULT_LOCAL_ROOT = path.resolve(scriptDir, '..', '..', 'knowledge-base', 'local');
export const DEFAULT_BATCH_LIMIT = 5;
export const MAX_CANDIDATE_CHARS = 2200;
const SOURCE_ALIASES = new Map([
  ['eu', 'europa-integratoren-2026'],
  ['ihk', 'ihk-bonn'],
  ['l69', 'itlf6-9-2022'],
  ['l1012', 'itlf10-12-2023'],
  ['basis', 'it-basiswissen-2012']
]);

export function usage() {
  return 'Nutzung: node scripts/knowledge/export-learning-batch.mjs --group <groupId> [--start <nullbasierter Index>] [--limit <Anzahl>]';
}

function parseUnsignedInteger(raw, option, { allowZero }) {
  if (!/^(0|[1-9]\d*)$/.test(raw || '')) {
    throw new Error(`${option} muss eine ganze ${allowZero ? 'nichtnegative' : 'positive'} Zahl sein.`);
  }
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || (!allowZero && value === 0)) {
    throw new Error(`${option} muss eine ganze ${allowZero ? 'nichtnegative' : 'positive'} Zahl sein.`);
  }
  return value;
}

export function parseArgs(argv) {
  const allowed = new Set(['--group', '--start', '--limit']);
  const values = new Map();

  for (let index = 0; index < argv.length; index += 2) {
    const option = argv[index];
    const value = argv[index + 1];
    if (!allowed.has(option)) throw new Error(`Unbekanntes Argument: ${option || '(leer)'}`);
    if (values.has(option)) throw new Error(`Argument doppelt angegeben: ${option}`);
    if (value === undefined || value.startsWith('--')) throw new Error(`Wert für ${option} fehlt.`);
    values.set(option, value);
  }

  const groupId = values.get('--group')?.trim();
  if (!groupId) throw new Error('--group ist erforderlich.');
  const start = values.has('--start')
    ? parseUnsignedInteger(values.get('--start'), '--start', { allowZero: true })
    : 0;
  const limit = values.has('--limit')
    ? parseUnsignedInteger(values.get('--limit'), '--limit', { allowZero: false })
    : DEFAULT_BATCH_LIMIT;

  return { groupId, start, limit };
}

export async function readJson(filePath) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Datei nicht lesbar: ${filePath} (${error.message})`);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Ungültiges JSON in ${filePath}: ${error.message}`);
  }
}

export async function readJsonLines(filePath) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Index nicht lesbar: ${filePath} (${error.message})`);
  }

  const records = [];
  for (const [index, line] of raw.split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    try {
      records.push(JSON.parse(line));
    } catch (error) {
      throw new Error(`Ungültiges JSONL in ${filePath}, Zeile ${index + 1}: ${error.message}`);
    }
  }
  return records;
}

function requireQueueShape(queue) {
  if (!queue || typeof queue !== 'object' || !Array.isArray(queue.groups)) {
    throw new Error('learning-queue.json besitzt keine gültige groups-Liste.');
  }
  if (!Array.isArray(queue.sources) || queue.sources.some(sourceId => typeof sourceId !== 'string')) {
    throw new Error('learning-queue.json besitzt keine gültige sources-Liste.');
  }
}

export function selectBatch(queue, options) {
  requireQueueShape(queue);
  const { groupId, start, limit } = options;
  if (typeof groupId !== 'string' || !groupId) throw new Error('groupId ist erforderlich.');
  if (!Number.isSafeInteger(start) || start < 0) throw new Error('start muss nullbasiert und nichtnegativ sein.');
  if (!Number.isSafeInteger(limit) || limit < 1) throw new Error('limit muss eine positive ganze Zahl sein.');

  const group = queue.groups.find(candidate => candidate.groupId === groupId);
  if (!group) throw new Error(`Unbekannte Themengruppe: ${groupId}`);
  if (!Array.isArray(group.items) || group.items.length === 0) {
    throw new Error(`Themengruppe ${groupId} enthält keine Kernthemen.`);
  }
  if (start >= group.items.length) {
    throw new Error(`--start ${start} liegt außerhalb der Themengruppe ${groupId} mit ${group.items.length} Kernthemen.`);
  }

  return {
    group,
    topics: group.items.slice(start, start + limit),
    range: {
      start,
      requestedLimit: limit,
      count: Math.min(limit, group.items.length - start),
      endExclusive: Math.min(start + limit, group.items.length),
      groupTotal: group.items.length
    }
  };
}

function recordKey(sourceId, recordId) {
  return `${sourceId}\u0000${recordId}`;
}

export async function loadSourceIndexes(localRoot, sourceIds) {
  const chunks = new Map();
  const figures = new Map();

  for (const sourceId of sourceIds) {
    const sourceRoot = path.join(localRoot, sourceId);
    const sourceChunks = await readJsonLines(path.join(sourceRoot, 'chunks.jsonl'));
    for (const chunk of sourceChunks) {
      if (chunk.sourceId !== sourceId || typeof chunk.chunkId !== 'string') {
        throw new Error(`Ungültiger Chunk-Datensatz in Quelle ${sourceId}.`);
      }
      const key = recordKey(sourceId, chunk.chunkId);
      if (chunks.has(key)) throw new Error(`Doppelter Chunk: ${chunk.chunkId}`);
      chunks.set(key, chunk);
    }

    const sourceFigures = await readJsonLines(path.join(sourceRoot, 'figures.jsonl'));
    for (const figure of sourceFigures) {
      if (figure.sourceId !== sourceId || typeof figure.figureId !== 'string') {
        throw new Error(`Ungültiger Grafik-Datensatz in Quelle ${sourceId}.`);
      }
      const key = recordKey(sourceId, figure.figureId);
      if (figures.has(key)) throw new Error(`Doppelte Grafik: ${figure.figureId}`);
      figures.set(key, figure);
    }
  }

  return { chunks, figures };
}

export function exactExcerpt(content, searchTerms, maxChars = MAX_CANDIDATE_CHARS) {
  if (content.length <= maxChars) return { content, contentStart: 0, contentEnd: content.length, truncated: false };
  const normalized = content.toLocaleLowerCase('de');
  const matches = (searchTerms || [])
    .filter(term => String(term).length >= 3)
    .map(term => normalized.indexOf(String(term).toLocaleLowerCase('de')))
    .filter(index => index >= 0);
  const focus = matches.length ? Math.min(...matches) : 0;
  const start = Math.max(0, focus - Math.floor(maxChars * 0.2));
  const end = Math.min(content.length, start + maxChars);
  return { content: content.slice(start, end), contentStart: start, contentEnd: end, truncated: true };
}

function resolveTextCandidate(candidate, indexes, itemId, searchTerms) {
  const chunk = indexes.chunks.get(recordKey(candidate.sourceId, candidate.chunkId));
  if (!chunk) {
    throw new Error(`${itemId}: Textkandidat ${candidate.chunkId} aus ${candidate.sourceId} ist nicht auflösbar.`);
  }
  if (typeof chunk.markdown !== 'string' || !chunk.markdown.trim()) {
    throw new Error(`${itemId}: Chunk ${candidate.chunkId} enthält keinen exakten Markdown-Inhalt.`);
  }

  const excerpt = exactExcerpt(chunk.markdown, searchTerms);
  return {
    sourceId: chunk.sourceId,
    chunkId: chunk.chunkId,
    candidateScore: candidate.score,
    pageNumber: chunk.pageNumber ?? candidate.pageNumber ?? null,
    heading: chunk.heading ?? candidate.heading ?? '',
    startLine: chunk.startLine ?? candidate.startLine ?? null,
    endLine: chunk.endLine ?? candidate.endLine ?? null,
    extractionMethod: chunk.extractionMethod ?? null,
    match: candidate.match || null,
    ...excerpt
  };
}

function resolveFigureCandidate(candidate, indexes, itemId) {
  const figure = indexes.figures.get(recordKey(candidate.sourceId, candidate.figureId));
  if (!figure) {
    throw new Error(`${itemId}: Grafikkandidat ${candidate.figureId} aus ${candidate.sourceId} ist nicht auflösbar.`);
  }
  return { candidateScore: candidate.score, ...figure };
}

function sourceFromPrefixedReference(reference, sourceIds) {
  const withoutLocator = String(reference).split('@')[0];
  const withoutMatch = withoutLocator.replace(/^[dc]:/, '');
  for (const sourceId of [...sourceIds].sort((left, right) => right.length - left.length)) {
    if (withoutMatch.startsWith(`${sourceId}:`)) {
      return { sourceId, recordId: withoutMatch, match: String(reference).startsWith('c:') ? 'context' : 'direct' };
    }
  }
  const separator = withoutMatch.indexOf(':');
  const alias = withoutMatch.slice(0, separator);
  const sourceId = SOURCE_ALIASES.get(alias);
  if (!sourceId || !sourceIds.includes(sourceId)) return null;
  return { sourceId, recordId: `${sourceId}:${withoutMatch.slice(separator + 1)}`, match: 'direct' };
}

export function curatedCandidates(record, sourceIds) {
  if (!record) return { text: [], figures: [], metadata: null };
  const text = Array.isArray(record.chunks)
    ? record.chunks.map(chunk => ({ sourceId: chunk.sourceId, chunkId: chunk.chunkId, score: chunk.score ?? null, match: chunk.match || 'direct' }))
    : (record.refs || []).map(reference => {
      const parsed = sourceFromPrefixedReference(reference, sourceIds);
      return parsed ? { sourceId: parsed.sourceId, chunkId: parsed.recordId, score: null, match: parsed.match } : null;
    }).filter(Boolean);
  const figures = (record.media || record.figures || []).map(reference => {
    if (typeof reference === 'object' && reference.sourceId && reference.figureId) return reference;
    const parsed = sourceFromPrefixedReference(reference, sourceIds);
    return parsed ? { sourceId: parsed.sourceId, figureId: parsed.recordId, score: null, match: parsed.match } : null;
  }).filter(Boolean);
  return {
    text,
    figures,
    metadata: {
      slug: record.slug || null,
      coverage: record.coverage || null,
      risk: record.risk || null,
      interaction: record.interaction || null
    }
  };
}

export async function loadCuratedItems(groupId, sourceIds, { root = repoRoot } = {}) {
  const domain = groupId.split('-')[0];
  const fileName = domain === 'wiso' ? 'wiso-source-map.json' : `${domain}-source-map.json`;
  const sourceMap = await readJson(path.join(root, 'content', 'curation', 'maps', fileName));
  return new Map((sourceMap.items || []).map(record => [record.itemId || record.item_id, curatedCandidates(record, sourceIds)]));
}

export function buildBatchPack(queue, options, indexes, curatedByItem = new Map()) {
  const selection = selectBatch(queue, options);
  if (!indexes?.chunks?.get || !indexes?.figures?.get) {
    throw new Error('Aufgelöste Chunk- und Grafikindizes fehlen.');
  }

  const topics = selection.topics.map(item => {
    if (!item || typeof item.itemId !== 'string' || typeof item.title !== 'string') {
      throw new Error(`Ungültiges Kernthema in ${selection.group.groupId}.`);
    }
    if (!Array.isArray(item.searchTerms) || item.searchTerms.length === 0) {
      throw new Error(`${item.itemId}: searchTerms fehlen.`);
    }

    const curated = curatedByItem.get(item.itemId);
    const preferredTextCandidates = curated?.text?.length ? [...curated.text, ...(item.textCandidates || [])] : (item.textCandidates || []);
    const selectedTextCandidates = [...new Map(preferredTextCandidates.map(candidate => [recordKey(candidate.sourceId, candidate.chunkId), candidate])).values()];
    const unresolvedTextReferences = selectedTextCandidates
      .filter(candidate => !indexes.chunks.has(recordKey(candidate.sourceId, candidate.chunkId)))
      .map(candidate => candidate.chunkId);
    const textCandidates = selectedTextCandidates
      .filter(candidate => indexes.chunks.has(recordKey(candidate.sourceId, candidate.chunkId)))
      .slice(0, 3)
      .map(candidate => resolveTextCandidate(candidate, indexes, item.itemId, item.searchTerms));
    const preferredFigureCandidates = curated?.figures?.length ? [...curated.figures, ...(item.figureCandidates || [])] : (item.figureCandidates || []);
    const selectedFigureCandidates = [...new Map(preferredFigureCandidates.map(candidate => [recordKey(candidate.sourceId, candidate.figureId), candidate])).values()];
    const unresolvedFigureReferences = selectedFigureCandidates
      .filter(candidate => !indexes.figures.has(recordKey(candidate.sourceId, candidate.figureId)))
      .map(candidate => candidate.figureId);
    const firstFigure = selectedFigureCandidates.find(candidate => indexes.figures.has(recordKey(candidate.sourceId, candidate.figureId)));
    const sourceMapping = curated?.metadata ? {
      ...curated.metadata,
      unresolvedTextReferences,
      unresolvedFigureReferences
    } : null;

    return {
      metadata: {
        itemId: item.itemId,
        title: item.title,
        status: item.status ?? null,
        learningUnit: item.learningUnit ?? null
      },
      searchTerms: [...item.searchTerms],
      sourceMapping,
      textCandidates,
      figureCandidate: firstFigure ? resolveFigureCandidate(firstFigure, indexes, item.itemId) : null
    };
  });

  const pack = {
    version: 1,
    kind: 'private-learning-batch',
    private: true,
    generatedFrom: 'knowledge-base/local/learning-queue.json',
    queueVersion: queue.version ?? null,
    group: {
      domain: selection.group.domain ?? null,
      groupId: selection.group.groupId,
      title: selection.group.title,
      week: selection.group.week ?? null,
      practice: selection.group.practice ?? null
    },
    range: selection.range,
    rightsPolicy: 'private-source-only; source content and figures must not be published directly',
    topics
  };

  validateBatchPack(pack);
  return pack;
}

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateBatchPack(pack) {
  if (!pack || pack.version !== 1 || pack.kind !== 'private-learning-batch' || pack.private !== true) {
    throw new Error('Batch-Pack-Kopf ist ungültig.');
  }
  if (!pack.group || !nonEmptyString(pack.group.groupId) || !nonEmptyString(pack.group.title)) {
    throw new Error('Batch-Pack-Gruppenmetadaten sind unvollständig.');
  }
  if (!pack.range || !Number.isSafeInteger(pack.range.start) || pack.range.start < 0
      || !Number.isSafeInteger(pack.range.requestedLimit) || pack.range.requestedLimit < 1
      || !Number.isSafeInteger(pack.range.count) || pack.range.count < 1
      || !Number.isSafeInteger(pack.range.endExclusive)
      || !Number.isSafeInteger(pack.range.groupTotal)) {
    throw new Error('Batch-Pack-Bereich ist ungültig.');
  }
  if (!Array.isArray(pack.topics) || pack.topics.length !== pack.range.count
      || pack.range.endExclusive !== pack.range.start + pack.range.count
      || pack.range.endExclusive > pack.range.groupTotal
      || pack.range.count > pack.range.requestedLimit) {
    throw new Error('Batch-Pack-Bereich und Kernthemen stimmen nicht überein.');
  }

  const itemIds = new Set();
  for (const topic of pack.topics) {
    if (!topic?.metadata || !nonEmptyString(topic.metadata.itemId) || !nonEmptyString(topic.metadata.title)) {
      throw new Error('Kernthema-Metadaten sind unvollständig.');
    }
    if (itemIds.has(topic.metadata.itemId)) throw new Error(`Doppeltes Kernthema im Batch: ${topic.metadata.itemId}`);
    itemIds.add(topic.metadata.itemId);
    if (!Array.isArray(topic.searchTerms) || topic.searchTerms.length === 0
        || topic.searchTerms.some(term => !nonEmptyString(term))) {
      throw new Error(`${topic.metadata.itemId}: searchTerms sind ungültig.`);
    }
    if (!Array.isArray(topic.textCandidates) || topic.textCandidates.length > 3) {
      throw new Error(`${topic.metadata.itemId}: Es sind höchstens drei Textkandidaten erlaubt.`);
    }
    for (const candidate of topic.textCandidates) {
      if (!nonEmptyString(candidate.sourceId) || !nonEmptyString(candidate.chunkId)
          || !nonEmptyString(candidate.content)) {
        throw new Error(`${topic.metadata.itemId}: Aufgelöster Textkandidat ist unvollständig.`);
      }
    }
    if (topic.figureCandidate !== null
        && (!nonEmptyString(topic.figureCandidate.sourceId)
          || !nonEmptyString(topic.figureCandidate.figureId)
          || !nonEmptyString(topic.figureCandidate.assetPath))) {
      throw new Error(`${topic.metadata.itemId}: Aufgelöster Grafikkandidat ist unvollständig.`);
    }
  }
  return true;
}

export function batchFileName(groupId, range) {
  const pad = value => String(value).padStart(3, '0');
  return `${groupId}-${pad(range.start)}-${pad(range.endExclusive - 1)}.json`;
}

export async function exportLearningBatch(options, { localRoot = DEFAULT_LOCAL_ROOT } = {}) {
  const queuePath = path.join(localRoot, 'learning-queue.json');
  const queue = await readJson(queuePath);
  const selection = selectBatch(queue, options);
  const curatedByItem = await loadCuratedItems(options.groupId, queue.sources);
  const sourceIds = new Set();
  for (const item of selection.topics) {
    const curated = curatedByItem.get(item.itemId);
    const textCandidates = [...(curated?.text || []), ...(item.textCandidates || [])];
    const figureCandidates = [...(curated?.figures || []), ...(item.figureCandidates || [])];
    for (const candidate of textCandidates.slice(0, 3)) sourceIds.add(candidate.sourceId);
    const figure = figureCandidates[0];
    if (figure) sourceIds.add(figure.sourceId);
  }
  const unknownSource = [...sourceIds].find(sourceId => !queue.sources.includes(sourceId));
  if (unknownSource) throw new Error(`Kandidat verweist auf unbekannte Quelle: ${unknownSource}`);

  const indexes = await loadSourceIndexes(localRoot, [...sourceIds].sort());
  const pack = buildBatchPack(queue, options, indexes, curatedByItem);
  const outputDir = path.join(localRoot, 'batches');
  const outputPath = path.join(outputDir, batchFileName(options.groupId, pack.range));
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(pack)}\n`, 'utf8');
  return { outputPath, pack };
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const result = await exportLearningBatch(options);
    console.log(`Batch exportiert: ${result.outputPath}`);
    console.log(`${result.pack.group.groupId}: ${result.pack.range.count} Kernthemen ab Index ${result.pack.range.start}`);
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    console.error(usage());
    process.exitCode = 1;
  }
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]).toLocaleLowerCase('en-US') === path.resolve(scriptPath).toLocaleLowerCase('en-US');
if (isMain) await main();
