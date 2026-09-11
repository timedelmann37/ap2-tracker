import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const localRoot = path.join(repoRoot, 'knowledge-base', 'local');
const outputPath = path.join(localRoot, 'learning-queue.json');
const coveragePath = path.join(repoRoot, 'docs', 'LEARNING_COVERAGE.json');

const areas = [
  { domain: 'GA1', file: 'konzeption-administration/index.html' },
  { domain: 'GA2', file: 'netzwerke/index.html' },
  { domain: 'WiSo', file: 'sowi/index.html' }
];

const stopwords = new Set([
  'aber', 'alle', 'als', 'am', 'an', 'auch', 'aus', 'bei', 'bzw', 'das', 'dem', 'den', 'der', 'des',
  'die', 'durch', 'ein', 'eine', 'einem', 'einen', 'einer', 'eines', 'für', 'gegen', 'im', 'in', 'ist',
  'je', 'können', 'mit', 'nach', 'nicht', 'oder', 'pro', 'sowie', 'und', 'vom', 'von', 'vs', 'was',
  'welche', 'wie', 'wird', 'zu', 'zum', 'zur', 'zwischen'
]);

const expansions = new Map([
  ['usv', ['unterbrechungsfreie', 'stromversorgung']],
  ['raid', ['redundant', 'disk', 'festplattenverbund']],
  ['rto', ['recovery', 'time', 'wiederanlaufzeit']],
  ['rpo', ['recovery', 'point', 'datenverlust']],
  ['nas', ['network', 'attached', 'storage', 'dateispeicher']],
  ['san', ['storage', 'area', 'network', 'blockspeicher']],
  ['ssd', ['solid', 'state', 'drive']],
  ['hdd', ['hard', 'disk', 'festplatte']],
  ['nvme', ['nonvolatile', 'memory', 'express']],
  ['dsgvo', ['datenschutz', 'grundverordnung']],
  ['pue', ['power', 'usage', 'effectiveness']],
  ['sla', ['service', 'level', 'agreement']],
  ['tco', ['total', 'cost', 'ownership']],
  ['vpn', ['virtual', 'private', 'network']],
  ['dns', ['domain', 'name', 'system']],
  ['dhcp', ['dynamic', 'host', 'configuration']],
  ['vlan', ['virtual', 'local', 'area', 'network']],
  ['ipv4', ['internet', 'protocol']],
  ['ipv6', ['internet', 'protocol']],
  ['osi', ['schichtenmodell']],
  ['sql', ['datenbank', 'abfrage']],
  ['uml', ['modellierung', 'diagramm']]
]);

function normalize(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('de')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9+.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchTerms(title) {
  const tokens = normalize(title)
    .split(' ')
    .filter(token => token.length >= 3 && !stopwords.has(token));
  const result = new Set(tokens);
  for (const token of tokens) {
    for (const expansion of expansions.get(token) || []) result.add(expansion);
  }
  return [...result];
}

function extractCurriculum(html, fileName) {
  const start = html.indexOf('const DATA =');
  if (start < 0) throw new Error(`${fileName}: const DATA fehlt.`);
  const arrayStart = html.indexOf('[', start);
  const endMarker = html.indexOf('\n];', arrayStart);
  if (arrayStart < 0 || endMarker < 0) throw new Error(`${fileName}: DATA-Array kann nicht gelesen werden.`);
  const literal = html.slice(arrayStart, endMarker + 2);
  return vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });
}

async function readJsonLines(filePath) {
  const raw = await readFile(filePath, 'utf8');
  return raw.split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
}

function scoreCandidate(candidate, terms, kind) {
  const haystack = candidate.normalizedSearch;
  if (!haystack) return 0;
  let score = 0;
  for (const term of terms) {
    if (!haystack.includes(term)) continue;
    score += term.length >= 8 ? 5 : term.length >= 5 ? 3 : 2;
    if (candidate.normalizedHeading.includes(term)) score += 3;
  }
  if (kind === 'figure' && candidate.remakeRecommendation === 'redraw') score += 2;
  return score;
}

