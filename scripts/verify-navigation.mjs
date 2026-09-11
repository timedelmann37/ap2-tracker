// Run against a local server. Uses Playwright locally or in the sibling crawler.
const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
let chromium;
for (const name of ['playwright', new URL('../../crawler/node_modules/playwright/index.mjs', import.meta.url).href]) {
  try { ({ chromium } = await import(name)); break; } catch { /* Next installation. */ }
}
if (!chromium) throw new Error('Playwright is required locally or in the sibling crawler.');
function assert(value, message) { if (!value) throw new Error(message); }
const browser = await chromium.launch({ headless: true });
const routes = ['/', '/uebersicht/', '/konzeption-administration/', '/netzwerke/', '/sowi/'];
try {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      await page.goto(base + route);
      const button = page.locator('#navThemenBtn');
      const menu = page.locator('#navThemenMenu');
      const links = menu.locator('a');
      await button.hover();
      await menu.waitFor({ state: 'visible' });
      assert(await button.getAttribute('aria-expanded') === 'true', route + ': pointer hover opens menu');
      await links.first().hover();
      await page.waitForTimeout(200);
      assert(await menu.isVisible(), route + ': menu stays open while pointer enters popover');
      await page.locator('h1').hover();
      await menu.waitFor({ state: 'hidden' });
      await button.focus();
      await page.keyboard.press('ArrowDown');
      assert(await button.getAttribute('aria-expanded') === 'true', route + ': keyboard open');
      assert(await links.first().evaluate(el => el === document.activeElement), 'First destination focused');
      if (reducedMotion === 'reduce') {
        assert(await menu.evaluate(el => el.getAnimations().length) === 0, 'Reduced motion must be instant');
      }
      await page.keyboard.press('End');
      assert(await links.last().evaluate(el => el === document.activeElement), 'Last destination focused');
      await page.keyboard.press('ArrowDown');
      assert(await links.first().evaluate(el => el === document.activeElement), 'Arrow key wraps');
      await page.keyboard.press('Escape');
      await menu.waitFor({ state: 'hidden' });
      assert(await button.evaluate(el => el === document.activeElement), 'Escape restores focus');
      assert(await menu.evaluate(el => el.inert), 'Closed menu must be inert');
      await button.click();
      await page.locator('h1').click();
      await menu.waitFor({ state: 'hidden' });
      // Rapid input must settle at the final requested state, not a stale animation.
      await button.evaluate(el => { el.click(); el.click(); el.click(); });
      await page.waitForFunction(() => !document.getElementById('navThemenMenu').getAnimations().length);
      assert(await menu.isVisible(), 'Interrupted animation must finish open');
      await page.setViewportSize({ width: 390, height: 844 });
      await menu.waitFor({ state: 'hidden' });
      await page.waitForFunction(() => document.getElementById('navThemenBtn').getAttribute('aria-expanded') === 'false');
      assert(await button.getAttribute('aria-expanded') === 'false', 'Resize closes desktop menu');
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    assert(!errors.length, errors.join('\n'));
    await context.close();
    console.log(`PASS: ${reducedMotion} — five pages, keyboard, dismissal, interruption, resize`);
  }
  for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ colorScheme, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const width of [360, 768, 940, 941, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        await page.goto(base + route);
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          title: getComputedStyle(document.querySelector('h1')).fontFamily,
          fontReady: document.fonts.check(`${getComputedStyle(document.querySelector('h1')).fontWeight} 32px "Inter Display"`) && document.fonts.check('400 14px Inter'),
          nav: (() => {
            const topnav = document.querySelector('.topnav');
            const links = document.querySelector('.topnav-links');
            const search = document.querySelector('.topnav-search');
            const controls = document.querySelector('.topnav-right');
            const visibleItems = [...links.children].filter(item => getComputedStyle(item).display !== 'none');
            return {
              height: topnav.getBoundingClientRect().height,
              linksDisplay: getComputedStyle(links).display,
              itemRows: new Set(visibleItems.map(item => Math.round(item.getBoundingClientRect().top))).size,
              controlGap: controls.getBoundingClientRect().left - search.getBoundingClientRect().right,
              bottomDisplay: getComputedStyle(document.querySelector('.bottomnav')).display
            };
          })(),
          status: [...document.querySelectorAll('.overview-line')].map(el => ({
            size: parseFloat(getComputedStyle(el).fontSize), family: getComputedStyle(el).fontFamily
          }))
        }));
        assert(!state.overflow, `${route} ${width} ${colorScheme}: horizontal overflow`);
        if (width > 940) {
          assert(state.nav.linksDisplay === 'flex' && state.nav.itemRows === 1 && state.nav.height <= 72 && state.nav.controlGap >= 8,
            `${route} ${width} ${colorScheme}: desktop navigation must stay on one 72px row`);
        } else {
          assert(state.nav.linksDisplay === 'none' && state.nav.bottomDisplay !== 'none',
            `${route} ${width} ${colorScheme}: compact navigation must replace crowded desktop links`);
        }
        assert(state.title.includes('Inter Display') && state.fontReady, `${route}: heading fonts not ready`);
        assert(state.status.every(s => s.size >= 14 && !s.family.includes('Mono')), `${route}: status readability`);
      }
    }
    await context.close();
    console.log(`PASS: ${colorScheme} — five pages at 360/768/940/941/1024/1440px, navigation, fonts and status sizing`);
  }
} finally { await browser.close(); }
