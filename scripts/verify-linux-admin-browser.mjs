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
  },
  {
    slug: 'systemhartung-benotigte-dienste-deaktivieren-lokale-firewall-minimale',
    figures: 3,
    diagnostic: 'haertung-diagnose',
    card: 'haertung-karte-dienst',
    recall: 'haertung-fallbegruendung',
    gates: ['haertung-dienste-gate', 'haertung-firewall-gate', 'haertung-minimal-gate'],
    sequences: [{ id: 'haertung-aenderungsfolge', expected: ['bestand', 'bedarf', 'rueckweg', 'deaktivieren', 'firewall', 'pruefen'] }]
  },
  {
    slug: 'uefi-bios-haertung-secure-boot-tpm-bootreihenfolge-schnittstellen',
    figures: 3,
    diagnostic: 'uefi-diagnose',
    card: 'uefi-karte-secure-boot',
    recall: 'uefi-fallbegruendung',
    gates: ['uefi-signatur-gate', 'uefi-tpm-gate', 'uefi-recovery-gate'],
    sequences: [{ id: 'uefi-aenderungsfolge', expected: ['inventar', 'ziel', 'recovery', 'aendern', 'pruefen', 'nachweis'] }]
  },
  {
    slug: 'grub-bootloader-bootvorgang-menue-kernel-auswahl-rescue',
    figures: 3,
    diagnostic: 'grub-diagnose',
    card: 'grub-karte-rescue',
    recall: 'grub-fallbegruendung',
    gates: ['grub-rolle-gate', 'grub-rescue-gate', 'grub-ziel-gate'],
    sequences: [{ id: 'grub-reparaturfolge', expected: ['befund', 'modus', 'sicherung', 'pfade', 'reparatur', 'test'] }]
  },
  {
    slug: 'verzeichnisdienste-authentifizierung-ldap-kerberos-radius-sso-mfa',
    figures: 3,
    diagnostic: 'identitaet-diagnose',
    card: 'identitaet-karte-ldap',
    recall: 'identitaet-fallbegruendung',
    gates: ['identitaet-verzeichnis-gate', 'identitaet-radius-gate', 'identitaet-web-gate'],
    sequences: [{ id: 'identitaet-stoerfolge', expected: ['befund', 'web-idp', 'app', 'test'] }]
  }
];
const selectedCases = process.env.AP2_LINUX_SLUG
  ? cases.filter(testCase => testCase.slug === process.env.AP2_LINUX_SLUG)
  : cases;
