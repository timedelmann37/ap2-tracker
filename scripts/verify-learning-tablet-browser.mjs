import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const baseOrigin = new URL(base).origin;
const route = '/lernen/linux-verzeichnisse-dienste-pakete-logs/';
const reportedRoute = '/lernen/rechtsformen-haftung-kapital-leitung-gewinn/';
const reportedRouteOnly = process.env.AP2_TABLET_REPORTED_ROUTE_ONLY === '1';
const captureDir = process.env.AP2_FINAL_CAPTURE_DIR;
const baseline = process.env.AP2_TABLET_BASELINE === '1';
const baselineRef = process.env.AP2_TABLET_BASELINE_REF || 'be00a2c281e3f681fba183024edbefc3a93d280e';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Optional negative control serves the committed pre-fix stylesheet to the real
// generated page. It changes neither the source files nor the generated HTML.
const baselineCss = baseline
  ? execFileSync('git', ['show', `${baselineRef}:assets/ap2-learning.css`], { cwd: repoRoot, encoding: 'utf8' })
  : null;
const viewports = baseline ? [{ width: 900, height: 900 }] : [
  ...[390, 820, 821, 900, 939, 940, 941, 1024, 1440].map(width => ({ width, height: 900 })),
  { width: 900, height: 500 }
];
const targets = [
  ['done', '#mark-done'],
  ['repeat', '#mark-rep'],
  ['back', '.actionbar a.lbtn'],
  ['reason', '#learning-action-reason'],
  ['status', '#learning-save']
];
const errors = [];
const externalRequests = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function createContext(browser, fixture, anonymous = false) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  // The runner supplies the local signed-in fixture. No test may contact the
  // production auth/progress service or load any other remote dependency.
  await context.route('**/*', requestRoute => {
    if (new URL(requestRoute.request().url()).origin === baseOrigin) return requestRoute.continue();
    externalRequests.push(requestRoute.request().url());
    return requestRoute.abort();
  });
  if (baselineCss) {
    await context.route('**/assets/ap2-learning.css*', requestRoute => requestRoute.fulfill({
      contentType: 'text/css; charset=utf-8', body: baselineCss
    }));
  }
  await context.addInitScript(({ state, anonymousSession }) => {
    if (state) {
      localStorage.setItem('ap2-learning-state-v1', JSON.stringify(state.learning));
      localStorage.setItem('ap2-tracker-state-v1', JSON.stringify(state.tracker));
    }
    if (anonymousSession) {
      const fixture = {
        createClient: () => ({
          auth: {
            getSession: async () => ({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } })
          },
          from() { throw new Error('Anonymous lesson must not read or write cloud progress'); }
        })
      };
      // Keep the runner's inline signed-in fixture from replacing this local
      // anonymous session before the actual deferred learning runtime starts.
      Object.defineProperty(window, 'supabase', { configurable: true, get: () => fixture, set() {} });
    }
  }, { state: fixture, anonymousSession: anonymous });
  return context;
}

async function openLesson(context, anonymous = false, lessonPath = route) {
  const page = await context.newPage();
  page.setDefaultTimeout(6000);
  page.on('pageerror', error => errors.push(error.message));
  assert((await page.goto(`${base}${lessonPath}`))?.status() === 200, 'Generated tablet lesson loads from dist');
  await page.evaluate(() => document.fonts.ready);
  if (anonymous) {
    await page.waitForFunction(() => document.querySelector('#learning-action-reason')?.textContent.includes('Anmelden'));
  } else {
    await page.locator('#mark-rep:not([disabled])').waitFor();
  }
  assert(await page.locator('#mark-done').getAttribute('aria-describedby') === 'learning-action-reason', 'Completion describes its actual gate reason');
  const expectedBack = lessonPath === route ? '/konzeption-administration/#ga1-6' : '/sowi/#wiso-6';
  assert(await page.locator('.actionbar a.lbtn').getAttribute('href') === expectedBack, 'Back action retains the actual Themengruppe link');
  return page;
}

async function readState(page) {
  return page.evaluate(() => ({
    learning: JSON.parse(localStorage.getItem('ap2-learning-state-v1') || '{}'),
    tracker: JSON.parse(localStorage.getItem('ap2-tracker-state-v1') || '{}'),
    progressId: document.body.dataset.progressId
  }));
}

