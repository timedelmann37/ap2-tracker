import { createHash } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
let failures = 0;

function check(condition, message) {
  if (condition) console.log(`PASS ${message}`);
  else {
    failures += 1;
    console.error(`FAIL ${message}`);
  }
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

const sourceCatalog = JSON.parse(await readFile(path.join(repoRoot, 'content', 'sources.json'), 'utf8'));
const sourceIds = new Set(sourceCatalog.sources.map(source => source.id));
const manifest = JSON.parse(await readFile(path.join(repoRoot, 'content', 'learning-manifest.json'), 'utf8'));
const areaHtmlByDomain = new Map(await Promise.all([
  ['GA1', 'konzeption-administration/index.html'],
  ['GA2', 'netzwerke/index.html'],
  ['WiSo', 'sowi/index.html']
].map(async ([domain, file]) => [domain, await readFile(path.join(repoRoot, file), 'utf8')])));
const learningIndex = await readFile(path.join(repoRoot, 'lernpfad', 'index.html'), 'utf8');
const learningTemplate = await readFile(path.join(repoRoot, 'scripts', 'templates', 'learning-page.html'), 'utf8');
const learningCoverage = JSON.parse(await readFile(path.join(repoRoot, 'docs', 'LEARNING_COVERAGE.json'), 'utf8'));
const legacySources = (await readdir(path.join(repoRoot, 'content', 'learning'))).filter(file => file.endsWith('.md'));
const compactSources = (await readdir(path.join(repoRoot, 'content', 'learning-units'))).filter(file => file.endsWith('.unit.json'));
const compactSourceBySlug = new Map();
for (const file of compactSources) {
  const raw = await readFile(path.join(repoRoot, 'content', 'learning-units', file), 'utf8');
  compactSourceBySlug.set(JSON.parse(raw).meta.slug, { file, raw });
}

check(sourceCatalog.sources.length === 5, 'fünf bereitgestellte Buchquellen werden im Quellenkatalog geführt');
check(sourceIds.size === sourceCatalog.sources.length, 'Quellen-IDs sind eindeutig');
check(new Set(sourceCatalog.sources.map(source => source.role)).size >= 3, 'Quellen besitzen unterschiedliche Rollen statt gleicher Gewichtung');
check(manifest.topics.length >= 3, 'Lernmanifest enthält mindestens drei kuratierte Kernthemen');
check(manifest.topics.length === legacySources.length + compactSources.length, 'Legacy-Markdown und kompakte Spezifikationen werden gemeinsam gebaut');
check(manifest.topics.filter(topic => topic.sourceKind === 'compact-spec').length === compactSources.length, 'Manifest kennzeichnet jede kompakte Spezifikation');
check(learningCoverage.summary.total === 380, 'Abdeckungsliste enthält alle 380 kanonischen Kernthemen');
check(learningCoverage.summary.implemented === manifest.topics.length, 'Abdeckungsliste und Lernmanifest stimmen überein');
check(learningCoverage.domains.every(domain => domain.total > 0), 'Abdeckungsliste umfasst GA1, GA2 und WiSo');

for (const [domain, fileName] of [['GA1', 'ga1-source-map.json'], ['GA2', 'ga2-source-map.json'], ['WiSo', 'wiso-source-map.json']]) {
  const sourceMap = JSON.parse(await readFile(path.join(repoRoot, 'content', 'curation', 'maps', fileName), 'utf8'));
  const mappedIds = (sourceMap.items || []).map(item => item.itemId || item.item_id);
  const canonicalIds = learningCoverage.groups
    .filter(group => group.domain === domain)
    .flatMap(group => group.items.map(item => item.itemId));
  check(mappedIds.length === canonicalIds.length, `${domain}: Quellenmapping deckt jedes Kernthema genau einmal ab`);
  check(new Set(mappedIds).size === mappedIds.length, `${domain}: Quellenmapping enthält keine doppelten Kernthemen`);
  check(canonicalIds.every(itemId => mappedIds.includes(itemId)), `${domain}: Quellenmapping stimmt mit dem kanonischen Stoffbaum überein`);
}
check(!learningIndex.includes('id="tab-plan"') && !learningIndex.includes('id="pane-plan"'), 'Lernbereich dupliziert den Wochenplan nicht als leeren Tab');
check(learningIndex.includes('button class="group-head"') && learningIndex.includes('aria-expanded='), 'Lerngruppen sind semantische, tastaturbedienbare Schalter');
check(learningTemplate.includes('{{DOMAIN_PATH}}') && learningTemplate.includes('{{DOMAIN_CLASS}}'), 'Lernseiten-Template ist für GA1, GA2 und WiSo bereichsneutral');

for (const topic of manifest.topics) {
  const pagePath = path.join(repoRoot, 'lernen', topic.slug, 'index.html');
  check(await exists(pagePath), `generierte Lernseite /lernen/${topic.slug}/ existiert`);
  if (!await exists(pagePath)) continue;
  const page = await readFile(pagePath, 'utf8');
  check(page.includes(`data-progress-id="${topic.itemId}"`), `${topic.slug}: kanonischer Fortschritts-Schlüssel ist eingebettet`);
  check(page.includes(`data-content-revision="${topic.contentRevision}"`), `${topic.slug}: Inhaltsrevision ist eingebettet`);
  check(['CURATED_DRAFT', 'DIDACTICALLY_REVIEWED', 'PUBLICATION_READY'].includes(topic.contentStatus), `${topic.slug}: Kurationsstatus ist im Manifest`);
  check(Array.isArray(topic.learningObjectives) && topic.learningObjectives.length >= 2, `${topic.slug}: Lernziele sind maschinenlesbar`);
  check(page.includes('/assets/ap2-learning.js'), `${topic.slug}: gemeinsame Interaktionslogik ist eingebunden`);
  check(page.includes('data-quiz='), `${topic.slug}: Selbsttest ist vorhanden`);
  check(page.includes('data-flashcard='), `${topic.slug}: Karteikarten sind vorhanden`);
  check(page.includes('class="learning-figure"') || page.includes('<math') || page.includes('data-failure-simulator='), `${topic.slug}: fachliche Visualisierung lockert die Einheit auf`);
  check(page.includes('data-required-objective='), `${topic.slug}: Abschluss ist an Lernziel-Checks gebunden`);
  for (const objectiveId of topic.learningObjectives) {
    const occurrences = page.match(new RegExp(`data-required-objective="${objectiveId}"`, 'g')) || [];
    check(occurrences.length === 1, `${topic.slug}: Lernziel ${objectiveId} besitzt genau einen Pflichtnachweis`);
  }
  check(page.includes('class="bottomnav"'), `${topic.slug}: mobile Navigation ist vorhanden`);
  check(!page.includes('class="ph"'), `${topic.slug}: keine Bild-Platzhalter`);
  check(!page.includes('id="accountBtn"'), `${topic.slug}: kein funktionsloser Konto-Button`);
  check(topic.sources.every(sourceId => sourceIds.has(sourceId)), `${topic.slug}: alle Quellen-IDs sind registriert`);
  const areaHtml = areaHtmlByDomain.get(topic.domain) || '';
  check(areaHtml.includes('window.AP2_LEARNING_TOPICS') && areaHtml.includes("'/lernen/' + topic.slug + '/'"), `${topic.slug}: Bereich nutzt den generierten Lernkatalog`);
  if (topic.sourceKind === 'compact-spec') {
    const source = compactSourceBySlug.get(topic.slug);
    check(Boolean(source), `${topic.slug}: kompakte Quelle ist auffindbar`);
    if (source) {
      check(createHash('sha256').update(source.raw).digest('hex') === topic.contentHash, `${topic.slug}: Hash stammt aus der kompakten Quelle`);
      const curation = JSON.parse(await readFile(path.join(repoRoot, 'content', 'curation', `${topic.slug}.json`), 'utf8'));
      check(curation.generatedFrom === `content/learning-units/${source.file}`, `${topic.slug}: Kurationsartefakt nennt seine kompakte Quelle`);
    }
  }
}

const generatedSlugs = (await readdir(path.join(repoRoot, 'lernen'), { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();
check(JSON.stringify(generatedSlugs) === JSON.stringify(manifest.topics.map(topic => topic.slug).sort()), 'Lernseiten-Verzeichnisse und Manifest sind exakt synchron');

const raidPage = await readFile(path.join(repoRoot, 'lernen', 'raid', 'index.html'), 'utf8');
check(raidPage.includes('data-selected-feedback') && raidPage.includes('data-rationale='), 'RAID-Pilot erklärt auch falsche Antwortoptionen');
check(raidPage.includes('data-card-rate="known"') && raidPage.includes('data-card-rate="unsure"'), 'RAID-Pilot besitzt eine Karten-Selbsteinschätzung');
check(raidPage.includes('data-mastery-box'), 'RAID-Pilot zeigt den Lernziel-Fortschritt');
check(raidPage.includes('data-raid-lab=') && raidPage.includes('data-failure-simulator='), 'RAID-Pilot besitzt Rechner und Ausfallsimulator');
check(raidPage.includes('data-recall=') && raidPage.includes('data-numeric-practice="raid-transfer-capacity"'), 'RAID-Pilot kombiniert freien Abruf und echte Zahleneingabe');
check((raidPage.match(/<math/g) || []).length >= 8, 'RAID-Formeln werden visuell und semantisch gesetzt');
check(manifest.topics.some(topic => topic.slug === 'raid-operations' && topic.itemId === 'ga1-3__5'), 'RAID-Betrieb ist als eigenes kanonisches Kernthema verdrahtet');

const backupPage = await readFile(path.join(repoRoot, 'lernen', 'backup-methods', 'index.html'), 'utf8');
check(backupPage.includes('data-sequence="incremental-restore"') && backupPage.includes('data-expected="verify,full,increments,validate"'), 'Backup-Einheit trainiert die Restore-Reihenfolge interaktiv');
check((backupPage.match(/<math/g) || []).length >= 4, 'Backup-Rechnungen werden visuell und semantisch gesetzt');
check(backupPage.includes('/assets/learning/backup-chains.svg'), 'Backup-Einheit besitzt eine eigene erklärende Sicherungsgrafik');

const localCatalogPath = path.join(repoRoot, 'knowledge-base', 'local', 'catalog.json');
if (await exists(localCatalogPath)) {
  const localCatalog = JSON.parse(await readFile(localCatalogPath, 'utf8'));
  const localSourceIds = new Set(localCatalog.sources.map(source => source.id));
  check(localCatalog.sources.length === 5, 'lokale Wissensbasis enthält alle fünf Datenquellen');
  check(sourceIds.size === localSourceIds.size && [...sourceIds].every(id => localSourceIds.has(id)), 'öffentlicher und lokaler Quellenkatalog führen dieselben IDs');
  check(localCatalog.sources.filter(source => source.stats.kind !== 'pdf').every(source => source.stats.chunks > 0), 'jede Markdown-Quelle besitzt einen Volltextindex');
  check(localCatalog.sources.filter(source => source.stats.kind !== 'pdf').every(source => source.stats.images > 0), 'jede Markdown-Quelle besitzt ein Bildinventar');
  const pdfSource = localCatalog.sources.find(source => source.id === 'itlf10-12-2023');
  check(pdfSource?.stats.pages === 413, 'PDF-Quelle enthält den vollständigen 413-Seiten-Index');
  check(['ocr-required', 'ocr-in-progress', 'ocr-ready'].includes(pdfSource?.stats.extractionStatus), 'PDF-Quelle besitzt einen gültigen OCR-Status');
  check(Number(pdfSource?.stats.ocrPages || 0) <= 413, 'OCR-Fortschritt überschreitet die PDF-Seitenzahl nicht');
} else {
  console.log('SKIP lokale Buchdaten sind in dieser Umgebung nicht importiert');
}

if (failures) process.exit(1);
