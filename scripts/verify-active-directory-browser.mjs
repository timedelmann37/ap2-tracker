import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${base}/lernen/windows-server-active-directory-struktur-dns-dc/`);
  const done = page.locator('#mark-done');
  assert(await done.isDisabled(), 'Initial objective gate');
  assert(await page.locator('.learning-figure').count() === 2, 'Two original diagrams');

  const diagnostic = page.locator('[data-quiz="ad-einstieg"]');
  await diagnostic.locator('[data-answer="1"]').click();
  assert((await diagnostic.textContent()).includes('keine installierbare Serverfunktion'), 'Role/OU misconception feedback');

  const dns = page.locator('[data-quiz="ad-dns-diagnose"]');
  await dns.locator('[data-answer="2"]').click();
  assert((await dns.textContent()).includes('DNS-Ausfall'), 'Redundancy misconception feedback');

  const recall = page.locator('[data-recall="ad-fehlerkette"]');
  await recall.locator('[data-recall-input]').fill('Zuerst prüfe ich, welche DNS-Server der Client verwendet und ob die AD-SRV-Einträge sowie Zieladressen auflösbar sind. Danach kontrolliere ich Erreichbarkeit und tatsächliche Auswahl eines Domain Controllers. Zuletzt prüfe ich Anmeldung, Replikation und SYSVOL; der zweite DC allein repariert keine defekte DNS-Konfiguration.');
  await recall.locator('[data-recall-reveal]').click();
  assert(await recall.locator('[data-recall-model]').isVisible(), 'Model answer revealed');

  const first = page.locator('[data-quiz="ad-struktur-gate"]');
  await first.locator('[data-answer="1"]').click();
  assert(await done.isDisabled(), 'Wrong gate does not unlock');
  await first.locator('[data-quiz-reset]').click();
  await first.locator('[data-answer="0"]').focus();
  await page.keyboard.press('Enter');
  assert(await done.isDisabled(), 'One objective insufficient');
  await page.locator('[data-quiz="ad-ausfall-gate"] [data-answer="0"]').click();
  assert(!await done.isDisabled(), 'Both objectives unlock');
  await page.reload();
  assert(!await done.isDisabled(), 'Objective persistence');
  const card = page.locator('[data-flashcard="ad-karte-0"]');
  await card.focus();
  await page.keyboard.press('Enter');
  assert(await card.getAttribute('aria-pressed') === 'true', 'Keyboard flashcard');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
      for (const element of [page.locator('.learning-figure').first(), page.locator('.learning-figure').last(), recall]) {
        await element.scrollIntoViewIfNeeded();
        assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${width}px ${theme} document overflow`);
        assert(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${width}px ${theme} element overflow`);
      }
    }
  }
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`);
  console.log('PASS Active Directory: windows-server-active-directory-struktur-dns-dc');
} finally {
  await browser.close();
}
