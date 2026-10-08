# Qualitätsmanagement und PDCA – abgeschlossener Entwurf

Stand: 04.10.2026. Kernthema `wiso-8__12`; `CURATED_DRAFT`, menschliche Freigabe ausstehend.

## Inhalt und Quellen

Acht Abschnitte: Diagnose, Qualität/Anforderungen, vier PDCA-Aufgaben, Wirksamkeitsnachweise, Normen/Audit/Zertifizierung, geführter Übergabefall, Übung mit abnehmender Hilfe und neuer Ticket-Transfer/Abruf. Vier Pflichtchecks mit spezifischem Feedback prüfen vier Lernziele. Drei eigene technische SVGs; keine Rechenformel erforderlich.

Öffentliche ISO-Produktseiten zu ISO 9000:2026, ISO 9001:2026 und ISO 9004:2018 sowie ISO Certification und CASCO direkt gelesen. ISO 9001:2026 ist international veröffentlicht, nicht nur angekündigt. Keine bereits lieferbare deutsche Novemberausgabe oder pauschale Ungültigkeit älterer Zertifikate behauptet. Kein kostenpflichtiger Normvolltext ausgewertet. Der ältere öffentliche ISO-Prozessleitfaden zur Ausgabe 2015 wurde nur für die stabile PDCA-Methode verwendet. Die ergänzende Quellenmatrix dokumentiert weitere Primärfundstellen und deren Grenzen.

Private EUROPA-Zeilen 1210–1230 als Themenanker gelesen; keine Aufgabe, Antwort oder Grafik kopiert. Die vereinfachende Gleichsetzung Audit/Zertifizierung nicht übernommen. Eigene fiktive Fälle trennen Aktivität und Wirksamkeit sowie Systemnachweis und konkrete Leistungsprüfung.

## Ausgeführte Prüfungen

- Branch, sauberer Ausgangsstatus, AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage geprüft. Refero Direct-Build gegen bestehende Deep-Space-Lernseite und Reference Lock; kein globales Redesign.
- `npm run build` erfolgreich: 1169 Dateien.
- `npm test` erfolgreich nach dem Vormerken neuer SVG-Assets. Zwei vorhandene Prüfungen für lokale Wissensbasis/Lernqueue und Buchdaten melden SKIP, weil im Worktree nicht importiert.
- `AP2_BROWSER_ONLY=qualitaetsmanagement-pdca node scripts/run-browser-tests.mjs` erfolgreich mit lokaler Auth-Fixture. Nur neue Browserprüfung, keine vollständige Browser-Suite oder produktiver Sync behauptet.
- 390/1440 Pixel, Dark/Light, Reduced Motion: Diagnose, falsche/richtige Pflichtantworten, Feedback/Retry, Gate-Sperren, Abruf-Mindestlänge/Musterfreigabe, Tastaturkarten, Reload-Persistenz, Abschluss/Rücknahme und Check-Reset bestanden. Keine JavaScript-Fehler oder Seitenüberbreite. SVG-Texte innerhalb Canvas und eigener Boxen; Mobile-Diagramme bewusst horizontal scrollbar und per Tastatur geprüft.
- Erste Browserprüfung fand die zu breite Diagrammbeschriftung „Anforderung“; auf „Vorgabe“ korrigiert, Build und Browserprüfung wiederholt.
- 36 Screenshots erzeugt, acht direkt betrachtet: Mobile Dark Einstieg und Normquiz; Mobile Light PDCA und Abruf; Desktop Dark Anforderungen- und Normrollendiagramm; Desktop Light vollständiger PDCA-Ablauf und geführter Fall. Alle vier Viewport/Theme-Kombinationen gesichtet.
- Git-Sperre blockierte zunächst Asset-Staging. Exakte Sperrdatei als leer und ohne aktiven git.exe-Prozess geprüft; recoverbar in `index.lock.stale-qm-pdca-20261004` umbenannt, anschließend Staging und Tests wiederholt. Keine fremden Änderungen übernommen oder gelöscht.

Abdeckung: 369/380 implementierte Kernthemen, 11 offen; WiSo 98/109. Implementierung ist keine menschliche Freigabe. Nächster Abschnitt: `wiso-8__13` Berufsgenossenschaft, Erste Hilfe und Brandschutz.

Kein Push, keine Veröffentlichung, keine Branch-Löschung.
