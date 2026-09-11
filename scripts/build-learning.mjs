import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const contentDir = path.join(repoRoot, 'content', 'learning');
const templatePath = path.join(repoRoot, 'scripts', 'templates', 'learning-page.html');
const sourceCatalogPath = path.join(repoRoot, 'content', 'sources.json');

function parseValue(raw) {
  const value = raw.trim();
  if (value.startsWith('[') || value.startsWith('{') || value.startsWith('"')) return JSON.parse(value);
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  if (value === 'true' || value === 'false') return value === 'true';
  return value;
}

function parseDocument(raw, fileName) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) throw new Error(`${fileName}: Frontmatter fehlt.`);
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`${fileName}: Ungültige Frontmatter-Zeile: ${line}`);
    metadata[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }
  return { metadata, markdown: match[2].trim() };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function plainText(value) {
  return value.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
}

function renderMarkdown(markdown) {
  const headings = [];
  let html = marked.parse(markdown, { gfm: true, breaks: false });
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, title) => {
    const id = `s${headings.length + 1}`;
    headings.push({ id, title: plainText(title) });
    return `<h2 class="sec" id="${id}"><span class="num">${headings.length}</span>${title}</h2>`;
  });
  html = html.replaceAll('<table>', '<div class="twrap"><table class="knowledge-table">');
  html = html.replaceAll('</table>', '</table></div>');
  return { html, headings };
}

function validate(metadata, knownSourceIds, fileName) {
  const required = ['id', 'slug', 'title', 'description', 'domain', 'domain_label', 'group_id', 'group_label', 'item_id', 'week', 'estimated_minutes', 'relevance', 'sources', 'content_revision', 'content_status', 'learning_objectives', 'curation'];
  for (const key of required) {
    if (metadata[key] === undefined || metadata[key] === '') throw new Error(`${fileName}: Pflichtfeld ${key} fehlt.`);
  }
  if (!/^[a-z0-9-]+$/.test(metadata.slug)) throw new Error(`${fileName}: slug ist ungültig.`);
  if (!/^ga[12]-\d+__\d+$|^wiso-\d+__\d+$/.test(metadata.item_id)) throw new Error(`${fileName}: item_id passt nicht zum Tracker-Schema.`);
  if (!Array.isArray(metadata.sources) || !metadata.sources.length) throw new Error(`${fileName}: sources muss eine nichtleere Liste sein.`);
  for (const sourceId of metadata.sources) {
    if (!knownSourceIds.has(sourceId)) throw new Error(`${fileName}: unbekannte Quellen-ID ${sourceId}.`);
  }
  if (!Array.isArray(metadata.learning_objectives) || metadata.learning_objectives.length < 2) {
    throw new Error(`${fileName}: mindestens zwei learning_objectives erforderlich.`);
  }
  if (!['CURATED_DRAFT', 'DIDACTICALLY_REVIEWED', 'PUBLICATION_READY'].includes(metadata.content_status)) {
    throw new Error(`${fileName}: ungültiger content_status.`);
  }
}

function domainConfig(domain, fileName) {
  const key = String(domain).toLocaleLowerCase('de');
  const domains = {
    ga1: { path: '/konzeption-administration/', cssClass: 'area-ga1' },
    ga2: { path: '/netzwerke/', cssClass: 'area-ga2' },
    wiso: { path: '/sowi/', cssClass: 'area-wiso' }
  };
  const config = domains[key];
  if (!config) throw new Error(`${fileName}: unbekannter Bereich ${domain}.`);
  return config;
}

function fillTemplate(template, metadata, content, toc) {
  const domain = domainConfig(metadata.domain, metadata.id);
  const statusLabels = {
    CURATED_DRAFT: 'Pilot · fachlich in Prüfung',
    DIDACTICALLY_REVIEWED: 'Didaktisch geprüft',
    PUBLICATION_READY: 'Freigegeben'
  };
  const replacements = {
    TITLE: escapeHtml(metadata.title),
    DESCRIPTION: escapeHtml(metadata.description),
    DOMAIN: escapeHtml(metadata.domain),
    DOMAIN_LABEL: escapeHtml(metadata.domain_label),
    DOMAIN_PATH: domain.path,
    DOMAIN_CLASS: domain.cssClass,
    GROUP_ID: escapeHtml(metadata.group_id),
    GROUP_LABEL: escapeHtml(metadata.group_label),
    ITEM_ID: escapeHtml(metadata.item_id),
    TOPIC_ID: escapeHtml(metadata.id),
    CONTENT_REVISION: escapeHtml(metadata.content_revision),
    CONTENT_STATUS: escapeHtml(metadata.content_status),
    CONTENT_STATUS_LABEL: escapeHtml(statusLabels[metadata.content_status]),
    OBJECTIVE_COUNT: escapeHtml(metadata.learning_objectives.length),
    MINUTES: escapeHtml(metadata.estimated_minutes),
    RELEVANCE: escapeHtml(metadata.relevance),
    CONTENT: content,
    TOC: toc.map(item => `<li><a href="#${item.id}" data-t="${item.id}">${escapeHtml(item.title)}</a></li>`).join('\n')
  };
  return Object.entries(replacements).reduce(
    (output, [key, value]) => output.replaceAll(`{{${key}}}`, value),
    template
  );
}

