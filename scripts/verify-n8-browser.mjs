import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const topics = [
  ['netzwerkredundanz', 1, [['transfer-b', 4, 3]]],
  ['vrrp-hsrp', 2, []],
  ['verfuegbarkeit-berechnen', 0, [['transfer-b', 262.8, 4.38], ['transfer-reihe', 97.02, 98.5], ['transfer-parallel', 99.96, 96.04]]],
  ['single-points-of-failure', 1, []],
  ['usv-technikraum', 2, [['transfer-b', 260, 60]]],
  ['sla-netzdienste', 0, [['transfer-b', 60, 1]]],
  ['snmp-netflow-syslog', 1, []],
  ['netzwerk-messwerte', 2, [['transfer-b', 20, 2.5], ['transfer-verlust', 1.5, 12]]],
  ['monitoring-trendanalyse', 1, [['transfer-b', 2, 5]]],
  ['systematische-netzfehlersuche', 2, []],
  ['netzwerk-diagnosewerkzeuge', 0, []],
  ['wireshark', 1, []],
  ['span-mirror-port', 2, [['transfer-b', 300, 0]]],
  ['netzdokumentation', 0, []]
];
function assert(value, message) { if (!value) throw new Error(message); }
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [slug, correct, numbers] of topics) {
    await page.goto(`${base}/lernen/${slug}/`);
    const done = page.locator('#mark-done');
    assert(await done.isDisabled(), `${slug}: completion initially gated`);
    const quiz = page.locator(`[data-quiz="${slug}-transfer-a"]`);
    await quiz.locator(`[data-answer="${(correct + 1) % 3}"]`).click();
    assert(await done.isDisabled(), `${slug}: wrong answer keeps gate closed`);
    await quiz.locator('[data-quiz-reset]').click();
    await quiz.locator(`[data-answer="${correct}"]`).click();
    assert(await done.isDisabled(), `${slug}: first objective alone is insufficient`);
    if (!numbers.length) {
      await page.locator(`[data-quiz="${slug}-transfer-b"] [data-answer="${correct}"]`).click();
    }
    for (const [suffix, expected, misconception] of numbers) {
      const exercise = page.locator(`[data-numeric-practice="${slug}-${suffix}"]`);
      await exercise.locator('[data-numeric-input]').fill(String(misconception));
      await exercise.locator('[data-numeric-check]').click();
      assert(await exercise.locator('[data-numeric-feedback]').getAttribute('data-result') === 'wrong', `${slug}/${suffix}: misconception rejected`);
      assert(await done.isDisabled(), `${slug}/${suffix}: remaining objective gates completion`);
      await exercise.locator('[data-numeric-input]').fill(String(expected).replace('.', ','));
      await exercise.locator('[data-numeric-check]').click();
      assert(await exercise.locator('[data-numeric-feedback]').getAttribute('data-result') === 'correct', `${slug}/${suffix}: expected result accepted`);
    }
    assert(!await done.isDisabled(), `${slug}: all objectives unlock completion`);
    await page.reload();
    assert(!await done.isDisabled(), `${slug}: objective results persist`);
    await done.click();
    assert(await done.getAttribute('aria-pressed') === 'true', `${slug}: can mark learned`);
    await done.click();
    assert(await done.getAttribute('aria-pressed') === 'false', `${slug}: can undo learned state`);

    const sequence = page.locator(`[data-sequence="${slug}-reihenfolge"]`);
    await sequence.locator('[data-sequence-check]').click();
    assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Position'), `${slug}: sequence starts unsolved`);
    for (const step of ['s0', 's1', 's1']) {
      const move = sequence.locator(`[data-step="${step}"] [data-move="up"]`);
      await move.focus();
      await page.keyboard.press('Enter');
    }
    await sequence.locator('[data-sequence-check]').click();
    assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Richtig'), `${slug}: sequence solvable by keyboard`);
    const card = page.locator(`[data-flashcard="${slug}-karte-0"]`);
    await card.focus();
    await page.keyboard.press('Enter');
    assert(await card.getAttribute('aria-pressed') === 'true', `${slug}: recall card opens with keyboard`);
    console.log(`PASS N8: ${slug}, objectives, wrong answers, persistence, undo, keyboard`);
  }
  const capture = process.env.AP2_N8_CAPTURE === '1';
  if (capture) await mkdir('.n8-review', { recursive: true });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const theme of ['dark', 'light']) {
      for (const [slug] of topics) {
        await page.goto(`${base}/lernen/${slug}/`);
        await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${slug}: ${width}/${theme} no page overflow`);
        assert(await page.locator('.learning-diagram').count() === 2, `${slug}: two diagrams`);
        await page.locator('.learning-figure').first().scrollIntoViewIfNeeded();
        if (capture) await page.screenshot({ path: `.n8-review/${slug}-${width}-${theme}.png` });
        for (const math of await page.locator('.math-display').all()) {
          await math.scrollIntoViewIfNeeded();
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${slug}: visual formula does not overflow page`);
        }
      }
    }
  }
  assert(!errors.length, `N8 browser errors: ${errors.join('; ')}`);
  await context.close();
  console.log('PASS N8: 390/1440px, both themes, diagrams and formula overflow');
} finally {
  await browser.close();
}
