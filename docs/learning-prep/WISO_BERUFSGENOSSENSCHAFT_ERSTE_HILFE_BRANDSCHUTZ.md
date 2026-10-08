# Berufsgenossenschaft, Erste Hilfe und Brandschutz – abgeschlossener Entwurf

Stand: 04.10.2026. Kernthema `wiso-8__13`; `CURATED_DRAFT`, menschliche Freigabe ausstehend.

## Inhalt und Quellen

Acht Abschnitte: Diagnose, Aufgaben der gesetzlichen Unfallversicherung, betriebliche Erste-Hilfe-Organisation, sichere Alarmierung und geschützte Dokumentation, vorbeugender Brandschutz, eigener Spätschichtfall, Übung mit abnehmender Hilfe und neuer Standort-Transfer/Abruf. Vier Pflichtchecks mit spezifischem Feedback prüfen vier Lernziele. Drei eigene technische SVGs; keine Rechenformel erforderlich.

DGUV-Primärquellen zu Aufgaben, Organisation, Helferqualifikation, Dokumentation und sicherer Hilfe sowie ArbSchG § 10 und ASR A2.2 (Änderung 23.05.2025) geprüft. Die ergänzende Quellenmatrix dokumentiert Fundstellen und Grenzen. Keine individuelle Versicherungsleistung garantiert. Keine medizinischen Handgriffe, Löschtechnik oder pauschale Helferquote vermittelt. Ersthelfer und Brandschutzhelfer, Notruf und geschützter Nachweis bleiben getrennt. Jede tatsächliche Erste-Hilfe-Leistung einschließlich kleiner versorgter Verletzungen dokumentieren, mindestens fünf Jahre aufbewahren und unbefugten Zugriff verhindern.

Private EUROPA-Zeilen 485–489 nur als geprüfter Themenanker gelesen; keine Buchaufgabe, Lösung oder Grafik kopiert. Eigene Fälle und technische Diagramme. Research-Skill führte zur Primärquellenmatrix; Refero Direct-Build erhält die vorhandene Deep-Space-Lernseitengestaltung ohne globales Redesign.

## Ausgeführte Prüfungen

- Branch, sauberer Ausgangsstatus, AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor dem Abschnitt geprüft.
- `npm run build` erfolgreich: 1173 Dateien; nach kleinen typografischen Korrekturen erneut gebaut.
- `npm test` erfolgreich. Zwei bestehende Prüfungen für lokale Wissensbasis/Lernqueue und Buchdaten melden SKIP, weil im Worktree nicht importiert.
- `AP2_BROWSER_ONLY=betriebsschutz node scripts/run-browser-tests.mjs` erfolgreich, nach typografischen Korrekturen wiederholt. Lokale Auth-Fixture; keine vollständige Browser-Suite oder produktiver Sync behauptet.
- 390/1440 Pixel, Dark/Light, Reduced Motion: falsche/richtige Diagnose und Pflichtantworten, spezifisches Feedback/Retry, Gate-Sperren, Abruf-Mindestlänge/Musterfreigabe, Tastaturkarten, Reload-Persistenz, Abschluss/Rücknahme und Check-Reset bestanden.
- Keine JavaScript-Fehler oder Seitenüberbreite. SVG-Texte innerhalb Canvas und eigener Boxen. Mobile-Diagramme bewusst horizontal scrollbar und per Tastatur geprüft; kein Anspruch, dass jede Grafik ohne Scrollen vollständig ins Display passt.
- 36 Screenshots erzeugt; acht direkt betrachtet: Mobile Dark Einstieg und Brandschutzdiagramm; Mobile Light Unfallversicherungsdiagramm und Abruf; Desktop Dark Hilfesystem und Spätschichtfall; Desktop Light Brandschutzdiagramm und Karten. Alle vier Viewport/Theme-Kombinationen gesichtet. Lesbarkeit, Karteninhalt und technische Beschriftungen kontrolliert.
- Ausschließlich beabsichtigte Dateien dieser Einheit vorgemerkt; keine fremden Änderungen gelöscht oder übernommen.

Abdeckung: 370/380 implementierte Kernthemen, zehn offen; WiSo 99/109. Implementierung bedeutet keine menschliche Freigabe. Nächster Abschnitt: `wiso-8__14` Sofortmaßnahmen im Brandfall.

Kein Push, keine Veröffentlichung, keine Branch-Löschung.
