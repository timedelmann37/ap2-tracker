# Signalwörter: Abschlussprüfung

Stand: 04.10.2026. Kernthema `wiso-9__2`, Einheit `wiso-signalwoerter-aussageumfang-pruefen`. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Abgeschlossen

Acht Abschnitte erklären absolute Aussagen, Geltungsbereiche, Möglichkeit/Fähigkeit/Erlaubnis, Normalfall, ausschließlich und Verneinung. Eigene Fälle Nora, Jo und Sami; vollständig vorgegebene Übungsregeln, keine pauschalen Rechtsaussagen. Regelverstöße werden ausdrücklich von Gegenbeispielen zu Tatsachenbehauptungen unterschieden. Die ursprüngliche Themenformulierung wird nicht als statistische Wahrheitsheuristik übernommen.

Diagnose, vier Pflichtchecks mit spezifischem Fehlfeedback/Retry, geführte Übung mit abnehmenden Hilfen, Transfer, freier Abruf und vier Karten. Drei eigene technische SVG-Denkmodelle; Vergleich von Tatsache/Pflicht als Gegenüberstellung statt irreführender Prozessfolge. Keine Rasterbilder, übernommenen Buchübungen oder Rechenformeln.

## Quellen und Designentscheidungen

AkA Sommer 2026 S. 1 und 3 sowie UniSQ S. 1 General format/Schritte 2–4 direkt geprüft. Kaufmännischer Geltungsbereich und allgemeine Hochschulmethode abgegrenzt; keine FISI-Bewertungsregel, Erfolgsquote oder automatische Wortauswahl behauptet. Wortsemantik und Fälle sind eigene didaktische Ableitungen. Private EUROPA-Markdown-Zeilen 63–71 nur allgemeiner Simulationsanker, kein spezifischer Signalwortbeleg oder erfundener PDF-Seitenbezug.

Research-Skill veranlasste die Hintergrund-Quellenmatrix; eingesetzte Primärstellen zusätzlich selbst geprüft. Refero Direct-Build gegen bestehende Ausschluss-Lernseite und Deep-Space-Reference-Lock. Gemeinsame Tokens und Lernkomponenten unverändert; keine globale Styling-/Navigationsänderung.

## Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber. AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage gelesen.

- Build erfolgreich: 1197 Dateien.
- `npm test` erfolgreich; zwei bekannte SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=signalwoerter node scripts/run-browser-tests.mjs` erfolgreich, nach Diagrammpräzisierung erneut erfolgreich. Lokale Auth-Fixture ohne Produktions-Sync; nicht gesamte Browser-Suite.
- 390/1440 px in Dark/Light mit Reduced Motion: Diagnose falsch/richtig, vier Pflichtchecks falsch/richtig, Feedback/Retry, Gate, kurzer/langer Abruf und Muster, Karten Enter/Leertaste, Reload-Persistenz, Abschluss/Rücknahme, Reset sperrt Gate.
- H1 und Seitenbreite ohne Überlauf; Karten innerhalb Grenzen; SVG-Text innerhalb Canvas und eigener Box; mobile Diagramme per Tastatur horizontal erreichbar. Keine JavaScript-Seitenfehler.
- 36 Screenshots in `C:/Users/timed/AppData/Local/Temp/ap2-signalwoerter-20261004`. Acht Ansichten direkt gesichtet: 390-dark-start, 390-light-case, 390-dark-recall, 390-light-card, 390-light-figure-1, 1440-dark-figure-0, 1440-light-figure-2, 1440-light-quiz. Finales Vergleichsdiagramm nochmals gesichtet.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-signalwoerter-build-20261004.log` und `ap2-signalwoerter-test-20261004.log`.
- Git-Sperrdatei blockierte initiales Staging und den ersten Commitversuch. Initial: kein laufender Git-Prozess, Datei leer; exakt identifizierte Sperre wiederherstellbar nach `index.lock.stale-signalwoerter-20261004` umbenannt, nicht gelöscht. Finaler Commit mit erneuter Prüfung derselben Sperrbedingung.

## Stand

Coverage **376/380**, WiSo **105/109**, vier offen. Nächstes `wiso-9__3`: Bewertungsregeln und unsichere Antworten anhand konkret gültiger Vorgaben prüfen; pauschalen fehlenden Punktabzug nicht ungeprüft lehren. Nur lokaler scoped Commit, kein Push, keine Veröffentlichung oder Branch-Löschung. Menschliche Freigabe bleibt ausstehend.
