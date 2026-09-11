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
  assert(await repeat.getAttribute('aria-pressed') === 'false', 'Repeat marker starts off');

  const card = page.locator('[data-flashcard="raid-backup"]');
  await card.click();
  assert(await card.getAttribute('aria-pressed') === 'true', 'Flashcard flips');
  await page.reload();
  assert(await page.locator('[data-flashcard="raid-backup"]').getAttribute('aria-pressed') === 'true', 'Flashcard state survives reload');

  const quiz = page.locator('[data-quiz="raid-capacity"]');
  await quiz.locator('[data-answer="0"]').click();
  assert(await quiz.locator('[data-answer="0"]').evaluate(node => node.classList.contains('wrong')), 'Wrong quiz answer is marked');
  assert(await quiz.locator('[data-answer="2"]').evaluate(node => node.classList.contains('right')), 'Correct quiz answer is revealed');
  assert(await quiz.locator('[data-feedback]').isVisible(), 'Quiz explanation is shown');
  await page.reload();
  assert(await page.locator('[data-quiz="raid-capacity"] [data-feedback]').isVisible(), 'Quiz answer survives reload');
  await page.locator('[data-quiz="raid-capacity"] [data-quiz-reset]').click();
  assert(!await page.locator('[data-quiz="raid-capacity"] [data-feedback]').isVisible(), 'Quiz can be retried');

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
