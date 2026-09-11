import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  batchFileName,
  buildBatchPack,
  curatedCandidates,
  DEFAULT_BATCH_LIMIT,
  exactExcerpt,
  loadSourceIndexes,
  parseArgs,
  readJson,
  selectBatch,
  validateBatchPack
} from './export-learning-batch.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const localRoot = path.resolve(scriptDir, '..', '..', 'knowledge-base', 'local');

function pass(message) {
  console.log(`PASS ${message}`);
}

function expectError(action, pattern, message) {
  assert.throws(action, pattern);
  pass(message);
}

function indexKey(sourceId, recordId) {
  return `${sourceId}\u0000${recordId}`;
}

const defaults = parseArgs(['--group', 'ga1-1']);
assert.deepEqual(defaults, { groupId: 'ga1-1', start: 0, limit: DEFAULT_BATCH_LIMIT });
pass('CLI verwendet sichere Standardwerte für Start und Batchgröße');

assert.deepEqual(
  parseArgs(['--limit', '3', '--group', 'wiso-6', '--start', '2']),
  { groupId: 'wiso-6', start: 2, limit: 3 }
);
pass('CLI akzeptiert Argumente unabhängig von ihrer Reihenfolge');

const excerptSource = `${'Vorlauf '.repeat(500)}OSI TCP IP${' Nachlauf'.repeat(500)}`;
const excerpt = exactExcerpt(excerptSource, ['osi', 'tcp']);
assert(excerpt.truncated);
assert.equal(excerpt.content, excerptSource.slice(excerpt.contentStart, excerpt.contentEnd));
assert(excerpt.content.includes('OSI TCP IP'));
pass('lange Quellenchunks werden als exakte, suchwortzentrierte Ausschnitte exportiert');

const mapped = curatedCandidates({
  slug: 'tcp-ip-osi-zuordnung',
  coverage: 'F',
  risk: 'L',
  interaction: 'Schichten paaren',
  refs: ['d:europa-integratoren-2026:00305', 'd:itlf10-12-2023:page:0009'],
  media: ['itlf10-12-2023:layout:0125:02@p125']
}, ['europa-integratoren-2026', 'itlf10-12-2023']);
assert.deepEqual(mapped.text.map(candidate => candidate.chunkId), [
  'europa-integratoren-2026:00305',
  'itlf10-12-2023:page:0009'
]);
assert.equal(mapped.figures[0].figureId, 'itlf10-12-2023:layout:0125:02');
assert.equal(mapped.metadata.interaction, 'Schichten paaren');
pass('kuratiertes Quellenmapping hat Vorrang vor unscharfen Stichworttreffern');

expectError(() => parseArgs([]), /--group ist erforderlich/, 'fehlende Themengruppe wird abgelehnt');
expectError(() => parseArgs(['--group', 'ga1-1', '--start', '-1']), /--start/, 'negativer Startindex wird abgelehnt');
expectError(() => parseArgs(['--group', 'ga1-1', '--limit', '0']), /--limit/, 'leere Batchgröße wird abgelehnt');
expectError(() => parseArgs(['--group', 'ga1-1', '--limit', '1.5']), /--limit/, 'nicht-ganzzahlige Batchgröße wird abgelehnt');
expectError(() => parseArgs(['--group', 'ga1-1', '--other', '2']), /Unbekanntes Argument/, 'unbekannte Argumente werden abgelehnt');
expectError(() => parseArgs(['--group', 'ga1-1', '--group', 'ga1-2']), /doppelt/, 'doppelte Argumente werden abgelehnt');

const queue = await readJson(path.join(localRoot, 'learning-queue.json'));
assert(Array.isArray(queue.groups) && queue.groups.length > 0);
pass('private Lernqueue ist offline lesbar');

expectError(
  () => selectBatch(queue, { groupId: 'unbekannt', start: 0, limit: 1 }),
  /Unbekannte Themengruppe/,
  'unbekannte Themengruppen werden abgelehnt'
);

const group = queue.groups.find(candidate => candidate.items?.length >= 2);
assert(group, 'Test benötigt eine Themengruppe mit mindestens zwei Kernthemen');
expectError(
  () => selectBatch(queue, { groupId: group.groupId, start: group.items.length, limit: 1 }),
  /außerhalb/,
  'Startindex hinter dem Gruppenende wird abgelehnt'
);

const options = { groupId: group.groupId, start: 0, limit: 2 };
const selection = selectBatch(queue, options);
const requiredSourceIds = new Set();
for (const item of selection.topics) {
  for (const candidate of (item.textCandidates || []).slice(0, 3)) requiredSourceIds.add(candidate.sourceId);
  const figure = (item.figureCandidates || [])[0];
  if (figure) requiredSourceIds.add(figure.sourceId);
}
const indexes = await loadSourceIndexes(localRoot, [...requiredSourceIds].sort());
const pack = buildBatchPack(queue, options, indexes);
assert.equal(validateBatchPack(pack), true);
assert.equal(pack.topics.length, 2);
assert.equal(pack.private, true);
assert.equal(pack.kind, 'private-learning-batch');
pass('Batch-Pack wird ohne Netzwerk aus der lokalen Queue und den lokalen Indizes gebaut');