function bestCandidates(candidates, terms, kind, limit) {
  return candidates
    .map(candidate => ({ candidate, score: scoreCandidate(candidate, terms, kind) }))
    .filter(result => result.score >= 4)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ candidate, score }) => kind === 'figure' ? {
      sourceId: candidate.sourceId,
      figureId: candidate.figureId,
      pageNumber: candidate.pageNumber ?? null,
      heading: candidate.heading || '',
      assetPath: candidate.assetPath,
      remakeRecommendation: candidate.remakeRecommendation,
      score
    } : {
      sourceId: candidate.sourceId,
      chunkId: candidate.chunkId,
      pageNumber: candidate.pageNumber ?? null,
      heading: candidate.heading || '',
      startLine: candidate.startLine ?? null,
      endLine: candidate.endLine ?? null,
      score
    });
}

const manifest = JSON.parse(await readFile(path.join(repoRoot, 'content', 'learning-manifest.json'), 'utf8'));
const implementedByItem = new Map(manifest.topics.map(topic => [topic.itemId, topic]));
const localCatalog = JSON.parse(await readFile(path.join(localRoot, 'catalog.json'), 'utf8'));
const allChunks = [];
const allFigures = [];

for (const source of localCatalog.sources) {
  const chunks = await readJsonLines(path.join(localRoot, source.id, 'chunks.jsonl'));
  const figures = await readJsonLines(path.join(localRoot, source.id, 'figures.jsonl'));
  allChunks.push(...chunks.map(candidate => ({
    ...candidate,
    normalizedSearch: normalize(candidate.searchText || `${candidate.heading || ''} ${candidate.markdown || ''}`),
    normalizedHeading: normalize(candidate.heading || '')
  })));
  allFigures.push(...figures.map(candidate => ({
    ...candidate,
    normalizedSearch: normalize(candidate.searchText || `${candidate.heading || ''} ${candidate.contextText || ''}`),
    normalizedHeading: normalize(candidate.heading || '')
  })));
}

const groups = [];
for (const area of areas) {
  const html = await readFile(path.join(repoRoot, area.file), 'utf8');
  const data = extractCurriculum(html, area.file);
  const domain = data.find(entry => entry.id === area.domain.toLocaleLowerCase('de')) || data[0];
  for (const group of domain.topics) {
    const items = group.items.map((title, index) => {
      if (typeof title !== 'string') return null;
      const itemId = `${group.id}__${index}`;
      const implemented = implementedByItem.get(itemId);
      const terms = searchTerms(title);
      return {
        itemId,
        title,
        status: implemented ? 'implemented' : 'unmapped',
        learningUnit: implemented ? `/lernen/${implemented.slug}/` : null,
        searchTerms: terms,
        textCandidates: bestCandidates(allChunks, terms, 'text', 6),
        figureCandidates: bestCandidates(allFigures, terms, 'figure', 4)
      };
    }).filter(Boolean);
    groups.push({
      domain: area.domain,
      groupId: group.id,
      title: group.title,
      week: group.week,
      practice: group.practice || '',
      items
    });
  }
}

const counts = groups.reduce((totals, group) => {
  totals.total += group.items.length;
  totals.implemented += group.items.filter(item => item.status === 'implemented').length;
  return totals;
}, { total: 0, implemented: 0 });

const queue = {
  version: 1,
  generatedFrom: areas.map(area => area.file),
  sources: localCatalog.sources.map(source => source.id),
  summary: { ...counts, remaining: counts.total - counts.implemented },
  groups
};

const coverage = {
  version: 1,
  summary: queue.summary,
  domains: areas.map(area => {
    const domainGroups = groups.filter(group => group.domain === area.domain);
    const total = domainGroups.reduce((sum, group) => sum + group.items.length, 0);
    const implemented = domainGroups.reduce((sum, group) => sum + group.items.filter(item => item.status === 'implemented').length, 0);
    return { domain: area.domain, total, implemented, remaining: total - implemented };
  }),
  groups: groups.map(group => ({
    domain: group.domain,
    groupId: group.groupId,
    title: group.title,
    total: group.items.length,
    implemented: group.items.filter(item => item.status === 'implemented').length,
    items: group.items.map(item => ({
      itemId: item.itemId,
      title: item.title,
      status: item.status,
      learningUnit: item.learningUnit
    }))
  }))
};

await mkdir(localRoot, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
await writeFile(coveragePath, `${JSON.stringify(coverage, null, 2)}\n`, 'utf8');

console.log(`Lernwarteschlange: ${counts.implemented}/${counts.total} Kernthemen umgesetzt, ${counts.total - counts.implemented} offen.`);
console.log(`Privat: ${path.relative(repoRoot, outputPath)}`);
console.log(`Abdeckung: ${path.relative(repoRoot, coveragePath)}`);
