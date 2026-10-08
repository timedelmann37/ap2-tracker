# Bundesurlaubsgesetz: Mindesturlaub, Übertragung und Abgeltung

Stand: 03.10.2026. Kernthema: `wiso-2__5`.
Status: **CURATED_DRAFT**, menschliche Fachfreigabe ausstehend.

## Tatsächlich umgesetzt

- Eigene Fälle Neris / Valdro; erwachsene Arbeitnehmer, feste Wochenarbeitstage.
- Voller Jahresanspruch als ausdrückliche Rechenvoraussetzung: sechs/fünf/drei
  Wochenarbeitstage ergeben 24/20/12 persönliche Urlaubstage, jeweils vier Wochen.
  Kürzere tägliche Stunden allein reduzieren die Tageszahl nicht.
- Sechsmonatige Wartezeit von möglichen Teilurlaubsansprüchen getrennt;
  keine pauschale Zwölftelung aller Ein-/Austrittsfälle.
- Kalenderjahr, Übertragungsgrund und gesetzlicher Grundzeitraum getrennt
  von Aufforderung, rechtzeitigem Hinweis und realer Nutzungsmöglichkeit.
  Ein Portal-Datum allein belegt keinen Verfall.
- Urlaubsentgelt und Abgeltung getrennt; separater Endfall mit unstreitig
  bestehendem, wegen Vertragsende nicht mehr gewährbarem Resturlaub.
- Diagnose, drei Pflichtchecks mit Antwortfeedback, Zahlenübung,
  Freitext-Selbstvergleich und drei tastaturbedienbare Lernkarten.
- Zwei native technische SVGs und semantische MathML-Rechnung mit Einheitenabstand.

## Quellen und Grenzen

- [BUrlG](https://www.gesetze-im-internet.de/burlg/): §§ 1, 3, 4, 5 und 7
  direkt gelesen am 03.10.2026.
- [BAG 9 AZR 541/15](https://www.bundesarbeitsgericht.de/entscheidung/9-azr-541-15/):
  insbesondere Rn. 15, 21 und 26–27; Entscheidung als Rechtsprechungsquelle,
  nicht als neu erlassenes Urteil ausgegeben.
- [BMAS Brückenteilzeit-FAQ](https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Teilzeit-flexible-Arbeitszeit/Teilzeit/Fragen-und-Antworten-Brueckenteilzeit/faq-brueckenteilzeit.html):
  Abschnitt zum Urlaubsanspruch direkt gelesen, nur Umrechnung verwendet.
- Privater EUROPA-Rohtext im Hauptrepository, Zeile 9257: BUrlG als
  Themenanker gelesen. Keine Buchfrage, Lösung oder Grafik übernommen.
  Ausbildung-in-der-IT-Review für Quellenrolle und eigene Falldidaktik gelesen.
- Keine abschließende Prüfung langer Krankheit, Verjährung, Mehrurlaub,
  wechselnder Arbeitsrhythmen oder individueller Forderungshöhen.
- Freitext ist ein Selbstvergleich, keine automatische juristische Bewertung.

## Gestaltung und tatsächliche QA

Refero-Direct-Build mit bestehendem Deep-Space-Referenz-Lock und bestehender
Arbeitszeitseite als angesehener Vergleichsbasis. Keine neuen Design-Tokens,
keine dekorativen Rasterbilder und kein ASCII-Ersatz.

- `npm test` erfolgreich: Build, Site, Learning-Compiler, Batch, Learning,
  Progress-Merge und Leaderboard-SQL. Build: 908 Dateien.
- Lokale Buchqueue-/Buchdatenchecks ohne importierte Wissensbasis im Worktree
  ausdrücklich **SKIP**; Themenanker separat im Hauptrepository gelesen.
- Gezielter Browser-Test mit `AP2_BROWSER_ONLY=urlaub` erfolgreich:
  Diagnose ohne Freischaltung, falsche/richtige Antworten, Feedback, Pflichtziele,
  Zurücksetzen, Zahlenübung 24 falsch / 12,0 richtig, Freitext-Mindestlänge,
  Musterantwort, Tastatur-Karten, Persistenz, Erledigt und Rücknahme.
- 390/1440 px jeweils Dark/Light: Seitenüberlauf, Kartenflächen,
  Diagrammtextgrenzen, horizontales Tastatur-Scrolling und MathML-Beschriftung.
  Keine vollständige Browser-Suite behauptet.
- Sichtgeprüfte Screenshots in `%TEMP%/ap2-urlaub-20261003/`:
  `1440-dark-figure-0.png`, `1440-light-figure-1.png`,
  `390-light-formula-0.png`, `390-dark-card-reverse.png`.
  Keine abgeschnittenen Diagramm-/Kartenbeschriftungen festgestellt.
- Coverage: **292/380**, WiSo **21/109**, W2 **6/14**.
- Nur beabsichtigte Änderungen lokal sichern; kein Push und keine Veröffentlichung.
- Als Nächstes: `wiso-2__6`; genaue Auswahl erneut anhand Coverage prüfen.
