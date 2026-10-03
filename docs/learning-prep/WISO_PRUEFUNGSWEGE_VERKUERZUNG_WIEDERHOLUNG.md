# Abschlussprüfung: Verkürzung, Zulassung und Wiederholung

Abgeschlossen am 03.10.2026 für `wiso-1__9`. Status **CURATED_DRAFT** bis zur menschlichen Fachfreigabe. Kein Push und keine Veröffentlichung.

## Inhalt

Eigene Orivo/Nela/Taro/Beren-Fälle unterscheiden Verkürzung der Ausbildungsdauer, vorzeitige Prüfungszulassung und Wiederholung nach Nichtbestehen. Gestreckte FISI-Prüfung mit getrennter Zulassung und Gewichtung; AP1 nicht eigenständig wiederholbar. Diagnose, drei Pflicht-Lernzielchecks mit Feedback, Transferaufgabe mit Musterlösung und drei Tastatur-Lernkarten. Zwei native SVG-Diagramme vergleichen die Wege und strukturieren die Klärung nach Nichtbestehen.

Die Verkürzung nach § 8 BBiG verlangt einen gemeinsamen Antrag; gute Leistungen allein führen nicht automatisch zur vorzeitigen Zulassung nach § 45 Abs. 1. Zwei Wiederholungen bedeuten höchstens drei Versuche, nicht drei zusätzliche Wiederholungen. Vertragliche Verlängerung auf Verlangen nach § 21 Abs. 3 ist vom Wiederholungsrecht zu unterscheiden. Keine erfundenen örtlichen Fristen, Notengrenzen oder Befreiungszusagen.

Die mündliche Ergänzungsprüfung nach § 25 FIAusbV betrifft unter den dort genannten Voraussetzungen einen der drei schriftlichen AP2-Bereiche, nicht AP1 oder die Projektarbeit. Eigene Beispielrechnung mit 48 schriftlichen und 66 mündlichen Punkten: 2:1-Gewichtung ergibt 54 Punkte für diesen Bereich, keine automatische Gesamt-Bestehenszusage. Allgemeine und eingesetzte Formel sind semantisches MathML; sämtliche Bestehensbedingungen aus § 24 werden getrennt erläutert.

## Quellen und Grenzen

Am 03.10.2026 direkt gelesen: BBiG §§ 8 Abs. 1, 45 Abs. 1, 37 Abs. 1, 44 Abs. 1, 21 Abs. 3; FIAusbV §§ 7 Abs. 1–2, 24 Abs. 1–2 und 25 Abs. 1–4. BBiG § 46 Abs. 1 über den offiziellen Suchauszug geprüft; der direkte Seitenabruf scheiterte zweimal und wird nicht als erfolgreiche Direktlektüre dargestellt. Quellen und konkrete Lektürebereiche stehen in `content/sources.json` und der Einheit. Individuelle Zulassung, Anrechnung und Termine bleiben bei zuständiger Stelle, Bescheid und geltender Prüfungsordnung.

Private Quelle `europa-integratoren-2026`, Rohtext Zeilen 246–268 im Hauptrepository, als Themenanker für gestreckte Prüfung und Projektüberblick gelesen. Keine Buchaufgabe, Lösung oder Grafik übernommen. Portalrolle aus `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md` berücksichtigt: ergänzende Orientierung, nicht amtlicher Prüfungskatalog.

## Gestaltung und tatsächliche Prüfung

Refero-Routine führt den vorhandenen Deep-Space-Referenz-Lock fort. Bestehende Ausbildungs-Lernseite als Vergleichsbasis; keine neue visuelle Richtung und keine gemeinsame CSS-Änderung.

- `npm run build`: bestanden, 877 Dateien.
- `npm test`: bestanden. Lokaler Buchimport-Test meldet SKIP, weil die privaten Buchdaten nicht im Worktree importiert sind.
- Browser-Selektor `exam-paths`: bestanden. Diagnose ohne Abschluss-Gate, falsche/richtige Antworten, Reset, Pflichtziel-Sperren, Transfer-Mindestlänge/Musterlösung, Enter/Space-Karten, Reload-Persistenz, Abschluss/Rücknahme und erneute Sperre geprüft.
- Zwei MathML-Formeln und Ergebnis der 2:1-Rechnung geprüft.
- 390/1440 Pixel in Dark/Light mit Reduced Motion: kein Seitenüberlauf, Karten-/Formel- und SVG-Textcontainment, mobiles Diagramm-Tastaturscrollen geprüft; keine Seitenfehler.
- Der erste Browserdurchlauf fand eine zu lange Diagrammbeschriftung. Gekürzt, neu gebaut und Browserprüfung anschließend erfolgreich wiederholt; erst danach Gesamttests bestanden.
- Sichtprüfungen: Desktop-Dark-Wegevergleich, Mobile-Light-Beispielformel, Desktop-Light-Praxisfall, Mobile-Dark-Kartenrückseite und Desktop-Light-Klärungsdiagramm.
- Lokale Aufnahmen unter `C:/Users/timed/AppData/Local/Temp/ap2-exam-20261003/`, nicht im Commit.

Abdeckung: 282/380 insgesamt, WiSo 11/109, wiso-1 10/14. Nächstes offenes Kernthema: `wiso-1__10` (Ende der Ausbildung).
