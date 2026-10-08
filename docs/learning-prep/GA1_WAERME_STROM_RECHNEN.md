# GA1: Wärmelast und Stromverbrauch

Abgeschlossen am 03.10.2026: ga1-11__8, Status CURATED_DRAFT.

## Inhalt und Quellen

Eigener Fall Nord: 800 W USV-Eingang, 720 W IT-Ausgang, 100 W Licht; stationär ohne Batterieaufnahme/-abgabe und ohne relevanten Energieexport. Messgrenze schließt Kühlstrom aus. 900 W × 8760 h / 1000 = 7884 kWh; eigener Preis 0,30 Euro/kWh ergibt 2365,20 Euro variable Kosten. 720 + 80 + 100 = 900 W Wärme, entsprechend 3070,93 BTU/h. Keine doppelte Addition der USV-Eingangsleistung. Kühlleistung ist nicht elektrische Aufnahme; keine Fachauslegung oder Tarifempfehlung.

Primärdokumentation direkt gelesen: EIA Measuring electricity (W/kWh), Intel Artikel 000006784 (Wärme und Umrechnungsfaktor), Energy.gov.au Energy Ratings (Running costs). Ursprüngliche DOE-Webseite war nicht abrufbar und wurde nicht als Beleg verwendet. Privater Chunk europa-integratoren-2026:00451, Zeilen 4494–4500 nur als allgemeiner Nachhaltigkeits-/Stromkosten-Themenanker; keine Formel oder Aufgabe daraus übernommen.

## Tatsächlich ausgeführte Prüfungen

- npm run build: erfolgreich, 776 Dateien.
- npm test: erfolgreich.
- AP2_BROWSER_ONLY=heat-calculation npm run test:browser: erfolgreich; keine vollständige Browserregression behauptet.
- Falsche/richtige Quiz- und Zahleneingaben einschließlich Dezimalkomma, vier Pflichtziele, Diagnose ohne Gate, Recall-Sperre/Freigabe, fünf Tastatur-Karten, Persistenz, Abschluss und Zurücksetzen geprüft.
- Drei semantisch beschriftete MathML-Formeln; SVG-Text innerhalb der Zeichenfläche; kein Seitenüberlauf; mobile horizontale Diagrammnavigation per Tastatur geprüft.
- 390 und 1440 Pixel, Dark/Light, Reduced Motion; keine pageerror-Ereignisse.
- Screenshots unter C:/Users/timed/AppData/Local/Temp/ap2-heatcalc-20261003: 1440-dark-figure-0, 1440-light-math-2, 390-dark-math-2 und 390-light-figure-1 visuell betrachtet. Vergleich mit bestehender USV-Einheit: gemeinsame Gestaltung und mobile Diagrammführung erhalten.

GA1 danach 136/164, gesamt 244/380. Keine Veröffentlichung, kein Push.