for (const [topicIndex, exportedTopic] of pack.topics.entries()) {
  const queuedTopic = selection.topics[topicIndex];
  assert.equal(exportedTopic.metadata.itemId, queuedTopic.itemId);
  assert.deepEqual(exportedTopic.searchTerms, queuedTopic.searchTerms);
  assert.equal(exportedTopic.textCandidates.length, Math.min(3, queuedTopic.textCandidates?.length || 0));

  for (const [candidateIndex, exportedCandidate] of exportedTopic.textCandidates.entries()) {
    const queuedCandidate = queuedTopic.textCandidates[candidateIndex];
    const sourceChunk = indexes.chunks.get(indexKey(queuedCandidate.sourceId, queuedCandidate.chunkId));
    assert(sourceChunk, `Chunk ${queuedCandidate.chunkId} muss auflösbar sein`);
    assert.equal(exportedCandidate.sourceId, queuedCandidate.sourceId);
    assert.equal(exportedCandidate.chunkId, queuedCandidate.chunkId);
    assert.equal(exportedCandidate.candidateScore, queuedCandidate.score);
    assert.equal(exportedCandidate.content, sourceChunk.markdown.slice(exportedCandidate.contentStart, exportedCandidate.contentEnd));
  }

  const queuedFigure = (queuedTopic.figureCandidates || [])[0];
  if (queuedFigure) {
    const sourceFigure = indexes.figures.get(indexKey(queuedFigure.sourceId, queuedFigure.figureId));
    assert(sourceFigure, `Grafik ${queuedFigure.figureId} muss auflösbar sein`);
    assert.equal(exportedTopic.figureCandidate.figureId, queuedFigure.figureId);
    assert.equal(exportedTopic.figureCandidate.candidateScore, queuedFigure.score);
    for (const [key, value] of Object.entries(sourceFigure)) {
      assert.deepEqual(exportedTopic.figureCandidate[key], value);
    }
  } else {
    assert.equal(exportedTopic.figureCandidate, null);
  }
}
pass('Top-3-Textinhalte und Top-1-Grafikmetadaten entsprechen exakt den Quelldatensätzen');

const missingCuratedFigure = new Map([[selection.topics[0].itemId, {
  text: [],
  figures: [{ sourceId: queue.sources[0], figureId: `${queue.sources[0]}:missing-figure` }],
  metadata: { slug: 'test', coverage: 'P', risk: 'M', interaction: 'test' }
}]]);
const packWithMissingFigure = buildBatchPack(queue, options, indexes, missingCuratedFigure);
assert(packWithMissingFigure.topics[0].sourceMapping.unresolvedFigureReferences.includes(`${queue.sources[0]}:missing-figure`));
pass('fehlende kuratierte Grafiken werden gemeldet, ohne den gesamten Batch zu blockieren');

const finalStart = group.items.length - 1;
const finalSelection = selectBatch(queue, { groupId: group.groupId, start: finalStart, limit: 5 });
assert.equal(finalSelection.range.count, 1);
assert.equal(finalSelection.range.endExclusive, group.items.length);
assert.equal(batchFileName(group.groupId, finalSelection.range), `${group.groupId}-${String(finalStart).padStart(3, '0')}-${String(finalStart).padStart(3, '0')}.json`);
pass('letzter Teilbatch wird begrenzt und erhält einen deterministischen Dateinamen');

const tooManyCandidates = structuredClone(pack);
tooManyCandidates.topics[0].textCandidates.push(
  structuredClone(tooManyCandidates.topics[0].textCandidates[0])
);
expectError(
  () => validateBatchPack(tooManyCandidates),
  /höchstens drei Textkandidaten/,
  'Verifier lehnt mehr als drei Textkandidaten ab'
);

const missingContent = structuredClone(pack);
missingContent.topics[0].textCandidates[0].content = '';
expectError(
  () => validateBatchPack(missingContent),
  /Textkandidat ist unvollständig/,
  'Verifier lehnt nicht aufgelösten Chunk-Inhalt ab'
);

const invalidRange = structuredClone(pack);
invalidRange.range.count += 1;
expectError(
  () => validateBatchPack(invalidRange),
  /Bereich und Kernthemen stimmen nicht überein/,
  'Verifier lehnt widersprüchliche Bereichsmetadaten ab'
);

console.log(`OK Lernbatch-Vertrag verifiziert (${pack.group.groupId}, ${pack.topics.length} Kernthemen).`);
