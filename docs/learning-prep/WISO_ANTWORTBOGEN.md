# Antwortbogen: Abschlussprüfung

Stand: 04.10.2026. Kernthema `wiso-9__4`, Einheit `wiso-antwortbogen-aufgabennummern-kontrollieren`. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Abgeschlossen

Acht Abschnitte trennen Aufgabennummer und Lösungsziffer, Antwortformat, Antwortanzahl und Reihenfolge. Der eigene Fall Tarek erklärt einen Übertragungsversatz nach Aufgabe 12 und den Abgleich der folgenden Felder. Eine geführte Dreierübung behandelt Formatfehler, unzulässige Sortierung einer Reihenfolge und falschen Nummernbezug. Ein eigener Transferfall Mira verbindet die Fehler zur Abschlusskontrolle.

Diagnose, vier Pflichtchecks mit spezifischem Fehlfeedback und Wiederholung, freier Abruf mit Muster, vier Tastaturkarten, Lernziel-Checks und drei native SVG-Denkmodelle. Keine originalen Prüfungsaufgaben oder Lösungsbögen, Rasterbilder oder Rechenformeln.

## Quellen und Gestaltung

AkA-Hinweise Sommer 2026 S. 1–3 direkt geprüft: Identität, Eintragung nach Aufgabennummer, Lesbarkeit, Antwortanzahl/Reihenfolge und Korrektur. Das Verfahren ist ausdrücklich kaufmännisch eingegrenzt. Falsche Ziffer durchstreichen und neue Ziffer ausschließlich darunter ist nur das Verfahren dieses Dokuments, keine allgemeine FISI-Zusicherung. Eigene Unterlagen und Aufsichtsanweisungen bleiben maßgeblich. Die Versatzstrategie ist eine didaktische Ableitung, keine behauptete wörtliche AkA-Anweisung. Belegmatrix: `WISO_ANTWORTBOGEN_QUELLEN.md`.

Privater EUROPA-Markdown-Export Zeilen 63–71 direkt gelesen, ausschließlich allgemeiner WiSo-Simulations-/Lernerfolgsanker. Kein spezifischer Antwortbogenbeleg, keine erfundene PDF-Seite, keine kopierte Buchaufgabe. Research-Skill veranlasste die Hintergrund-Quellenmatrix; verwendete Primärstellen selbst geprüft.

Refero Direct-Build gegen direkt gesichtete bestehende Lernseite und Deep-Space-Reference-Lock. Lesefläche und Typografie aus bestehendem Lernrahmen; Quiz, Abruf und Karten aus gemeinsamen Komponenten; präzise native SVG-Modelle gemäß Nutzer-Grafikvorgabe. Keine Änderung globaler Styles, Tokens, Navigation oder Sync.

## Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber. AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage gelesen.

- Build erfolgreich: 1205 Dateien.
- `npm test` erfolgreich; zwei bekannte SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=antwortbogen node scripts/run-browser-tests.mjs` erfolgreich. Lokale Auth-Fixture ohne Produktions-Sync; nicht die gesamte Browser-Suite.
- Erster Browserlauf scheiterte am erwarteten Wort „Zeilenversatz“, das nur im Beschreibungstext stand. Textassertion auf den tatsächlich sichtbaren Begriff „Versatz“ präzisiert; vollständiger gezielter Lauf danach erfolgreich. Keine Fachregel abgeschwächt.
- 390/1440 px in Dark/Light, Reduced Motion: Diagnose und Pflichtchecks falsch/richtig, Feedback/Retry, Gate, kurzer/langer Abruf und Muster, Karten Enter/Leertaste, Reload-Persistenz, Abschluss/Rücknahme, Reset sperrt Gate.
- H1/Seite ohne Überlauf; Karten passen; SVG-Text innerhalb Canvas und eigener Box. Mobile Diagramme horizontal per Tastatur erreichbar. Keine JavaScript-Seitenfehler.
- 36 Screenshots in `C:/Users/timed/AppData/Local/Temp/ap2-antwortbogen-20261004`. Acht direkt gesichtet: 390-dark-start, 390-light-case, 390-dark-recall, 390-light-card, 390-light-figure-1, 1440-dark-figure-0, 1440-light-figure-2, 1440-light-quiz.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-antwortbogen-build-20261004.log` und `ap2-antwortbogen-test-20261004.log`.

## Stand

Coverage **378/380**, WiSo **107/109**, zwei offen. Nächstes Kernthema `wiso-9__5`: Prüfungszeit einteilen; konkrete Zeitvorgaben und eigene Planmodelle getrennt behandeln. Nur lokaler scoped Commit; kein Push, keine Veröffentlichung oder Branch-Löschung. Menschliche Freigabe bleibt ausstehend.
