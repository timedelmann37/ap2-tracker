# GA1: Gantt-Diagramm lesen und erstellen

Stand: 03.10.2026. Kernthema `ga1-13__3`, **CURATED_DRAFT** bis menschliche Fachfreigabe.

## Abgeschlossener Abschnitt

Eigener Vela-Pilot als Anschluss an den Netzplan: A 0–2, B 2–7, C 2–4, D 4–5, E 7–9, Meilenstein M bei 9. Neue Prognose B = 6 verschiebt B-Ende auf 8, E auf 8–10 und M auf 10. Beide technischen SVGs haben dieselbe maßstäbliche Zeitachse 0–10. Vorgänger stehen ausdrücklich je Zeile dabei; keine impliziten Pfeile oder dekorativen Rasterbilder. Zwei semantische MathML-Formeln mit Legende und zugänglichem Namen.

Diagnose, drei verpflichtende Lernziel-Checks mit begründendem Feedback, freier Transfer und drei Tastaturkarten. Eigenständiger Transfer X/Y/Z/T führt zunächst zu M bei 5 und bei längerer Y-Dauer zu M bei 6. Plan, Prognose und Ist werden unterschieden; Ressourcenengpässe, Arbeitskalender, Aufwand versus Dauer und Grenzen eines unkommentierten Balkenplans ausdrücklich benannt. Keine automatische fachliche Bewertung freier Antworten.

## Quellen und Gestaltung

- [Microsoft: Gantt Chart view](https://support.microsoft.com/en-gb/project/work-with-the-gantt-chart-view), Use the chart und Why aren't my Gantt bars moving? direkt gelesen.
- [Microsoft: Visio Gantt chart](https://support.microsoft.com/en-us/visio/share-schedule-and-task-details-with-a-visio-gantt-chart), Tasks, Milestones, Dependencies und Timescale direkt gelesen.
- Private Themenanker `europa-integratoren-2026:00102`, Zeilen 1137–1138, sowie `:00104`, Zeilen 1143–1179 geprüft. Keine Buchfälle, Zahlen, Grafiken oder Musterlösungen übernommen. Quellenrollen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` berücksichtigt.

Refero-Routine mit bestehendem Deep-Space-Reference-Lock und Screenshot der Vorgängereinheit als Ziel. Gemeinsame Tokens, Seitenrahmen, Diagramm-Scrollbereich und Interaktionsbausteine erhalten. Neuer kompakter `gantt`-Diagrammtyp im Compiler und Schema; keine neue globale Gestaltung. Unterstützt 2–12 Zeilen, Zeitpunkte in halben Einheiten auf einer Achse ab 0 bis maximal 15; längere Zeiträume brauchen eine passend gewählte Einheit. Kein Terminplanungsalgorithmus: Zeilenwerte sind explizite redaktionelle Daten.

## Tatsächliche Prüfungen

- `npm run build`: Exit 0, 832 Dateien.
- `verify-gantt-diagrams.mjs`: proportional berechnete Balken, Null-Dauer-Rauten, beide veröffentlichten Planstände, Ende-Anfang-Beziehungen, ungültige Daten und XML-Escaping geprüft; in `test:learning` integriert.
- `npm test`: Exit 0, Build/Site/Compiler/Batch/Lerninhalte/Fortschrittsmerge/Leaderboard-SQL. Lokaler Buchimporttest im Worktree mangels Wissensbasis übersprungen; Anker separat im Hauptrepository geprüft.
- Browserselektor `gantt`: Exit 0 mit lokaler Anmeldefixture; Diagnose ohne Gate, falsche/richtige Antworten, Feedback, Reset, Abschluss/Rücknahme, Persistenz, Abruf-Mindestlänge, Musterlösung und Enter-/Space-Karten geprüft. Keine externen Kontodaten verändert.
- 390/1440 Pixel, Dark/Light: kein Seitenoverflow; Diagrammtext innerhalb Canvas, seitliches Scrollen per Tastatur, Karten-Vorder-/Rückseiten ohne Textkollisionen, MathML-Namen und keine Laufzeitfehler.
- Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-gantt-20261003/`: Desktop-Dark-Zeitachse, Mobile-Light-Prognose und Desktop-Light-Kartenrückseite visuell geprüft. Auf schmalen Bildschirmen bleibt die Zeitachse bewusst seitlich scrollbar statt unlesbar verkleinert.

Abdeckung: 268/380 insgesamt, GA1 160/164, `ga1-13` 4/8 Entwürfe. Nächstes Thema: `ga1-13__4`, klassische und agile Vorgehensmodelle. Abdeckung ist keine menschliche Freigabe. Nur beabsichtigte Änderungen lokal; kein Push, keine Veröffentlichung, keine Branch-Löschung.
