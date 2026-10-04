// Explicit two-sector teaching model. Item order is part of this narrow contract.
const LABELS = ['Arbeitsleistung', 'Einkommen', 'Konsumgüter', 'Konsumausgaben'];
const xml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export function validateEconomicCycle(diagram, fileName) {
  if (!Array.isArray(diagram.items) || diagram.items.length !== 4 ||
      diagram.items.some((item, i) => item.label !== LABELS[i] ||
        typeof item.detail !== 'string' || item.detail.length < 8 || item.detail.length > 45)) {
    throw new Error(fileName + ': economic-cycle benötigt vier geordnete Ströme mit kurzen Details.');
  }
}

export function renderEconomicCycleSvg(diagram) {
  const marker = 'economic-arrow-' + diagram.id;
  const flows = diagram.items.map((item, i) => {
    const right = i === 0 || i === 3;
    const money = i === 1 || i === 3;
    const y = 156 + i * 80;
    const kind = money ? 'Geldstrom' : 'Realstrom';
    return '<g class="economic-flow" data-from="' + (right ? 'households' : 'companies') +
      '" data-to="' + (right ? 'companies' : 'households') + '" data-flow="' + (money ? 'money' : 'real') + '">' +
      '<text x="480" y="' + (y - 14) + '" text-anchor="middle" font-size="21" font-weight="700" fill="var(--diagram-text, #f1f0ec)">' + xml(item.label) + ' · ' + kind + '</text>' +
      '<path d="M' + (right ? 232 : 728) + ' ' + y + 'H' + (right ? 728 : 232) + '" fill="none" stroke="var(--diagram-line, #b997ff)" stroke-width="3"' +
      (money ? ' stroke-dasharray="9 6"' : '') + ' marker-end="url(#' + marker + ')"/>' +
      '<text x="480" y="' + (y + 26) + '" text-anchor="middle" font-size="18" fill="var(--diagram-muted, #c8c1d2)">' + xml(item.detail) + '</text></g>';
  }).join('');
  const box = (x, actor, lines) => '<g class="economic-sector" data-sector="' + actor + '"><rect x="' + x + '" y="98" width="180" height="350" rx="18" fill="var(--diagram-surface, #241e2e)" stroke="var(--diagram-border, #5f526e)"/>' +
    lines.map((line, i) => '<text x="' + (x + 90) + '" y="' + (258 + i * 32) + '" text-anchor="middle" font-size="22" font-weight="700" fill="var(--diagram-text, #f1f0ec)">' + line + '</text>').join('') + '</g>';
  return { width: 960, height: 540, body:
    '<defs><marker id="' + marker + '" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="var(--diagram-line, #b997ff)"/></marker></defs>' +
    box(42, 'households', ['Private', 'Haushalte']) + box(738, 'companies', ['Unternehmen']) + flows +
    '<text x="480" y="497" text-anchor="middle" font-size="18" fill="var(--diagram-muted, #c8c1d2)">Modell ohne Staat, Banken und Ausland</text>' };
}
