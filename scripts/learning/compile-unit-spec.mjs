const STATUS_VALUES = new Set(['CURATED_DRAFT', 'DIDACTICALLY_REVIEWED', 'PUBLICATION_READY']);
const BLOCK_TYPES = new Set(['markdown', 'quiz', 'callout', 'math', 'figure', 'recall', 'flashcards', 'numeric', 'sequence']);
const DIAGRAM_TYPES = new Set(['layers', 'flow', 'comparison', 'topology']);

function fail(fileName, message) {
  throw new Error(`${fileName}: ${message}`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", '&apos;');
}

function renderInlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function jsonFrontmatter(value) {
  return JSON.stringify(value);
}

function allBlocks(sections) {
  return sections.flatMap(section => section.blocks || []);
}

function interactiveId(block) {
  return block.id || null;
}

function validateMeta(spec, fileName) {
  const required = [
    'id', 'slug', 'title', 'description', 'domain', 'domainLabel', 'groupId', 'groupLabel',
    'itemId', 'week', 'estimatedMinutes', 'relevance', 'sources', 'contentRevision', 'contentStatus'
  ];
  for (const field of required) {
    if (spec.meta?.[field] === undefined || spec.meta[field] === '') fail(fileName, `meta.${field} fehlt.`);
  }
  const meta = spec.meta;
  if (!/^[a-z0-9-]+$/.test(meta.slug)) fail(fileName, 'meta.slug ist ungültig.');
  if (!/^ga[12]-\d+__\d+$|^wiso-\d+__\d+$/.test(meta.itemId)) fail(fileName, 'meta.itemId passt nicht zum Tracker-Schema.');
  if (!['GA1', 'GA2', 'WiSo'].includes(meta.domain)) fail(fileName, 'meta.domain muss GA1, GA2 oder WiSo sein.');
  if (!STATUS_VALUES.has(meta.contentStatus)) fail(fileName, 'meta.contentStatus ist ungültig.');
  if (!Array.isArray(meta.sources) || meta.sources.length === 0) fail(fileName, 'meta.sources muss eine nichtleere Liste sein.');
  if (!Number.isInteger(meta.estimatedMinutes) || meta.estimatedMinutes < 5) fail(fileName, 'meta.estimatedMinutes muss eine ganze Zahl ab 5 sein.');
}

export function validateUnitSpec(spec, fileName = 'Lern-Spezifikation') {
  if (!spec || typeof spec !== 'object' || Array.isArray(spec)) fail(fileName, 'Wurzel muss ein Objekt sein.');
  validateMeta(spec, fileName);
  if (typeof spec.intro !== 'string' || spec.intro.trim().length < 40) fail(fileName, 'intro ist zu kurz.');
  if (!Array.isArray(spec.objectives) || spec.objectives.length < 2) fail(fileName, 'mindestens zwei objectives erforderlich.');
  if (!Array.isArray(spec.sections) || spec.sections.length < 4) fail(fileName, 'mindestens vier sections erforderlich.');
  if (!spec.curation || !Array.isArray(spec.curation.evidence) || spec.curation.evidence.length === 0) {
    fail(fileName, 'curation.evidence fehlt.');
  }

  const objectiveIds = spec.objectives.map(objective => objective.id);
  if (objectiveIds.some(id => !/^[a-z0-9-]+$/.test(id || '')) || new Set(objectiveIds).size !== objectiveIds.length) {
    fail(fileName, 'objective-IDs müssen eindeutig und slugförmig sein.');
  }
  if (spec.objectives.some(objective => typeof objective.label !== 'string' || objective.label.trim().length < 12)) {
    fail(fileName, 'jedes objective benötigt eine verständliche Beschreibung.');
  }

  for (const evidence of spec.curation.evidence) {
    if (!spec.meta.sources.includes(evidence.sourceId) || !evidence.sourceLocator || !evidence.use || !evidence.reviewStatus) {
      fail(fileName, 'curation.evidence ist unvollständig oder nutzt eine nicht deklarierte Quelle.');
    }
  }

  const blocks = allBlocks(spec.sections);
  const ids = [];
  for (const section of spec.sections) {
    if (typeof section.title !== 'string' || section.title.trim().length < 3) fail(fileName, 'jede section benötigt einen Titel.');
    if (!Array.isArray(section.blocks) || section.blocks.length === 0) fail(fileName, `section ${section.title} besitzt keine blocks.`);
  }
  for (const block of blocks) {
    if (!BLOCK_TYPES.has(block.type)) fail(fileName, `unbekannter Blocktyp ${block.type}.`);
    const id = interactiveId(block);
    if (id) ids.push(id);
    if (block.type === 'markdown') {
      if (typeof block.markdown !== 'string' || block.markdown.trim().length === 0) fail(fileName, 'markdown-Block ist leer.');
      if (/<\/?[a-z][^>]*>|\bdata-[a-z-]+=/i.test(block.markdown)) fail(fileName, 'markdown-Blöcke dürfen kein eigenes HTML oder Interaktionsmarkup enthalten.');
    }
    if (block.type === 'quiz') {
      if (!id || !Array.isArray(block.options) || block.options.length < 2) fail(fileName, 'quiz benötigt id und mindestens zwei Optionen.');
      if (block.options.filter(option => option.correct).length !== 1) fail(fileName, `quiz ${id} benötigt genau eine richtige Option.`);
      if (block.options.some(option => !option.text || !option.rationale)) fail(fileName, `quiz ${id} benötigt Text und Fehlfeedback je Option.`);
      if (block.diagnostic && block.requiredObjective) fail(fileName, `Diagnose ${id} darf kein Pflichtziel erfüllen.`);
    }
    if (block.type === 'numeric') {
      if (!id || block.expected === undefined || !block.prompt || !block.label || !block.correctFeedback || !block.wrongFeedback) {
        fail(fileName, 'numeric benötigt id, expected, prompt, label und Feedback.');
      }
      if (!Number.isFinite(Number(block.expected)) || block.tolerance !== undefined && (!Number.isFinite(Number(block.tolerance)) || Number(block.tolerance) < 0)) {
        fail(fileName, `numeric ${id} benötigt endliche Zahlen für expected und eine nichtnegative tolerance.`);
      }
    }
    if (block.type === 'recall') {
      if (!id || !block.prompt || !block.model || !Number.isInteger(block.minLength)) fail(fileName, 'recall benötigt id, prompt, model und minLength.');
    }
    if (block.type === 'flashcards') {
      if (!Array.isArray(block.cards) || block.cards.length < 2) fail(fileName, 'flashcards benötigt mindestens zwei Karten.');
      for (const card of block.cards) {
        if (!card.id || !card.front || !card.back || !card.label) fail(fileName, 'jede Karte benötigt id, label, front und back.');
        ids.push(card.id);
      }
    }
    if (block.type === 'sequence') {
      if (!id || !Array.isArray(block.steps) || block.steps.length < 3 || !Array.isArray(block.expected)) fail(fileName, 'sequence benötigt id, steps und expected.');
      const stepIds = block.steps.map(step => step.id);
      if (new Set(stepIds).size !== stepIds.length || stepIds.length !== block.expected.length || block.expected.some(idValue => !stepIds.includes(idValue))) {
        fail(fileName, `sequence ${id} besitzt keine konsistente Sollreihenfolge.`);
      }
    }
    if (block.type === 'math' && (!block.ariaLabel || !block.mathml)) fail(fileName, 'math benötigt ariaLabel und mathml.');
    if (block.type === 'figure' && (!block.diagramId && !block.src || !block.alt || !block.caption)) fail(fileName, 'figure benötigt diagramId/src, alt und caption.');
    if (block.requiredObjective && !objectiveIds.includes(block.requiredObjective)) fail(fileName, `unbekanntes Pflichtziel ${block.requiredObjective}.`);
    if (block.requiredObjective && !['quiz', 'numeric', 'sequence'].includes(block.type)) {
      fail(fileName, `Blocktyp ${block.type} kann kein Pflichtziel nachweisen.`);
    }
  }
  if (new Set(ids).size !== ids.length) fail(fileName, 'Interaktions- und Karten-IDs müssen eindeutig sein.');
  if (!blocks.some(block => block.type === 'quiz' && block.diagnostic)) fail(fileName, 'eine unbewertete Diagnose fehlt.');
  if (!blocks.some(block => block.type === 'recall')) fail(fileName, 'freier Abruf fehlt.');
  if (!blocks.some(block => block.type === 'flashcards')) fail(fileName, 'Karteikarten fehlen.');
  for (const objectiveId of objectiveIds) {
    if (blocks.filter(block => block.requiredObjective === objectiveId).length !== 1) {
      fail(fileName, `Lernziel ${objectiveId} benötigt genau einen Pflichtnachweis.`);
    }
  }

  const diagramIds = (spec.diagrams || []).map(diagram => diagram.id);
  if (new Set(diagramIds).size !== diagramIds.length) fail(fileName, 'Diagramm-IDs müssen eindeutig sein.');
  for (const diagram of spec.diagrams || []) {
    if (!DIAGRAM_TYPES.has(diagram.type) || !diagram.id || !diagram.title) {
      fail(fileName, 'jedes Diagramm benötigt id, title und einen unterstützten type.');
    }
    if (diagram.type !== 'topology' && (!Array.isArray(diagram.items) || diagram.items.length < 2)) {
      fail(fileName, 'layers-, flow- und comparison-Diagramme benötigen mindestens zwei items.');
    }
    if (diagram.type === 'topology') {
      if (!Array.isArray(diagram.nodes) || diagram.nodes.length < 2 || !Array.isArray(diagram.edges) || diagram.edges.length < 1) {
        fail(fileName, 'topology-Diagramme benötigen mindestens zwei nodes und eine edge.');
      }
      const nodeIds = diagram.nodes.map(node => node.id);
      if (nodeIds.some(id => !/^[a-z0-9-]+$/.test(id || '')) || new Set(nodeIds).size !== nodeIds.length) {
        fail(fileName, `topology-Diagramm ${diagram.id} benötigt eindeutige, slugförmige node-IDs.`);
      }
      if (diagram.nodes.some(node => !node.label || !Number.isFinite(node.x) || !Number.isFinite(node.y))) {
        fail(fileName, `topology-Diagramm ${diagram.id} benötigt label sowie numerische x/y-Koordinaten je node.`);
      }
      if (diagram.edges.some(edge => !nodeIds.includes(edge.from) || !nodeIds.includes(edge.to) || edge.from === edge.to)) {
        fail(fileName, `topology-Diagramm ${diagram.id} enthält eine ungültige edge.`);
      }
      if (diagram.zones !== undefined && (!Array.isArray(diagram.zones) || diagram.zones.some(zone =>
        !zone.id || !zone.label || ![zone.x, zone.y, zone.width, zone.height].every(Number.isFinite)))) {
        fail(fileName, `topology-Diagramm ${diagram.id} enthält eine ungültige zone.`);
      }
    }
  }
  for (const block of blocks.filter(block => block.type === 'figure' && block.diagramId)) {
    if (!diagramIds.includes(block.diagramId)) fail(fileName, `figure verweist auf unbekanntes Diagramm ${block.diagramId}.`);
  }
  if (!blocks.some(block => block.type === 'figure' || block.type === 'math')) fail(fileName, 'fachliche Visualisierung fehlt.');
  return spec;
}

function renderQuiz(block) {
  const correct = block.options.findIndex(option => option.correct);
  const required = block.requiredObjective ? ` data-required-objective="${escapeHtml(block.requiredObjective)}"` : '';
  const options = block.options.map((option, index) => {
    const label = option.label || String.fromCharCode(65 + index);
    return `  <button class="opt" type="button" data-answer="${index}" data-rationale="${escapeHtml(option.rationale)}"><span class="m">${escapeHtml(label)}</span> ${escapeHtml(option.text)}</button>`;
  }).join('\n');
  return `<section class="quiz" data-quiz="${escapeHtml(block.id)}" data-correct="${correct}"${required}>\n  <h3>${escapeHtml(block.question)}</h3>\n${options}\n  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>\n</section>`;
}

function renderCallout(block) {
  const kind = block.kind === 'merksatz' ? ' merk' : block.kind === 'warning' ? ' warn' : '';
  return `<aside class="callout${kind}"><span class="lbl">${escapeHtml(block.label)}</span><p>${renderInlineMarkdown(block.markdown)}</p></aside>`;
}

function renderMath(block) {
  const compact = block.compact ? ' compact' : '';
  const legend = Array.isArray(block.legend) && block.legend.length
    ? `<div class="math-legend">${block.legend.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>`
    : '';
  const rawMath = block.mathml.trim();
  const math = rawMath.startsWith('<math')
    ? rawMath.replace(/^<math\b([^>]*)>/, (_match, attributes) => {
      const cleanAttributes = attributes.replace(/\saria-label=(?:"[^"]*"|'[^']*')/g, '');
      return `<math${cleanAttributes} aria-label="${escapeHtml(block.ariaLabel)}">`;
    })
    : `<math display="block" aria-label="${escapeHtml(block.ariaLabel)}">${block.mathml}</math>`;
  return `<div class="math-display${compact}" role="group" aria-label="${escapeHtml(block.ariaLabel)}">${math}${legend}</div>`;
}

function renderFigure(block, meta, diagramsById) {
  if (block.diagramId) {
    const diagram = diagramsById.get(block.diagramId);
    return `<figure class="learning-figure learning-figure-inline">\n  <div class="learning-diagram-scroll" tabindex="0" role="group" aria-label="Diagramm: ${escapeHtml(diagram.title)}">\n    <span class="diagram-scroll-hint" aria-hidden="true">Grafik seitlich verschieben</span>\n    ${renderDiagram(diagram, block.alt).trim()}\n  </div>\n  <figcaption>${escapeHtml(block.caption)}</figcaption>\n</figure>`;
  }
  return `<figure class="learning-figure">\n  <img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}">\n  <figcaption>${escapeHtml(block.caption)}</figcaption>\n</figure>`;
}

function renderRecall(block) {
  const titleId = `${block.id}-title`;
  const inputId = `${block.id}-answer`;
  return `<section class="recall-practice" data-recall="${escapeHtml(block.id)}" data-min-length="${block.minLength}" aria-labelledby="${escapeHtml(titleId)}">\n  <div class="recall-prompt"><h3 id="${escapeHtml(titleId)}">${escapeHtml(block.title || 'Abruf aus dem Kopf')}</h3><p>${escapeHtml(block.prompt)}</p></div>\n  <label class="sr-only" for="${escapeHtml(inputId)}">${escapeHtml(block.label || 'Deine freie Antwort')}</label>\n  <textarea id="${escapeHtml(inputId)}" data-recall-input rows="${block.rows || 4}" placeholder="${escapeHtml(block.placeholder || 'Deine Antwort …')}"></textarea>\n  <div class="recall-actions"><span data-recall-count>0 Zeichen notiert</span><button class="lbtn" type="button" data-recall-reveal>${escapeHtml(block.revealLabel || 'Muster vergleichen')}</button></div>\n  <div class="recall-model" data-recall-model hidden><strong>Muster:</strong> ${escapeHtml(block.model)}</div>\n</section>`;
}

function renderFlashcards(block) {
  const cards = block.cards.map(card => `<button class="flashcard" type="button" data-flashcard="${escapeHtml(card.id)}" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>${escapeHtml(card.front)}</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>${escapeHtml(card.back)}</span></span></button>`).join('\n  ');
  const ratings = block.cards.map(card => `<div class="card-rating"><span>Karte „${escapeHtml(card.label)}“:</span><button type="button" data-card-id="${escapeHtml(card.id)}" data-card-rate="known">gewusst</button><button type="button" data-card-id="${escapeHtml(card.id)}" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="${escapeHtml(card.id)}"></span></div>`).join('\n');
  return `<div class="flashcard-grid">\n  ${cards}\n</div>\n${ratings}`;
}

function renderNumeric(block) {
  const required = block.requiredObjective ? ` data-required-objective="${escapeHtml(block.requiredObjective)}"` : '';
  const tolerance = block.tolerance === undefined ? '' : ` data-tolerance="${escapeHtml(block.tolerance)}"`;
  const inputId = `${block.id}-answer`;
  const common = `<section class="numeric-practice transfer-number" data-numeric-practice="${escapeHtml(block.id)}"${required} data-expected="${escapeHtml(block.expected)}"${tolerance} data-correct-feedback="${escapeHtml(block.correctFeedback)}" data-wrong-feedback="${escapeHtml(block.wrongFeedback)}">`;
  const correctDetail = block.correctMath ? `<template data-numeric-correct><span>${escapeHtml(block.correctFeedback)}</span>${renderMath({ ...block.correctMath, compact: true })}</template>` : '';
  const misconception = (block.misconceptions || []).map(item => `<template data-numeric-feedback-for="${escapeHtml(item.value)}">${escapeHtml(item.feedback)}</template>`).join('\n  ');
  return `${common}\n  <h3>${escapeHtml(block.title || 'Berechne das Ergebnis')}</h3>\n  <p>${escapeHtml(block.prompt)}</p>\n  <label for="${escapeHtml(inputId)}">${escapeHtml(block.label)}</label>\n  <div class="answer-row"><input id="${escapeHtml(inputId)}" data-numeric-input type="text" inputmode="decimal" autocomplete="off" placeholder="${escapeHtml(block.placeholder || 'Ergebnis')}"><button type="button" class="lbtn${block.requiredObjective ? ' primary' : ''}" data-numeric-check>Antwort prüfen</button></div>\n  ${correctDetail}\n  ${misconception}\n  <p class="practice-feedback" data-numeric-feedback aria-live="polite" hidden></p>\n</section>`;
}

function renderSequence(block) {
  const required = block.requiredObjective ? ` data-required-objective="${escapeHtml(block.requiredObjective)}"` : '';
  const steps = block.steps.map((step, index) => `    <li data-step="${escapeHtml(step.id)}" tabindex="-1"><span class="step-position" data-step-position>${index + 1}</span><span>${escapeHtml(step.label)}</span></li>`).join('\n');
  return `<section class="sequence-practice" data-sequence="${escapeHtml(block.id)}" data-expected="${escapeHtml(block.expected.join(','))}" data-correct-feedback="${escapeHtml(block.correctFeedback)}" data-wrong-feedback="${escapeHtml(block.wrongFeedback)}"${required} aria-labelledby="${escapeHtml(block.id)}-title">\n  <div class="lab-heading"><div><h3 id="${escapeHtml(block.id)}-title">${escapeHtml(block.title)}</h3><p>${escapeHtml(block.prompt)}</p></div><span class="lab-tag">${escapeHtml(block.tag || 'Ablauf')}</span></div>\n  <ol class="sequence-list" data-sequence-list>\n${steps}\n  </ol>\n  <div class="sequence-actions"><button class="lbtn primary" type="button" data-sequence-check>Reihenfolge prüfen</button><button class="lbtn" type="button" data-sequence-reset>Zurücksetzen</button></div>\n  <p class="practice-feedback" data-sequence-feedback aria-live="polite" hidden></p>\n</section>`;
}

function renderBlock(block, meta, diagramsById) {
  if (block.type === 'markdown') return block.markdown.trim();
  if (block.type === 'quiz') return renderQuiz(block);
  if (block.type === 'callout') return renderCallout(block);
  if (block.type === 'math') return renderMath(block);
  if (block.type === 'figure') return renderFigure(block, meta, diagramsById);
  if (block.type === 'recall') return renderRecall(block);
  if (block.type === 'flashcards') return renderFlashcards(block);
  if (block.type === 'numeric') return renderNumeric(block);
  if (block.type === 'sequence') return renderSequence(block);
  throw new Error(`Unbekannter Blocktyp ${block.type}`);
}

function wrapLines(text, max = 42) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    if (!current || `${current} ${word}`.length <= max) current = current ? `${current} ${word}` : word;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function svgText(text, x, y, options = {}) {
  const lines = wrapLines(text, options.max || 42);
  const anchor = options.anchor || 'start';
  const weight = options.weight || 500;
  const size = options.size || 20;
  const className = options.className ? ` class="${escapeXml(options.className)}"` : '';
  return `<text${className} x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${options.fill || 'var(--diagram-text, #f1f0ec)'}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? 25 : 0}">${escapeXml(line)}</tspan>`).join('')}</text>`;
}

function renderLayersSvg(diagram) {
  const rowHeight = 100;
  const height = 112 + diagram.items.length * rowHeight;
  const rows = diagram.items.map((item, index) => {
    const y = 82 + index * rowHeight;
    return `<g><rect class="diagram-row" x="42" y="${y}" width="876" height="82" rx="12" fill="var(--diagram-surface, #241e2e)" stroke="var(--diagram-border, #5f526e)"/><rect class="diagram-key" x="42" y="${y}" width="126" height="82" rx="12" fill="var(--diagram-key, #342c40)"/>${svgText(item.label, 105, y + 48, { anchor: 'middle', weight: 700, size: 22, max: 12 })}${svgText(item.detail || '', 194, y + 34, { size: 21, max: 58, fill: 'var(--diagram-muted, #c8c1d2)' })}</g>`;
  }).join('');
  return { width: 960, height, body: rows };
}

function renderFlowSvg(diagram) {
  const rowHeight = 108;
  const height = 110 + diagram.items.length * rowHeight;
  const rows = diagram.items.map((item, index) => {
    const y = 80 + index * rowHeight;
    const arrow = index === diagram.items.length - 1 ? '' : `<path d="M480 ${y + 68}v30" stroke="var(--diagram-line, #b997ff)" stroke-width="3"/><path d="m470 ${y + 90} 10 10 10-10" fill="none" stroke="var(--diagram-line, #b997ff)" stroke-width="3"/>`;
    return `<g><rect class="diagram-row" x="150" y="${y}" width="660" height="72" rx="14" fill="${index === 0 ? 'var(--diagram-key, #342c40)' : 'var(--diagram-surface, #241e2e)'}" stroke="var(--diagram-border, #5f526e)"/>${svgText(item.label, 178, y + 29, { weight: 700, size: 21, max: 50 })}${svgText(item.detail || '', 178, y + 56, { size: 18, fill: 'var(--diagram-muted, #c8c1d2)', max: 62 })}${arrow}</g>`;
  }).join('');
  return { width: 960, height, body: rows };
}

function renderComparisonSvg(diagram) {
  const count = diagram.items.length;
  const gap = 18;
  const cardWidth = Math.floor((876 - gap * (count - 1)) / count);
  const height = 390;
  const cards = diagram.items.map((item, index) => {
    const x = 42 + index * (cardWidth + gap);
    const detail = wrapLines(item.detail || '', Math.max(20, Math.floor(cardWidth / 10))).slice(0, 5);
    return `<g><rect class="diagram-row" x="${x}" y="92" width="${cardWidth}" height="252" rx="16" fill="${index % 2 ? 'var(--diagram-surface-alt, #2c2438)' : 'var(--diagram-surface, #241e2e)'}" stroke="var(--diagram-border, #5f526e)"/>${svgText(item.label, x + 22, 132, { weight: 700, size: 23, max: Math.floor(cardWidth / 11) })}<text x="${x + 22}" y="180" font-family="Inter, Arial, sans-serif" font-size="20" fill="var(--diagram-muted, #c8c1d2)">${detail.map((line, lineIndex) => `<tspan x="${x + 22}" dy="${lineIndex ? 30 : 0}">${escapeXml(line)}</tspan>`).join('')}</text></g>`;
  }).join('');
  return { width: 960, height, body: cards };
}

function diagramClass(kind, fallback = '') {
  return /^[a-z0-9-]+$/.test(kind || '') ? kind : fallback;
}

function renderTopologySvg(diagram) {
  const width = 960;
  const height = Number.isFinite(diagram.height) ? diagram.height : 560;
  const nodeById = new Map(diagram.nodes.map(node => [node.id, node]));
  const zones = (diagram.zones || []).map(zone => `<g class="diagram-zone ${diagramClass(zone.kind)}"><rect x="${zone.x}" y="${zone.y}" width="${zone.width}" height="${zone.height}" rx="18"/><text x="${zone.x + 16}" y="${zone.y + 27}">${escapeXml(zone.label)}</text></g>`).join('');
  const edges = diagram.edges.map(edge => {
    const from = nodeById.get(edge.from);
    const to = nodeById.get(edge.to);
    const label = edge.label ? `<text class="diagram-edge-label" x="${(from.x + to.x) / 2}" y="${(from.y + to.y) / 2 - 8}" text-anchor="middle">${escapeXml(edge.label)}</text>` : '';
    return `<g class="diagram-edge ${diagramClass(edge.kind)}"><path d="M${from.x} ${from.y} L${to.x} ${to.y}"/>${label}</g>`;
  }).join('');
  const nodes = diagram.nodes.map(node => {
    const nodeClass = diagramClass(node.kind, 'device');
    const detail = node.detail ? svgText(node.detail, node.x, node.y + 19, { anchor: 'middle', size: 14, weight: 500, max: 20, className: 'diagram-node-detail', fill: 'var(--diagram-muted, #c8c1d2)' }) : '';
    return `<g class="diagram-node ${nodeClass}" transform="translate(${node.x} ${node.y})"><rect x="-76" y="-34" width="152" height="68" rx="14"/></g>${svgText(node.label, node.x, node.y - 5, { anchor: 'middle', size: 18, weight: 700, max: 17, className: 'diagram-node-label' })}${detail}`;
  }).join('');
  return { width, height, body: `${zones}${edges}${nodes}` };
}

function diagramDescription(diagram) {
  if (diagram.description) return diagram.description;
  if (diagram.type === 'topology') {
    const nodes = diagram.nodes.map(node => `${node.label}${node.detail ? `: ${node.detail}` : ''}`).join('. ');
    const edges = diagram.edges.map(edge => `${nodeLabel(diagram, edge.from)} verbunden mit ${nodeLabel(diagram, edge.to)}${edge.label ? ` (${edge.label})` : ''}`).join('. ');
    return `${nodes}. Verbindungen: ${edges}.`;
  }
  return diagram.items.map(item => `${item.label}: ${item.detail || ''}`).join('. ');
}

function nodeLabel(diagram, nodeId) {
  return diagram.nodes.find(node => node.id === nodeId)?.label || nodeId;
}

export function renderDiagram(diagram, descriptionOverride = '') {
  const rendered = diagram.type === 'layers'
    ? renderLayersSvg(diagram)
    : diagram.type === 'flow'
      ? renderFlowSvg(diagram)
      : diagram.type === 'comparison'
        ? renderComparisonSvg(diagram)
        : renderTopologySvg(diagram);
  const titleId = `diagram-${diagram.id}-title`;
  const descId = `diagram-${diagram.id}-desc`;
  return `<svg class="learning-diagram diagram-${escapeXml(diagram.type)}" xmlns="http://www.w3.org/2000/svg" width="${rendered.width}" height="${rendered.height}" viewBox="0 0 ${rendered.width} ${rendered.height}" role="img" aria-labelledby="${titleId} ${descId}">\n  <title id="${titleId}">${escapeXml(diagram.title)}</title>\n  <desc id="${descId}">${escapeXml(descriptionOverride || diagramDescription(diagram))}</desc>\n  <rect class="diagram-canvas" width="100%" height="100%" rx="20" fill="var(--diagram-canvas, #17121f)"/>\n  ${svgText(diagram.title, 42, 48, { weight: 700, size: 28, max: 60, className: 'diagram-title' })}\n  ${rendered.body}\n</svg>\n`;
}

export function compileUnitSpec(spec, fileName = 'Lern-Spezifikation') {
  validateUnitSpec(spec, fileName);
  const meta = spec.meta;
  const diagramsById = new Map((spec.diagrams || []).map(diagram => [diagram.id, diagram]));
  const curationPath = `content/curation/${meta.slug}.json`;
  const metadata = {
    id: meta.id,
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    domain: meta.domain,
    domain_label: meta.domainLabel,
    group_id: meta.groupId,
    group_label: meta.groupLabel,
    item_id: meta.itemId,
    week: meta.week,
    estimated_minutes: meta.estimatedMinutes,
    relevance: meta.relevance,
    sources: meta.sources,
    content_revision: meta.contentRevision,
    content_status: meta.contentStatus,
    learning_objectives: spec.objectives.map(objective => objective.id),
    curation: curationPath
  };
  const frontmatter = Object.entries(metadata).map(([key, value]) => `${key}: ${Array.isArray(value) ? jsonFrontmatter(value) : value}`).join('\n');
  const goals = `<section class="learning-goals" aria-labelledby="${escapeHtml(meta.slug)}-goals">\n  <h2 id="${escapeHtml(meta.slug)}-goals">Nach dieser Einheit kannst du …</h2>\n  <ul>\n${spec.objectives.map(objective => `    <li>${escapeHtml(objective.label)}</li>`).join('\n')}\n  </ul>\n</section>`;
  const body = spec.sections.map(section => `## ${section.title}\n\n${section.blocks.map(block => renderBlock(block, meta, diagramsById)).join('\n\n')}`).join('\n\n');
  const contentMarkdown = `${spec.intro.trim()}\n\n${goals}\n\n${body}\n`;
  const markdown = `<!-- GENERATED from content/learning-units/${fileName}; edit the unit spec, not this file. -->\n---\n${frontmatter}\n---\n${contentMarkdown}`;
  const curation = {
    topicId: meta.id,
    contentRevision: meta.contentRevision,
    status: meta.contentStatus,
    generatedFrom: `content/learning-units/${fileName}`,
    objectives: spec.objectives.map(objective => ({ ...objective, required: true })),
    evidence: spec.curation.evidence,
    notes: spec.curation.notes || []
  };
  const assets = (spec.diagrams || []).map(diagram => ({
    path: `assets/learning/${meta.slug}-${diagram.id}.svg`,
    content: renderDiagram(diagram)
  }));
  return { metadata, contentMarkdown, markdown, curation, assets };
}
