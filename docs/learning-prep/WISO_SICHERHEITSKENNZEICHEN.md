# Sicherheits- und Rettungskennzeichen: Abschlussprüfung

Stand: 2026-10-04. Kernthema `wiso-8__15`, Einheit `sicherheitskennzeichen-farbe-form-bedeutung`. **CURATED_DRAFT**, keine menschliche Publikationsfreigabe.

## Abgeschlossene Arbeit

Acht Abschnitte behandeln die fünf Sicherheitszeichengruppen, Form/Farbe/Symbol als Leseroutine, konkrete Ziele wie Erste Hilfe/AED/Sammelstelle, Zusatzpfeile, GHS-Abgrenzung und die fehlende Sicherheitsgarantie eines Zeichens bei Rauch. Eigene Fälle Nia/Jo, Diagnose, geführte Übungen mit abnehmender Hilfe, vier verpflichtende Lernziel-Checks mit Fehlfeedback/Retry, freier Abruf mit Muster und vier Karten sind enthalten.

Eine eigene SVG-Formprinzip-Grafik zeigt bewusst keine vollständigen normierten Piktogramme. Sie ist keine Beschilderungsvorlage. Zwei deklarative SVG-Diagramme erklären Ziele und Leseroutine. Form/Farbe stehen zusätzlich im Text; keine Rasterbilder, keine Formeln, keine kopierten Buchaufgaben oder Normgrafiken.

## Quellen und Grenzen

ASR A1.3 (Änderung 2022), ausgewählte Stellen der abgerufenen ASR A2.3-Fassung mit Änderung 04.11.2024, DGUV-Erste-Hilfe-Kennzeichnung und Berliner Feuerwehr direkt geprüft. Die ältere A2.3-Fassung wird nicht als vollständiger aktueller Stand aller Beleuchtungs-/Bemessungsanforderungen ausgegeben. GHS-Form- und Etikettgrundlagen nur anhand des offiziellen BAuA-Suchindexauszugs geprüft; Vollabruf scheiterte. Grenze im Lerntext, Register und Quellenmatrix sichtbar; keine substanzbezogene Einstufung oder Schutzmittelauswahl.

Private EUROPA-Markdown-Zeilen 485–488 nur als allgemeiner Themenanker gelesen; kein spezifischer Buchbeleg für die Zeichen erfunden. Keine PDF-Seitennummer ohne Nachweis.

Research-Skill führte zur Hintergrundrecherche und Quellenmatrix. Refero-Skill: Direct-Build gegen die tatsächlich gesichtete bestehende Brandfall-Lernseite und Deep-Space-Reference-Lock. Bestehende Leseflächen, Karten, Check-Interaktionen und Themes wiederverwendet. Sicherheitsfarben bleiben auf das Lehrbild begrenzt; keine globalen Tokens verändert.

## Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber. AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor Bearbeitung gelesen.

- `npm run build`: erfolgreich, 1181 Dateien.
- `npm test`: erfolgreich; zwei bekannte SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten. Erstlauf scheiterte an zwei unversionierten generierten SVGs; nach explizitem Staging für die Git-basierte Runtime-Allowlist erfolgreich. Testregeln nicht abgeschwächt.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=kennzeichen node scripts/run-browser-tests.mjs`: erfolgreich, lokale Auth-Fixture, kein Produktions-Sync und nicht die gesamte Browser-Suite.
- 390/1440 px jeweils Dark/Light mit Reduced Motion: Diagnose falsch/richtig, Pflichtchecks falsch/richtig, Feedback/Retry, Abschlussgate, Abruf-Mindestlänge/Muster, vier Karten per Enter/Leertaste, Reload-Persistenz, Abschluss/Rücknahme und Reset mit gesperrtem Abschluss geprüft.
- Überschrift/Seitenüberlauf, Kartenbegrenzung und inline SVG-Text-/Boxgrenzen geprüft. Inline Diagramme mobil horizontal und per Tastatur scrollbar. Eigenes SVG-Bild lädt mit 360 × 820 und ist responsiv lesbar. Kein JavaScript-Fehler im Lauf.
- Browserprüfer zunächst fälschlich für das externe Bild einen Diagramm-Scrollcontainer gesucht; korrigiert auf Inline-Diagramme, Bild zusätzlich separat geprüft.
- 40 Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-kennzeichen-20261004`. Direkt gesichtet: `390-dark-start.png`, `390-light-formen.png`, `390-light-formen-detail.png`, `390-dark-case.png`, `390-light-recall.png`, `1440-dark-figure-0.png`, `1440-light-figure-1.png`, `1440-light-card.png`. Diagrammüberschrift nach Präzisierung erneut gesichtet. Detailaufnahme blendet ausschließlich während der Aufnahme fixierte Navigation/Aktionsleiste aus; normale Seitenaufnahmen zeigen sie unverändert.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-kennzeichen-build-20261004.log` und `ap2-kennzeichen-test-20261004.log`.
- Leere Git-Indexsperre bei fehlendem Git-Prozess geprüft und wiederherstellbar in `index.lock.stale-kennzeichen-20261004` umbenannt. Keine ungeklärten Änderungen übernommen.

## Stand

Coverage **372/380**, WiSo **101/109**, acht Kernthemen verbleiben. Nächstes Kernthema `wiso-8__16`: Feuerlöscher/Löschmittel. Beabsichtigte Änderungen ausschließlich lokal committen; kein Push, keine Veröffentlichung, keine Branch-Löschung.
