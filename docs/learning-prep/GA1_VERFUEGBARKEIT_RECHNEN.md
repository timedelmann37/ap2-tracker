# GA1: Verfügbarkeit und Ausfallzeit

Abgeschlossen am 03.10.2026: ga1-11__5 als CURATED_DRAFT. Keine menschliche Freigabe, kein Push.

## Quellen und Grenzen

- AWS Reliability Pillar, Availability: Definition, harte Abhängigkeiten und unabhängige redundante Komponenten direkt gelesen. https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html
- Private Buchbasis europa-integratoren-2026:00204, Markdown-Zeilen 2026–2077: redundante Systeme als geprüfter Themenanker. Keine Originalaufgabe, Originalgrafik oder Buchformel übernommen.
- Eigene Fälle: 30 Tage, 365 Tage, vollständige Funktion, Wartung zählt. Statistische Unabhängigkeit ist explizit; idealisierte Parallelzweige tragen einzeln volle Last. SLA und reale Messung sind keine Folgerung aus dem Modell.

## Inhalt und Rechenprüfung

- 30 × 24 × 60 × 0,001 = 43,2 Minuten bei 99,9 %.
- 365 × 24 × 60 × 0,0005 = 262,8 Minuten bei 99,95 %.
- Umkehrung bei 60 Minuten: (1 − 60/43200) × 100 ≈ 99,8611 %.
- Notwendige unabhängige Reihe: 0,99 × 0,98 = 0,9702.
- Unabhängige ersetzbare Zweige: 1 − 0,01² = 0,9999.
- Vier Pflichtziele, Diagnose, vier Zahlenübungen einschließlich Zusatzfall Jahr, Modellquiz, eigene Transferantwort und fünf Lernkarten.
- Drei native MathML-Formeln; zwei technische SVG-Prüfwege. Bestehenden Refero-Deep-Space-Lock und Widgets wiederverwendet; keine dekorativen Bilder.

## Ausgeführte Prüfung

- npm run build: bestanden.
- npm test: bestanden.
- AP2_BROWSER_ONLY=availability-calculation npm run test:browser: bestanden. Keine vollständige Browser-Regressionssuite behauptet.
- Falsch/richtig, Dezimalkomma, Quizreset, Pflichtziel-Sperre, Speicherung nach Reload, Markieren/Rücknahme, Recall-Mindestlänge und Tastaturkarten geprüft.
- 390/1440 px, Dark/Light: Formeln ohne Seitenüberlauf; SVG-Texte innerhalb der Zeichenfläche; mobile Diagramme per Tastatur horizontal verschiebbar; keine JavaScript-Seitenfehler.
- Screenshots unter C:/Users/timed/AppData/Local/Temp/ap2-availcalc-20261003. Tatsächlich visuell geprüft: 1440-dark-figure-0, 1440-light-math-2, 390-dark-math-2, 390-light-figure-1. Mobile Diagramme bleiben bewusst seitlich verschiebbar.
