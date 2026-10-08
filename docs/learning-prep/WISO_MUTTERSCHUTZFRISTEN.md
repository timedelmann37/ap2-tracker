# Konkrete Mutterschutzfristen

Stand: 03.10.2026. Kernthema: `wiso-2__8`.
Status: **CURATED_DRAFT**, menschliche Fachfreigabe ausstehend.

## Tatsächlich umgesetzt

- Eigener Arbeitnehmerinnenfall Mirel / Talveno, lebend geborenes Kind.
- Sechswöchige vorgeburtliche Frist vom bescheinigten voraussichtlichen
  Termin aus; ausdrückliche Bereitschaft jederzeit für die Zukunft widerruflich.
- Achtwöchige Nachfrist im regulären gesetzten Fall, auch bei Homeoffice.
- Zwölfwochenbasis bei medizinischer Frühgeburt oder Mehrlingsgeburt;
  rechtzeitig ärztlich festgestellte Behinderung nur auf Antrag.
- Terminabweichung nicht als medizinische Frühgeburt diagnostiziert;
  Kaiserschnitt allein nicht als Verlängerungsgrund verwendet.
- Verkürzte vorgeburtliche Tage zusätzlich ergänzen: eigener Zehntagesfall
  ergibt 66 Kalendertage; medizinische Frühgeburtsvariante 94.
- Verspätete Geburt verlängert die vorgeburtliche Frist, kürzt die volle
  nachgeburtliche Frist nicht.
- Diagnose, drei Pflichtfragen, Zahlenübung, Transfer-Selbstvergleich,
  drei Tastaturkarten, zwei native technische SVGs und zwei MathML-Rechnungen.
- § 3 Abs. 3–5 und Totgeburt als Sonderfallgrenzen ausgewiesen,
  nicht pauschal als reguläre IT-Beschäftigungsfälle behandelt.

## Quellenrolle und Grenzen

- [MuSchG § 3](https://www.gesetze-im-internet.de/muschg_2018/__3.html),
  Absätze 1–5 direkt gelesen am 03.10.2026.
- [Familienportal: Dauer](https://familienportal.de/familienportal/familienleistungen/mutterschutz/wie-lange-besteht-der-mutterschutz-vor-und-nach-der-geburt--125046):
  Weiterarbeit, Fristen, verspätete Geburt und Kaiserschnitt direkt gelesen.
- [BIÖG: Mutterschutzfristen](https://www.familienplanung.de/service/lexikon/mutterschutzfristen/):
  medizinische Frühgeburt und zusätzlicher Fristzuschlag direkt gelesen.
- Privates EUROPA-Paket im Hauptrepository Zeile 9257 nur MuSchG-Themenanker.
  Keine konkrete Frist aus der alten Gesetzesliste abgeleitet,
  keine Buchaufgabe oder Lösung übernommen.
- Keine medizinische Diagnose, individuelle Rechtsberatung, Fristenddaten-
  oder Leistungsberechnung. Fehl-/Totgeburt, Tod des Kindes und
  schulische/hochschulische Ausbildung nicht abschließend aufgearbeitet.

## Gestaltung und tatsächlich ausgeführte QA

Refero-Direct-Build auf bestehendem Deep-Space-Referenz-Lock. Die vorherige
Familienschutzseite als sichtgeprüfte Basis; gemeinsame Tokens und Komponenten
unverändert verwendet. Kein Rasterdekor oder ASCII-Ersatz.

- Build und `npm test` auf endgültiger Fassung erfolgreich: 917 Dateien.
  Site, Learning-Compiler, Batch, Learning, Progress-Merge, Leaderboard-SQL.
- Lokale Buchqueue-/Buchdatenchecks **SKIP** mangels importierter Daten
  im Worktree; Themenanker separat im Hauptrepository gelesen.
- `AP2_BROWSER_ONLY=maternity-periods` erfolgreich: Diagnose ohne Freischaltung,
  falsche/richtige Pflichtantworten und Feedback, Reset, Zahlenübung
  56 falsch / 66,0 richtig, Transfer-Mindestlänge und Modell,
  Tastaturkarten, Persistenz, Erledigt-Markierung und Rücknahme.
- 390/1440 px jeweils Dark/Light: Seitenüberlauf, Diagrammtextgrenzen,
  horizontales Diagramm-Tastaturscrolling, Karten-Vorder-/Rückseiten
  und zugängliche MathML-Namen geprüft. Keine vollständige Browser-Suite behauptet.
- Sichtgeprüft in `%TEMP%/ap2-fristen-20261003/`:
  `1440-dark-figure-0.png`, `1440-light-figure-1.png`,
  `390-light-formula-0.png`, `390-dark-card-reverse.png`.
  Zweite Formel ergänzt, endgültige Fassung erneut gebaut und geprüft;
  `390-light-formula-1.png` zusätzlich angesehen.
- Coverage: **295/380**, WiSo **24/109**, W2 **9/14**.
- Nur lokale Sicherung, kein Push oder Veröffentlichung.
- Nächstes offenes Kernthema: `wiso-2__9`, AGG.
