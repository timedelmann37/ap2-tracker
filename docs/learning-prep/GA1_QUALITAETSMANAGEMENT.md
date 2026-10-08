# GA1: Qualitätsmanagement, PDCA und Abnahmekriterien

Stand: 03.10.2026. Kernthema `ga1-13__5`, **CURATED_DRAFT** bis menschliche Fachfreigabe.

## Abgeschlossener Abschnitt

Eigener fiktiver Liora-Restore-Pilot: QM als organisierte Anforderungserfüllung und Verbesserung, Qualitätssicherung und Ergebnisprüfung abgegrenzt. PDCA mit vorab definiertem Ziel, begrenzter Erprobung, vergleichbarer Messung und begründeter Standardisierung oder neuer Planung erklärt. Keine bloße Abschlussliste und keine Kausalitäts- oder Produktionsgarantie aus 20 Pilotläufen.

Qualitätsmerkmale als ausdrücklich didaktische Auswahl, nicht vollständige ISO/IEC-25010-Taxonomie. Funktion, Leistung, Zuverlässigkeit, Sicherheit, Benutzbarkeit und Wartbarkeit in prüfbare Bedingungen übersetzt. Eigene Umgebung R2, synthetische 10 Dateien/10 MiB, lokales Testnetz, Messgrenzen und 20 Wiederholungen beschrieben. Kriterien K1–K4 und Soll-/Ist-Protokoll verhindern, dass ein Mittelwert, eine erfüllte Verbesserungsquote oder entfernte Fehlerläufe eine nicht bestandene Einzelanforderung ersetzen.

Arithmetik separat fachlich nachgerechnet: 4/20 = 20 %, 1/20 = 5 %, Rückgang 15 Prozentpunkte beziehungsweise 75 % relativ; 19/20 = 95 %. Bei 19 Läufen zu 60 s und einem zu 140 s ist der Mittelwert 64 s, aber das Kriterium höchstens 120 s je Lauf verletzt. Grenze 120 s inklusive, 121 s außerhalb. Pilotziel höchstens ein Fehler erreicht, K1 mit 20/20 dennoch verletzt. Keine rechtlichen Vertragsfolgen behauptet.

Diagnose ohne Pflichtgate, drei Pflichtchecks mit spezifischem Antwortfeedback, freier Transfer mit Mindestlänge und Musterantwort sowie drei Karten. Zwei native technische SVGs (PDCA-Abfolge mit expliziter Wiederholung und Merkmal/Nachweis-Zuordnung), semantische MathML-Fehlerquotenformel. Kein dekoratives Rasterbild oder ASCII-Ersatz, keine automatische fachliche Benotung freier Antworten.

## Quellen und Designbindung

- [ISO QM-Überblick](https://www.iso.org/quality-management): öffentliche Abschnitte QMS sowie QA/QC direkt gelesen, keine vollständige Normlektüre oder Zertifizierungsvorgabe.
- [ASQ PDCA](https://asq.org/quality-resources/pdca-cycle): vier Phasen und wiederholte Verbesserung direkt gelesen; eigener Fall statt Quellbeispiel.
- [Microsoft Learn, Acceptance Criteria](https://learn.microsoft.com/en-us/azure/devops/boards/work-items/guidance/scrum-process-workflow?view=azure-devops): Bedingungen vor Umsetzung, gemeinsame Erwartungen und Grundlage für Prüfung; keine Bindung an Azure Boards oder Vertragsrecht.
- Private Quelle `europa-integratoren-2026:00110`, Zeilen 1212–1233, direkt im Hauptrepository gelesen, ausschließlich Themenanker. Keine Buchaufgabe, Grafik oder Lösung übernommen. Ergänzende Quellenrolle aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` beachtet.

Refero-Routine mit bestehendem Doppler-dominantem Deep-Space-Lock und Sichtvergleich der Vorgängerseite: gemeinsame Tokens, Seitenrahmen, native Diagrammtypen und Interaktionen beibehalten. Präzise SVGs statt Rastermedien; keine globale Umgestaltung.

## Tatsächliche Prüfung

- Build: Exit 0, 839 Dateien.
- `npm test`: Exit 0 für Build, Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL. Private Buchimport-Prüfung im Worktree ohne lokale Wissensbasis übersprungen; oben genannter Themenanker separat gelesen.
- `AP2_BROWSER_ONLY=quality-management node scripts/run-browser-tests.mjs`: Exit 0 mit lokaler Anmeldefixture. Diagnose, falsche/richtige Antworten, individuelles Feedback, Quiz-Reset, Abschluss/Rücknahme, Persistenz, Transfer-Mindestlänge/Muster sowie Enter-/Space-Karten geprüft.
- 390/1440 Pixel in Dark/Light: kein Seitenoverflow, Formel mit zugänglichem Namen, SVG-Texte im Canvas, Diagramme seitlich per Tastatur scrollbar, Kartenfront/-rückseite ohne Textkollision, keine Browser-Laufzeitfehler.
- Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-qm-20261003/`: Desktop-Dark-PDCA, Mobile-Light-Merkmale, Desktop-Light-Formel und Mobile-Dark-Kartenrückseite visuell kontrolliert. Keine externen Nutzerdaten verändert.

Abdeckung: 270/380 insgesamt, GA1 162/164, `ga1-13` 6/8 Entwürfe. Nächstes offenes Kernthema: `ga1-13__6`, Testarten, Testfälle/-daten und Abnahmeprotokolle. Abdeckung ist keine menschliche Freigabe. Nur lokale Sicherung, kein Push oder Veröffentlichung.
