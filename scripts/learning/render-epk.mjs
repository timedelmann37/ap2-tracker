const xml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const kinds = new Set(['event', 'function', 'and', 'xor', 'or']);

export function validateEpkDiagram(d, fail) {
  if (!Array.isArray(d.nodes) || d.nodes.length < 3 || !Array.isArray(d.edges) || !d.edges.length) fail('EPK benötigt nodes und edges.');
  const ids = d.nodes.map(n => n.id);
  if (new Set(ids).size !== ids.length || ids.some(id => !/^[a-z0-9-]+$/.test(id || ''))) fail('EPK benötigt eindeutige node-IDs.');
  for (const n of d.nodes) {
    if (!kinds.has(n.kind) || typeof n.label !== 'string' || !n.label.trim() || n.label.length > 44 || !Number.isFinite(n.x) || !Number.isFinite(n.y) || n.x < 160 || n.x > 800 || n.y < 110 || n.y > 1400) fail('Ungültiger EPK-Knoten.');
  }
  for (const e of d.edges) {
    const a = d.nodes.find(n => n.id === e.from), b = d.nodes.find(n => n.id === e.to);
    if (!a || !b || b.y - a.y < 80) fail('EPK-Kante benötigt gültige Knoten und abwärts gerichteten Abstand.');
  }
  const keys = d.edges.map(e => e.from + ':' + e.to);
  if (new Set(keys).size !== keys.length) fail('EPK-Kanten dürfen nicht doppelt vorkommen.');
  // Layout/graph validation only, not a formal EPC soundness checker.
  for (const n of d.nodes.filter(n => ['event', 'function'].includes(n.kind))) {
    if (d.edges.filter(e => e.from === n.id).length > 1 || d.edges.filter(e => e.to === n.id).length > 1) fail('EPK-Verzweigung benötigt einen Konnektor.');
  }
}

function lines(label) {
  const result = [''];
  for (const word of label.split(/\s+/)) {
    if ((result.at(-1) + ' ' + word).trim().length > 23) result.push(word);
    else result[result.length - 1] = (result.at(-1) + ' ' + word).trim();
  }
  return result;
}

export function renderEpkSvg(d) {
  const width = Math.max(560, Math.max(...d.nodes.map(n => n.x)) + 160);
  const height = Math.max(...d.nodes.map(n => n.y)) + 90;
  const marker = 'epk-' + d.id + '-arrow';
  const ink = 'var(--diagram-text, #f1f0ec)', edge = 'var(--diagram-muted, #c8c1d2)';
  const edges = d.edges.map(e => {
    const a = d.nodes.find(n => n.id === e.from), b = d.nodes.find(n => n.id === e.to);
    const ay = a.y + (['event', 'function'].includes(a.kind) ? 34 : 30);
    const by = b.y - (['event', 'function'].includes(b.kind) ? 34 : 30);
    const mid = (ay + by) / 2;
    return '<path class="epk-edge" d="M' + a.x + ' ' + ay + ' V' + mid + ' H' + b.x + ' V' + by + '" fill="none" stroke="' + edge + '" stroke-width="2" marker-end="url(#' + marker + ')"/>';
  }).join('');
  const nodes = d.nodes.map(n => {
    const connector = !['event', 'function'].includes(n.kind);
    const fill = 'var(--diagram-key, #342c40)';
    const shape = n.kind === 'event'
      ? '<polygon points="-140,0 -118,-34 118,-34 140,0 118,34 -118,34"/>'
      : n.kind === 'function' ? '<rect x="-140" y="-34" width="280" height="68" rx="12"/>' : '<circle r="30"/>';
    const text = connector ? [n.kind.toUpperCase()] : lines(n.label);
    const y = 6 - (text.length - 1) * 11;
    return '<g class="epk-node epk-' + n.kind + '" data-node-id="' + xml(n.id) + '" transform="translate(' + n.x + ' ' + n.y + ')"><g fill="' + fill + '" stroke="' + edge + '" stroke-width="2">' + shape + '</g><text fill="' + ink + '" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600">' + text.map((line,i) => '<tspan x="0" y="' + (y + i * 22) + '">' + xml(line) + '</tspan>').join('') + '</text></g>';
  }).join('');
  return {width, height, body: '<defs><marker id="' + marker + '" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="' + edge + '"/></marker></defs>' + edges + nodes};
}
