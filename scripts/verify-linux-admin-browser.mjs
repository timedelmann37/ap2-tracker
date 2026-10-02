import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.AP2_BASE_URL || 'http://127.0.0.1:4321';
const captureDir = process.env.AP2_LINUX_CAPTURE_DIR;
const cases = [
  {
    slug: 'linux-verzeichnisse-dienste-pakete-logs',
    image: true,
    figures: 3,
    diagnostic: 'linux-einstieg',
    card: 'linux-karte-0',
    recall: 'linux-fallbegruendung',
    gates: ['linux-pfade-gate', 'linux-dienst-gate', 'linux-paket-gate'],
    sequences: [{ id: 'linux-paket-wartung', expected: ['metadata', 'window', 'upgrade', 'verify'] }]
  },
  {
    slug: 'zeitgesteuerte-ausfuehrung-cron-systemd-timer-schtasks',
    image: true,
    figures: 3,
    diagnostic: 'zeitplan-diagnose',
    card: 'zeitplan-karte-0',
    recall: 'timer-eigene-erklaerung',
    gates: ['cron-lernziel', 'timer-lernziel', 'windows-lernziel'],
    sequences: [
      { id: 'cron-feldfolge', expected: ['minute', 'stunde', 'monatstag', 'monat', 'wochentag'] },
      { id: 'zeitplan-abnahme', expected: ['script', 'rights', 'plan', 'result'] }
    ]
  },
  {
    slug: 'ssh-schluessel-sudo-root-login',
    figures: 2,
    diagnostic: 'ssh-einstieg',
    card: 'ssh-karte-benutzerkey',
    recall: 'ssh-transfer-erklaerung',
    gates: ['ssh-schluessel-gate', 'ssh-umstellung-gate', 'ssh-sudo-gate'],
    sequences: [{ id: 'ssh-migration-reihenfolge', expected: ['rueckweg', 'key-test', 'config-test', 'abschalten', 'abnahme'] }]
  },
  {
    slug: 'linux-befehle-sicher-waehlen',
    figures: 3,
    diagnostic: 'befehle-einstieg',
    card: 'cmd-karte-0',
    recall: 'cmd-fallbegruendung',
    gates: ['diagnosebefehle-gate', 'seiteneffekte-gate', 'aenderung-kontrollieren-gate'],
    sequences: [{ id: 'rsync-kontrollfolge', expected: ['target', 'dryrun', 'run', 'result'] }]
  },
  {
    slug: 'prozesse-kontrolliert-beenden',
    figures: 2,
    diagnostic: 'prozess-einstieg',
    card: 'prozess-karte-pid',
    recall: 'prozess-fallbegruendung',
    gates: ['prozess-zuordnung-gate', 'prozess-wirkung-gate', 'prozess-nachweis-gate'],
    sequences: [{ id: 'prozess-kontrollfolge', expected: ['identitaet', 'normal', 'term', 'abwarten', 'ausnahme', 'nachweis'] }]
  },
  {
    slug: 'linux-dateirechte-umask-spezialbits',
    figures: 3,
    math: 1,
    diagnostic: 'rechte-diagnose',
    card: 'rechte-karte-verzeichnis',
    recall: 'rechte-fall-erklaeren',
    gates: ['rechte-modus-gate', 'rechte-umask-gate', 'rechte-spezialbits-gate'],
    sequences: []
  },
  {
    slug: 'benutzer-gruppenverwaltung-passwortrichtlinien-kontosperrung',
    figures: 3,
    diagnostic: 'konto-diagnose',
    card: 'konto-karte-gruppe',
    recall: 'konto-fallbegruendung',
    gates: ['konto-gruppe-gate', 'passwort-policy-gate', 'kontosperre-gate'],
    sequences: [{ id: 'konto-aenderungsfolge', expected: ['identitaet', 'soll', 'backup', 'aendern', 'test', 'nachweis'] }]
  }
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function sortSequence(sequence, expected) {
  for (const [target, id] of expected.entries()) {
    const step = sequence.locator(`[data-step="${id}"]`);
    while (await step.evaluate(node => [...node.parentElement.children].indexOf(node)) > target) {
      await step.locator('[data-move="up"]').click();
    }
  }
}

const browser = await chromium.launch();
try {
  if (captureDir) await mkdir(captureDir, { recursive: true });
  for (const testCase of cases) {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/lernen/${testCase.slug}/`);
    const done = page.locator('#mark-done');
    assert(await done.isDisabled(), `${testCase.slug}: initial objective gate`);
    assert(await page.locator('.learning-figure').count() === testCase.figures, `${testCase.slug}: technical diagrams present`);
    if (testCase.math) {
      const formulae = page.locator('.math-display math');
      assert(await formulae.count() >= testCase.math, `${testCase.slug}: semantically rendered formulas present`);
      for (const formula of await formulae.all()) {
        assert(Boolean(await formula.getAttribute('aria-label')), `${testCase.slug}: formula has accessible description`);
      }
    }
    if (testCase.image) {
      const illustration = page.locator('.learning-figure img');
      await illustration.scrollIntoViewIfNeeded();
      await illustration.evaluate(node => node.decode());
      assert(await illustration.evaluate(node => node.naturalWidth > 0), `${testCase.slug}: technical illustration loaded`);
      assert((await illustration.getAttribute('src')).endsWith('.svg'), `${testCase.slug}: only technical SVG artwork`);
      assert(await illustration.evaluate(node => Number(node.getAttribute('width')) === node.naturalWidth && Number(node.getAttribute('height')) === node.naturalHeight), `${testCase.slug}: illustration reserves its aspect ratio`);
    }
    const firstDiagram = page.locator('.learning-diagram').first();
    if (testCase.slug === 'linux-verzeichnisse-dienste-pakete-logs') {
      const cards = await firstDiagram.locator('g').allTextContents();
      assert(cards.length === 4 && ['Dienste', 'Dateien', 'Daten', 'Boot'].every((word, index) => cards[index].includes(word)), `${testCase.slug}: path cards are complete`);
    } else if (testCase.slug === 'zeitgesteuerte-ausfuehrung-cron-systemd-timer-schtasks') {
      assert(await firstDiagram.evaluate(node => node.classList.contains('diagram-comparison')), `${testCase.slug}: cron fields form a horizontal row`);
      assert((await firstDiagram.textContent()).includes('Cron-Ausdruck: 15 7 * * *'), `${testCase.slug}: full cron expression is visible`);
    } else if (testCase.slug === 'ssh-schluessel-sudo-root-login') {
      assert((await firstDiagram.textContent()).includes('Benutzer: privat'), `${testCase.slug}: key roles are labelled`);
    } else if (testCase.slug === 'prozesse-kontrolliert-beenden') {
      assert((await firstDiagram.textContent()).includes('PID bestätigen'), `${testCase.slug}: identity check is labelled`);
    } else if (testCase.slug === 'linux-dateirechte-umask-spezialbits') {
      const labels = await firstDiagram.textContent();
      assert(['u = 7', 'g = 5', 'o = 0'].every(label => labels.includes(label)), `${testCase.slug}: octal owner, group and others are labelled`);
      const figures = page.locator('.learning-diagram');
      const umaskLabels = await figures.nth(1).textContent();
      const specialLabels = await figures.nth(2).textContent();
      assert(['0640', '0750'].every(label => umaskLabels.includes(label)), `${testCase.slug}: umask outcomes are labelled`);
      assert(['SUID', 'SGID', 'Sticky'].every(label => specialLabels.includes(label)), `${testCase.slug}: special bits are labelled`);
    } else if (testCase.slug === 'benutzer-gruppenverwaltung-passwortrichtlinien-kontosperrung') {
      const figures = page.locator('.learning-diagram');
      const groupLabels = await figures.nth(0).textContent();
      const policyLabels = await figures.nth(1).textContent();
      const lockLabels = await figures.nth(2).textContent();
      assert(['Vorher', 'Mit -aG'].every(label => groupLabels.includes(label)), `${testCase.slug}: before and after supplementary groups are labelled`);
      assert(['Altregel', 'NIST-orientiert'].every(label => policyLabels.includes(label)), `${testCase.slug}: policy comparison is labelled`);
      assert(['Passwort', 'Konto', 'PAM-Dienst'].every(label => lockLabels.includes(label)), `${testCase.slug}: independent lock states are labelled`);
    } else {
      assert((await firstDiagram.textContent()).includes('Lesender Befund'), `${testCase.slug}: diagnosis flow is labelled`);
    }

    const diagnostic = page.locator(`[data-quiz="${testCase.diagnostic}"]`);
    const diagnosticCorrect = Number(await diagnostic.getAttribute('data-correct'));
    const diagnosticWrong = (diagnosticCorrect + 1) % await diagnostic.locator('[data-answer]').count();
    await diagnostic.locator(`[data-answer="${diagnosticWrong}"]`).click();
    assert(await diagnostic.locator(`[data-answer="${diagnosticWrong}"]`).evaluate(node => node.classList.contains('wrong')), `${testCase.slug}: diagnostic feedback`);
    await diagnostic.locator('[data-quiz-reset]').click();
    await diagnostic.locator(`[data-answer="${diagnosticCorrect}"]`).focus();
    await page.keyboard.press('Enter');
    assert(await diagnostic.locator(`[data-answer="${diagnosticCorrect}"]`).evaluate(node => node.classList.contains('right')), `${testCase.slug}: keyboard quiz`);
    assert(await done.isDisabled(), `${testCase.slug}: diagnostic gives no objective credit`);

    if (testCase.slug === 'linux-dateirechte-umask-spezialbits') {
      const umaskQuiz = page.locator('[data-quiz="umask-transfer-027"]');
      await umaskQuiz.locator('[data-answer="0"]').click();
      assert((await umaskQuiz.locator('[data-selected-feedback]').textContent()).includes('umask löscht Bits'), `${testCase.slug}: subtraction misconception explained`);
      await umaskQuiz.locator('[data-quiz-reset]').click();
      await umaskQuiz.locator('[data-answer="1"]').click();
      assert((await umaskQuiz.locator('[data-selected-feedback]').textContent()).includes('u bleibt rw'), `${testCase.slug}: correct bitwise calculation explained`);
    } else if (testCase.slug === 'benutzer-gruppenverwaltung-passwortrichtlinien-kontosperrung') {
      const groupQuiz = page.locator('[data-quiz="konto-gruppen-anwendung"]');
      await groupQuiz.locator('[data-answer="0"]').click();
      assert((await groupQuiz.locator('[data-selected-feedback]').textContent()).includes('deploy'), `${testCase.slug}: -G replacement risk explained`);
      await groupQuiz.locator('[data-quiz-reset]').click();
      await groupQuiz.locator('[data-answer="1"]').click();
      assert((await groupQuiz.locator('[data-selected-feedback]').textContent()).includes('neuen Sitzung'), `${testCase.slug}: new-session verification explained`);

      const lockQuiz = page.locator('[data-quiz="konto-sperrfall"]');
      await lockQuiz.locator('[data-answer="1"]').click();
      assert((await lockQuiz.locator('[data-selected-feedback]').textContent()).includes('SSH-Key'), `${testCase.slug}: password lock is not full account lock`);
      await lockQuiz.locator('[data-quiz-reset]').click();
      await lockQuiz.locator('[data-answer="0"]').click();
      assert((await lockQuiz.locator('[data-selected-feedback]').textContent()).includes('Passwortsperre'), `${testCase.slug}: lock-state distinction explained`);
    }

    for (const { id, expected } of testCase.sequences) {
      const sequence = page.locator(`[data-sequence="${id}"]`);
      await sequence.locator('[data-sequence-check]').click();
      assert(await sequence.locator('[data-sequence-feedback]').getAttribute('data-result') === 'wrong', `${id}: initial order rejected`);
      await sortSequence(sequence, expected);
      await sequence.locator('[data-sequence-check]').click();
      assert(await sequence.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct', `${id}: correct order accepted`);
    }

    const recall = page.locator(`[data-recall="${testCase.recall}"]`);
    await recall.locator('[data-recall-input]').fill('Ich prüfe erst die Voraussetzungen und den aktuellen Zustand. Dann lese ich die passende Meldung, ordne den Auslöser und die Aktion zu, teste die geplante Änderung und kontrolliere danach das wirkliche Ergebnis statt nur einen angelegten Plan zu sehen.');
    await recall.locator('[data-recall-reveal]').click();
    assert(await recall.locator('[data-recall-model]').isVisible(), `${testCase.slug}: model answer revealed`);
    const card = page.locator(`[data-flashcard="${testCase.card}"]`);
    await card.focus();
    await page.keyboard.press('Enter');
    assert(await card.getAttribute('aria-pressed') === 'true', `${testCase.slug}: keyboard flashcard`);

    const firstGate = page.locator(`[data-quiz="${testCase.gates[0]}"]`);
    const firstGateCorrect = Number(await firstGate.getAttribute('data-correct'));
    await firstGate.locator(`[data-answer="${(firstGateCorrect + 1) % await firstGate.locator('[data-answer]').count()}"]`).click();
    assert(await done.isDisabled(), `${testCase.slug}: wrong gate gives no credit`);
    await firstGate.locator('[data-quiz-reset]').click();
    for (const [index, gateId] of testCase.gates.entries()) {
      const gate = page.locator(`[data-quiz="${gateId}"]`);
      await gate.locator(`[data-answer="${await gate.getAttribute('data-correct')}"]`).click();
      assert((await done.isDisabled()) === (index < testCase.gates.length - 1), `${testCase.slug}: objective gate ${index + 1}`);
    }
    assert((await page.locator('[data-mastery-note]').textContent()).includes('Alle 3 Lernziele'), `${testCase.slug}: mastery message matches objective count`);
    await page.reload();
    assert(!await done.isDisabled(), `${testCase.slug}: objectives persist`);
    await done.click();
    assert(await done.getAttribute('aria-pressed') === 'true', `${testCase.slug}: completion`);
    await done.click();
    assert(await done.getAttribute('aria-pressed') === 'false', `${testCase.slug}: completion undo`);

    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ['dark', 'light']) {
        await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
        for (const [index, figure] of (await page.locator('.learning-figure').all()).entries()) {
          await figure.scrollIntoViewIfNeeded();
          const image = figure.locator('img');
          if (await image.count()) {
            await image.evaluate(node => node.decode());
            assert(await image.evaluate(node => node.naturalWidth > 0), `${testCase.slug}: ${width}px ${theme} illustration visible`);
          }
          assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${testCase.slug}: ${width}px ${theme} document overflow`);
          assert(await figure.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${testCase.slug}: ${width}px ${theme} diagram overflow`);
          if (captureDir && index < 2) {
            await page.screenshot({ path: path.join(captureDir, `${testCase.slug}-${width}-${theme}-figure-${index}.png`), animations: 'disabled' });
          }
        }
        if (testCase.math) {
          for (const [index, formula] of (await page.locator('.math-display').all()).entries()) {
            await formula.scrollIntoViewIfNeeded();
            assert(await formula.evaluate(node => node.scrollWidth <= node.clientWidth + 2), `${testCase.slug}: ${width}px ${theme} formula overflow`);
            if (captureDir && index === 0) {
              await page.screenshot({ path: path.join(captureDir, `${testCase.slug}-${width}-${theme}-math.png`), animations: 'disabled' });
            }
          }
        }
      }
    }
    assert(errors.length === 0, `${testCase.slug}: browser errors: ${errors.join('; ')}`);
    console.log(`PASS Linux administration: ${testCase.slug}`);
    await page.close();
  }
} finally {
  await browser.close();
}
