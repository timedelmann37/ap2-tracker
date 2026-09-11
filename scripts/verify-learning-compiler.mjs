import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileUnitSpec, validateUnitSpec } from './learning/compile-unit-spec.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const fileName = 'tcp-ip-osi-mapping.unit.json';
const spec = JSON.parse(await readFile(path.join(repoRoot, 'content', 'learning-units', fileName), 'utf8'));
const numericFileName = 'ethernet-standards.unit.json';
const numericSpec = JSON.parse(await readFile(path.join(repoRoot, 'content', 'learning-units', numericFileName), 'utf8'));

function blocksOf(unitSpec) {
  return unitSpec.sections.flatMap(section => section.blocks);
}

const legacyDiagramColors = /#(?:f7f8f4|eef2ed|f8faf6|dce8df|cfd8d0|f3f6f1|e7efe8|c3cec5|344239|48564c|7f9183|17211b)\b/i;

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
  assert(asset.content.startsWith('<svg class="learning-diagram'));
  assert.match(asset.content, /aria-labelledby="diagram-[a-z0-9-]+-title diagram-[a-z0-9-]+-desc"/);
  assert.match(asset.content, /<title id="diagram-[a-z0-9-]+-title">/);
  assert.match(asset.content, /<desc id="diagram-[a-z0-9-]+-desc">/);
  assert(asset.content.includes('var(--diagram-'));
  assert.doesNotMatch(asset.content, legacyDiagramColors);
  assert(asset.content.endsWith('</svg>\n'));
}
const diagramFigureCount = blocksOf(spec).filter(block => block.type === 'figure' && block.diagramId).length;
assert.equal((compiled.contentMarkdown.match(/<svg class="learning-diagram/g) || []).length, diagramFigureCount);
const inlineLabelledBy = [...compiled.contentMarkdown.matchAll(/<svg class="learning-diagram[^>]+aria-labelledby="([^"]+)"/g)]
  .flatMap(match => match[1].split(/\s+/));
assert.equal(new Set(inlineLabelledBy).size, inlineLabelledBy.length);
for (const labelledId of inlineLabelledBy) assert(compiled.contentMarkdown.includes(`id="${labelledId}"`));

const comparisonSpec = structuredClone(spec);
comparisonSpec.diagrams[0].type = 'comparison';
const comparisonAsset = compileUnitSpec(comparisonSpec, 'comparison.json').assets.find(asset => asset.path.endsWith('-mapping.svg'));
assert(comparisonAsset?.content.includes('var(--diagram-'));
assert.doesNotMatch(comparisonAsset.content, legacyDiagramColors);
pass('deklarative Diagramme werden inline und zusätzlich als zugängliche, theme-fähige SVG-Artefakte erzeugt');

const topologySpec = structuredClone(spec);
topologySpec.diagrams[0] = {
  id: 'mapping',
  type: 'topology',
  title: 'Testnetz mit zwei Bereichen',
  description: 'Zwei Endgeräte sind über einen Switch verbunden.',
  zones: [
    { id: 'broadcast-a', label: 'Broadcastdomäne A', x: 24, y: 72, width: 912, height: 350, kind: 'broadcast' }
  ],
  nodes: [
    { id: 'client-a', label: 'Client A', x: 170, y: 250, kind: 'host' },
    { id: 'switch-a', label: 'Switch A', x: 480, y: 250, kind: 'switch' },
    { id: 'client-b', label: 'Client B', x: 790, y: 250, kind: 'host' }
  ],
  edges: [
    { from: 'client-a', to: 'switch-a', label: 'Link 1', kind: 'active' },
    { from: 'switch-a', to: 'client-b', label: 'Link 2', kind: 'active' }
  ]
};
validateUnitSpec(topologySpec, 'topology.json');
const compiledTopology = compileUnitSpec(topologySpec, 'topology.json');
assert(compiledTopology.contentMarkdown.includes('class="learning-diagram diagram-topology"'));
assert(compiledTopology.contentMarkdown.includes('class="diagram-zone broadcast"'));
assert(compiledTopology.contentMarkdown.includes('class="diagram-edge active"'));
assert(compiledTopology.contentMarkdown.includes('class="diagram-node switch"'));
assert(compiledTopology.contentMarkdown.includes('aria-labelledby="diagram-mapping-title diagram-mapping-desc"'));
const topologyAsset = compiledTopology.assets.find(asset => asset.path.endsWith('-mapping.svg'));
assert(topologyAsset?.content.includes('diagram-topology'));
assert(topologyAsset.content.includes('var(--diagram-'));
assert.doesNotMatch(topologyAsset.content, legacyDiagramColors);

const topologyWithoutZones = structuredClone(topologySpec);
delete topologyWithoutZones.diagrams[0].zones;
validateUnitSpec(topologyWithoutZones, 'topology-without-zones.json');
pass('topology rendert nodes und edges, unterstützt optionale zones und bleibt ein externes Build-Artefakt');

for (const invalidId of ['Client A', 'client_a', '']) {
  const invalidTopologyNode = structuredClone(topologySpec);
  invalidTopologyNode.diagrams[0].nodes[0].id = invalidId;
  assert.throws(() => validateUnitSpec(invalidTopologyNode, 'topology-node.json'), /node-IDs/);
}
const duplicateTopologyNode = structuredClone(topologySpec);
duplicateTopologyNode.diagrams[0].nodes[1].id = 'client-a';
assert.throws(() => validateUnitSpec(duplicateTopologyNode, 'topology-node-duplicate.json'), /node-IDs/);

for (const edge of [
  { from: 'unknown-node', to: 'switch-a' },
  { from: 'client-a', to: 'unknown-node' },
  { from: 'client-a', to: 'client-a' }
]) {
  const invalidTopologyEdge = structuredClone(topologySpec);
  invalidTopologyEdge.diagrams[0].edges[0] = edge;
  assert.throws(() => validateUnitSpec(invalidTopologyEdge, 'topology-edge.json'), /ungültige edge/);
}

for (const zoneChange of [
  zone => { zone.id = ''; },
  zone => { zone.label = ''; },
  zone => { zone.width = Number.NaN; }
]) {
  const invalidTopologyZone = structuredClone(topologySpec);
  zoneChange(invalidTopologyZone.diagrams[0].zones[0]);
  assert.throws(() => validateUnitSpec(invalidTopologyZone, 'topology-zone.json'), /ungültige zone/);
}
pass('topology lehnt ungültige Node-IDs, Kantenreferenzen, Selbstkanten und Zonen ab');

const compiledNumeric = compileUnitSpec(numericSpec, numericFileName);
const numericBlock = blocksOf(numericSpec).find(block => block.type === 'numeric');
assert(numericBlock);
assert(compiledNumeric.contentMarkdown.includes(`data-tolerance="${numericBlock.tolerance}"`));

for (const tolerance of [-0.01, Number.NaN]) {
  const invalidTolerance = structuredClone(numericSpec);
  blocksOf(invalidTolerance).find(block => block.type === 'numeric').tolerance = tolerance;
  assert.throws(() => validateUnitSpec(invalidTolerance, 'numeric-tolerance.json'), /nichtnegative tolerance/);
}
for (const expected of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
  const invalidExpected = structuredClone(numericSpec);
  blocksOf(invalidExpected).find(block => block.type === 'numeric').expected = expected;
  assert.throws(() => validateUnitSpec(invalidExpected, 'numeric-expected.json'), /endliche Zahlen/);
}
pass('numeric gibt data-tolerance aus und lehnt negative, NaN- oder nicht endliche Zahlen ab');

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
