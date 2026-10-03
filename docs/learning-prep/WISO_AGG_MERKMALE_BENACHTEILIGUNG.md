# AGG: Merkmale und Benachteiligung
Stand: 03.10.2026. Kernthema wiso-2__9, Status CURATED_DRAFT.

## Abgeschlossener Abschnitt
Eigene Lernfälle Salen/Rivano zu Altersablehnung, neutralem Touchscreen-Test und sachlicher Auswahl. Schutzgründe, Bewerbendenkreis, unmittelbare/mittelbare Benachteiligung, Belästigung, berufliche Anforderungen, positive Maßnahmen und betriebliche Beschwerde getrennt erklärt. Diagnose, drei Pflichtfragen mit begründetem Feedback, Transferantwort und drei Tastatur-Karteikarten. Zwei technische SVG-Diagramme aus bestehenden Komponenten; keine dekorativen Rasterbilder. Keine sinnvolle Rechenaufgabe in diesem Abschnitt, daher keine Formel.

## Quellen und Grenzen
EUROPA-Quellenpaket im Hauptcheckout: AGG-Frage Zeile 5750 nur Themenanker, keine Übernahme von Aufgabe oder Lösung. Aktuelle amtliche Primärquellen AGG §§ 1, 3, 5, 6, 7, 8, 11, 13. §§ 1 und 13 direkt gelesen; übrige Normen im amtlichen Suchtext gelesen. Direkte Einzelabrufe von §§ 3, 6, 7 und 8 hatten zuvor Timeouts. Abrufweg steht je Quelle im Kurationsnachweis. Sonderrechtfertigungen, Ansprüche, Beweislast und Fristen nicht vollständig behandelt. Keine individuelle Rechtsberatung oder Erfolgszusage.

## Tatsächlich geprüft
- npm run build: erfolgreich, 920 Dateien.
- npm test: erfolgreich. Lokale Wissensbasis/Lernqueue und Buchdatenprüfung wegen fehlendem Import in diesem Worktree übersprungen; Themenanker im Hauptcheckout separat gelesen.
- AP2_BROWSER_ONLY=agg node scripts/run-browser-tests.mjs: zweimal erfolgreich, nur gezielte neue Einheit, nicht vollständige Browser-Suite.
- Chromium: 390/1440 px, Dark/Light, Reduced Motion. Falsche/richtige Antworten, Erklärung, Diagnose ohne Abschlussgate, drei Pflichtnachweise, Mindestlänge/Modellantwort, Tastaturkarten, gespeicherter Fortschritt, Abschluss/Undo und erneute Sperre geprüft.
- Diagrammtexte innerhalb Canvas und eigener Spalten, horizontal per Tastatur scrollbare Mobilgrafiken, kein Seitenüberlauf.
- Desktop Dark Vergleich, Desktop Light Prüfweg, Mobile Light Quiz und Mobile Dark Kartenrückseite visuell geprüft. Screenshot-Ziele nach Scroll-Einblendung abgewartet.
- Keine vollständige Screenreader-/WCAG-Zertifizierung oder andere Browser behauptet.
- Coverage: 296/380; GA1 164/164, GA2 107/107, WiSo 25/109. Nächstes offenes W2-Thema: Arbeitsschutz.

## Lieferung
Nur beabsichtigte Änderungen lokal gesichert. Kein Push, keine Veröffentlichung. Refero-Skill: vorhandene Referenzbindung und Lernkomponenten beibehalten, keine neue Seitenrichtung.