if (selectedCases.length === 0) throw new Error(`Unknown Linux administration slug: ${process.env.AP2_LINUX_SLUG}`);

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
  for (const testCase of selectedCases) {
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
    } else if (testCase.slug === 'systemhartung-benotigte-dienste-deaktivieren-lokale-firewall-minimale') {
      const figures = page.locator('.learning-diagram');
      const serviceLabels = await figures.nth(0).textContent();
      const firewallLabels = await figures.nth(1).textContent();
      const packageLabels = await figures.nth(2).textContent();
      assert(['Laufzeit', 'Boot', 'Auslöser', 'Netz'].every(label => serviceLabels.includes(label)), `${testCase.slug}: distinct service states are labelled`);
      assert(['22/tcp', '443/tcp', 'sonstige'].every(label => firewallLabels.includes(label)), `${testCase.slug}: required firewall paths are labelled`);
      assert(['Bedarf klären', 'Folgen simulieren', 'Entscheiden und testen'].every(label => packageLabels.includes(label)), `${testCase.slug}: package decision flow is labelled`);
    } else if (testCase.slug === 'uefi-bios-haertung-secure-boot-tpm-bootreihenfolge-schnittstellen') {
      const figures = page.locator('.learning-diagram');
      const bootLabels = await figures.nth(0).textContent();
      const protectionLabels = await figures.nth(1).textContent();
      const recoveryLabels = await figures.nth(2).textContent();
      assert(['UEFI-Firmware', 'Boot-Image', 'Signaturprüfung', 'Startentscheidung'].every(label => bootLabels.includes(label)), `${testCase.slug}: Secure Boot trust chain is labelled`);
      assert(['Secure Boot', 'TPM', 'BitLocker'].every(label => protectionLabels.includes(label)), `${testCase.slug}: distinct protections are labelled`);
      assert(['Alltagsstart', 'Setup-Zugang', 'Recovery', 'Nachweis'].every(label => recoveryLabels.includes(label)), `${testCase.slug}: recovery path is labelled`);
    } else if (testCase.slug === 'grub-bootloader-bootvorgang-menue-kernel-auswahl-rescue') {
      const figures = page.locator('.learning-diagram');
      const bootLabels = await figures.nth(0).textContent();
      const diagnosisLabels = await figures.nth(1).textContent();
      const partitionLabels = await figures.nth(2).textContent();
      assert(['Firmware', 'GRUB', 'Kernel', 'Userspace'].every(label => bootLabels.includes(label)), `${testCase.slug}: boot stages are labelled`);
      assert(['GRUB-Menü', 'grub rescue>', 'Befund'].every(label => diagnosisLabels.includes(label)), `${testCase.slug}: rescue split is labelled`);
      assert(['ESP (UEFI)', '/boot', 'Root', 'BIOS'].every(label => partitionLabels.includes(label)), `${testCase.slug}: UEFI and BIOS targets are distinguished`);
    } else if (testCase.slug === 'verzeichnisdienste-authentifizierung-ldap-kerberos-radius-sso-mfa') {
      const figures = page.locator('.learning-diagram');
      const directoryLabels = await figures.nth(0).textContent();
      const networkLabels = await figures.nth(1).textContent();
      const webLabels = await figures.nth(2).textContent();
      assert(['LDAP Bind', 'LDAP Search', 'Kerberos TGT', 'Dienstticket'].every(label => directoryLabels.includes(label)), `${testCase.slug}: directory and ticket paths are distinguished`);
      assert(['Endgerät', 'AP oder Switch', 'RADIUS-Server'].every(label => networkLabels.includes(label)), `${testCase.slug}: 802.1X and RADIUS actors are labelled`);
      assert(networkLabels.includes('Challenge: EAP weiter') && networkLabels.includes('Accept/Reject: final'), `${testCase.slug}: challenge is not a final access decision`);
      assert(['SAML', 'OAuth 2.0', 'OIDC', 'MFA'].every(label => webLabels.includes(label)), `${testCase.slug}: web federation and factors are distinguished`);
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
    } else if (testCase.slug === 'systemhartung-benotigte-dienste-deaktivieren-lokale-firewall-minimale') {
      const serviceQuiz = page.locator('[data-quiz="haertung-stop-disable"]');
      await serviceQuiz.locator('[data-answer="0"]').click();
      assert((await serviceQuiz.locator('[data-selected-feedback]').textContent()).includes('nicht den aktuellen Laufzustand'), `${testCase.slug}: disable does not stop a running unit`);
      await serviceQuiz.locator('[data-quiz-reset]').click();
      await serviceQuiz.locator('[data-answer="1"]').click();
      assert((await serviceQuiz.locator('[data-selected-feedback]').textContent()).includes('stop beziehungsweise --now'), `${testCase.slug}: current state requires stop and verification`);

      const firewallQuiz = page.locator('[data-quiz="haertung-ssh-schutz"]');
      await firewallQuiz.locator('[data-answer="0"]').click();
      assert((await firewallQuiz.locator('[data-selected-feedback]').textContent()).includes('Verlust des Fernzugriffs'), `${testCase.slug}: lockout risk explained`);
      await firewallQuiz.locator('[data-quiz-reset]').click();
      await firewallQuiz.locator('[data-answer="1"]').click();
      assert((await firewallQuiz.locator('[data-selected-feedback]').textContent()).includes('bestehende Sitzung allein beweist nicht'), `${testCase.slug}: new remote session needed`);

      const oldRuleQuiz = page.locator('[data-quiz="haertung-altregel"]');
      await oldRuleQuiz.locator('[data-answer="0"]').click();
      assert((await oldRuleQuiz.locator('[data-selected-feedback]').textContent()).includes('bestehende breite Erlaubnis nicht'), `${testCase.slug}: narrow rule does not override broad old rule`);
      await oldRuleQuiz.locator('[data-quiz-reset]').click();
      await oldRuleQuiz.locator('[data-answer="1"]').click();
      assert(await oldRuleQuiz.locator('[data-answer="1"]').evaluate(node => node.classList.contains('right')), `${testCase.slug}: old-rule correction accepted`);
    } else if (testCase.slug === 'uefi-bios-haertung-secure-boot-tpm-bootreihenfolge-schnittstellen') {
      const secureBootQuiz = page.locator('[data-quiz="uefi-rollen-quiz"]');
      await secureBootQuiz.locator('[data-answer="1"]').click();
      assert((await secureBootQuiz.locator('[data-selected-feedback]').textContent()).includes('keine Verschlüsselung der SSD'), `${testCase.slug}: Secure Boot is not disk encryption`);
      await secureBootQuiz.locator('[data-quiz-reset]').click();
      await secureBootQuiz.locator('[data-answer="0"]').click();
      assert((await secureBootQuiz.locator('[data-selected-feedback]').textContent()).includes('nicht den Schutzstatus des Laufwerks'), `${testCase.slug}: independent BitLocker proof explained`);

      const tpmQuiz = page.locator('[data-quiz="uefi-tpm-bitlocker-fall"]');
      await tpmQuiz.locator('[data-answer="2"]').click();
      assert((await tpmQuiz.locator('[data-selected-feedback]').textContent()).includes('TPM-Clear kann Schlüssel vernichten'), `${testCase.slug}: TPM clearing risk explained`);
      await tpmQuiz.locator('[data-quiz-reset]').click();
      await tpmQuiz.locator('[data-answer="1"]').click();
      assert((await tpmQuiz.locator('[data-selected-feedback]').textContent()).includes('verschlüsselt das Laufwerk aber nicht selbst'), `${testCase.slug}: TPM role explained`);

      const serviceQuiz = page.locator('[data-quiz="uefi-bootfall"]');
      await serviceQuiz.locator('[data-answer="0"]').click();
      const wrongServiceFeedback = await serviceQuiz.locator('[data-selected-feedback]').textContent();
      assert(wrongServiceFeedback.includes('USB-Bootoption und gesamter USB-Port sind verschiedene Eingriffe') && wrongServiceFeedback.includes('Setup-Kennwort ersetzt weder Bootmedium'), `${testCase.slug}: boot option, port and service access distinguished`);
      await serviceQuiz.locator('[data-quiz-reset]').click();
      await serviceQuiz.locator('[data-answer="1"]').click();
      assert((await serviceQuiz.locator('[data-selected-feedback]').textContent()).includes('geprüften Vor-Ort-Rückweg'), `${testCase.slug}: recovery path explained`);
    } else if (testCase.slug === 'grub-bootloader-bootvorgang-menue-kernel-auswahl-rescue') {
      const menuQuiz = page.locator('[data-quiz="grub-menue-kernel"]');
      await menuQuiz.locator('[data-answer="1"]').click();
      assert((await menuQuiz.locator('[data-selected-feedback]').textContent()).includes('nach Übergabe'), `${testCase.slug}: later boot phase distinguished from GRUB menu`);
      await menuQuiz.locator('[data-quiz-reset]').click();
      await menuQuiz.locator('[data-answer="0"]').click();
      assert((await menuQuiz.locator('[data-selected-feedback]').textContent()).includes('Dauerlösung'), `${testCase.slug}: older kernel is only a diagnostic test`);

      const rescueQuiz = page.locator('[data-quiz="grub-rescue-befund"]');
      await rescueQuiz.locator('[data-answer="0"]').click();
      assert((await rescueQuiz.locator('[data-selected-feedback]').textContent()).includes('Bootmodus'), `${testCase.slug}: blind install target rejected`);
      await rescueQuiz.locator('[data-quiz-reset]').click();
      await rescueQuiz.locator('[data-answer="2"]').click();
      assert((await rescueQuiz.locator('[data-selected-feedback]').textContent()).includes('Schreiboperationen'), `${testCase.slug}: read-only diagnosis comes first`);
    }

    for (const { id, expected } of testCase.sequences) {
      const sequence = page.locator(`[data-sequence="${id}"]`);
      await sequence.locator('[data-sequence-check]').click();
      assert(await sequence.locator('[data-sequence-feedback]').getAttribute('data-result') === 'wrong', `${id}: initial order rejected`);
      await sortSequence(sequence, expected);
      await sequence.locator('[data-sequence-check]').click();
      assert(await sequence.locator('[data-sequence-feedback]').getAttribute('data-result') === 'correct', `${id}: correct order accepted`);
      if (id === 'haertung-aenderungsfolge') {
        assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('breite Altregeln'), `${id}: corrected firewall policy is part of the accepted sequence`);
      } else if (id === 'uefi-aenderungsfolge') {
        assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Recovery ist vorher verfügbar'), `${id}: recovery is established before firmware change`);
      } else if (id === 'grub-reparaturfolge') {
        assert((await sequence.locator('[data-sequence-feedback]').textContent()).includes('Sicherung'), `${id}: safety sequence includes backup before repair`);
      } else if (id === 'identitaet-stoerfolge') {
        const feedback = await sequence.locator('[data-sequence-feedback]').textContent();
        assert(feedback.includes('Web-App') && feedback.includes('SSO-Nachweis'), `${id}: reached web app focuses diagnosis on SSO and local rights`);
      }
    }

    const recall = page.locator(`[data-recall="${testCase.recall}"]`);
    const recallAnswer = testCase.slug === 'uefi-bios-haertung-secure-boot-tpm-bootreihenfolge-schnittstellen'
      ? 'Ich prüfe Secure Boot, TPM und BitLocker getrennt, sichere den Recovery-Schlüssel und kläre den Bedarf für USB und PXE. Erst nach Freigabe ändere ich die Firmware. Danach prüfe ich Normalstart und Recovery-Pfad einzeln. Ein TPM-Clear ist kein Aktivieren und kann Schlüssel unzugänglich machen.'
      : testCase.slug === 'grub-bootloader-bootvorgang-menue-kernel-auswahl-rescue'
        ? 'Der Rescue-Prompt zeigt, dass GRUB nur seinen Minimalmodus erreicht; ein Kerneldefekt ist damit nicht bewiesen. Ich dokumentiere die Meldung und lese set ohne Zuweisung und ls. Erst nach Sicherung kläre ich UEFI-Modus, Datenträger, Root, /boot, ESP und UUIDs. Dann plane ich eine zur Ursache passende Reparatur und teste den Neustart sowie den Wiki-Dienst.'
        : testCase.slug === 'verzeichnisdienste-authentifizierung-ldap-kerberos-radius-sso-mfa'
          ? 'Ich prüfe zuerst, ob die WLAN-Sperre vor der Web-Anmeldung auftritt: Endgerät, AP und RADIUS mit EAP. LDAP-Suche und Kerberos-Ticket erklären andere Teile des Zugangs. Für die Web-App prüfe ich den Identity Provider und ob SAML oder OIDC als Login dient; ein OAuth Access Token allein ist kein ID Token. Danach teste ich die Anwendung und den MFA-Nachweis getrennt.'
        : 'Ich prüfe erst die Voraussetzungen und den aktuellen Zustand. Dann lese ich die passende Meldung, ordne den Auslöser und die Aktion zu, teste die geplante Änderung und kontrolliere danach das wirkliche Ergebnis statt nur einen angelegten Plan zu sehen.';
    await recall.locator('[data-recall-input]').fill(recallAnswer);
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
    assert((await page.locator('[data-mastery-count]').allTextContents()).every(text => text === '3 von 3 Pflichtchecks bestanden'), `${testCase.slug}: both mastery counts match objectives`);
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
          if (width === 390 && testCase.slug === 'verzeichnisdienste-authentifizierung-ldap-kerberos-radius-sso-mfa') {
            const scroller = figure.locator('.learning-diagram-scroll');
            assert(await scroller.count() === 1, `${testCase.slug}: mobile diagram has a dedicated scroll region`);
            const scrollRange = await scroller.evaluate(node => node.scrollWidth - node.clientWidth);
            assert(scrollRange > 0, `${testCase.slug}: mobile diagram can reveal hidden columns`);
            await scroller.evaluate(node => { node.scrollLeft = node.scrollWidth; });
            assert(await scroller.evaluate(node => node.scrollLeft > 0), `${testCase.slug}: mobile diagram reaches later columns`);
            await scroller.evaluate(node => { node.scrollLeft = 0; });
          }
          if (captureDir && (index < 2 || ['uefi-bios-haertung-secure-boot-tpm-bootreihenfolge-schnittstellen', 'grub-bootloader-bootvorgang-menue-kernel-auswahl-rescue', 'verzeichnisdienste-authentifizierung-ldap-kerberos-radius-sso-mfa'].includes(testCase.slug))) {
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
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