async function checkEndGeometry(page, label, captureName) {
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const geometry = await page.evaluate(selectors => {
    const rect = node => {
      const box = node.getBoundingClientRect();
      return { left: box.left, top: box.top, right: box.right, bottom: box.bottom, width: box.width, height: box.height };
    };
    const nav = document.querySelector('.bottomnav');
    const navShown = getComputedStyle(nav).display !== 'none';
    return {
      width: innerWidth, height: innerHeight,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      atEnd: Math.abs(document.documentElement.scrollHeight - innerHeight - scrollY) < 2,
      navigation: navShown ? rect(nav) : null,
      // The actionbar's empty bottom padding intentionally reaches behind the
      // floating navigation; only real controls and text must stay above it.
      actionbar: rect(document.querySelector('.actionbar')),
      targets: selectors.map(([name, selector]) => {
        const node = document.querySelector(selector);
        const box = rect(node);
        const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
        return { name, ...box, text: node.textContent.trim(), hit: hit === node || node.contains(hit), hitElement: hit?.tagName, hitClass: hit?.className };
      })
    };
  }, targets);
  if (captureDir && captureName) {
    await page.screenshot({ path: path.join(captureDir, `${captureName}.png`), animations: 'disabled' });
  }
  const evidence = JSON.stringify(geometry);
  assert(geometry.atEnd, `${label}: actual page end reached; ${evidence}`);
  assert(!geometry.overflow, `${label}: no horizontal page overflow; ${evidence}`);
  assert(Boolean(geometry.navigation) === (geometry.width <= 940), `${label}: shared compact-navigation breakpoint; ${evidence}`);
  for (const target of geometry.targets) {
    assert(target.text.length > 0 && target.width > 0 && target.height > 0, `${label}: ${target.name} has actual rendered content; ${evidence}`);
    assert(target.left >= -1 && target.right <= geometry.width + 1 && target.top >= -1 && target.bottom <= geometry.height + 1,
      `${label}: ${target.name} fully inside viewport; ${evidence}`);
    if (geometry.navigation) {
      assert(target.bottom <= geometry.navigation.top + 1, `${label}: ${target.name} overlaps bottom navigation; ${evidence}`);
    }
    assert(target.hit, `${label}: ${target.name} center reaches its own element rather than an overlay; ${evidence}`);
  }
  return geometry;
}

async function keyboardRepeat(page, label) {
  await page.locator('.actionbar a.lbtn').focus();
  await page.keyboard.press('Shift+Tab');
  assert(await page.locator('#mark-rep').evaluate(node => node === document.activeElement), `${label}: reverse Tab reaches repeat action`);
  await page.keyboard.press('Enter');
  assert(await page.locator('#mark-rep').getAttribute('aria-pressed') === 'true', `${label}: Enter sets repeat marker`);
  await checkEndGeometry(page, `${label}, repeat marked`);
}

