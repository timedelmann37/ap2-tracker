# Eigenkapitalrentabilität berechnen und einordnen

Stand: 04.10.2026. Kernthema `wiso-6__4`, KW 40. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Abgeschlossener Abschnitt

Eigene Solvio-/Brenno-Fälle: Reingewinn und durchschnittliches Eigenkapital derselben Jahresperiode auswählen, Dezimalquotient in Prozent ausdrücken, Prozentpunkte und absolute Gewinne trennen, Verlust sowie null/negatives Eigenkapital einordnen. Diagnose, vier Pflichtchecks mit Fehlerfeedback, Praxisfall, eigener Recall und vier Tastatur-Karten. Zwei technische native SVGs, drei semantische MathML-Formeln, keine Rasterdeko oder ASCII.

Solvio: 9.000 Euro Reingewinn nach allen Steuern / 75.000 Euro im ganzen Jahr konstantes Eigenkapital = 12 Prozent. Brenno: 7.200 / 40.000 = 18 Prozent bei geringerem Euro-Gewinn. Abstand sechs Prozentpunkte, relativ zu zwölf Prozent fünfzig Prozent. Separates alternatives Verlustmodell: −1.500 / 75.000 = −2 Prozent. Keine Liquiditäts-, Rendite- oder Investitionsgarantie.

## Tatsächlich geprüfte Quellen

- [HGB § 275](https://www.gesetze-im-internet.de/hgb/__275.html), primär: Abs. 2 Nr. 14–17 und Abs. 3 Nr. 13–16, Steuern und Jahresüberschuss/Jahresfehlbetrag direkt gelesen. Gliederungsanker, keine pauschale Bilanzierungsanleitung.
- [bpb Rentabilität](https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/20483/rentabilitaet/), sekundäres Duden-Lexikon 2016: Gewinn-/Kapitalbezug, Prozent und durchschnittlicher Bestand direkt gelesen. Keine aktuelle Marktstatistik.
- Private Hauptcheckout-Quelle `knowledge-base/local/it-basiswissen-2012/raw/IT-Basiswissen.md`, Zeile 4882 Tabellenzeile Rentabilität direkt gelesen. Ausschließlich Themenanker; keine Originalfälle übernommen, kein privater Direktbeleg für die Eigenkapitalformel oder Sommer-2026-Prüfungsaufgabe behauptet.
- HGB § 266 nicht abrufbar; kein geprüfter Beleg daraus verwendet.

## Gestaltung und tatsächliche Prüfung

Refero-Skill und Visual-Workflow angewandt: Deep-Space-Referenz-Lock gelesen, vorherige Kennzahlen-Seite visuell geprüft. Rahmen, Tokens und Interaktionskomponenten unverändert wiederverwendet.

- `npm run test:browser` mit `AP2_BROWSER_ONLY=rentabilitaet` bestanden, Build 1037 Dateien. Nach Sichtprüfung die erste mobile Formel gekürzt und Browserprüfung erfolgreich wiederholt.
- `npm test` bestanden; zwei SKIPs für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten im Worktree. Private Quelle separat im Hauptcheckout gelesen.
- 390/1440 px, Dark/Light, Reduced Motion: Diagnose ohne Abschluss-Gate; falsche/richtige Pflichtantworten, Feedback, Reset, Recall-Längensperre/Muster, Enter/Space-Karten, Persistenz, Abschluss und Rücknahme geprüft.
- Drei MathML-Formeln samt Namen/Ergebnissen, keine Seitenüberläufe oder Pageerrors; SVG-Text im Canvas und eigenen Feldern, mobiles Diagrammscrollen per Tastatur geprüft.
- Tatsächlich angesehene Captures unter `C:/Users/timed/AppData/Local/Temp/ap2-rentabilitaet-20261004`: `390-dark-formula-0.png` (vor/nach Kürzung), `1440-light-formula-1.png`, `390-light-formula-2.png`, `1440-light-figure-0.png`, `1440-dark-figure-1.png`, `390-light-card-reverse.png`. Native mobile Diagramme horizontal verschiebbar; gekürzte Rechenformel vollständig sichtbar.
- Neue Prüfung im vollständigen Browserrunner registriert; kein vollständiger Lauf sämtlicher Browsermodule behauptet.
- `git diff --check` bestanden.

## Stand

Vorher sauberer Branch `codex/ga1-linux-admin`, 334/380 abgedeckt; danach 335/380, WiSo 64/109, 45 offen. GA1/GA2 vollständig. Nächstes Thema `wiso-6__5`: Rechtsformen, sinnvoll begrenzt bearbeiten.

Zeit-/Limitprüfung vor Abschnitt 06:23:54 UTC, nach Prüfungen 06:35:50 UTC; Wochenlimit jeweils 69 Prozent verbraucht, normale Nutzung erlaubt. Keine fremden Änderungen vorgefunden oder überschrieben. Nur beabsichtigte lokale Änderungen sichern; kein Push, keine Veröffentlichung.
