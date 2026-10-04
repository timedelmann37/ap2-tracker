# Lernseiten-Rahmen: Critique, Audit und begrenzte Umsetzung

Stand: 04.10.2026. Ziel: `scripts/templates/learning-page.html` und gemeinsame Lernfunktionen. Modus: Read/Operate-Verfeinerung, keine Neugestaltung. Die freigegebene Deep-Space-Identität mit Glas, Aurora, Laser-Akzenten, Inter und technischen Illustrationen bleibt erhalten. Rechtsformen bleiben ausführlich.

## Unabhängige Ausgangsbewertungen

A (`impeccable_design_a`) bewertete die Gestaltung unabhängig und vor Freigabe des Auftrags an B (`impeccable_evidence_b`). B prüfte technische Belege und eigene Browseransichten, ohne A-Ergebnisse oder Zwischenwerte zu erhalten. Der Hauptagent führte beide Ergebnisse vor der Umsetzung zusammen und stellte sie dem Nutzer vor.

Critique-Baseline: **26/40**, zwei P1, keine P0. Snapshot: [2026-10-04T18-30-17Z__scripts-templates-learning-page-html.md](../../.impeccable/critique/2026-10-04T18-30-17Z__scripts-templates-learning-page-html.md). Audit-Baseline: **15/20** — Accessibility 3, Performance 3, Responsive 2, Theming 4, Integrity 3. Stichproben: Rechtsformen, WiSo-Zeitbudget, Linux und OSI; nicht alle 380 Seiten.

Die Zahlen sind Ausgangswerte, **keine neu gemessenen Abschlusswerte**. Ein Detektorlauf lieferte null Treffer mit Exit0, aber nur im Regex-Fallback: `htmlparser2`, `css-select`, `css-tree` und `domutils` fehlten. Der nachgelagerte layout/type-Scope-Scan war ebenfalls leer und eingeschränkt. Weder leere Scans noch automatisierte Browserchecks belegen WCAG-Konformität.

## Umgesetzte Prioritäten

| Ausgangsbefund | Änderung | Ergebnis / Grenze |
| --- | --- | --- |
| P1 lange Einheiten verlieren Navigation | Desktop-Rail begrenzt und separat scrollbar; native mobile Inhaltsübersicht mit Lernstand und aktuellem Abschnitt; Rechtsformen nach Grundlagen und drei Lernrunden gruppiert | Letzter Link erreichbar, Tastaturziel erhält Fokus, Übersicht schließt nach Navigation. |
| P1 gesperrte Aktionen ohne Wegweisung | Pflichtchecks sichtbar beschriftet, Zähler an beiden Stellen, nächster offener Check, Anmeldeweg und konkrete Lade-/Anmelde-/Fehler-/Check-Gründe; neutrale gesperrte Abschlussaktion; Speichern mobil sichtbar | Mobile bis 820 px und Desktop geprüft. Tablet-Überlagerung bei 900 px bleibt offen, siehe unten. |
| P2 Karten/Retry im Accessibility Tree | Inaktive Kartenseite `aria-hidden`; Enter/Space erhalten aktive Seite; Retry fokussiert erste Option | AX-Snapshot und Tastaturregression bestanden; kein realer Screenreader-Test behauptet. |
| P2 schwer erschließbarer Detailvergleich | Acht Rechtsformen mit gleichen fünf Vergleichsfeldern und echten Unterüberschriften; mobile DL-Textalternative aus exakt denselben Layer-Diagrammdaten | Keine Kürzung von Haftungs-/Kapital-/Leitungs-/Gewinn-Ausnahmen; SVG bleibt als technische Grafik verfügbar. |
| P2/P3 doppelte Nummern und Statussprache | Build als einzige Abschnittsnummerierungsautorität; deutsche Statusanzeige „Entwurf · menschliche Freigabe ausstehend“ | Fachliche Nummern wie 802.1Q nicht abgeschnitten. Formales `CURATED_DRAFT` bleibt intern und dort im redaktionellen Text, wo der Freigabestatus ausdrücklich erklärt wird. Das ist eine eng begrenzte Workflow-Ausnahme. |

