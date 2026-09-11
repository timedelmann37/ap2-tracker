import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileUnitSpec, validateUnitSpec } from './learning/compile-unit-spec.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const fileName = 'tcp-ip-osi-mapping.unit.json';
const spec = JSON.parse(await readFile(path.join(repoRoot, 'content', 'learning-units', fileName), 'utf8'));

function pass(message) {
  console.log(`PASS ${message}`);
}

validateUnitSpec(spec, fileName);
const compiled = compileUnitSpec(spec, fileName);
assert.equal(compiled.metadata.item_id, 'ga2-1__1');
assert.equal(compiled.metadata.curation, 'content/curation/tcp-ip-osi-zuordnung.json');
assert.equal(compiled.curation.generatedFrom, `content/learning-units/${fileName}`);
assert.deepEqual(compiled.curation.objectives.map(objective => objective.id), spec.objectives.map(objective => objective.id));
assert(compiled.curation.objectives.every(objective => objective.required === true));
pass('kompakte Spezifikation erzeugt Metadaten und Kurationsartefakt ohne manuelle Duplikate');

for (const objective of spec.objectives) {
  const occurrences = compiled.contentMarkdown.match(new RegExp(`data-required-objective="${objective.id}"`, 'g')) || [];
  assert.equal(occurrences.length, 1);
}
assert(compiled.contentMarkdown.includes('data-quiz="tcp-ip-diagnostic"'));
assert(compiled.contentMarkdown.includes('data-recall="tcp-ip-core-recall"'));
assert.equal((compiled.contentMarkdown.match(/data-flashcard=/g) || []).length, 3);
pass('Renderer verbirgt Interaktionsmarkup und erzeugt genau einen Transfernachweis je Lernziel');

assert.equal(compiled.assets.length, 2);
for (const asset of compiled.assets) {
  assert.match(asset.path, /^assets\/learning\/tcp-ip-osi-zuordnung-[a-z0-9-]+\.svg$/);
  assert(asset.content.startsWith('<svg'));
  assert(asset.content.includes('<title id="title">'));
  assert(asset.content.includes('<desc id="desc">'));
  assert(asset.content.endsWith('</svg>\n'));
}
pass('deklarative Diagramme werden als zugängliche SVG-Artefakte erzeugt');

const invalidDiagnostic = structuredClone(spec);
invalidDiagnostic.sections[0].blocks[0].requiredObjective = spec.objectives[0].id;
assert.throws(() => validateUnitSpec(invalidDiagnostic, 'diagnostic.json'), /Diagnose .* darf kein Pflichtziel/);
pass('Diagnosen können kein Pflichtziel erfüllen');

const invalidMarkdown = structuredClone(spec);
invalidMarkdown.sections[1].blocks[0].markdown = '<button data-answer="1">Umgehung</button>';
assert.throws(() => validateUnitSpec(invalidMarkdown, 'markup.json'), /kein eigenes HTML oder Interaktionsmarkup/);
pass('Autoren können das zentrale Interaktionsmarkup nicht umgehen');

const invalidRequiredType = structuredClone(spec);
invalidRequiredType.sections[3].blocks[1].requiredObjective = spec.objectives[0].id;
delete invalidRequiredType.sections[4].blocks[0].requiredObjective;
assert.throws(() => validateUnitSpec(invalidRequiredType, 'required.json'), /Blocktyp recall kann kein Pflichtziel/);
pass('nur von der Runtime unterstützte Aktivitäten dürfen Pflichtziele nachweisen');

const invalidIds = structuredClone(spec);
invalidIds.sections[2].blocks[2].id = 'tcp-ip-diagnostic';
assert.throws(() => validateUnitSpec(invalidIds, 'ids.json'), /IDs müssen eindeutig/);
pass('Interaktions- und Karten-IDs sind innerhalb einer Einheit eindeutig');

console.log('OK Compiler-Vertrag für kompakte Lerneinheiten verifiziert.');
