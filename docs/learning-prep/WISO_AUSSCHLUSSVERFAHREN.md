# Ausschlussverfahren: Abschlussprüfung

Stand: 04.10.2026. Kernthema `wiso-9__1`, Einheit `wiso-ausschlussverfahren-falsche-optionen`. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Abgeschlossen

Acht Abschnitte erklären Antwortauftrag, belastbare Ausschlussgründe, drei Denkzustände, Restprüfung und Mehrfach-/Negativfälle. Eigene vollständig vorgegebene Berechtigungsfälle Dana/Malik; keine pauschalen Rechtsregeln. Diagnose, geführte Übung mit abnehmenden Hilfen, vier Pflichtchecks mit Fehlfeedback/Retry, freier Abruf und vier Karten. Mehrfachantwort wird als Kombinationsentscheidung geübt, nicht als konkrete IHK-Oberfläche simuliert.

Drei eigene SVG-Prozessmodelle: Prüfweg, Denkzustände, verneintes Suchziel. Keine Rasterbilder, Buchaufgaben oder kopierten Beispielantworten; keine Rechenformel erforderlich.

## Quellen und Designentscheidungen

AkA Sommer 2026 S. 1 und 3 sowie UniSQ S. 1 Schritte 1–6/S. 2 Final tips direkt geprüft. Formatbeispiel und allgemeine Lernhilfe sind keine FISI-Bewertungsregel. Keine Erfolgsgarantie, Prüfungsdauer oder Negativbewertungsregel. Private EUROPA-Markdown-Zeilen 63–71 nur allgemeiner WiSo-Simulationsanker, kein spezifischer Ausschlussbeleg oder erfundener PDF-Seitenbezug.

Research-Skill veranlasste Hintergrundrecherche; Hauptagent prüfte eingesetzte Primärstellen selbst. Refero-Skill: Direct-Build gegen Erstdurchgang-Lernseite und Deep-Space-Reference-Lock. Leseflächen, Tokens, Quiz-/Abruf-/Kartenkomponenten unverändert fortgeführt. Keine gemeinsamen Styles oder Navigation geändert.

## Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber; AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage gelesen.

- Build erfolgreich, 1193 Dateien.
- `npm test` erfolgreich; bekannte zwei SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=ausschlussverfahren node scripts/run-browser-tests.mjs` erfolgreich. Lokale Auth-Fixture ohne Produktions-Sync; nicht gesamte Browser-Suite.
- 390/1440 px in Dark/Light, Reduced Motion: Diagnose falsch/richtig, Pflichtchecks falsch/richtig, spezifisches Feedback/Retry, Gate, kurzer/langer Abruf und Muster, Karten per Enter/Leertaste, Reload-Persistenz, Abschluss/Rücknahme, Reset sperrt Gate.
- H1 und Seitenbreite ohne Überlauf; Karten innerhalb Grenzen; SVG-Text innerhalb Canvas und eigener Box; mobile Diagramme per Tastatur horizontal erreichbar. Keine JavaScript-Seitenfehler.
- Erstlauf fand zu breites Label „Passt nicht“ in Diagramm 1. Auf „Nein“ gekürzt; ausführliche Bedeutung bleibt im Text/Detail. Build und Browsercheck wiederholt erfolgreich.
- 36 Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-ausschlussverfahren-20261004`. Acht direkt gesichtet: 390-dark-start, 390-light-case, 390-dark-recall, 390-light-card, 390-light-figure-1, 1440-dark-figure-0, 1440-light-figure-2, 1440-light-quiz.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-ausschlussverfahren-build-20261004.log` und `ap2-ausschlussverfahren-test-20261004.log`.

## Stand

Coverage **375/380**, WiSo **104/109**, fünf offen. Nächstes `wiso-9__2`: Signalwörter genau lesen, keine Wahrheitsgarantie aus Formwörtern ableiten. Lokaler scoped Commit; kein Push, keine Veröffentlichung oder Branch-Löschung. Freigabe bleibt menschlich.