Gemeinsame Recall-Muster erhalten lesbare Absätze; die neue WiSo-Einheit nutzt acht semantische MathML-Rechenwege. Bestehende Diagrammdaten, Farbtokens und Fachinhalte werden wiederverwendet.

## Zusätzlich reproduzierte funktionale Fehler

1. Ein nachträglich geänderter numerischer Wert behielt den alten richtigen Pass. Eingabeänderung speichert jetzt den Entwurf, entfernt das alte Ergebnis und sperrt den Abschluss bis zu einer neuen Prüfung. Leere Eingabe ist nicht Null; explizite Null bleibt zulässig.
2. Trackeränderungen während eines laufenden Cloud-Upserts fehlten im letzten Cloud-Snapshot. Stabile Request-Snapshots und ein nachgelagerter Push erhalten nun den aktuellen lokalen Stand.
3. `null`, Arrays und primitive Werte als lokaler Cache führten zu Fehlern oder falschem Zustand. Diese Formen werden als leeres Objekt behandelt.
4. Eine unabhängige abschließende Codeprüfung fand, dass eine Lernkartenaktion nach Cloud-Fehler die Wiederholungsaktion verdeckte. Der Regressionstest reproduzierte „gespeichert“ statt Fehlermeldung; nach Korrektur bleiben Lade-/Syncfehler und Retry trotz lokaler Lernaktionen sichtbar. Derselbe Test schützt einen fehlgeschlagenen initialen Cloud-Abgleich.

`npm run test:learning-runtime` bestand nach der letzten Korrektur. Dieser Test läuft auch im vollständigen Browserrunner und im Selektor `learning-refinement`. Alle Cloud-Fehlerfälle nutzen eine lokale Fixture, nicht das Produktionssystem.

Das Supabase-SDK wird nun `defer` geladen. Eine lokale Verzögerung des SDKs von 1600 ms bestätigte nach 250 ms bereits geparstes `h1`; Lesetext ist nicht mehr durch diesen Download am HTML-Parser blockiert. Keine umfassende Performance-/Core-Web-Vitals-Messung durchgeführt.

## Prüfung und verbliebener Restpunkt

`npm test` bestand auf dem letzten Build (1211 Dateien), mit zwei transparenten SKIP für nicht importierte private Daten. Der lokale Browserrunner bestätigte allgemeine Lernroute/Persistenz/Retry/Fortschritt/Mobilnavigation, die neue Simulation, ausführliche Rechtsformen und WiSo-Zeitbudget. `verify-learning-quality-browser.mjs` prüfte 320/390/820/900/1440 px in Dark/Light, Reduced Motion, Fokussierung, Round-TOCs, Textalternativen und Voraussetzungen. Automatische Sichtbarkeit ist ausdrücklich kein Nachweis gegen Überdeckung.

Die begrenzte visuelle Routine bestand aus einer ersten gebündelten Inspektion, einer gebündelten Korrektur (Menü-Scrollreset, mobile Anmeldung, Musterlesbarkeit/MathML) und einer Bestätigung. Testselektor-Reparaturen betrafen die beabsichtigten doppelten Lernstandsanzeigen. Die zusätzliche Cloud-Korrektur war ein reproduzierter Daten-/Fehlerzustandsfehler, keine weitere ästhetische Iteration.

Der Linux-Teil des kombinierten Laufs endete während eines Reloads ohne `#mark-done`, zeitgleich mit einem versehentlich parallel gestarteten Build, der `dist` neu aufbaut. Eine isolierte Wiederholung mit `AP2_BROWSER_ONLY=linux-admin` auf dem stabilen letzten Build bestand vollständig: alle elf Linux-/Boot-/Verzeichnisdienst-Stichproben einschließlich Gates, Recall, Karten, Reload und Dark/Light-Diagrammcontainment. Der erste Timeout wird nicht als bestandener Test gewertet; künftig Build und Browserzugriff auf denselben Bestand nicht gleichzeitig ausführen. Keine Behauptung eines Laufs der gesamten Browser-Suite.

