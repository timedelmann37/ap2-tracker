# GA1: Dreisatz und Prozentrechnung

Abgeschlossen am 03.10.2026: ga1-11__13, Einheit `dreisatz-prozent-bezugsgroessen-rechnen`, Status CURATED_DRAFT. Menschliche Freigabe bleibt ausstehend.

## Inhalt und Quellen

Eigener Fall: 240 GB in 6 Minuten, konstante Rate 40 GB/min, 900 GB in 22,5 Minuten; 20 Prozent Planungsreserve ergibt 27 Minuten. Alternative Rate 60 GB/min ergibt 15 Minuten. Die Modellgrenzen und Dezimalminuten werden ausdrücklich erklärt.

Grundwert, Anteil, Zuschlag und Rückrechnung; relative Änderung und Prozentpunkte; wechselnde Bezugsgrößen bei verketteten Änderungen. 800 mal 1,25 mal 0,75 ergibt 750, nicht 800. Ausgangswert null erlaubt keine relative Änderungsrate.

Private Buchquelle europa-integratoren-2026:00087 (Zeilen 1003–1020) nur als Themenanker zur Prozentrechnung gelesen. Keine Buchaufgabe, Tabelle oder Zahlen übernommen. Primärquelle: https://service.destatis.de/eLearning/modul12/lm_pg_1513.html, Formel der Veränderungsrate und Ausgangswert direkt geprüft.

Diagnose, vier numerische Pflichtprüfungen, ein Nachweis-Quiz, Transfer mit eigener Antwort vor Musterlösung und fünf Tastatur-Lernkarten. Drei semantische MathML-Formeln und zwei technische SVG-Ablaufdiagramme. Bestehende Refero-gebundene Gestaltung und gemeinsame Widgets unverändert wiederverwendet.

## Tatsächlich ausgeführte Prüfungen

- npm run build: erfolgreich, 791 Dateien.
- npm test: erfolgreich, einschließlich Quellen-, Inhalts- und Datenbankprüfungen.
- AP2_BROWSER_ONLY=proportion-percent npm run test:browser: erfolgreich.
- Falsche/richtige Zahlen, Dezimalkomma, Feedback, Abschluss-Sperren, Quiz-Reset, Persistenz, Abschluss umschalten, Transfer und Karten per Enter/Leertaste geprüft.
- 390 und 1440 Pixel, Dark und Light: keine Seitenüberläufe, SVG-Beschriftungen innerhalb des Canvas, mobile Diagramme per Tastatur horizontal verschiebbar. Keine Browser-Laufzeitfehler.
- Screenshots unter C:/Users/timed/AppData/Local/Temp/ap2-pctcalc-20261003 gespeichert; Formeln und beide Diagramme in mobilen/Desktop-Ansichten tatsächlich visuell geprüft. Mobile Diagramme nutzen den vorhandenen beschrifteten Scrollcontainer.
- Unabhängige Rechenassertionen für Dauer, Reserve und Prozentverkettung bestanden.

Keine Veröffentlichung oder Push. Abdeckung nach Build: 249/380 insgesamt, GA1 141/164.
