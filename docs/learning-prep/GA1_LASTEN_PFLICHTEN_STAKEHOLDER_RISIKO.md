# GA1: Lastenheft, Pflichtenheft, Stakeholder und Risiken

Stand: 03.10.2026. Kernthema `ga1-13__1`, **CURATED_DRAFT** bis menschliche Fachfreigabe.

## Abgeschlossene Inhalte

Eigener fiktiver Orion-Inventarpilot mit acht Geräten: Lasten-/Pflichtenheft nach Bedarf und Realisierung unterscheiden, technische Randbedingungen nicht schematisch ausschließen, Anforderung L-01 über Umsetzung P-01 zum Prüffall A-01 verfolgen. Der Test prüft Daten, Zeitbedingungen und erlaubten/verweigerten Zugriff. Installation ersetzt keinen Nachweis und keine Abnahmeentscheidung.

Eigene Stakeholderübersicht mit Auftraggeberin, Support, betroffener Anwenderin und Betriebsadministrator. Betroffenheit wird unabhängig von Budgetmacht berücksichtigt; Beteiligung überträgt keine Entscheidungsbefugnis. Eigenes Risiko R-01 trennt Ursache, unsicheres Ereignis, Wirkung, qualitative Bewertung, Vorsorge, Auslöser, Reaktion und Nachprüfung. Eingetretener Fehler wird als Problem behandelt. Keine Prozentwerte aus ordinalen Stufen abgeleitet, keine universelle Risikonorm behauptet.

Diagnose ohne Pflichtgate, drei Lernziel-Checks mit begründetem Feedback, freier Vega-Transfer und drei Karten umgesetzt. Zwei präzise technische SVG-Abläufe: Nachweispfad und Risikobearbeitung. Keine dekorativen Rasterbilder, ASCII-Ersatz oder künstliche Formel. Freitext wird nicht automatisch fachlich benotet.

## Quellen und Gestaltung

- [IHK Schleswig-Holstein: Lastenheft](https://www.ihk.de/schleswig-holstein/bildung/formulare-ausbildung/betrieblicher-auftrag-industrielle-elektroberufe-6301898), Abschnitt Lastenheft direkt gelesen.
- [IHK: Muster Technische Produktdesigner](https://www.ihk.de/blueprint/servlet/resource/blob/6687156/7177744b91c6b97bcaf55e536f15f6ed/muster-2-betrieblicher-auftrag-tech-produktdesigner-data.pdf), PDF-Seite 34, Hinweise zum Pflichtenheft direkt gelesen.
- [PMI: Stakeholder management](https://www.pmi.org/learning/library/stakeholder-management-keeping-stakeholders-happy-6697), Identification/Analysis direkt gelesen.
- [Lavanya/Malarvizhi, PMI: Risk analysis and management](https://www.pmi.org/learning/library/risk-analysis-project-management-7070), Conference Paper 2008, Analysis/Response/Triggers/Ownership/Monitoring direkt gelesen. Methodenanker, keine aktuelle Norm; Quellenskalen und Fälle nicht übernommen.
- Private Buchquelle `europa-integratoren-2026:00094`, Zeilen 1067–1088 im Hauptrepository direkt gelesen; nur geprüfter Themenanker. Quellenrollen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` berücksichtigt.

Die IHK-Quellen stammen aus anderen Berufen und begründen ausdrücklich keine formalen FISI-Prüfungsvorschriften. BSI-PDF-Abrufe scheiterten; diese Quelle wird nicht als geprüft geführt. Alle Fälle, Sollwerte und Diagramme eigenständig erstellt.

Refero-Routine: bestehender Deep-Space-Referenz-Lock und gerenderte Vorgängereinheit als Gestaltungsziel gelesen/geprüft. Bestehende gemeinsame Tokens und Quiz-/Recall-/Kartenbausteine unverändert genutzt; keine globale Designänderung.

## Tatsächliche Prüfung

- `npm run build`: Exit 0, 827 Dateien.
- `npm test`: Exit 0; Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL. Lokaler Buchimporttest im Worktree mangels importierter Wissensbasis übersprungen; Themenanker separat im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=requirements-risk node scripts/run-browser-tests.mjs`: Exit 0. Chromium mit lokaler Anmeldefixture; keine externen Nutzerdaten geändert.
- Falsche/richtige Antworten, erklärendes Feedback, Reset, Diagnose ohne Pflichtgate, Lernziel-Freischaltung, Abschluss und Rücknahme, Reload-Persistenz, Abruf-Mindestlänge/Muster sowie Enter-/Space-Karten geprüft.
- 390/1440 Pixel jeweils Dark/Light: kein Seitenoverflow, Diagrammtext innerhalb Canvas, mobile Tastaturverschiebung, Vorder-/Rückseitentext innerhalb Karten geprüft. Keine Laufzeitfehler.
- Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-heft-20261003/`: Nachweispfad Desktop Dark, Risikoweg Desktop Light, Kartenrückseite Mobile Dark, Dokumentvergleich und Transfer Mobile Light tatsächlich visuell kontrolliert. Keine materielle Abweichung vom bestehenden Seitenrahmen festgestellt.

Abdeckung: insgesamt 266/380, GA1 158/164, `ga1-13` 2/8 Entwürfe. Als Nächstes `ga1-13__2`: Netzplan/CPM, Zeitpunkte, kritischer Pfad und Puffer. Abdeckung bedeutet keine menschliche Freigabe.

Nur beabsichtigte Änderungen lokal gesichert. Kein Push, keine Veröffentlichung und keine Branch-Löschung.
