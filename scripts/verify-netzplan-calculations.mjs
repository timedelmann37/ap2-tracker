import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const unit = JSON.parse(await readFile(new URL('../content/learning-units/netzplan-zeiten-kritischer-pfad-und-puffer.unit.json', import.meta.url), 'utf8'));
const graph = unit.diagrams.find(d => d.id === 'pilotnetz');
const ids = graph.nodes.map(n => n.id);
const durations = Object.fromEntries(graph.nodes.map(n => [n.id, parseInt(n.detail, 10)]));
assert.deepEqual(durations, { a: 2, b: 5, c: 2, d: 1, e: 2 });
assert.deepEqual(graph.edges.map(e => [e.from, e.to]), [['a','b'],['b','e'],['a','c'],['c','d'],['d','e']]);
function calculate(overrides = {}, delays = {}) {
  const pending = new Set(ids), times = {};
  while (pending.size) {
    const available = [...pending].filter(id => graph.edges.filter(e => e.to === id).every(e => times[e.from]));
    assert(available.length, 'Network is acyclic');
    for (const id of available) {
      const predecessors = graph.edges.filter(e => e.to === id).map(e => e.from);
      const faz = Math.max(0, ...predecessors.map(p => times[p].fez)) + (delays[id] || 0);
      const d = overrides[id] ?? durations[id];
      times[id] = { faz, fez: faz + d, d };
      pending.delete(id);
    }
  }
  const end = Math.max(...Object.values(times).map(t => t.fez));
  for (const id of Object.keys(times).reverse()) {
    const successors = graph.edges.filter(e => e.from === id).map(e => e.to);
    const sez = successors.length ? Math.min(...successors.map(s => times[s].saz)) : end;
    Object.assign(times[id], { sez, saz: sez - times[id].d });
    times[id].gp = times[id].saz - times[id].faz;
    times[id].fp = (successors.length ? Math.min(...successors.map(s => times[s].faz)) : end) - times[id].fez;
  }
  return { end, times };
}
const base = calculate();
assert.equal(base.end, 9);
const expected = {
 a: [0,2,0,2,0,0], b: [2,7,2,7,0,0], c: [2,4,4,6,2,0],
 d: [4,5,6,7,2,2], e: [7,9,7,9,0,0]
};
const prose = unit.sections.flatMap(s => s.blocks).filter(b => b.type === 'markdown').map(b => b.markdown).join('\n');
for (const [id, values] of Object.entries(expected)) {
 const t = base.times[id];
 assert.deepEqual([t.faz,t.fez,t.saz,t.sez,t.gp,t.fp], values);
 assert(prose.includes('**' + id.toUpperCase() + ':** FAZ/FEZ ' + values[0] + '/' + values[1] + '; SAZ/SEZ ' + values[2] + '/' + values[3] + '; GP ' + values[4] + ', FP ' + values[5] + '.'), 'Published row matches calculation: ' + id);
}
assert.deepEqual(Object.entries(base.times).filter(([,t]) => t.gp === 0).map(([id]) => id), ['a','b','e']);
assert.equal(calculate({ b: 6 }).end, 10);
const transfer = calculate({ c: 5 });
assert.equal(transfer.end, 10);
assert.equal(transfer.times.b.gp, 1);
assert.equal(transfer.times.b.fp, 1);
assert.deepEqual(Object.entries(transfer.times).filter(([,t]) => t.gp === 0).map(([id]) => id), ['a','c','d','e']);
const tie = calculate({ c: 4 });
assert.equal(tie.end, 9);
assert(Object.values(tie.times).every(t => t.gp === 0), 'Two complete critical paths');
const shifted = calculate({}, { c: 2 });
assert.equal(shifted.end, 9);
assert.equal(shifted.times.d.faz, 6);
assert.equal(shifted.times.d.fp, 0);
assert.equal(calculate({}, { c: 2, d: 2 }).end, 11, 'Shared float cannot be added');
console.log('PASS Netzplan: all published times, both floats, changed durations, two critical paths and shared reserve');
