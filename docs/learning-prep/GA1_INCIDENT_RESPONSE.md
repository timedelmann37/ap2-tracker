# GA1 – Incident Response: Vorfall und Wiederanlauf

## Abgeschlossene Einheit
Kernthema ga1-8__12; `incident-response-vorfall-wiederanlauf`; CURATED_DRAFT bis zur menschlichen Freigabe. Eigener Haintechnik-Fall mit Diagnose, vier Pflichtziel-Checks, Antwortfeedback, Transferabruf, sieben Karten und zwei technischen SVG-Abläufen. Keine dekorativen Rasterbilder, kein ASCII-Ersatz; keine Rechenformel erforderlich.

## Quellen und Abgrenzung
- NIST SP 800-61r3 (April 2025): Einordnung in CSF 2.0; DE.AE-08; RS.AN-06/07; RS.MI-01/02; RC.RP-03/05/06; ID.IM-03. Genannte Passagen direkt gelesen am 03.10.2026.
- Microsoft Learn, Incident Response ransomware approach: Initial triage questions zu Erstkenntnis, Konten und fehlenden Updates direkt gelesen.
- Private Buchquelle europa-integratoren-2026:00038, Zeilen 443–468, vollständig gelesen: Berufsprofil mit Systemverhalten, Sicherheitsmaßnahmen und Wiederherstellung als Themenanker. Keine übernommenen Fragen oder Buchgrafiken; kein alleiniger technischer Beleg.
- docs/AUSBILDUNG_IT_SOURCE_REVIEW.md: Quellenrolle und Restore-Nachweisidee berücksichtigt; keine Aufgabenübernahme.
- CISA-Guide ließ sich beim direkten Abruf nicht lesen und wurde nicht als geprüfte Quelle verwendet.
- Quellenlinks und konkrete Stellen stehen in content/sources.json und der Curation der Einheit.

Das Fünf-Schritte-Muster ist didaktisch, nicht das aktuelle NIST-Lebenszyklusmodell. Vorbereitung, fortlaufende Verbesserung, mögliche Überlappung und erneute Bewertung werden ausdrücklich erklärt. Eindämmung ist kein Bereinigungsnachweis. Keine universellen Abschalt-, Lösch- oder Forensikbefehle. Eingriffe benötigen Zuständigkeit; Schadensbegrenzung und Spuren werden koordiniert. Der Fall, seine Befunde und Freigabekriterien sind eigenständig erfunden.

## Designentscheidung und Evidenz
Repository-Vorgaben und Refero-Design-Routine gelesen. Bestehende Lernseite als Ziel: Doppler-Lesepanels dominieren, Astro bleibt Hintergrund, n8n liefert zurückhaltende Verbindungslinien. Vor Umsetzung tatsächlichen Desktop-Dark-Screenshot der vorherigen DSGVO-Einheit angesehen. Wiederverwendung der gemeinsamen Figure-, Quiz-, Recall- und Kartenkomponenten; keine neue Palette oder Layoutvariante.

## Ausgeführte Prüfung
- npm run build: bestanden.
- npm test: bestanden.
- AP2_BROWSER_ONLY=incident-response npm run test:browser: bestanden.
- Diagnose ohne Abschluss-Gate; falsche und richtige Antworten, Feedback, Reset, alle vier Pflichtziel-Checks und Freigabe.
- Recall-Sperre bis zur eigenen Eingabe und Modellfreigabe; sieben Karten per Enter/Space; Persistenz nach Reload; Abschluss und erneute Sperre nach Reset.
- 390/1440 px und Dark/Light, Reduced Motion; kein Seitenüberlauf, SVG-Texte innerhalb der Zeichenfläche, mobile Diagramme per Tastatur scrollbar.
- Tatsächlich angesehen: Desktop Dark Reaktionsweg, Mobile Light Freigabe, Desktop Light und Mobile Dark Seitenbeginn. Mobile Diagramme sind ausdrücklich als seitlich verschiebbar beschriftet; Ausschnitt statt unlesbarer Verkleinerung.
- Lokale Screenshots: C:/Users/timed/AppData/Local/Temp/ap2-ir-20261003/.
- Kein vollständiger Browser-Gesamtlauf behauptet; betroffenes Kernthema gezielt geprüft.
- Coverage nach Build: 223/380; GA1 115/164, 49 offen. Abdeckung bedeutet keine menschliche Inhaltsfreigabe.
