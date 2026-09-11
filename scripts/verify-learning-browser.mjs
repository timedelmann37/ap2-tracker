const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
let chromium;
for (const name of ['playwright', new URL('../../crawler/node_modules/playwright/index.mjs', import.meta.url).href]) {
  try {
    ({ chromium } = await import(name));
    break;
  } catch {
    // Try the next local installation.
  }
}
if (!chromium) throw new Error('Playwright is required locally or in the sibling crawler.');

function assert(value, message) {
  if (!value) throw new Error(message);
}

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await page.route('**/supabase-js@2.114.0/dist/umd/supabase.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.supabase = {
      createClient() {
        return {
          auth: {
            async getSession() { return { data: { session: null } }; },
            onAuthStateChange() { return { data: { subscription: { unsubscribe() {} } } }; }
          },
          from() { return {}; }
        };
      }
    };`
  }));
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.setDefaultTimeout(6000);

  await page.goto(`${base}/uebersicht/`);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  const catalog = await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/assets/ap2-learning-catalog.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return window.AP2_LEARNING_TOPICS;
  });
  const areaPaths = { GA1: '/konzeption-administration/', GA2: '/netzwerke/', WiSo: '/sowi/' };
  for (const topic of catalog) {
    await page.goto(`${base}${areaPaths[topic.domain]}`);
    const topicLink = page.locator(`[data-itemid="${topic.itemId}"] a.learning-link[href="/lernen/${topic.slug}/"]`);
    assert(await topicLink.count() === 1, `${topic.slug}: canonical area item exposes exactly one learning link`);
  }
  await page.goto(`${base}/uebersicht/`);
  await page.locator('button[data-jump="ga1-3"]').click();
  await page.waitForURL('**/konzeption-administration/#ga1-3');
  const storageLink = page.locator('a.learning-link[href="/lernen/storage-types/"]');
  await storageLink.waitFor({ state: 'visible' });
  assert(await page.locator('a.learning-link').count() >= 2, 'Area page exposes every generated learning topic');
  const learningLink = page.locator('a.learning-link[href="/lernen/raid/"]');
  await learningLink.waitFor({ state: 'visible' });
  await learningLink.click();
  await page.waitForURL('**/lernen/raid/');

  const done = page.locator('#mark-done');
  const repeat = page.locator('#mark-rep');
  assert(await done.getAttribute('aria-pressed') === 'false', 'Lernstatus starts open');
  assert(await done.isDisabled(), 'Completion is gated until required objectives pass');
  assert(await repeat.getAttribute('aria-pressed') === 'false', 'Repeat marker starts off');

  const card = page.locator('[data-flashcard="raid-backup"]');
  await card.click();
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard flips');
  assert(!await page.locator('.card-rating:has([data-card-id="raid-backup"])').isHidden(), 'Card rating appears only after recall');
  await page.locator('[data-card-id="raid-backup"][data-card-rate="unsure"]').click();
  assert((await page.locator('[data-card-review-status="raid-backup"]').textContent()).includes('Wiederholung am'), 'Card self-rating schedules a review');
  await page.reload();
  assert(await page.locator('[data-flashcard="raid-backup"]').getAttribute('aria-pressed') === 'false', 'Flashcard answer starts hidden again after reload');
  assert(await page.locator('.card-rating:has([data-card-id="raid-backup"])').isHidden(), 'Card cannot be rated before revealing it again');

  const lab = page.locator('[data-raid-lab="capacity-lab"]');
  await lab.locator('[data-raid-prediction]').fill('16');
  await lab.locator('[data-raid-calculate]').click();
  assert((await lab.locator('[data-raid-result]').textContent()).includes('Vorhersage war richtig'), 'RAID lab compares prediction with the calculated result');
  await lab.locator('[data-raid-level]').selectOption('1');
  await lab.locator('[data-raid-drives]').fill('3');
  await lab.locator('[data-raid-calculate]').click();
  assert((await lab.locator('[data-raid-result]').textContent()).includes('exakt zwei'), 'RAID lab explains invalid RAID 1 input');

  const failureSimulator = page.locator('[data-failure-simulator="raid10-pairs"]');
  await failureSimulator.locator('[data-drive-index="0"]').click();
  await failureSimulator.locator('[data-drive-index="2"]').click();
  assert((await failureSimulator.locator('[data-failure-status]').textContent()).includes('degradiert'), 'RAID 10 survives failures in different mirror pairs');
  await failureSimulator.locator('[data-drive-index="1"]').click();
  assert((await failureSimulator.locator('[data-failure-status]').textContent()).includes('desselben Spiegelpaars'), 'RAID 10 fails when one complete mirror pair fails');

  const recall = page.locator('[data-recall="raid-core"]');
  await recall.locator('[data-recall-input]').fill('zu kurz');
  assert(await recall.locator('[data-recall-reveal]').isDisabled(), 'Recall model stays locked until an honest attempt');
  await recall.locator('[data-recall-input]').fill('(n - 2) mal kleinste Platte; kein Schutz vor Löschen und Schadsoftware');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Recall model appears after an own answer');

  const quiz = page.locator('[data-quiz="raid-diagnostic"]');
  await quiz.locator('[data-answer="0"]').click();
  assert(await quiz.locator('[data-answer="0"]').evaluate(node => node.classList.contains('wrong')), 'Wrong quiz answer is marked');
  assert(!await quiz.locator('[data-answer="1"]').evaluate(node => node.classList.contains('right')), 'First wrong attempt does not reveal the correct answer');
  assert(await quiz.locator('[data-feedback]').isVisible(), 'Quiz explanation is shown');
  assert((await quiz.locator('[data-selected-feedback]').textContent()).includes('zwei Laufwerken'), 'Wrong answer receives distractor-specific feedback');
  await page.reload();
  assert(await page.locator('[data-quiz="raid-diagnostic"] [data-feedback]').isVisible(), 'Quiz answer survives reload');
  await page.locator('[data-quiz="raid-diagnostic"] [data-quiz-reset]').click();
  assert(!await page.locator('[data-quiz="raid-diagnostic"] [data-feedback]').isVisible(), 'Quiz can be retried');

  await page.locator('[data-quiz="raid-transfer-selection"] [data-answer="2"]').click();
  assert(await page.locator('#mark-done').isDisabled(), 'One passed objective is not enough for completion');
  await page.locator('[data-numeric-practice="raid-transfer-capacity"] [data-numeric-input]').fill('88');
  await page.locator('[data-numeric-practice="raid-transfer-capacity"] [data-numeric-check]').click();
  assert((await page.locator('[data-numeric-practice="raid-transfer-capacity"] [data-numeric-feedback]').textContent()).includes('RAID-5-Formel'), 'Numeric transfer gives misconception-specific feedback');
  assert(await page.locator('[data-numeric-practice="raid-transfer-capacity"] [data-numeric-feedback] math').isVisible(), 'Formula feedback is rendered as a visual math structure');
  await page.locator('[data-numeric-practice="raid-transfer-capacity"] [data-numeric-input]').fill('80,0');
  await page.locator('[data-numeric-practice="raid-transfer-capacity"] [data-numeric-check]').click();
  assert(!await page.locator('#mark-done').isDisabled(), 'Completion unlocks after all required objectives pass');

  await page.locator('#mark-done').click();
  await page.locator('#mark-rep').click();
  const trackerState = await page.evaluate(() => JSON.parse(localStorage.getItem('ap2-tracker-state-v1')));
  assert(trackerState['ga1-3__3'] === true, 'Learning page writes canonical completion state');
  assert(trackerState['mark__ga1-3__3'] === true, 'Learning page writes canonical repeat marker');
  assert(Boolean(trackerState['ts__ga1-3__3']), 'Learning page writes completion timestamp');

  await page.goto(`${base}/konzeption-administration/#ga1-3`);
  assert(await page.locator('#ga1-3__3').isChecked(), 'Area page reads learning completion');
  assert(await page.locator('[data-itemid="ga1-3__3"]').evaluate(node => node.classList.contains('marked')), 'Area page reads repeat marker');

  await page.goto(`${base}/lernpfad/`);
  const learningSummary = await page.locator('#learningSummary').textContent();
  assert(/^1 von \d+ gelernt$/.test(learningSummary || ''), 'Learning index reads canonical completion');
  assert(await page.locator('.node .mk').count() === 1, 'Learning index reads repeat marker');
  const groupToggle = page.locator('.group-head').first();
  const expandedBefore = await groupToggle.getAttribute('aria-expanded');
  await groupToggle.press('Enter');
  assert(await groupToggle.getAttribute('aria-expanded') !== expandedBefore, 'Learning groups toggle by keyboard with aria state');

  await page.goto(`${base}/lernen/storage-types/`);
  const storageCard = page.locator('[data-flashcard="storage-filesystem"]');
  await storageCard.click();
  assert(await storageCard.getAttribute('aria-pressed') === 'true', 'Second topic flashcard works');
  const storageQuiz = page.locator('[data-quiz="storage-protocol"]');
  await storageQuiz.locator('[data-answer="2"]').click();
  assert(await storageQuiz.locator('[data-answer="2"]').evaluate(node => node.classList.contains('right')), 'Second topic quiz works');
  await page.goto(`${base}/lernen/raid-operations/`);
  assert(await page.locator('[data-required-objective]').count() === 2, 'RAID operations exposes two required objective checks');
  assert(await page.locator('#mark-done').isDisabled(), 'RAID operations completion is gated');
  const sequence = page.locator('[data-sequence="controller-recovery"]');
  await sequence.locator('[data-step="import"] [data-move="down"]').click();
  assert(await sequence.locator('[data-step]').first().getAttribute('data-step') === 'stabilize', 'Sequence controls reorder recovery steps without drag and drop');
  await sequence.locator('[data-sequence-check]').click();
  assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Position'), 'Sequence gives first-error feedback');
  await page.reload();
  assert(await page.locator('[data-sequence="controller-recovery"] [data-step]').first().getAttribute('data-step') === 'stabilize', 'Sequence order survives reload');
  assert(errors.length === 0, `No browser errors: ${errors.join('; ')}`);
  await context.close();

  const cloudContext = await browser.newContext({ viewport: { width: 1024, height: 760 } });
  const cloudPage = await cloudContext.newPage();
  await cloudPage.addInitScript(() => {
    window.__cloudUpserts = [];
    localStorage.setItem('ap2-tracker-state-v1', JSON.stringify({
      'ga1-3__3': true,
      'mark__ga1-3__3': false,
      'ts__ga1-3__3': 200,
      __activity: { '2026-09-11': 2 }
    }));
  });
  await cloudPage.route('**/supabase-js@2.114.0/dist/umd/supabase.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.supabase = {
      createClient() {
        return {
          auth: {
            async getSession() { return { data: { session: { user: { id: 'test-user' } } } }; },
            onAuthStateChange() { return { data: { subscription: { unsubscribe() {} } } }; }
          },
          from() {
            return {
              select() { return this; },
              eq() { return this; },
              async maybeSingle() {
                return { data: { state: { 'ga1-3__3': false, 'mark__ga1-3__3': true, 'ts__ga1-3__3': 100, __activity: { '2026-09-11': 1 } } }, error: null };
              },
              async upsert(row) { window.__cloudUpserts.push(structuredClone(row)); return { error: null }; }
            };
          }
        };
      }
    };`
  }));
  await cloudPage.goto(`${base}/lernen/raid/`);
  await cloudPage.locator('#mark-done:not([disabled])').waitFor();
  assert(await cloudPage.locator('#mark-done').getAttribute('aria-pressed') === 'true', 'Newer local topic progress wins the initial cloud merge');
  assert(await cloudPage.locator('#mark-rep').getAttribute('aria-pressed') === 'false', 'Related repeat marker follows the newer local topic state');
  await cloudPage.locator('#mark-done').click();
  await cloudPage.waitForTimeout(1200);
  const cloudUpserts = await cloudPage.evaluate(() => window.__cloudUpserts.map(row => structuredClone(row)));
  assert(cloudUpserts.some(row => row.state?.['ga1-3__3'] === false), `Learning progress is pushed through the cloud bridge: ${JSON.stringify(cloudUpserts)}`);
  await cloudContext.close();

  const revisionContext = await browser.newContext({ viewport: { width: 1024, height: 760 } });
  const revisionPage = await revisionContext.newPage();
  await revisionPage.addInitScript(() => {
    localStorage.setItem('ap2-tracker-state-v1', JSON.stringify({ 'ga1-3__3': true, 'mark__ga1-3__3': false }));
    localStorage.setItem('ap2-learning-state-v1', JSON.stringify({
      'raid-level:content-revision': '2026-09-11.1',
      'raid-level:quiz:raid-transfer-capacity': 1,
      'raid-level:card:raid-backup': true
    }));
  });
  await revisionPage.route('**/supabase-js@2.114.0/dist/umd/supabase.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.supabase = {
      createClient() {
        return {
          auth: {
            async getSession() { return { data: { session: null } }; },
            onAuthStateChange() { return { data: { subscription: { unsubscribe() {} } } }; }
          },
          from() { return {}; }
        };
      }
    };`
  }));
  await revisionPage.goto(`${base}/lernen/raid/`);
  const revisedLearning = await revisionPage.evaluate(() => JSON.parse(localStorage.getItem('ap2-learning-state-v1')));
  const revisedTracker = await revisionPage.evaluate(() => JSON.parse(localStorage.getItem('ap2-tracker-state-v1')));
  assert(revisedLearning['raid-level:content-revision'] === '2026-09-11.2', 'Content revision is updated');
  assert(!('raid-level:quiz:raid-transfer-capacity' in revisedLearning), 'Old topic attempts are cleared after a content revision');
  assert(revisedTracker['ga1-3__3'] === true && revisedTracker['mark__ga1-3__3'] === true, 'Existing completion is preserved and scheduled for review after a revision');
  await revisionContext.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.route('**/supabase-js@2.114.0/dist/umd/supabase.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `window.supabase = {
      createClient() {
        return {
          auth: {
            async getSession() { return { data: { session: null } }; },
            onAuthStateChange() { return { data: { subscription: { unsubscribe() {} } } }; }
          },
          from() { return {}; }
        };
      }
    };`
  }));
  await mobilePage.goto(`${base}/lernpfad/`);
  assert(await mobilePage.locator('.bottomnav-link[href="/lernpfad/"]').isVisible(), 'Learning index is reachable in mobile navigation');
  await mobilePage.goto(`${base}/lernen/raid/`);
  assert(await mobilePage.locator('.bottomnav-link[href="/lernpfad/"]').isVisible(), 'Learning page has mobile navigation');
  assert(await mobilePage.locator('#mark-done').isVisible(), 'Mobile learning actions remain reachable');
  await mobile.close();

  console.log('PASS learning route, persistence, quiz retry, shared progress and mobile navigation');
} finally {
  await browser.close();
}