async function checkLinuxMatrix(browser) {
  const seedContext = await createContext(browser);
  const seedPage = await openLesson(seedContext);
  const incomplete = await readState(seedPage);
  assert(await seedPage.locator('#mark-done').isDisabled(), 'Unattempted real checks gate completion');
  const checks = await seedPage.locator('[data-required-objective][data-quiz]').all();
  assert(checks.length === 3, 'Fixture uses the three actual Linux objective checks');
  for (const [index, check] of checks.entries()) {
    const correct = await check.getAttribute('data-correct');
    await check.locator(`[data-answer="${correct}"]`).press('Enter');
    assert((await seedPage.locator('#mark-done').isDisabled()) === (index < checks.length - 1), `Actual objective ${index + 1} updates completion gate`);
  }
  await seedPage.locator('#mark-done').press('Enter');
  assert(await seedPage.locator('#mark-done').getAttribute('aria-pressed') === 'true', 'Actual keyboard completion seeds learned state');
  const completed = await readState(seedPage);
  assert(completed.tracker[completed.progressId] === true, 'Completed fixture comes from the real tracker write');
  await seedContext.close();

  const states = baseline ? ['incomplete'] : ['incomplete', 'completed', 'anonymous'];
  for (const state of states) {
    const anonymous = state === 'anonymous';
    const fixture = state === 'completed' ? completed : anonymous ? { ...incomplete, learning: completed.learning } : incomplete;
    const context = await createContext(browser, fixture, anonymous);
    const page = await openLesson(context, anonymous);
    const done = page.locator('#mark-done');
    const repeat = page.locator('#mark-rep');
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      for (const theme of baseline ? ['dark'] : ['dark', 'light']) {
        await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
        const label = `${state}, ${viewport.width}x${viewport.height}, ${theme}`;
        assert(await done.isDisabled() === (state !== 'completed'), `${label}: completion gate matches session and mastery`);
        assert(await repeat.isDisabled() === anonymous, `${label}: repeat gate matches session`);
        assert(await done.getAttribute('aria-pressed') === String(state === 'completed'), `${label}: completion state restored`);
        const geometry = await checkEndGeometry(page, label, `tablet-${state}-${viewport.width}x${viewport.height}-${theme}-end`);
        if (anonymous) {
          assert((await page.locator('#learning-action-reason').textContent()).includes('Anmelden'), `${label}: account reason remains readable`);
          const signIn = page.locator('#learning-save a');
          assert(await signIn.getAttribute('href') === '/?konto=anmelden', `${label}: real sign-in link remains available`);
          const trackerBefore = (await readState(page)).tracker;
          for (const name of ['done', 'repeat']) {
            const target = geometry.targets.find(item => item.name === name);
            await page.mouse.click(target.left + target.width / 2, target.top + target.height / 2);
          }
          assert(JSON.stringify((await readState(page)).tracker) === JSON.stringify(trackerBefore), `${label}: anonymous pointer attempts cannot change tracker progress`);
          continue;
        }
        await keyboardRepeat(page, label);
        if (state === 'completed') {
          await page.keyboard.press('Shift+Tab');
          assert(await done.evaluate(node => node === document.activeElement), `${label}: reverse Tab reaches completion`);
          await page.keyboard.press('Enter');
          assert(await done.getAttribute('aria-pressed') === 'false', `${label}: Enter undoes completion`);
          assert((await page.locator('[data-topic-status]').textContent()).includes('noch offen'), `${label}: actual topic status follows undo`);
          await checkEndGeometry(page, `${label}, completion undone`);
          await page.keyboard.press('Space');
          assert(await done.getAttribute('aria-pressed') === 'true', `${label}: Space restores completion`);
          assert((await readState(page)).tracker[completed.progressId] === true, `${label}: completion persists in actual tracker state`);
          await checkEndGeometry(page, `${label}, completion restored`);
        } else {
          assert((await page.locator('#learning-action-reason').textContent()).includes('3 Pflichtchecks offen'), `${label}: incomplete reason still describes the real required checks`);
        }
        await repeat.focus();
        await page.keyboard.press('Space');
        assert(await repeat.getAttribute('aria-pressed') === 'false', `${label}: Space removes repeat marker`);
        await checkEndGeometry(page, `${label}, repeat removed`);
      }
    }
    await context.close();
    console.log(`PASS learning tablet: ${state}, ${viewports.length} viewports, ${baseline ? 1 : 2} themes, geometry and actual control hit tests`);
  }
}

async function checkReportedRoute(browser) {
  const context = await createContext(browser);
  const page = await openLesson(context, false, reportedRoute);
  const required = await page.locator('[data-required-objective]').evaluateAll(nodes => nodes.map(node => node.dataset.requiredObjective));
  assert(required.length === 6 && new Set(required).size === 6, 'Reported Rechtsformen route retains its six real objective gates');
  assert(await page.locator('body').getAttribute('data-progress-id') === 'wiso-6__5', 'Reported Rechtsformen route retains its actual tracker identity');
  for (const width of [900, 940, 941]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      const label = `Rechtsformen incomplete, ${width}x900, ${theme}`;
      assert(await page.locator('#mark-done').isDisabled(), `${label}: six unattempted checks gate completion`);
      assert(!await page.locator('#mark-rep').isDisabled(), `${label}: signed-in repeat action remains available`);
      assert((await page.locator('#learning-action-reason').textContent()).includes('6 Pflichtchecks offen'), `${label}: actual six-check reason remains intact`);
      assert((await page.locator('[data-mastery-count]').allTextContents()).every(text => text === '0 von 6 Pflichtchecks bestanden'), `${label}: actual mastery remains unattempted`);
      await checkEndGeometry(page, label, `tablet-rechtsformen-${width}x900-${theme}-end`);
    }
  }
  await context.close();
  console.log('PASS learning tablet: reported Rechtsformen route, 900/940/941px, both themes, six unchanged objective gates and actual control hit tests');
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  if (!reportedRouteOnly) await checkLinuxMatrix(browser);
  if (!baseline) await checkReportedRoute(browser);
  assert(errors.length === 0, `Tablet lesson browser errors: ${errors.join('; ')}`);
  assert(externalRequests.length === 0, `Tablet lesson attempted external requests: ${externalRequests.join('; ')}`);
} finally {
  await browser.close();
}
