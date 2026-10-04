import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { chromium } from 'playwright';

// Local-only fixture: no CDN, account, or production cloud is contacted.
const baseline = process.argv.includes('--baseline');
const runtime = await readFile(new URL('../assets/ap2-learning.js', import.meta.url), 'utf8');
const merge = await readFile(new URL('../assets/ap2-progress-merge.js', import.meta.url), 'utf8');
const fixture = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Learning runtime fixture</title></head>
<body data-topic-id="runtime-fixture" data-progress-id="fixture-1" data-content-revision="fixture.1">
<span id="learning-save" role="status"></span><span data-topic-status></span><span data-rail-status></span>
<div data-mastery-box><span data-mastery-count></span><i data-mastery-bar></i><p data-mastery-note></p><a data-next-check></a></div>
<details class="learning-overview" id="lesson-overview"><summary>Inhalt und Lernstand <small data-current-section></small></summary>
<div data-mastery-box><span data-mastery-count></span><i data-mastery-bar></i><p data-mastery-note></p><a data-next-check></a></div>
<ul class="toc"><li><a href="#s1" data-t="s1">Grundlagen</a></li><li><a href="#s2" data-t="s2">Anwendung</a></li></ul></details>
<h2 id="s1">Grundlagen</h2>
<section data-quiz="diagnose" data-correct="0"><h3>Diagnose</h3><button data-answer="0">Sicher</button><button data-answer="1">Unsicher</button><div data-feedback hidden><button data-quiz-reset>Erneut versuchen</button></div></section>
<section data-quiz="transfer" data-correct="0" data-required-objective="wissen"><h3>Wissenscheck</h3><button data-answer="0">Richtig</button><button data-answer="1">Falsch</button><div data-feedback hidden><button data-quiz-reset>Erneut versuchen</button></div></section>
<h2 id="s2">Anwendung</h2>
<section data-numeric-practice="summe" data-required-objective="rechnen" data-expected="42" data-correct-feedback="Richtig." data-wrong-feedback="Prüfe die Rechnung."><h3>Rechencheck</h3><label>Ergebnis <input data-numeric-input></label><button data-numeric-check>Ergebnis prüfen</button><div data-numeric-feedback hidden></div></section>
<button data-flashcard="card"><span class="front">Welche Zahl?</span><span class="back">Geheime Antwort 42</span></button>
<div class="card-rating"><button data-card-id="card" data-card-rate="known">Gewusst</button></div>
<button id="mark-done" aria-describedby="learning-action-reason">Als gelernt markieren</button><button id="mark-rep">Zur Wiederholung</button><p id="learning-action-reason" data-action-reason></p>
<script>
window.__upserts = []; window.__holdNext = false; window.__throwNext = false; window.__cloudErrors = [];
const fixtureSignedIn = !new URL(location.href).searchParams.has('signedout');
window.supabase = { createClient() { return {
  auth: { async getSession() { return { data: { session: fixtureSignedIn ? { user: { id: 'fixture-user' } } : null } }; }, onAuthStateChange(callback) { window.__authState = callback; } },
  from() { return {
    select() { return this; }, eq() { return this; }, async maybeSingle() { if (new URL(location.href).searchParams.has('fail-load')) throw new Error('Fixture load outage'); return { data: null, error: null }; },
    async upsert(row) {
      window.__upserts.push(structuredClone(row));
      if (window.__throwNext) { window.__throwNext = false; throw new Error('Fixture network outage'); }
      if (window.__holdNext) { window.__holdNext = false; await new Promise(resolve => { window.__releaseUpsert = resolve; }); }
      return { error: null };
    }
  }; }
}; } };
</script><script src="/merge.js"></script><script src="/runtime.js"></script></body></html>`;
const server = createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  response.setHeader('Content-Type', path.endsWith('.js') ? 'text/javascript' : 'text/html; charset=utf-8');
  response.end(path === '/runtime.js' ? runtime : path === '/merge.js' ? merge : fixture);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
let page;
try {
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(base);
  await page.waitForFunction(() => !document.getElementById('mark-rep').disabled);
  await page.locator('[data-quiz="transfer"] [data-answer="0"]').click();
  await page.locator('[data-numeric-input]').fill('42');
  await page.locator('[data-numeric-check]').click();
  assert.equal(await page.locator('#mark-done').isEnabled(), true);
  await page.locator('[data-numeric-input]').fill('13');
  if (baseline) {
    assert.equal(await page.locator('#mark-done').isEnabled(), true, 'Baseline reproduces stale numeric mastery');
    assert.equal(await page.locator('[data-numeric-feedback]').getAttribute('data-result'), 'correct');
    console.log('REPRODUCED numeric edit retains previous correct result and completion gate');
  } else {
    assert.equal(await page.locator('#mark-done').isDisabled(), true, 'Editing a checked numeric answer closes the gate');
    assert.equal(await page.locator('[data-numeric-feedback]').isHidden(), true, 'Old numeric feedback is cleared');
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('ap2-learning-state-v1')));
    assert.equal(stored['runtime-fixture:numeric:summe:value'], '13');
    assert.equal(stored['runtime-fixture:numeric:summe:result'], undefined);
    await page.reload();
    assert.equal(await page.locator('[data-numeric-input]').inputValue(), '13', 'Numeric draft survives reload');
    assert.equal(await page.locator('#mark-done').isDisabled(), true);
    assert.deepEqual(await page.locator('[data-mastery-count]').allTextContents(), ['1 von 2 Pflichtchecks bestanden', '1 von 2 Pflichtchecks bestanden']);
    assert.equal(await page.locator('[data-quiz="diagnose"] .learning-check-label').textContent(), 'Diagnose · kein Pflichtcheck');
    assert.equal(await page.locator('[data-quiz="transfer"] .learning-check-label').textContent(), 'Pflichtcheck 1 von 2 · bestanden');
    assert.equal(await page.locator('[data-next-check]').first().getAttribute('href'), '#learning-check-2');
    await page.locator('#lesson-overview summary').click();
    await page.locator('#lesson-overview .toc a[data-t="s2"]').click();
    assert.equal(await page.locator('#lesson-overview').getAttribute('open'), null);
    assert.equal(await page.evaluate(() => document.activeElement.id), 's2');
    await page.locator('[data-next-check]').first().click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'learning-check-2');
    await page.locator('[data-numeric-practice]').evaluate(node => { node.dataset.expected = '0'; });
    await page.locator('[data-numeric-input]').fill('');
    await page.locator('[data-numeric-check]').click();
    assert.equal(await page.locator('[data-numeric-feedback]').getAttribute('data-result'), 'wrong', 'Empty input is not the numeric answer zero');
    await page.locator('[data-numeric-input]').fill('0');
    await page.locator('[data-numeric-check]').click();
    assert.equal(await page.locator('[data-numeric-feedback]').getAttribute('data-result'), 'correct', 'Explicit zero is accepted');
    assert.equal(await page.locator('[data-next-check]').first().isHidden(), true, 'The next-check link disappears when all required objectives passed');
    assert.equal(await page.locator('[data-flashcard] .back').getAttribute('aria-hidden'), 'true');
    let cardSnapshot = await page.locator('[data-flashcard]').ariaSnapshot();
    assert.equal(cardSnapshot.includes('Geheime Antwort'), false, 'Unflipped answer is absent from the accessibility tree');
    await page.locator('[data-flashcard]').press('Enter');
    cardSnapshot = await page.locator('[data-flashcard]').ariaSnapshot();
    assert.equal(cardSnapshot.includes('Geheime Antwort 42'), true);
    assert.equal(await page.locator('[data-flashcard] .front').getAttribute('aria-hidden'), 'true');
    await page.locator('[data-flashcard]').press('Space');
    assert.equal(await page.locator('[data-flashcard] .back').getAttribute('aria-hidden'), 'true');
    await page.locator('[data-quiz="transfer"] [data-quiz-reset]').click();
    assert.equal(await page.evaluate(() => document.activeElement.dataset.answer), '0', 'Retry focuses the first quiz option');
  }
  await page.evaluate(() => { window.__holdNext = true; });
  await page.locator('#mark-rep').click();
  await page.waitForFunction(() => typeof window.__releaseUpsert === 'function');
  const countBefore = await page.evaluate(() => window.__upserts.length);
  await page.locator('#mark-rep').click();
  await page.waitForTimeout(900);
  await page.evaluate(() => window.__releaseUpsert());
  if (baseline) {
    await page.waitForTimeout(250);
    assert.equal(await page.evaluate(() => window.__upserts.length), countBefore);
    assert.equal(await page.evaluate(() => window.__upserts.at(-1).state['mark__fixture-1']), true);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('ap2-tracker-state-v1'))['mark__fixture-1']), false);
    console.log('REPRODUCED cloud edit during an in-flight upsert is missing from the final cloud snapshot');
  } else {
    await page.waitForFunction(count => window.__upserts.length > count, countBefore);
    assert.equal(await page.evaluate(() => window.__upserts.at(-1).state['mark__fixture-1']), false, 'Queued trailing write contains the latest local edit');
    await page.waitForFunction(() => document.getElementById('learning-save').textContent === 'synchronisiert');
    await page.evaluate(() => { window.__throwNext = true; });
    await page.locator('#mark-rep').click();
    await page.waitForFunction(() => document.getElementById('learning-save').textContent.includes('Cloud-Sync fehlgeschlagen'));
    const countAfterFailure = await page.evaluate(() => window.__upserts.length);
    await page.locator('[data-flashcard]').click();
    assert.match(await page.locator('#learning-save').textContent(), /Cloud-Sync fehlgeschlagen/, 'A local learning save does not hide the cloud failure');
    assert.equal(await page.locator('.cloud-sync-retry').isVisible(), true, 'Retry remains available after a learning interaction');
    await page.locator('.cloud-sync-retry').click();
    await page.waitForFunction(count => window.__upserts.length > count, countAfterFailure);
    await page.waitForFunction(() => document.getElementById('learning-save').textContent === 'synchronisiert');
    assert.equal(pageErrors.length, 0, `No uncaught browser errors: ${pageErrors.join('; ')}`);
  }
  await page.close();
  if (!baseline) {
    const failedLoadPage = await browser.newPage();
    const errors = [];
    failedLoadPage.on('pageerror', error => errors.push(error.message));
    await failedLoadPage.goto(`${base}/?fail-load`);
    await failedLoadPage.waitForFunction(() => document.getElementById('learning-save').textContent.includes('Cloud-Fortschritt konnte nicht geladen werden'));
    assert.match(await failedLoadPage.locator('[data-action-reason]').textContent(), /Lade die Seite neu/);
    assert.equal(await failedLoadPage.locator('#learning-save a').count(), 0, 'A signed-in load failure is not mislabeled as signed out');
    assert.equal(await failedLoadPage.locator('#mark-rep').isDisabled(), true);
    await failedLoadPage.locator('[data-flashcard]').click();
    assert.match(await failedLoadPage.locator('#learning-save').textContent(), /Cloud-Fortschritt konnte nicht geladen werden/, 'A local learning save does not hide a cloud load failure');
    assert.equal(await failedLoadPage.evaluate(() => typeof window.__authState), 'undefined', 'A failed initial merge does not install an unchecked auth listener');
    assert.equal(errors.length, 0);
    await failedLoadPage.close();
  }
  for (const malformed of ['null', '[]', 'true', '42', '"cache"']) {
    const malformedPage = await browser.newPage();
    const errors = [];
    malformedPage.on('pageerror', error => errors.push(error.message));
    await malformedPage.addInitScript(value => {
      localStorage.setItem('ap2-learning-state-v1', value);
      localStorage.setItem('ap2-tracker-state-v1', value);
    }, malformed);
    await malformedPage.goto(`${base}/?signedout`);
    if (baseline) {
      const corrupted = errors.length > 0 || await malformedPage.evaluate(() => Array.isArray(JSON.parse(localStorage.getItem('ap2-learning-state-v1'))));
      assert.equal(corrupted, true, `Baseline cache ${malformed} fails or remains an array`);
    } else {
      assert.equal(errors.length, 0, `Cache ${malformed} is recovered without a runtime error`);
      assert.equal(await malformedPage.locator('#mark-done').isDisabled(), true);
      assert.match(await malformedPage.locator('[data-action-reason]').textContent(), /Anmelden/);
      const recovered = await malformedPage.evaluate(() => JSON.parse(localStorage.getItem('ap2-learning-state-v1')));
      assert.equal(typeof recovered, 'object');
      assert.equal(Array.isArray(recovered), false);
    }
    await malformedPage.close();
  }
  console.log(baseline ? 'REPRODUCED invalid cache shapes (null, arrays, booleans, numbers, strings)' : 'PASS learning runtime: duplicate mastery, check guidance, numeric drafts, flashcard AX, retry focus, mobile TOC, trailing cloud writes, error recovery, malformed caches');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
