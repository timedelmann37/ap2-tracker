# Redaktions- und Prüfnotiz: Ablaufnotation und UML-Beziehungen

Stand: 17.09.2026. Kernthemen `ga1-9__0` und `ga1-9__5` als
`CURATED_DRAFT`. Damit Automatisierungsgruppe 16/16, Gesamt 130/380,
GA1 22/164. Keine menschliche Freigabe oder Veröffentlichung vorweggenommen.

## Quellen und Grenzen

- Private Batches 000–000 und 005–005 begrenzt ausgewertet.
- IT-Basiswissen, Chunk 00221, Zeilen 5375–5491: Aufgabenstellung zu
  Struktogramm/PAP als Buchkontext. Keine Abschreibungswerte, alten Normausgaben
  oder Buchzeichnungen übernommen. Unpassende Java-Treffer ausgeschlossen.
- Structorizer IF-/WHILE-Einleitungen: Alternative, gemeinsame Fortsetzung,
  vorangestellte Bedingung. Microsoft Visio: Symbolrollen. Kein Anspruch auf
  vollständige DIN-Konformitätsprüfung. Eigener Schwellwertfall und Countdown.
- UML-Buchtexttreffer fachfremd; vorgeschlagene Notationsübersicht nicht kopiert.
- OMG UML 2.5.1 Original-PDF lokal heruntergeladen, weil der Webabruf an der
  Dateigröße scheiterte. PDF-Seite 154 / Druckseite 112 zu Shared-/Composite-
  Semantik gelesen und mit Poppler gerendert visuell geprüft. Notation 11.5.4,
  PDF-Seiten 243–245 / Druckseiten 201–203 gelesen; Seite 244 visuell geprüft.
- Shared-Semantik modellabhängig. Komposition: höchstens ein Ganzes gleichzeitig,
  Mitlöschung der enthaltenen Teile; zulässiges vorheriges Herauslösen kann
  Teile erhalten. Auftragsbeispiel setzt ausdrücklich engere Regeln.
- Original-PDF und Prüfrenderings bleiben unter ignoriertem
  `knowledge-base/local/research/`; keine Spezifikation wird mitveröffentlicht.

## Didaktik und Grafik

Fünf eigene, direkt gepflegte SVG-Quelldateien: Struktogramm-Alternative,
entsprechender PAP, kopfgesteuerte Schleife, Aggregation und Komposition.
Verwendung über den bestehenden Figure-src-Vertrag, kein Compiler- oder
globaler CSS-Umbau. Fachsymbole statt generischer Ablaufkarten. Mobile Texte
bleiben lesbar, alle Grafikinhalte sind zusätzlich im Lerntext beschrieben.

Diagnose, Fehlerkorrektur, Zahleneingabe, Sortieraufgabe, freie Erklärung,
Papier-Zeichenauftrag, drei Karten und zwei Pflichtnachweise je Einheit.
Papierzeichnungen werden nicht automatisch bewertet oder erkannt; die
verdeckte Musterbeschreibung dient dem Selbstvergleich.

Manueller Fachcheck: 29 Grad -> OK/Ende, 30 Grad -> Warnung/Ende;
Countdown 3 -> 3,2,1,Fertig; Start 0 -> nur Fertig. Im UML-Auftragsfall
entfernt das Löschen von X nur dessen drei Positionen, nicht die zwei von Y.
Raute am Ganzen, Multiplizitäten aus Sicht des gegenüberliegenden Endes.

## Prüfungen

`npm test` bestanden. `scripts/verify-notation-browser.mjs` prüft beide Seiten:
Bildladung, Fehlfeedback, Tastatur, Zahlen, Sortierung, verdeckte Muster,
Speicherung, Pflichtziel-Gates und Abschluss/Rücknahme. 390/1440px in Dark/Light;
repräsentative Grafiken und Inhalte visuell kontrolliert. In gemeinsamen
Browserrunner integriert. Vollständiger Browserlauf zuletzt im Vorgängerbatch
53f1218; in diesem Batch gezielt die neuen Seiten geprüft.

Kein Push oder produktives Deployment. Nächster Schritt: offene Kernthemen
der übrigen GA1-Themengruppen anhand der kanonischen Abdeckung auswählen.
