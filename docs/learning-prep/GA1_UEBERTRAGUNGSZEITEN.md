# GA1: Übertragungszeiten
Stand: 03.10.2026. Kernthema `ga1-11__2`.
Status: CURATED_DRAFT; menschliche Fachfreigabe steht aus.

## Abgeschlossener Umfang
Neue eigenständige Einheit `uebertragungszeiten-bandbreite-datenmenge`: Diagnose, vier verbindliche Lernziel-Checks, drei numerische Übungen (eine ergänzend), Transferantwort und fünf Tastatur-Lernkarten.
Zwei technische SVG-Rechenwege und drei semantisch beschriftete MathML-Formeln.
Eigene Fälle: 24 GB/240 Mbit/s = 800 s ideal; 24 MB/s Nutzrate = 1 000 s; 3,6 GB/30 MB/s plus separate 18 und 12 s = 150 s. Binärfall 512 MiB/64 Mbit/s = 67,108864 s. Aufgabe 128 MiB/32 Mbit/s = 33,554432 s, gerundet 33,5544.
Keine pauschale TCP-Effizienz und kein doppelter Overhead-Abzug; konstante Rate und nicht überlappende Zusatzzeiten ausdrücklich als Modellbedingungen.

## Quellen und Herkunft
- [NIST: Binary prefixes](https://physics.nist.gov/cuu/Units/binary.html): Präfix-/Einheitendefinitionen direkt gelesen.
- [RFC 6349](https://www.rfc-editor.org/rfc/rfc6349.html): Abschnitte 4.1, 4.1.2 und 5.2 direkt gelesen; ideale/tatsächliche Dauer, keine Beispielzahlen kopiert.
- Private Wissensbasis europa-integratoren-2026:00068, Zeilen 812–819 als Themenanker gelesen; Originalfrage, Zahlen und Antworten nicht übernommen.
- Ergänzt bestehende Speichereinheiten- und Backup-Fenster-Einheiten; keine fremden Inhalte überschrieben.

## Designentscheidungen
Bestehender Refero-Lock bleibt direkter Build-Target: Doppler-Panels/Inter, Astro nur Atmosphäre, n8n nur zurückhaltende Verbindungen.
Gemeinsame Lernwidgets statt neuer UI. Technische SVGs bleiben auf Mobile im gekennzeichneten, per Tastatur verschiebbaren Diagrammcontainer. Kein Rasterbild und kein ASCII-Ersatz.

## Tatsächliche Prüfung
- `npm run build`: bestanden.
- `npm test`: bestanden.
- `AP2_BROWSER_ONLY=transfer-duration npm run test:browser`: bestanden.
- Browser prüft falsche/richtige Antworten, Dezimalkomma, Erklärfeedback, Lernziel-Sperre und Reset, Persistenz, Erledigt/Undo, Transferantwort, Karten mit Enter/Space, drei beschriftete Formeln, Diagramm-Textgrenzen, mobile Tastaturverschiebung, Seitenüberlauf und Browserfehler.
- Screenshots 390/1440 px jeweils Dark/Light erzeugt. Sichtprüfung: 1440-dark-figure-0, 1440-light-math-2, 390-dark-math-2, 390-light-figure-1. Lesbare Formeln und Diagramme im bestehenden Layout.
- Lokale Screens: `C:/Users/timed/AppData/Local/Temp/ap2-transfer-20261003`. Keine Produktionsprüfung behauptet.
- Neue Prüfung in die vollständige Browser-Suite aufgenommen; dieser Lauf führte nur die gezielte neue Browserprüfung aus.
