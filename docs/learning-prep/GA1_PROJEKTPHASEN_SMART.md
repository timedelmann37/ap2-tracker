# GA1: Projektphasen, Zielkonflikte und SMART

Stand: 03.10.2026. Kernthema `ga1-13__0`, Status **CURATED_DRAFT** bis menschliche Fachfreigabe.

## Abgeschlossene Inhalte

Eigener fiktiver IT-Pilotfall: Projekt/Betrieb abgrenzen, vierteilige Phasenstruktur an Ergebnissen erkennen, Managementprozesse davon unterscheiden, Änderungsalternativen anhand von Zeit/Kosten/Leistungsumfang beurteilen und ein SMART-Ziel mit Prüfverfahren sowie Machbarkeitsbelegen formulieren. Eigenständiger Außenstellen-Transfer mit ausdrücklich unbestätigter Teamzeit. Diagnose, drei Pflichtchecks mit Feedback, freier Abruf und drei Karten implementiert.

Zwei technische SVG-Diagramme: Phasenergebnisse und Dreieck der Zielgrenzen. Das Dreieck wird ausdrücklich als vereinfachtes Modell erklärt; Varianten mit Qualität als Ecke werden benannt. Keine dekorative Rastergrafik, kein ASCII-Ersatz, keine künstliche Formel. Keine realen Budget-, Termin- oder Projektfreigaben. Freie Zielantworten werden nicht automatisch fachlich benotet.

## Quellen und Gestaltung

- [PMI: Projects and the Project Lifecycle](https://www.pmi.org/about/what-is-a-project): Projektbegriff, Phasen und Prozessgruppen-Abgrenzung direkt gelesen.
- [Wei Lee / PMI: Manager's challenges – managing constraints](https://www.pmi.org/learning/library/managing-challenges-triple-constraints-6884): Conference Paper 2010, Current Project Triple Constraint direkt gelesen. Primärer Autorenbeitrag, keine aktuelle Norm. Eigenes Dreieck und eigene Vergleichsannahmen, keine Abbildung übernommen.
- [CDC: SMART Framework](https://www.cdc.gov/youth-advisory-councils/action-plans/smart-framework.html): Kriterien direkt gelesen und allgemein auf IT-Ziele übertragen; keine Gesundheitsinhalte. Erreichbarkeit und Relevanz nicht durch bloße Messbarkeit ersetzt, deutsche Varianten ausdrücklich erläutert.
- Private Buchquelle `europa-integratoren-2026:00094`, Zeilen 1067–1088 direkt im Hauptrepository gelesen; nur Themenanker. Keine Buchaufgaben oder Normpassagen übernommen. Quellenrollen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` berücksichtigt.

Refero-Routine: bestehender Deep-Space-Referenz-Lock und gerenderte Vorgängereinheit als Ziel. Doppler-Panels, Inter, gemeinsame Farben, vorhandene Quiz-/Recall-/Kartenbausteine unverändert genutzt. Die beiden Diagramme folgen der vorhandenen technischen SVG-Sprache. Keine neue globale Designentscheidung.

## Tatsächliche Prüfung

- `npm run build`: Exit 0, 824 Dateien.
- `npm test`: Exit 0; Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge, Leaderboard-SQL. Lokaler Buchimporttest im Worktree mangels importierter Wissensbasis übersprungen; Quellenanker separat im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=project-basics node scripts/run-browser-tests.mjs`: Exit 0, Chromium mit lokaler Anmeldefixture, keine externen Nutzerdaten geändert.
- Diagnose ohne Pflichtgate, falsche/richtige Antworten, Feedback, Reset, Abschlussfreischaltung und Rücknahme, Reload-Persistenz, Abruf-Mindestlänge/Muster sowie Enter/Space-Karten geprüft.
- 390 und 1440 Pixel in Dark/Light: kein Seitenoverflow, SVG-Text innerhalb des Canvas, mobile Diagrammverschiebung per Tastatur, Vorder-/Rückseitentext innerhalb der Karten geprüft.
- Screenshots `C:/Users/timed/AppData/Local/Temp/ap2-project-20261003/`: Dreieck Desktop Dark, Phasen Desktop Light, Kartenrückseite Mobile Dark, Alternativen und Transfer Mobile Light tatsächlich visuell kontrolliert. Keine materielle Abweichung zum bestehenden Seitenrahmen festgestellt.

Abdeckung: insgesamt 265/380, GA1 157/164, `ga1-13` 1/8 Entwürfe. Als Nächstes `ga1-13__1` (Lasten-/Pflichtenheft, Stakeholder, Risikoanalyse). Abdeckung ist kein menschlicher Freigabestatus.

Nur beabsichtigte Änderungen lokal gesichert; kein Push, keine Veröffentlichung und keine Branch-Löschung.
