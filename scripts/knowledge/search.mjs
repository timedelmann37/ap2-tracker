import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const localRoot = path.resolve(scriptDir, '..', '..', 'knowledge-base', 'local');
const query = process.argv.slice(2).join(' ').trim();
if (!query) throw new Error('Suchbegriff fehlt. Beispiel: npm run knowledge:search -- "RAID 6"');

const terms = query.toLocaleLowerCase('de').split(/\s+/).filter(Boolean);
const entries = await readdir(localRoot, { withFileTypes: true });
const results = [];

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const indexPath = path.join(localRoot, entry.name, 'chunks.jsonl');
  let raw;
  try {
    raw = await readFile(indexPath, 'utf8');
  } catch {
    continue;
  }
  for (const line of raw.split(/\r?\n/).filter(Boolean)) {
    const chunk = JSON.parse(line);
    const heading = chunk.heading.toLocaleLowerCase('de');
    const body = chunk.searchText.toLocaleLowerCase('de');
    const matchedTerms = terms.filter(term => heading.includes(term) || body.includes(term));
    const minimumMatches = terms.length === 1 ? 1 : Math.ceil(terms.length * 0.6);
    const score = matchedTerms.reduce((total, term) => {
      const headingHits = heading.split(term).length - 1;
      const bodyHits = body.split(term).length - 1;
      return total + headingHits * 8 + Math.min(bodyHits, 20);
    }, matchedTerms.length * 4) + (body.includes(query.toLocaleLowerCase('de')) ? 12 : 0);
    if (score > 0 && matchedTerms.length >= minimumMatches) {
      results.push({ score, matchedTerms: matchedTerms.length, chunk });
    }
  }
}

results.sort((left, right) => right.score - left.score);
if (!results.length) {
  console.log(`Keine Treffer für „${query}“.`);
  process.exit(0);
}

for (const { score, matchedTerms, chunk } of results.slice(0, 12)) {
  const text = chunk.searchText.replace(/\s+/g, ' ').trim();
  const preview = text.length > 260 ? `${text.slice(0, 257)}…` : text;
  console.log(`\n[${score} · ${matchedTerms}/${terms.length} Begriffe] ${chunk.sourceId} · ${chunk.heading} · Zeilen ${chunk.startLine}-${chunk.endLine}`);
  console.log(preview);
}
