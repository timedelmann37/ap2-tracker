# GA1: MTBF und MTTR rechnen

Abgeschlossen 03.10.2026: ga1-11__6, CURATED_DRAFT bis menschliche Fachfreigabe. Kein Push.

## Quellenprüfung

- AWS Understanding availability: Definitionen, Gleichungen 1–2 und Rule 1 direkt gelesen. https://docs.aws.amazon.com/whitepapers/latest/availability-and-beyond-improving-resilience/understanding-availability.html
- IBM MTTR vs. MTBF: Berechnungen und Unterschiede direkt gelesen. https://www.ibm.com/think/topics/mttr-vs-mtbf
- AWS what-is/mttr zur Zeitdefinition konsultiert. Die dortige widersprüchliche Aussage, größere MTTR verbessere Verfügbarkeit, ausdrücklich ausgeschlossen; Formel und IBM bestätigen den umgekehrten Zusammenhang.
- Private Buchbasis europa-integratoren-2026:00204, Markdown-Zeilen 2026–2077 direkt gelesen: Verfügbarkeit verbessern als Themenanker. Kein direkter MTBF/MTTR-Formelbeleg; keine Originalaufgaben oder Grafiken übernommen.

## Eigener Fall und Prüfung

- Vier vollständige Zyklen desselben reparierbaren Dienstes, kein überlappender Vorfall und keine zusätzliche Unterbrechung.
- Betrieb: 240 + 180 + 300 + 276 = 996 h; MTBF = 996/4 = 249 h.
- Ausfälle: 0,5 + 1 + 1,5 + 1 = 4 h; MTTR = 4/4 = 1 h = 60 min.
- MTTR umfasst hier Ausfallbeginn bis fachlich bestätigter Wiederherstellung, nicht nur aktive Reparatur.
- A = 249/(249+1) = 996/1000 = 99,6 %.
- Zusatzmodell MTTR 30 min: 249/249,5 × 100 ≈ 99,80 %.
- Einzelfall 90 min verletzt RTO 75 min trotz Mittelwert 60 min. Keine Lebensdauergarantie und kein fester nächster Ausfalltermin.
- Diagnose, vier Zahlenübungen, Pflichtquiz, Transferantwort, fünf Lernkarten und vier Pflichtziele.
- Drei semantische MathML-Formeln, zwei technische SVG-Prüfwege. Bestehenden Refero-Deep-Space-Lock und gemeinsame Widgets fortgeführt.

## Tatsächlich ausgeführte Qualitätssicherung

- npm run build und npm test bestanden.
- AP2_BROWSER_ONLY=mtbf-mttr npm run test:browser bestanden. Keine vollständige Browser-Regressionssuite behauptet.
- Falsch/richtig, Dezimalkomma, Quizreset, Lernziel-Sperre, Persistenz nach Reload, Markieren/Rücknahme, Recall-Mindestlänge und Tastaturkarten geprüft.
- Mobile 390 px / Desktop 1440 px, Dark/Light: kein Seitenüberlauf an Formeln/Diagrammen; SVG-Beschriftung innerhalb der Zeichenfläche; mobile Diagramme tastaturbedienbar seitlich verschiebbar; keine JavaScript-Seitenfehler.
- Screenshots C:/Users/timed/AppData/Local/Temp/ap2-mtcalc-20261003: 1440-dark-figure-0, 1440-light-math-2, 390-dark-math-2 und 390-light-figure-1 tatsächlich angesehen.
- Mobile Überschrift des Rechenwegs gekürzt, Build und gezielte Browserprüfung wiederholt; 390-light-figure-1 erneut visuell geprüft. Keine gemeinsame Shell-/Stylingänderung.
