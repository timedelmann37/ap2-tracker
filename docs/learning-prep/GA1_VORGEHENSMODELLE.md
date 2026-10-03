# GA1: Wasserfall, V-Modell, Scrum und Kanban

Stand: 03.10.2026. Kernthema `ga1-13__4`, **CURATED_DRAFT** bis menschliche Fachfreigabe.

## Abgeschlossener Abschnitt

Eigener Neris-Fall mit Geräteersatz, unsicherem Portalbedarf und laufenden Serviceanfragen. Modellwahl anhand Anforderungsstabilität, Feedback, Nachweisbedarf und Kapazität statt pauschalem Methodenranking. Sequenzielles Wasserfall-Grundmodell, frühe Prüfplanung im V und dessen Abgrenzung zum umfangreicheren V-Modell XT erklärt. Iterativ und inkrementell unterschieden; agil ist nicht plan- oder dokumentationslos.

Scrum-Verantwortlichkeiten, drei Artefakte mit Commitments und fünf Events erklärt. Eigener Portal-Sprint macht Review/Retrospective, Definition of Done und technische Prüfungen unterscheidbar. Eigenes Kanban-Board definiert Start/Ende, globales WIP-Limit 3, blockierte Tickets, Pull und eine ausdrücklich fiktive vorläufige SLE. A/B/C belegen das Limit; nach echtem Abschluss von C kann D bei Kapazität gezogen werden. Kanban kann Scrum ergänzen.

Diagnose ohne Pflichtgate, drei Pflichtchecks mit Antwortfeedback, freier Transfer und drei Karten. Drei native technische SVGs: Prüfzuordnung (keine vollständige XT-Darstellung), vereinfachter Sprintablauf und Workflow-Momentaufnahme. Eine semantische MathML-Formel für die Ticketzählung unter expliziten Annahmen. Keine dekorativen Rasterbilder, keine ASCII-Grafiken, keine automatische fachliche Benotung freier Antworten.

## Quellen und Designbindung

- [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html): Team, Accountabilities, Artifacts und Events direkt gelesen.
- [Scrum.org Event-Lernserie](https://www.scrum.org/resources/learn-more-about-each-scrum-event): öffentliches Suchindex-Exzerpt gelesen; Direktseite gesperrt. Gegen direkt gelesenen Guide geprüft, keine vollständige Seitenlektüre behauptet.
- [Kanban Guide Mai 2025](https://kanbanguides.org/the-kanban-guide/): Definition of Workflow, aktive Steuerung und Flow Metrics direkt gelesen.
- [V-Modell XT Bund 2.0, Entwicklung](https://download.gsb.bund.de/BundesCIO/V-Modell_XT_Bund/V-Modell%20XT%20Bund-2.0-HTML/96301542dd939ec.html): vier Prinzipien direkt gelesen. Historischer Methodenanker von 2016, kein aktueller Beschaffungsstandard und keine IHK-Vorschrift.
- [IBM SDLC](https://www.ibm.com/think/topics/sdlc): Waterfall direkt gelesen; dortige vereinfachte Gleichsetzungen agiler Methoden nicht übernommen.
- [Agiles Manifest](https://agilemanifesto.org/iso/de/manifesto.html): Werte und Einordnung direkt gelesen; kein wörtlicher Auszug.
- Private Anker `europa-integratoren-2026:00108`, Zeilen 1190–1209, und `:00460`, Zeilen 4620–4632, direkt gelesen. Der Scrum/Kanban-Abschnitt enthält zu bewertende Aussagen und darf nicht als faktische Zusammenfassung verwendet werden. Keine Buchfälle, Bilder oder Musterlösungen übernommen; Quellenrollen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` beachtet.

Refero-Routine: bestehender Doppler-dominanter Deep-Space-Lock, Gantt-Vorgängerseite als Sichtvergleich; gemeinsame Tokens, Seitenrahmen, Diagramm-Scrollbereich und Interaktionen unverändert. Fachliche Grafiken bleiben native, lesbare SVGs. Keine neue globale Gestaltung.

## Tatsächliche Prüfung

- Build: Exit 0, 836 Dateien.
- `npm test`: Exit 0 für Build, Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL. Buchimport im Worktree mangels lokaler Wissensbasis übersprungen; Anker separat im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=models node scripts/run-browser-tests.mjs`: Exit 0 mit lokaler Anmeldefixture. Diagnose, falsche/richtige Antworten, Feedback, Reset, Abschluss/Rücknahme, Persistenz, Abruf-Mindestlänge/Muster und Enter-/Space-Karten geprüft; keine externen Nutzerdaten verändert.
- 390/1440 Pixel in Dark/Light: kein Seitenoverflow, zugängliche Formel, Diagrammtext im Canvas, tastaturbedienbares seitliches Scrollen, Karten ohne Textkollisionen und keine Laufzeitfehler.
- Sichtprüfung fand zunächst zu breite Board-Zeilen. Beschriftungen gekürzt; neue Prüfung bestätigt zusätzlich Text innerhalb jeder einzelnen Diagrammspalte in beiden Themes und Größen.
- Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-models-20261003/`: korrigiertes Desktop-Dark-Board, Desktop-Light-Sprint, Mobile-Light-Prüfzuordnung und Mobile-Dark-Kartenrückseite visuell kontrolliert.

Abdeckung: 269/380 insgesamt, GA1 161/164, `ga1-13` 5/8 Entwürfe. Als Nächstes `ga1-13__5`: Qualitätsmanagement, PDCA, Qualitätsmerkmale und Abnahmekriterien. Abdeckung bedeutet keine menschliche Freigabe. Nur beabsichtigte Änderungen lokal, kein Push oder Veröffentlichung.