**Offen, P2 — Tablet-Abschlussleiste bei 900 px:** In `quality-900-light-overview.png` überdeckt die untere Navigation einen Teil der klebenden Abschlussleiste. Ursache im CSS: gemeinsame Navigation aktiviert ihre mobile Leiste bei 940 px, früher als der lokale 820-px-Wechsel der Lernabschlussleiste. Mobile Lernstand-/Anmelde-/Nächster-Check-Information im oberen Inhaltsmenü bleibt als Ausweichweg verfügbar. Empfehlung: `$impeccable adapt` — die Abschlussleiste am tatsächlichen gemeinsamen Navigationsbreakpoint auf Dokumentfluss abstimmen, Überdeckung mit geometrischem/Hit-Test absichern; danach einmal gezielt bestätigen und `$impeccable polish` abschließen. Kein neuer Score und keine Behauptung vollständiger UI-Freigabe.

Der eingelesene Critique-Snapshot bleibt deshalb **offen**. Es wurden nicht alle übernommenen Prioritäten vollständig geklärt; kein `close`-Aufruf und kein künstlich grünes Qualitätslabel. Native Browser-Zoomprüfung, realer Screenreader, numerische Kontrastzertifizierung, andere Browserengines und echter Cloud-Mehrkontoabgleich wurden nicht durchgeführt.

## Run Notes

- Kanonischer Slug: `scripts-templates-learning-page-html`; helper-resolved. Keine `.impeccableignore`, keine Regeln/Treffer ausgeblendet.
- Unabhängigkeit: A abgeschlossen, dann B freigegeben; keine Bewertungsergebnisse in B-Prompt. Umsetzung aller Befunde durch Nutzer bereits beauftragt, keine erneute Prioritätsfrage.
- Detector: DEGRADED Regex-Fallback, Exit0/keine Treffer; kein computed-contrast. Zunächst falsche `--category`-Argumente vor dem korrekten `--scope layout,type`-Aufruf korrigiert, deren Zugriffsfehler nicht als sauberer Scan gewertet.
- Browser: A-Localhost in CUA blockiert (`ERR_BLOCKED_BY_CLIENT`), Playwright-Fallback. B-CUA funktionierte; Tab geschlossen, Viewport zurückgesetzt. Kein DOM-Schreiboverlay injiziert, daher keines zu entfernen.
- Snapshot zuerst veröffentlicht, dann persistiert; Zielidentität unverändert, Baseline-only/kein Trendwert. Temporäre Archivtextdatei entfernt; Snapshot bleibt absichtlich offen.
- QA-Captures/Logs liegen lokal unter `C:/Users/timed/AppData/Local/Temp/ap2-final-20261004` und `ap2-final-*-20261004.log`, nicht als Produktassets. Ausgewählte Bestätigungscaptures: 390 px Dark und anonymes Menü, 900 px Light-Restpunkt, 320 px Light-Schlüssel, 1440 px Dark-Schlüssel/Ablaufgrafik und Light-Aktionsbereich.
- Zwei verwaiste, leere Git-Index-Locks wurden jeweils nach Prüfung ohne laufenden Git-Prozess recoverbar in `index.lock.recovered-20261004-final-01` und `index.lock.recovered-20261004-final-02` umbenannt; keine unbekannten Änderungen gelöscht oder zurückgesetzt. Weitere Statusabfragen verwenden `GIT_OPTIONAL_LOCKS=0`.
- Lokale Preview beendet; kein Listener mehr auf Port 4337. Testserver schließen im jeweiligen `finally`; kein Overlay oder temporäres Archivtextfragment bleibt offen.

Die nächste Arbeit richtet sich nach diesem konkreten Restpunkt oder neuen Nutzeranweisungen, nicht nach einer offenen Endlos-Polierschleife. Neue Lerninhalte und sämtliche bereits vorhandenen Seiten bleiben bis zur menschlichen Freigabe `CURATED_DRAFT`. Kein Push oder Deployment.
