# GA1: USV-Dimensionierung und Überbrückung

Abgeschlossen 03.10.2026: ga1-11__7 bleibt CURATED_DRAFT bis menschliche Fachfreigabe. Keine Veröffentlichung.

## Evidenz und eigener Fall

- Eaton UPS sizing guide, Capacity/Runtime/sizing steps direkt gelesen: https://www.eaton.com/us/en-us/products/backup-power-ups-surge-it-power-distribution/backup-power-ups/ups-sizing-guide.html
- Private Buchbasis europa-integratoren-2026:00218, Zeilen 2187–2202 direkt gelesen: USV/Shutdown als Themenanker, keine Originalaufgaben oder Umschaltzeitangaben übernommen.
- Eigene Lasten 400/160/80 W mit PF 0,8/0,8/1,0: 640 W und konservativ 780 VA. Eigene Zuschlagvorgabe 25 % ergibt 800 W/975 VA; kein universeller Reservewert.
- Kandidat A 1000 VA/700 W scheitert an Watt; B 1200 VA/1000 W erfüllt statische Leistung, nicht automatisch Laufzeit.
- Eigene nutzbare DC-Energie 160 Wh und einmaliger DC-AC-Wirkungsgrad 0,8 bei konstant 640 W: 12 min. Kein Nennspannung-mal-Ah-Laufzeitnachweis. Zusatzbedarf für 15 min: 200 Wh.
- Shutdown 2 + 8 + 3 = 13 min. Fiktive Laufzeit 14 min bei 640 W, 10 min bei 800 W: Ausbau nicht freigeben.
- Drei MathML-Formeln, zwei technische SVG-Prüfwege, Diagnose, vier Zahlenübungen, Pflichtquiz, Recall, fünf Karten und vier Pflichtziele.
- Refero-Deep-Space-Lock sowie gemeinsame Widgets unverändert fortgeführt; keine dekorativen Rasterbilder.

## Tatsächlich ausgeführte Prüfung

- npm run build und npm test bestanden.
- AP2_BROWSER_ONLY=ups-calculation npm run test:browser bestanden; keine vollständige Browser-Regressionssuite behauptet.
- Falsch/richtig einschließlich Dezimalkomma, Quizreset, Pflichtziel-Sperre, Persistenz nach Reload, Markieren/Rücknahme, Recall-Mindestlänge und Tastaturkarten geprüft.
- 390/1440 px Dark/Light: Formeln ohne Seitenüberlauf, SVG-Beschriftungen innerhalb Zeichenfläche, mobile Diagramme per Tastatur seitlich verschiebbar, keine JavaScript-Seitenfehler.
- Screenshots C:/Users/timed/AppData/Local/Temp/ap2-upscalc-20261003: 1440-dark-figure-0, 1440-light-math-2, 390-dark-math-2 und 390-light-figure-1 tatsächlich visuell geprüft. Bestehende Lesbarkeit und native Formelsetzung bestätigt.
