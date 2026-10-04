# Prüfungszeit: Abschlussprüfung

Stand: 04.10.2026. Kernthema `wiso-9__5`, Einheit `wiso-pruefungszeit-budget-kontrollpunkte`. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Abgeschlossen

Acht Abschnitte unterscheiden reguläre FISI-WiSo-Dauer, eigenes Zeitbudget, Durchschnitt und Kontrollpunkt. Eigene Fälle Esra, Dana und Nils behandeln Kontrollreserve, Stillstand und Anpassung an Restzeit. 40 Aufgaben, Minutenphasen und Reserven sind ausdrücklich Übungswerte, keine aktuelle IHK-Bogenbeschreibung. Keine universelle Ein-Minuten-Regel, Aufgabenanzahl oder zusätzliche Lesezeit behauptet.

Diagnose, vier Pflichtchecks mit spezifischem Fehlfeedback/Retry, geführte Rechenübung mit abnehmenden Hilfen, Transfer, freier Abruf, vier Tastaturkarten und Lernziel-Checks. Drei eigene SVG-Denkmodelle und drei semantische MathML-Blöcke einschließlich Einheiten, Dezimal-Minuten und Textalternativen. Keine Rasterbilder oder kopierten Buchaufgaben.

## Quellen und Gestaltung

FIAusbV § 23 Abs. 2–3 direkt gelesen: schriftliche praxisbezogene Aufgaben und 60 Minuten. UniSQ PDF S. 1 Preparation strategies/S. 2 Final tips direkt gelesen; allgemeine Lernstrategie, keine IHK-Regel. Zeitphasen und Rechnungen selbst entwickelt. Hintergrundmatrix ergänzt UniSQ-Webseiten mit ausdrücklich begrenztem Hochschul-/Open-book-Geltungsbereich, nicht als FISI-Format übernommen.

Privater EUROPA-Markdown-Export Zeilen 63–71 direkt gelesen, nur allgemeiner WiSo-Simulations-/Lernerfolgsanker. Kein spezifischer Zeitbudgetbeleg, keine erfundene PDF-Seite. Research-Skill veranlasste Hintergrund-Quellenmatrix; eingesetzte Primärstellen selbst geprüft.

Refero Direct-Build gegen direkt gesichtete Antwortbogen-Lernseite und Deep-Space-Reference-Lock. Entscheidungsledger: Lesefläche/Typografie aus bestehendem Rahmen, Quiz/Abruf/Karten aus gemeinsamen Komponenten, eigene native SVGs und MathML gemäß Nutzer-Grafik-/Formelvorgabe. Keine globalen Styles, Tokens, Navigation oder Sync geändert.

## Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber. AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage gelesen.

- Build erfolgreich: 1209 Dateien. Erster Build erkannte fehlende Diagramm-Textalternativen; ergänzt, danach erfolgreich.
- `npm test` erfolgreich; zwei bekannte SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=zeitbudget node scripts/run-browser-tests.mjs` erfolgreich. Lokale Auth-Fixture ohne Produktions-Sync; nicht die gesamte Browser-Suite.
- 390/1440 px in Dark/Light, Reduced Motion: Diagnose und Pflichtchecks falsch/richtig, Feedback/Retry, Gate, kurzer/langer Abruf und Muster, Karten Enter/Leertaste, Reload-Persistenz, Abschluss/Rücknahme, Reset sperrt Gate.
- H1/Seite ohne Überlauf, Karten passen, Formeln ohne Seitenüberlauf, SVG-Text innerhalb Canvas und eigener Box. Mobile Diagramme per Tastatur horizontal erreichbar. Keine JavaScript-Seitenfehler.
- 48 Screenshots in `C:/Users/timed/AppData/Local/Temp/ap2-zeitbudget-20261004`. Zehn direkt gesichtet: 390-dark-start, 390-light-case, 390-dark-formula-1, 390-light-formula-2, 390-light-card, 390-light-figure-1, 1440-dark-figure-0, 1440-light-figure-2, 1440-light-quiz, 1440-dark-formula-0.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-zeitbudget-build-20261004.log` und `ap2-zeitbudget-test-20261004.log`.

## Stand

Coverage **379/380**, WiSo **108/109**, ein Kernthema offen: `wiso-9__6`, zwei vollständige Übungsdurchläufe unter Zeit. Buchsimulationen sind private Themenanker, nicht zu reproduzierende öffentliche Bögen. Nur lokaler scoped Commit; kein Push, keine Veröffentlichung oder Branch-Löschung. Menschliche Freigabe bleibt ausstehend.
