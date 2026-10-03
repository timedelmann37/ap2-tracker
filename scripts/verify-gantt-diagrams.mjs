import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { compileUnitSpec, validateUnitSpec, renderDiagram } from './learning/compile-unit-spec.mjs';
const spec = JSON.parse(await readFile(new URL('../content/learning-units/gantt-diagramm-lesen-und-erstellen.unit.json', import.meta.url), 'utf8'));
validateUnitSpec(spec);
const compiled = compileUnitSpec(spec);
assert.equal(compiled.metadata.item_id, 'ga1-13__3');
const expected = [[0,2],[2,7],[2,4],[4,5],[7,9],[9,9]];
assert.deepEqual(spec.diagrams[0].rows.map(r => [r.start,r.end]), expected);
assert.deepEqual(spec.diagrams[1].rows.map(r => [r.start,r.end]), [[0,2],[2,8],[2,4],[4,5],[8,10],[10,10]]);
for (const diagram of spec.diagrams) {
  const svg = renderDiagram(diagram);
  assert.equal((svg.match(/class="gantt-bar"/g) || []).length, 5);
  assert.equal((svg.match(/class="gantt-milestone"/g) || []).length, 1);
  for (const row of diagram.rows.filter(r => r.start !== r.end)) {
    assert(svg.includes(`data-row="${row.id}" x="${310 + row.start * 60}"`));
    assert(svg.includes(`width="${(row.end-row.start) * 60}" height="20"`));
  }
  for (const row of diagram.rows) {
    const predecessors = row.predecessors === 'keine' ? [] : row.predecessors.toLowerCase().split(' und ');
    for (const id of predecessors) assert(row.start >= diagram.rows.find(r => r.id === id).end, 'Ende-Anfang eingehalten');
  }
}
for (const mutate of [d=>d.end=0,d=>d.end=16,d=>d.end=1.5,d=>d.unit={},d=>d.rows=[],d=>d.rows[1].id='a',d=>d.rows[0].start=-1,d=>d.rows[0].end=11,d=>d.rows[0].start=3,d=>d.rows[0].start=0.123,d=>d.rows[0].start=NaN,d=>d.rows[0].label='x'.repeat(25),d=>delete d.rows[0].predecessors]) {
  const invalid = structuredClone(spec); mutate(invalid.diagrams[0]);
  assert.throws(()=>validateUnitSpec(invalid), /gantt/);
}
const escaped = structuredClone(spec.diagrams[0]); escaped.rows[0].label='<script>'; escaped.rows[0].predecessors='A & B';
assert(renderDiagram(escaped).includes('&lt;script&gt;'));
assert(!renderDiagram(escaped).includes('<script>'));
assert(renderDiagram(escaped).includes('A &amp; B'));
console.log('PASS Gantt: proportional bars, milestones, dependencies, input validation and escaping');
