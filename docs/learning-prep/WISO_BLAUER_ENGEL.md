# Blauer Engel – abgeschlossener Entwurf

Stand: 04.10.2026. Kernthema `wiso-8__10`; `CURATED_DRAFT`, menschliche Freigabe ausstehend.

## Inhalt und Quellen

Die Einheit „Blauer Engel: Was belegt das Zeichen?“ enthält acht Abschnitte: Diagnose, Bedeutung/Rollen, Lebensweg/Kriterien, Aussagegrenzen, Beschaffungsroutine, geführter Fall, Begründungsübung und neuer Transfer mit Abruf/Wiederholung. Vier Pflichtchecks mit spezifischem Feedback prüfen vier Lernziele. Drei eigene technische SVGs erklären Produktbezug, Lebensweg und getrennte Beschaffungsnachweise. Keine fremde Aufgabe oder Grafik und kein Logo übernommen.

Offizielle Informationen des Blauen Engels wurden geprüft; die Quellenmatrix dokumentiert Fundstellen und Abrufgrenzen. Keine reale Geräte-Zertifizierung bestätigt. Langlebigkeit und Gebrauchstauglichkeit können Kriterien sein, daraus folgt keine Allzweckgarantie. Fehlendes Zeichen ist wegen freiwilliger Teilnahme kein alleiniger Nachweis schlechter Umweltqualität. DE-UZ 219 ist bis Ende 2027 gelistet; Nachfolger DE-UZ 239 angekündigt, Anträge ab Januar 2027. Keine ungeprüften Nachfolgekriterien oder pauschalen Ersatzteilfristen gelehrt.

Eine begrenzte Suche nach Blauer Engel/Umweltzeichen im privaten EUROPA-Volltextexport ergab keinen konkreten Treffer. Kein Buchseitenanker erfunden; die Einheit verwendet offizielle Primärquellen und eigene Fälle.

## Ausgeführte Prüfungen

- Branch, sauberer Ausgangsstatus, AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor Arbeit geprüft. Refero-Direct-Build gegen bestehenden Deep-Space-Lock und visuell betrachtete vorhandene Lernseite. Gemeinsame Gestaltung unverändert.
- `npm run build` erfolgreich: 1161 Dateien.
- `npm test` erfolgreich. Zwei vorhandene Prüfungen für lokale Buchdaten/Lernqueue melden SKIP, weil diese Daten im Worktree nicht importiert sind.
- `AP2_BROWSER_ONLY=blauer-engel node scripts/run-browser-tests.mjs` erfolgreich mit lokaler Auth-Fixture. Nur die neue Browserprüfung ausgeführt; keine vollständige Browser-Suite oder produktiver Sync behauptet.
- 390/1440 Pixel, jeweils Dark/Light, Reduced Motion: Diagnose mit Fehlfeedback, vier Pflichtchecks mit Retry, Lernziel-Gates, Abruf-Mindestlänge und Musterfreigabe, Tastaturkarten, Reload-Persistenz, Abschluss/Rücknahme und erneute Sperre bei Check-Reset bestanden. Keine JavaScript-Fehler oder Seitenüberbreite. Diagrammtext passt in Canvas/eigene Boxen; mobile Diagramme bewusst horizontal scrollbar und per Tastatur erreichbar.
- 36 Screenshots erzeugt, acht direkt betrachtet: Mobile Dark Einstieg und Lebenswegdiagramm, Mobile Light Abruf und Kriterienquiz, Desktop Dark Beschaffungsdiagramm und Transferkarte, Desktop Light Nachweisdiagramm und geführter Fall. Alle vier Viewport/Theme-Kombinationen enthalten eine direkte Sichtprüfung. Keine globale Stylingänderung.

Abdeckung: 367/380 implementierte Kernthemen, 13 offen; WiSo 96/109. Implementierung ist keine menschliche Freigabe. Nächster Abschnitt: `wiso-8__11` Nachhaltigkeit und Green IT.

Kein Push, keine Veröffentlichung, keine Branch-Löschung.
