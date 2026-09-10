const baseUrl = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const storageKey = 'ap2-theme-v1';

async function loadPlaywright() {
  const candidates = [
    'playwright',
    new URL('../../crawler/node_modules/playwright/index.mjs', import.meta.url).href
  ];

  for (const candidate of candidates) {
    try {
      return await import(candidate);
    } catch {
      // Try the next local Playwright installation.
    }
  }

  throw new Error('Playwright is required. Install it locally or keep the sibling crawler checkout available.');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const routes = ['/', '/uebersicht/', '/konzeption-administration/', '/netzwerke/', '/sowi/'];
const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ headless: true });

async function colors(page) {
  return page.evaluate(() => ({
    background: getComputedStyle(document.body).backgroundColor,
    text: getComputedStyle(document.body).color,
    scheme: getComputedStyle(document.documentElement).colorScheme,
    theme: document.documentElement.dataset.theme
  }));
}

async function assertToggle(page, keyboard = false) {
  const before = await colors(page);
  if (keyboard) {
    await page.locator('#themeToggle').focus();
    await page.keyboard.press('Enter');
  } else {
    await page.locator('#themeToggle').click();
  }
  const after = await colors(page);
  const expected = before.theme === 'dark' ? 'light' : 'dark';
  assert(after.theme === expected, 'A click did not invert the visible theme');
  assert(before.background !== after.background, 'A click did not immediately change the background');
  assert(before.text !== after.text, 'A click did not immediately change text color');
  assert(after.scheme === expected, 'Native controls use the wrong color scheme');
  assert(await page.evaluate(key => localStorage.getItem(key), storageKey) === expected, 'Preference was not saved');
  return expected;
}

try {
  for (const os of ['light', 'dark']) {
    const context = await browser.newContext({ colorScheme: os });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(baseUrl);
    assert((await colors(page)).theme === os, 'Initial theme must follow the OS');

    // The previously broken path: dark OS, no saved choice, one real click.
    for (let n = 0; n < 4; n++) await assertToggle(page, n === 3);

    for (const expected of ['dark', 'light']) {
      if ((await colors(page)).theme !== expected) await assertToggle(page);
      for (const route of routes) {
        await page.goto(baseUrl + route);
        assert((await colors(page)).theme === expected, 'Theme changed on ' + route);
        await page.reload();
        assert((await colors(page)).theme === expected, 'Theme changed on reload');
      }
    }

    const other = await context.newPage();
    await other.goto(baseUrl + '/uebersicht/');
    const expected = await assertToggle(other);
    await page.waitForFunction(theme => document.documentElement.dataset.theme === theme, expected);

    // Automatic mode still follows the system until the first explicit choice.
    await page.evaluate(key => localStorage.removeItem(key), storageKey);
    await page.reload();
    const changedOs = os === 'light' ? 'dark' : 'light';
    await page.emulateMedia({ colorScheme: changedOs });
    await page.waitForFunction(theme => document.documentElement.dataset.theme === theme, changedOs);
    await assertToggle(page);
    assert(errors.length === 0, errors.join('\n'));
    await context.close();
    console.log('PASS: ' + os + ' OS — immediate click/keyboard, five pages, reload, tab sync, system change');
  }

  const restricted = await browser.newContext({ colorScheme: 'dark' });
  await restricted.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'getItem', { value() { throw new Error('Storage unavailable'); } });
    Object.defineProperty(Storage.prototype, 'setItem', { value() { throw new Error('Storage unavailable'); } });
  });
  const page = await restricted.newPage();
  await page.goto(baseUrl);
  await page.locator('#themeToggle').click();
  assert((await colors(page)).theme === 'light', 'Theme must switch even when storage is unavailable');
  await restricted.close();
  console.log('PASS: storage unavailable still switches current page');
} finally {
  await browser.close();
}
