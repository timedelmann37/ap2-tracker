# GA1: Netzplan, kritischer Pfad und Puffer

Stand: 03.10.2026. Kernthema `ga1-13__2`, **CURATED_DRAFT** bis menschliche Fachfreigabe.

## Abgeschlossener Abschnitt

Eigenständiger Vela-IT-Pilot mit fünf Vorgängen: Auftrag, Server, Testfälle, Prüfdaten und Pilottest. Netz A–B–E und A–C–D–E, Dauern 2/5/2/1/2 Arbeitstage. Endzeitpunkt 9, kritischer Weg A–B–E. Früheste/späteste Zeitpunkte sowie GP und FP vollständig vorgerechnet. C zeigt GP 2 bei FP 0; D zeigt GP/FP 2. Die zwei Vorgänge teilen die Reserve ihres Zweigs, statt vier unabhängige Tage zu besitzen.

Diagnose, drei verpflichtende Lernziel-Checks mit erklärendem Feedback, freier Transfer und drei Karten implementiert. Transfer C = 5 führt zu Ende 10 und GP/FP(B) = 1; C = 4 führt zu zwei kritischen Wegen mit Ende 9. Separate Rechenprüfung bestätigt alle veröffentlichten Ergebniszeilen sowie Daueränderung B = 6 und verbrauchten gemeinsamen Puffer.

Ein lesbares technisches SVG-Vorgangsnetz mit expliziten Richtungs- und Kritisch-Beschriftungen. Die Anordnung ist keine Zeitachse. Sechs semantische MathML-Formeln mit zugänglichen Namen und Legenden. Kein ASCII-Ersatz, keine dekorative Rastergrafik. Zeitpunkte ab 0, ausschließlich Ende-Anfang ohne Abstand, keine Ressourcenengpässe und keine zusätzlichen Terminzwänge; Kalender-/Ressourcenprüfung als Modellgrenze benannt. Keine realen Terminversprechen und keine automatische fachliche Bewertung freier Antworten.

## Geprüfte Quellen und Gestaltung

- [GAO-16-89G: Schedule Assessment Guide](https://www.gao.gov/assets/d1689G.pdf), Appendix IV, gedruckte S. 172–178 und Best Practice 7, S. 92–96 direkt gelesen. Methodenanker, keine IHK-Norm. Eigene Zeitpunkte ab 0 statt inklusiver Kalenderzählung der GAO-Beispiele.
- [Oracle Primavera Cloud: Scheduling Overview](https://docs.oracle.com/cd/E80480_01/English/user_guides/schedule_management_user_guide/88251.htm), CPM Overview und Kalenderhinweis direkt gelesen.
- [Oracle Primavera P6: About Float](https://docs.oracle.com/cd/F25599_01/p6help/en/46930.htm), Definitionen direkt gelesen, Stand 01.10.2021. Begrifflicher Anker, keine aktuelle Produktbedienanleitung.
- Private Buchquelle `europa-integratoren-2026:00102`, Zeilen 1137–1138, und `:00104`, Zeilen 1143–1179 im Hauptrepository gelesen. Nur Themen-/Kompetenzanker; Buchfirma, Fall, Zahlen, Aufgaben und Abbildung nicht übernommen. Quellenrollen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` berücksichtigt.

Refero-Routine: bestehender Doppler-dominanter Deep-Space-Lock und Screenshot der Vorgängereinheit als Build-Ziel. Gemeinsame Tokens, Seitenrahmen und Interaktionsbausteine unverändert; technisches Netz im vorhandenen SVG-System. Keine neue globale Designentscheidung.

## Tatsächliche Prüfung

- `npm run build`: Exit 0, 829 Dateien.
- `node scripts/verify-netzplan-calculations.mjs`: Exit 0; alle Ergebniszeilen gegen unabhängige Vorwärts-/Rückwärtsrechnung geprüft, beide Puffertypen, neue Dauern, zwei kritische Wege und gemeinsamer Reserveverbrauch.
- Rechenprüfung in `npm run test:learning` aufgenommen. `npm test`: Exit 0, Site/Compiler/Batch/Lerninhalte/Fortschrittsmerge/Leaderboard-SQL. Lokaler Buchimporttest im Worktree mangels importierter Wissensbasis übersprungen; Themenanker separat gelesen.
- `AP2_BROWSER_ONLY=netzplan node scripts/run-browser-tests.mjs`: Exit 0, Chromium mit lokaler Anmeldefixture, keine externen Nutzerdaten geändert.
- Diagnose ohne Pflichtgate, falsche/richtige Antworten, Feedback, Reset, Abschlussfreischaltung/Rücknahme, Reload-Persistenz, Abruf-Mindestlänge/Muster und Enter-/Space-Karten geprüft.
- 390/1440 Pixel in Dark/Light: kein Seitenoverflow, Diagrammtext innerhalb Canvas, Diagrammverschiebung per Tastatur, Karten-Vorder-/Rückseitentext innerhalb Grenzen sowie MathML-Namen geprüft. Keine Laufzeitfehler.
- Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-netz-20261003/`: Netz Desktop Dark, Formeln Desktop Light und Mobile Light, Kartenrückseite Mobile Dark sowie Ergebnisübersicht Mobile Light visuell kontrolliert. Lesbar, kein materieller Bruch zum bestehenden Rahmen.

Abdeckung: 267/380 insgesamt, GA1 159/164, `ga1-13` 3/8 Entwürfe. Als Nächstes `ga1-13__3`: Gantt-Diagramm lesen und erstellen. Abdeckung ist keine menschliche Freigabe.

Nur beabsichtigte Änderungen lokal gesichert. Kein Push, keine Veröffentlichung und keine Branch-Löschung.
