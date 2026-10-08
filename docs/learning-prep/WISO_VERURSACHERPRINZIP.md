# Verursacherprinzip und Gemeinlastprinzip – abgeschlossener Entwurf

Stand: 04.10.2026. Kernthema `wiso-8__8`; Status `CURATED_DRAFT`, menschliche Freigabe steht aus.

## Inhalt und Quellen

Die Einheit „Umweltkosten: Wer zahlt?“ erklärt verursacherbezogene Kostentragung, Gemeinlast, externe Kosten und vorbeugende Anreize. Sie trennt öffentliche Vorfinanzierung von endgültiger Last und den umweltpolitischen Grundsatz von einem konkreten Zahlungsanspruch. Eigene fiktive Fälle, Diagnose, vier Pflichtchecks mit Feedback, geführte Anwendung, Transferabruf und vier Wiederholungskarten sind implementiert. Drei technische SVGs erklären Vergleich, Anreiz und Finanzierungsabfolge; keine dekorativen Rasterbilder.

Amtliche Quellen: Art. 191 Abs. 2 AEUV, §§ 3 und 9 USchadG sowie die UBA-FAQ zur Kommunalabwasserrichtlinie. Der UBA-Auftragsbericht Texte 86/2021 dient ausdrücklich nur als begriffliche Fachquelle, nicht als aktuelles Gesetz. Quellenprüfung und Grenzen stehen in `WISO_VERURSACHERPRINZIP_QUELLEN.md`. Private EUROPA-Zeilen 9415–9416 wurden unmittelbar als Themenanker gelesen; keine Buchaufgabe oder Musterlösung übernommen.

## Tatsächlich ausgeführte Prüfungen

- Branch `codex/ga1-linux-admin`, anfangs sauber; AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor Arbeit geprüft. Bestehende Referenzgestaltung und gemeinsame Lernbausteine weiterverwendet.
- `npm run build`: erfolgreich, 1153 Ausgabedateien.
- `npm test`: erfolgreich, einschließlich Compiler-, Inhalts-, Lern-, Fortschritts- und SQL-Prüfungen. Zwei vorhandene Prüfungen für lokale Buchdaten/Lernqueue melden SKIP, da diese im Worktree nicht importiert sind; kein Erfolg für diese Teilprüfungen behauptet.
- `AP2_BROWSER_ONLY=verursacherprinzip node scripts/run-browser-tests.mjs`: erfolgreich. Lokale Auth-Fixture, kein Produktivdienst; nur die neue Einheit geprüft, nicht die komplette Browser-Suite.
- 390 und 1440 Pixel, jeweils Dark/Light, Reduced Motion: Diagnose, falsches/richtiges Feedback, Retry, vier Lernziel-Gates, Mindestlänge des Abrufs, Musterfreigabe, Tastaturkarten, Reload-Persistenz, Abschluss und Rücknahme geprüft. Keine JavaScript-Fehler oder Seitenüberbreite. Mobile Diagramme bewusst horizontal scrollbar und per Tastatur erreichbar.
- 36 Screenshots erzeugt; sieben direkt visuell betrachtet: Desktop Light Anreiz und Fall, Desktop Dark Vergleich und Finanzierungsfolge, Mobile Dark Einstieg, Mobile Light Gemeinlast-Check und Abruf. Ein zuerst zu breites Diagrammlabel wurde von „Zuordnung“ zu „Kosten“ verkürzt. Der anschließende Browserlauf bestätigt alle Text-/Boxgrenzen.

Coverage nach Build: 365/380 Kernthemen implementiert, 15 offen; WiSo 94/109. Das ist Implementierungsabdeckung, keine menschliche Inhaltsfreigabe. Nächstes offenes Kernthema: `wiso-8__9` Emissionsschutz.

Keine Veröffentlichung, kein Push und keine Branch-Löschung. Eine leere verwaiste Git-Indexsperre wurde nach zuverlässiger Prozessprüfung recoverbar umbenannt; keine fremden Änderungen entfernt.