const template = await readFile(templatePath, 'utf8');
const catalog = JSON.parse(await readFile(sourceCatalogPath, 'utf8'));
const knownSourceIds = new Set(catalog.sources.map(source => source.id));
const files = (await readdir(contentDir)).filter(file => file.endsWith('.md')).sort();
const manifest = [];
const seen = { id: new Set(), slug: new Set(), item_id: new Set() };

for (const file of files) {
  const raw = await readFile(path.join(contentDir, file), 'utf8');
  const { metadata, markdown } = parseDocument(raw, file);
  validate(metadata, knownSourceIds, file);
  const curationPath = path.resolve(repoRoot, metadata.curation);
  const curationRoot = path.resolve(repoRoot, 'content', 'curation');
  if (path.dirname(curationPath) !== curationRoot || path.extname(curationPath) !== '.json') {
    throw new Error(`${file}: curation muss direkt auf eine JSON-Datei unter content/curation zeigen.`);
  }
  const curation = JSON.parse(await readFile(curationPath, 'utf8'));
  if (curation.topicId !== metadata.id || curation.contentRevision !== metadata.content_revision) {
    throw new Error(`${file}: Curation-Sidecar passt nicht zu Topic oder Inhaltsrevision.`);
  }
  if (curation.status !== metadata.content_status || !Array.isArray(curation.evidence) || !curation.evidence.length) {
    throw new Error(`${file}: Curation-Status oder Evidence fehlt.`);
  }
  if (curation.evidence.some(item => !metadata.sources.includes(item.sourceId) || !item.sourceLocator || !item.use || !item.reviewStatus)) {
    throw new Error(`${file}: Curation-Evidence ist unvollständig oder nutzt eine nicht deklarierte Quelle.`);
  }
  for (const field of Object.keys(seen)) {
    if (seen[field].has(metadata[field])) throw new Error(`${file}: ${field} ist nicht eindeutig (${metadata[field]}).`);
    seen[field].add(metadata[field]);
  }
  const expectedPrefix = metadata.domain.toLocaleLowerCase('de') === 'wiso' ? 'wiso-' : `${metadata.domain.toLocaleLowerCase('de')}-`;
  if (!metadata.group_id.startsWith(expectedPrefix) || !metadata.item_id.startsWith(`${metadata.group_id}__`)) {
    throw new Error(`${file}: Bereich, Themengruppe und Kernthema sind nicht konsistent.`);
  }
  const rendered = renderMarkdown(markdown);
  const page = fillTemplate(template, metadata, rendered.html, rendered.headings);
  const outputDir = path.join(repoRoot, 'lernen', metadata.slug);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), page, 'utf8');
  manifest.push({
    id: metadata.id,
    slug: metadata.slug,
    title: metadata.title,
    description: metadata.description,
    domain: metadata.domain,
    groupId: metadata.group_id,
    groupLabel: metadata.group_label,
    itemId: metadata.item_id,
    week: metadata.week || '',
    estimatedMinutes: metadata.estimated_minutes,
    relevance: metadata.relevance,
    contentRevision: metadata.content_revision,
    contentStatus: metadata.content_status,
    learningObjectives: metadata.learning_objectives,
    sources: metadata.sources,
    contentHash: createHash('sha256').update(raw).digest('hex')
  });
  console.log(`Gebaut: /lernen/${metadata.slug}/`);
}

manifest.sort((left, right) => left.itemId.localeCompare(right.itemId, 'de', { numeric: true }));

await writeFile(
  path.join(repoRoot, 'content', 'learning-manifest.json'),
  `${JSON.stringify({ version: 1, topics: manifest }, null, 2)}\n`,
  'utf8'
);

await writeFile(
  path.join(repoRoot, 'assets', 'ap2-learning-catalog.js'),
  `window.AP2_LEARNING_TOPICS = Object.freeze(${JSON.stringify(manifest, null, 2)});\n`,
  'utf8'
);
