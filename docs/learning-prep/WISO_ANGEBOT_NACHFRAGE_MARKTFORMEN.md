# Angebot, Nachfrage, Preisbildung und Marktformen

Abgeschlossen am 04.10.2026 im Branch `codex/ga1-linux-admin`. Kernthema `wiso-7__1`, Route `/lernen/angebot-nachfrage-preisbildung-marktformen/`, weiterhin **CURATED_DRAFT** bis zur menschlichen Freigabe. Kein Push und keine Veröffentlichung.

## Inhalt und Quellen

- Diagnose zu Preisgleichheit bei vielen Anbietern; Mengenpläne statt automatisch abgeschlossener Käufe.
- Eigener Luma-Markt mit drei Preiszeilen: Gleichgewicht bei 10 Euro je Adapter und 40 Stück/Woche, Nachfrage- und Angebotsüberhang jeweils 40 Stück an den anderen Preisen.
- Schrittweise Rechnung und zwei semantisch/visuell gesetzte MathML-Beziehungen mit Einheiten und ARIA-Beschreibung.
- Bewegung auf einer bestehenden Kurve bei Änderung des eigenen Produktpreises versus Verschiebung bei anderen Bedingungen; bedingte Wirkungen, keine universellen Sofortprognosen.
- Angebotsmonopol, Angebotsoligopol und Angebotspolypol; Nachfrage separat prüfen. Marktform, Vollkommenheit und juristische Marktbeherrschung ausdrücklich nicht gleichgesetzt.
- Neuer Varo-Transfer mit anderen Zahlen, Musterlösung nach eigener Antwort, vier Lernkarten, vier Pflichtziel-Checks mit spezifischem Fehlfeedback und erneutem Versuch sowie verteilte Wiederholung.

Fundstellen stehen in `MARKT_PREISBILDUNG_QUELLEN.md`. Hauptagent las ausgewählte Originaltextstellen von ETH Zürich, Universität Trier und Göttingen sowie der bpb-Handreichung. Göttinger PDF-Screenshotabruf scheiterte; keine visuelle PDF-Prüfung behauptet. Bundeskartellamt-Aussagen zur Marktabgrenzung wurden im Original-Suchauszug geprüft, Direktabrufe blieben eingeschränkt. Historische Unterlagen werden für stabile Grundlagen verwendet, nicht für aktuelle Branchenklassifikationen.

Privater EUROPA-Original-Markdown, Zeile 5858, Aufgaben 25–26: Verkäufermarkt und zweiseitige Marktformen als verifizierter Themenanker. Keine fremden Aufgaben, Namen, Zahlen, Tabellen oder Abbildungen übernommen und keine nachgeprüfte PDF-Seite behauptet. Drei eigenständige technische SVG-Vergleiche nutzen vorhandene Renderer; keine neue gemeinsame Designentscheidung.

## Referenz-Lock und tatsächliche Prüfung

Vorab AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Abdeckung gelesen; sauberer Worktree und richtiger Branch festgestellt. Research-Skill mit abgegrenztem Quellenagenten, Refero-Design-Skill mit bestehendem Deep-Space-Lock angewandt. Reale vorherige Lernseite als Build-Target gesichtet. Shell, Typografie, Rollen der Tokens und Interaktionen unverändert fortgeführt.

- `npm run build:learning`: bestanden.
- `npm test`: bestanden; vollständiger Site-Build, Site-Prüfung, Lerncompiler, Learning-Batch, Lerninhalte einschließlich Netzplan/Gantt, Fortschritts-Merge und SQL-Rangliste.
- `AP2_BROWSER_ONLY=markt npm run test:browser`: bestanden. Gezielter Test der neuen Einheit, nicht die gesamte Browser-Suite.
- 390 und 1440 Pixel, jeweils Dark/Light und Reduced Motion: Diagnose ohne Pflichtzielwirkung, falsche/richtige Antworten, Feedback, Reset, gesperrter kurzer Abruf, Musterlösung, Karten per Enter/Leertaste, Persistenz nach Reload, Abschluss/Rücknahme und erneute Sperre geprüft.
- Drei tatsächliche Tabellenzeilen gegen exakte Zahlen geprüft. Zwei MathML-Beziehungen und ARIA-Labels, Seitenüberlauf, Kartencontainment, SVG-Canvas-/Boxcontainment sowie mobiles Diagrammscrolling per Tastatur geprüft. Keine Browserfehler.
- Reale Screenshots visuell geprüft: Desktop-Dark-Marktformen, Desktop-Light-Bewegung/Verschiebung, Mobile-Dark-Gleichgewichtsformel und Mobile-Light-Überhangfrage samt Feedback. Zu breite Diagrammbeschriftungen vor Abschluss gekürzt und die ganze gezielte Browsermatrix erneut bestanden.
- Lokale Screenshots: temporäres Verzeichnis `ap2-markt-20261004`; Testlogs: `ap2-markt-build.log`, `ap2-markt-browser.log`, `ap2-markt-test.log` im temporären Benutzerverzeichnis.
- `git diff --check`: bestanden. Eine verwaiste leere Git-Index-Sperre nach freiem Prozesszeitfenster recoverabel als `index.lock.stale-markt-20261004` gesichert; keine aktiven Prozesse beendet oder fremden Dateien entfernt.

Abdeckung nach Build: 345/380 Kernthemen implementiert, 35 offen; WiSo 74/109. Implementiert bleibt Entwurfsstatus, keine menschliche Freigabe. Nächstes offenes Kernthema: `wiso-7__2` Konjunkturphasen, Inflation und Wirtschaftspolitik im Grundzug.
