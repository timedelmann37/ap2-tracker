# Feuerlöscher-Bedienfolge: Abschlussprüfung

Stand: 2026-10-04. Kernthema `wiso-8__16`, Einheit `feuerloescher-bedienfolge-eigenschutz`. **CURATED_DRAFT**, keine menschliche Publikationsfreigabe.

## Abgeschlossene Arbeit

Acht Abschnitte erklären Sicherheitsbedingungen, Gerätebegrenzung und Funktionen der vier Handlungen: sicher holen, Stift ziehen, Düse auf Brandherd richten, Hebel drücken. Eigene Fälle Lea/Nils, Diagnose, begründetes Beispiel, geführte Sortierübung mit abnehmenden Hilfen, vier verpflichtende Lernziel-Checks mit Fehlfeedback/Retry, freier Abruf und vier Karten. Abbruch und Nachsorge werden ausdrücklich getrennt vom mechanischen Ablauf behandelt.

Drei eigene deklarative SVG-Diagramme zeigen Sicherheitsgrenzen, die Vierfolge und Nachsorge. Keine Rasterbilder, keine Formeln nötig, keine kopierten Buchaufgaben oder Herstellerabbildungen. Sortierung per Hoch/Runter mit Tastatur; sie ist zusätzliche Übung, nicht fünfter Pflichtnachweis.

## Quellen und Grenzen

Herstellerdatenblatt GLORIA WD 9 (Kennung 06.26) belegt Stift/Schlauch/Handhebel; Minimax PB17FL November 2021 belegt vollständige Folge mit gelber Sicherung. Vierfolge ist redaktionelle Zusammenführung, keine vollständige WD-9-Anleitung. Dieser Unterschied steht im Lerntext, Register und Quellenmatrix. Keine aktuelle AFFF-Produkt-/Löschmittelempfehlung aus älterem Minimax-Blatt.

ASR A2.2 mit Änderung 23.05.2025 ausgewählt geprüft; DGUV 205-023 November 2019 und 205-039 August 2021 sowie DGUV-Mitteilung 21.03.2022 für stabile Sicherheitsgrundsätze, Geräteabweichung und Abbruchgrenzen. BGW und Feuerwehr Niederkassel (August 2026) direkt gelesen. Keine Freigabe eines konkreten Löschversuchs oder vorhandenen Geräts.

Private EUROPA-Markdown-Zeilen 485–488 nur allgemeiner Brandschutz-Themenanker. Keine spezifische Gerätestelle/PDF-Seite erfunden.

Research-Skill führte zur Hintergrundrecherche und Quellenmatrix; Hauptagent prüfte benutzte Primärstellen selbst. Refero-Skill: Direct-Build gegen tatsächlich gesichtete Kennzeichen-Lernseite und Deep-Space-Reference-Lock; vorhandene Tokens, Leseflächen, Checks, Karten und Sortierkomponente unverändert wiederverwendet.

## Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber. AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor Bearbeitung gelesen.

- `npm run build`: erfolgreich, 1185 Dateien.
- `npm test`: erfolgreich; zwei bekannte SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=feuerloescher node scripts/run-browser-tests.mjs`: erfolgreich, lokale Auth-Fixture, kein Produktions-Sync und nicht gesamte Browser-Suite.
- 390/1440 px, Dark/Light, Reduced Motion: Diagnose falsch/richtig; vier Pflichtchecks falsch/richtig, Feedback/Retry; Gate; Kurzabruf gesperrt, Muster nach längerem Abruf; vier Karten Enter/Leertaste; Reload-Persistenz; Abschluss/Rücknahme und Reset sperrt Gate.
- Sortierung falsch prüfen, spezifisches Feedback, per Tastatur richtig ordnen, richtige Rückmeldung, Reihenfolge nach Reload erhalten, Reset auf Ausgangsfolge und Rückmeldung versteckt.
- H1/Seitenüberlauf, Kartenbegrenzung, SVG-Canvas/Boxgrenzen geprüft; mobile Diagramme horizontal per Tastatur scrollbar. Kein JavaScript-Seitenfehler.
- Erstlauf fand zu langes SVG-Label „Fachpersonal“; auf „Prüfung“ gekürzt, Fachpersonalzuständigkeit bleibt im Text. Erneuter Lauf erfolgreich.
- 40 Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-feuerloescher-20261004`. Direkt gesichtet: `390-dark-start.png`, `390-light-sequence.png`, `390-dark-case.png`, `390-light-recall.png`, `390-dark-figure-1.png`, `1440-dark-figure-1.png`, `1440-light-figure-2.png`, `1440-light-card.png`.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-feuerloescher-build-20261004.log` und `ap2-feuerloescher-test-20261004.log`.
- Keine gemeinsamen Styles, Navigation oder Fortschrittslogik geändert. Keine praktischen Feuer-/Geräteversuche durchgeführt.

## Stand

Coverage **373/380**, WiSo **102/109**. Sieben Kernthemen verbleiben, alle WiSo 9. Nächstes Kernthema `wiso-9__1`: bei gebundenen Aufgaben eindeutig falsche Optionen zuerst ausschließen. Ausschließlich beabsichtigte lokale Änderungen committen; kein Push, keine Veröffentlichung, keine Branch-Löschung.
