# Unsichere Antworten: Abschlussprüfung

Stand: 04.10.2026. Kernthema `wiso-9__3`, Einheit `wiso-unsichere-antworten-bewertungsregeln`. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Abgeschlossen

Acht Abschnitte unterscheiden konkrete Bewertungsregeln, null Punkte für eine Aufgabe und zusätzlichen Abzug. Eigene Fälle Lea, Ben und Kim; ausdrücklich gesetzte Übungsmodelle mit einem Punkt für richtig, null für falsch/leer, ohne Einfluss auf andere Aufgaben. Kein allgemeiner IHK-Bewertungsmaßstab und keine pauschale Ratepflicht behauptet. Abwahl wird nur als zu prüfende Vorgabe erklärt, nicht als FISI-Regel gesetzt.

Diagnose, vier Pflichtchecks mit spezifischem Fehlfeedback/Retry, geführte Zweierkombinationsübung mit abnehmenden Hilfen, Transfer, freier Abruf, vier Karten und drei eigene SVG-Denkmodelle. Keine Rasterbilder, kopierten Buchübungen oder Rechenformeln.

## Quellen und Designentscheidungen

AkA Sommer 2026 S. 1/3 und UniSQ PDF S. 1 Schritt 1 sowie S. 2 Final tips direkt geprüft. Zusätzlich UniSQ Types of exams and questions (bedingte Rateempfehlung) und PAL Muster S25 9996 K10 (spezifische Abwahlregeln) für die Quellenmatrix gelesen, nicht als gültiges FISI-Format übernommen. In den geprüften Primärstellen kein pauschaler Beleg fehlenden Punktabzugs für FISI-WiSo; das beweist auch nicht das Gegenteil. Keine allgemeine Ratequote oder Erfolgsgarantie.

Privater EUROPA-Markdown-Export Zeilen 63–71 nur allgemeiner WiSo-Simulations-/Lernerfolgsanker, kein spezifischer Bewertungsbeleg. Keine erfundene PDF-Seite. Research-Skill veranlasste Hintergrund-Quellenmatrix; eingesetzte Primärstellen selbst geprüft.

Refero Direct-Build gegen gesichtete bestehende Signalwort-Lernseite und Deep-Space-Reference-Lock. Entscheidungsledger: Lesefläche/Typografie aus bestehendem Lernrahmen; Quiz, Abruf und Karten aus gemeinsamen Lernkomponenten; native SVG-Modelle entsprechend Nutzer-Grafikvorgabe. Keine globalen Styles, Tokens, Navigation oder Sync geändert.

## Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber. AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage gelesen.

- Build erfolgreich: 1201 Dateien.
- `npm test` erfolgreich; bekannte zwei SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=unsichere-antworten node scripts/run-browser-tests.mjs` erfolgreich. Lokale Auth-Fixture ohne Produktions-Sync; nicht gesamte Browser-Suite.
- 390/1440 px in Dark/Light, Reduced Motion: Diagnose falsch/richtig, Pflichtchecks falsch/richtig, Feedback/Retry, Gate, kurzer/langer Abruf und Muster, Karten Enter/Leertaste, Reload-Persistenz, Abschluss/Rücknahme, Reset sperrt Gate.
- H1/Seitenbreite ohne Überlauf, Karten innerhalb Grenzen, SVG-Text innerhalb Canvas und eigener Box; mobile Diagramme per Tastatur horizontal erreichbar. Keine JavaScript-Seitenfehler.
- 36 Screenshots in `C:/Users/timed/AppData/Local/Temp/ap2-unsichere-antworten-20261004`. Acht direkt gesichtet: 390-dark-start, 390-light-case, 390-dark-recall, 390-light-card, 390-light-figure-1, 1440-dark-figure-0, 1440-light-figure-2, 1440-light-quiz.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-unsichere-antworten-build-20261004.log` und `ap2-unsichere-antworten-test-20261004.log`.

## Stand

Coverage **377/380**, WiSo **106/109**, drei offen. Nächstes `wiso-9__4`: Antwortbogen sauber führen und Aufgabennummern kontrollieren. Nur lokaler scoped Commit, kein Push, keine Veröffentlichung oder Branch-Löschung. Menschliche Freigabe bleibt ausstehend.
