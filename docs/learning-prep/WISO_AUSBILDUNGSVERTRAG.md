# WiSo: Ausbildungsvertrag, Probezeit und Beendigung

Stand: 03.10.2026. Kernthema `wiso-1__0`; `CURATED_DRAFT` bis menschliche Fachfreigabe.

## Abgeschlossener Inhalt

Eigenständiger fiktiver Neral-Mila-Fall mit volljähriger Übungsperson. Pflichtangaben nach BBiG § 11, elektronische Abfassung mit speicherbarer/druckbarer Übermittlung und Empfangsnachweis, Probezeit im BBiG-Grundfall, reguläres und vorzeitiges Ende sowie Kündigungswege. Textform der Abfassung und Schriftform der Kündigung ausdrücklich getrennt. Kein echtes Vertragsdokument und keine Kündigung erstellt; allgemeines Lernmaterial, keine Einzelfall-Rechtsberatung.

Eigene Fälle: externe Maßnahmen und Nachweisform offen; sechs Monate Probezeit beanstandet; drei Monate hinsichtlich Dauer innerhalb der Grenze. Vertragsende 31.08.2029, vorher bestandene Prüfung und Bekanntgabe am 12.07.2029: letzteres maßgeblich. Betriebswechsel im selben Beruf nicht mit Berufsaufgabe gleichgesetzt. Nichtbestehen verlängert nur auf Verlangen nach § 21 Abs. 3, nicht automatisch.

Diagnose ohne Pflichtgate; drei Pflichtchecks mit erklärendem Feedback; freier Transfer mit Mindestlänge/Muster und drei Enter-/Space-Karten. Zwei native technische SVGs (Vertragsprüfungen, Kündigungsalternativen), semantisch benannte MathML-Probezeitgrenze. Keine dekorativen Rasterbilder oder ASCII-Grafiken.

## Quellenprüfung und Gestaltungsbindung

- [BBiG: §§ 10, 11 und 20](https://www.gesetze-im-internet.de/bbig_2005/BJNR093110005.html): §§ 10–11 und 20; Abfassung, Pflichtangaben, Probezeit direkt gelesen 03.10.2026.
- [BBiG: § 21 Beendigung](https://www.gesetze-im-internet.de/bbig_2005/__21.html): Absätze 1–3 direkt gelesen 03.10.2026.
- [BBiG: § 22 Kündigung](https://www.gesetze-im-internet.de/bbig_2005/__22.html): Absätze 1–4 direkt gelesen 03.10.2026.
- [IHK Potsdam: Berufsausbildungsvertrag](https://www.ihk.de/potsdam/aus-und-weiterbildung/selber-ausbilden/berufsausb-vertr-online-index-2331838): Textform und elektronische Vertragsabfassung mit Empfangsnachweis direkt gelesen 03.10.2026.
- [IHK Frankfurt: Kündigung von Ausbildungsverhältnissen](https://www.frankfurt-main.ihk.de/aus-und-weiterbildung/ausbildung/ausbildungsberatung/ausbilderinfos/kuendigung-von-ausbildungsverhaeltnissen-5183814): Probezeit, nach Probezeit, gegenseitiges Einvernehmen direkt gelesen 03.10.2026.
- [IHK Hannover: Probezeit](https://www.ihk.de/hannover/hauptnavigation/ausbildung-und-weiterbildung/ausbildung/ausbildung-a-z/probezeit-5196936): Dauer, Zielsetzung, Unterbrechung; Stand 30.03.2026 direkt gelesen 03.10.2026.
- Gesamtfassung BBiG: Bekanntmachung 16.04.2025, Änderung 28.10.2025. §§ 11 und 20 wegen fehlgeschlagener Einzelabrufe in der Gesamtfassung gelesen.
- IHK Rhein-Neckar älteren Formhinweis nicht übernommen. IHK Frankfurt falsche Absatzzuordnung beim wichtigen Grund und IHK Hannover unpassende Paragraphenzuordnungen nicht übernommen; aktueller Gesetzestext hat Vorrang.
- Privater Anker `europa-integratoren-2026:00957`, 9159–9179, direkt im Hauptrepository gelesen. Eigene Fallkonstellation statt Buch-Auswahlverfahren, Namen, Grafik oder Lösung. Ergänzende Quellenrollen aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` beachtet.
- Refero-Routine, bestehender Doppler-dominanter Deep-Space-Lock und gemeinsame Lernkomponenten. Native präzise Diagramme als angemessene Medien; keine neue Gestaltung des Seitenrahmens. Quellenabweichungen im Curation-Sidecar dokumentiert.

## Tatsächliche Prüfung

- Build Exit 0, 850 Dateien.
- `npm test` zunächst und nach Diagrammkorrekturen Exit 0: Site, Lerncompiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL. Private Buchimport-Prüfung im Worktree ohne Wissensbasis übersprungen; Themenanker separat im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=training-contract node scripts/run-browser-tests.mjs` abschließend Exit 0: lokale Test-Anmeldung, Diagnose, falsche/richtige Antworten, Feedback, Reset, Pflichtgate, Abschluss/Rücknahme, Persistenz, Transfer-Mindestlänge/Muster und Tastaturkarten.
- 390/1440 Pixel, Dark/Light: kein Seitenoverflow, MathML mit zugänglichem Namen, Grafiktexte im Canvas, Vergleichstexte innerhalb der Spalten, Diagrammscrollen per Tastatur, Karten ohne Textkollision, keine Laufzeitfehler.
- Zunächst überbreite Vergleichsbeschriftung erkannt, anschließend mit tatsächlichen SVG-Textmaßen lokalisiert und gekürzt; finaler Browsercheck bestanden. Prüflogik nicht abgeschwächt.
- Vier Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-contract-20261003/` angesehen: Desktop-Dark-Kündigungswege, Mobile-Light-Vertragsprüfung, Desktop-Light-Probezeitformel und Mobile-Dark-Kartenrückseite. Mobiles horizontales Diagrammscrollen bleibt sichtbar erklärt.
- Fachcheck: zwölf gesetzliche Pflichtangaben in zehn thematisch zusammengefassten Listeneinträgen; Probezeitgrenze, Datum und Formunterschied gegengeprüft. Kein formaler WCAG- oder Rechtsberatungsnachweis behauptet.

Abdeckung: 273/380 Entwürfe, WiSo 2/109, `wiso-1` 1/14. GA1 164/164 und GA2 107/107 unverändert. Nächster Abschnitt: `wiso-1__1`, unzulässige Vereinbarungen und begrenzte Unwirksamkeit. Ausschließlich lokale Sicherung; kein Push oder Veröffentlichung.
