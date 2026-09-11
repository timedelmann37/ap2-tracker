import { access, readFile } from 'node:fs/promises';
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
const areaHtml = await readFile(path.join(repoRoot, 'konzeption-administration', 'index.html'), 'utf8');
const learningIndex = await readFile(path.join(repoRoot, 'lernpfad', 'index.html'), 'utf8');
const learningTemplate = await readFile(path.join(repoRoot, 'scripts', 'templates', 'learning-page.html'), 'utf8');

check(sourceCatalog.sources.length === 5, 'fünf bereitgestellte Buchquellen werden im Quellenkatalog geführt');
check(sourceIds.size === sourceCatalog.sources.length, 'Quellen-IDs sind eindeutig');
check(new Set(sourceCatalog.sources.map(source => source.role)).size >= 3, 'Quellen besitzen unterschiedliche Rollen statt gleicher Gewichtung');
check(manifest.topics.length >= 3, 'Lernmanifest enthält mindestens drei kuratierte Kernthemen');
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
  check(page.includes('data-required-objective='), `${topic.slug}: Abschluss ist an Lernziel-Checks gebunden`);
  check(page.includes('class="bottomnav"'), `${topic.slug}: mobile Navigation ist vorhanden`);
  check(!page.includes('class="ph"'), `${topic.slug}: keine Bild-Platzhalter`);
  check(!page.includes('id="accountBtn"'), `${topic.slug}: kein funktionsloser Konto-Button`);
  check(topic.sources.every(sourceId => sourceIds.has(sourceId)), `${topic.slug}: alle Quellen-IDs sind registriert`);
  check(areaHtml.includes('window.AP2_LEARNING_TOPICS') && areaHtml.includes("'/lernen/' + topic.slug + '/'"), `${topic.slug}: Kernthema nutzt den generierten Lernkatalog`);
}

const raidPage = await readFile(path.join(repoRoot, 'lernen', 'raid', 'index.html'), 'utf8');
check(raidPage.includes('data-selected-feedback') && raidPage.includes('data-rationale='), 'RAID-Pilot erklärt auch falsche Antwortoptionen');
check(raidPage.includes('data-card-rate="known"') && raidPage.includes('data-card-rate="unsure"'), 'RAID-Pilot besitzt eine Karten-Selbsteinschätzung');
check(raidPage.includes('data-mastery-box'), 'RAID-Pilot zeigt den Lernziel-Fortschritt');
check(manifest.topics.some(topic => topic.slug === 'raid-operations' && topic.itemId === 'ga1-3__5'), 'RAID-Betrieb ist als eigenes kanonisches Kernthema verdrahtet');

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
