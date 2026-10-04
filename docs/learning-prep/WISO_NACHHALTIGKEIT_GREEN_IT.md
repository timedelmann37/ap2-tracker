# Nachhaltigkeit und Green IT – abgeschlossener Entwurf

Stand: 04.10.2026. Kernthema `wiso-8__11`; `CURATED_DRAFT`, menschliche Freigabe ausstehend.

## Inhalt und Quellen

Die Einheit „Green IT: mehr als weniger Strom“ enthält acht Abschnitte: Diagnose, drei Dimensionen, Hardware-Lebensweg, Energie/Nutzungsumfang, Entscheidungsroutine, geführter Fall, Begründungs-/Rechenübung und neuer Transfer mit Abruf/Wiederholung. Vier Pflichtchecks mit spezifischem Feedback prüfen vier Lernziele. Drei eigene technische SVGs und drei semantische MathML-Formeln ergänzen die Erklärung. Keine fremde Aufgabe oder Grafik übernommen.

BMUKN-Nachhaltigkeitsstrategie direkt geprüft. UBA-Grundlagen von 2022/2023 nur für stabile Begriffe und Maßnahmen verwendet; keine historischen Verbrauchsschätzungen, CO2-Anteile, Registry-Tools oder pauschalen Austauschfristen. Aktuelle HTML-Zusammenfassungen der UBA-Studien zu gebrauchter IKT (127/2025) und digitalen Reboundeffekten (75/2026) direkt gelesen; kein Volltextstudienbefund behauptet. Die ergänzende Quellenmatrix umfasst weitere Fundstellen und dokumentiert den BSI-403-Abruf; dieser ist kein vollständig direkt geprüfter Quellenbeleg der Einheit.

Private EUROPA-Zeilen 9325–9338 als geprüfter Themenanker zu Dimensionen/Zielkonflikten, keine Aufgabe oder Lösung kopiert. Eigene Modellwerte: 60 W bei 2000 h ergeben 120 kWh; 40 W bei 4000 h ergeben 160 kWh. Nur Betriebsenergie, keine Ökobilanz oder Umweltamortisation. Mehrnutzung allein beweist keinen Rebound-Ursachenzusammenhang. Lange Nutzung bleibt an Eignung und sicheren Betrieb gebunden. Die vorhandene GA1-PUE-Einheit ist verlinkt statt dupliziert.

## Ausgeführte Prüfungen

- Branch und sauberer Ausgangsstatus, AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage geprüft. Refero-Direct-Build gegen bestehendes Deep-Space-Design und direkt betrachtete vorhandene Lernseite. Keine globale Designänderung.
- `npm run build` erfolgreich: 1165 Dateien.
- `npm test` erfolgreich. Zwei vorhandene Prüfungen für lokale Wissensbasis/Lernqueue und Buchdaten melden SKIP, da im Worktree nicht importiert.
- `AP2_BROWSER_ONLY=nachhaltigkeit-green-it node scripts/run-browser-tests.mjs` erfolgreich mit lokaler Auth-Fixture. Nur neue Browserprüfung, keine vollständige Browser-Suite oder produktiver Sync behauptet.
- 390/1440 Pixel, jeweils Dark/Light, Reduced Motion: Diagnose, falsche/richtige Pflichtantworten, Feedback/Retry, Gate-Sperren, Abruf-Mindestlänge/Musterfreigabe, Tastaturkarten, Reload-Persistenz, Abschluss/Rücknahme und Check-Reset bestanden. Keine JavaScript-Fehler oder Seitenüberbreite. Drei semantisch benannte Formeln ohne Seitenoverflow; SVG-Text passt in Canvas und eigene Boxen. Mobile Diagramme bewusst horizontal scrollbar, per Tastatur geprüft.
- 48 Screenshots erzeugt, acht direkt betrachtet: Mobile Dark Einstieg und Lebenswegdiagramm; Mobile Light Energieformel und Abruf; Desktop Dark Entscheidungsdiagramm und Grundformel/Rechenbeispiel; Desktop Light Dimensionendiagramm und geführter Fall. Alle vier Viewport/Theme-Kombinationen direkt gesichtet.

Abdeckung: 368/380 implementierte Kernthemen, 12 offen; WiSo 97/109. Implementierung ist keine menschliche Freigabe. Nächster Abschnitt: `wiso-8__12` Qualitätsmanagement / PDCA.

Kein Push, keine Veröffentlichung, keine Branch-Löschung.
