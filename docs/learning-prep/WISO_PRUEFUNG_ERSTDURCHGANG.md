# Prüfungs-Erstdurchgang: Abschlussprüfung

Stand: 04.10.2026. Kernthema `wiso-9__0`, Einheit `wiso-pruefung-erstdurchgang-sichere-fragen`. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Abgeschlossene Arbeit

Acht Abschnitte: Diagnose, kurzer Überblick, begründete Sicherheit, regelkonformes Zurückstellen, eigener Sechs-Fragen-Fall Jonas, geführte Rückkehrübung, Denkfallen und Transferfall Aylin. Vier verpflichtende Lernziel-Checks mit spezifischem Fehlfeedback/Retry, freier Abruf mit verborgenem Muster und vier Karten.

Drei eigene deklarative SVG-Prozessmodelle: Durchgänge, Sicherheitskriterien, Rückkehrweg. Keine Rasterbilder oder kopierten Buchaufgaben; keine Rechenformel nötig. Trainingszeiten und Aufgabenanzahl sind ausdrücklich keine IHK-Vorgaben. Keine Behauptung allgemeiner Negativbewertung oder uneingeschränkter Markierungserlaubnis.

## Belege und Gestaltung

AkA-Hinweise Sommer 2026 S. 1–3 und IHK Braunschweig Nr. 1–3, 5–8 direkt geprüft. AkA-Kaufmannsformat und Fortbildungsratgeber nicht als FISI-Prüfungsregel ausgegeben. Private EUROPA-Zeilen 63–71 nur allgemeiner Themenanker; kein konkreter Strategiebeleg und keine PDF-Seite erfunden.

Research-Skill veranlasste die Hintergrundrecherche; wegen eingeschränktem Schreibbereich lieferte der Agent seine Matrix als Text. Hauptagent prüfte die verwendeten Quellen selbst und erstellte die begrenzte Quellenmatrix. Refero-Skill führte zum Direct-Build gegen die vorhandene Feuerlöscher-Lernseite und den Deep-Space-Reference-Lock: bestehende Tokens, Leseflächen, Quiz-/Abruf-/Kartenkomponenten unverändert wiederverwendet.

## Tatsächliche Verifikation

Branch `codex/ga1-linux-admin`, Anfangsstatus sauber. AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor Bearbeitung gelesen.

- `npm run build`: erfolgreich, 1189 Dateien.
- `npm test`: erfolgreich; zwei bekannte SKIP für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten.
- Gezielter Lauf `AP2_BROWSER_ONLY=pruefung-erstdurchgang node scripts/run-browser-tests.mjs`: erfolgreich, lokale Auth-Fixture, kein Produktions-Sync; nicht gesamte Browser-Suite.
- 390/1440 px, Dark/Light, Reduced Motion: Diagnose falsch/richtig; vier Pflichtchecks falsch/richtig; Feedback und Retry; Gate; kurzer Abruf gesperrt, Muster nach längerem Abruf; vier Karten per Enter/Leertaste; Reload-Persistenz; Abschluss/Rücknahme; Reset sperrt Gate.
- H1 und Seitenbreite ohne Überlauf; Kartenfront/-rückseite innerhalb Grenzen; SVG-Texte innerhalb Canvas und Boxen; mobile Diagramme per Tastatur horizontal scrollbar.
- Sechs Tabellenzeilen geprüft; mobile Tabelle in beiden Themes per ArrowRight scrollbar, rechte Entscheidungsspalte erreichbar. Keine JavaScript-Seitenfehler.
- 38 Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-pruefung-erstdurchgang-20261004`. Direkt gesichtet: 390-dark-start, 390-light-case, 390-dark-recall, 390-light-card, 390-light-figure-0, 1440-dark-figure-1, 1440-light-figure-2, 1440-light-quiz sowie 390-light-table-right. Nach Titelkorrektur 1440-dark-figure-1 erneut gesichtet.
- Erstsichtung zeigte HTML-Entity im Inhaltsverzeichnis bei Apostroph; Titel ohne Apostroph neu formuliert, Build und Browserlauf wiederholt.
- Logs: `C:/Users/timed/AppData/Local/Temp/ap2-pruefung-erstdurchgang-build-20261004.log` und `ap2-pruefung-erstdurchgang-test-20261004.log`.
- Leere Indexsperre blockierte Staging. Zunächst bei aktivem Git-Prozess unverändert belassen; nach erneuter Prüfung ohne Git-Prozess und mit Länge 0 recoverbar in `index.lock.stale-pruefung-erstdurchgang-20261004` umbenannt. Keine Sperre gelöscht.
- Keine gemeinsamen Styles, Navigation oder Fortschrittslogik geändert. Ausschließlich scoped Artefakte lokal vorgemerkt; Diff-Whitespacecheck erfolgreich.

## Stand und Fortsetzung

Coverage **374/380**, WiSo **103/109**, sechs offene Kernthemen. Nächstes: `wiso-9__1`, eindeutig falsche Optionen ausschließen. Lokaler Commit ohne Push, Veröffentlichung oder Branch-Löschung. Menschliche Freigabe bleibt erforderlich.
