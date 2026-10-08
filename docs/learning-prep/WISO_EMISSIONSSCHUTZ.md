# Emissionsschutz – abgeschlossener Entwurf

Stand: 04.10.2026. Kernthema `wiso-8__9`; `CURATED_DRAFT`, menschliche Freigabe ausstehend.

## Inhalt und Quellen

Die Einheit „Emissionsschutz: an der Quelle beginnen“ enthält acht Abschnitte: Diagnose, Begriffe, Belastungsarten, Maßnahmen, Rechtsgrundlagen, geführter Betriebsfall, Begründungsübung und neuer Transfer mit Abruf/Wiederholung. Vier Pflichtchecks mit spezifischem Fehlfeedback prüfen vier Lernziele. Drei technische SVGs erklären Quelle/Einwirkungsort, Belastungsarten und Maßnahmenfolge. Eigene Fälle, keine Buchaufgabe oder Originalgrafik übernommen.

BImSchG §§ 1, 2, 3, 5 und 22 sowie § 1 der 26. BImSchV wurden direkt geprüft. UBA-Verkehrslärm stützt die begründete Maßnahmenreihenfolge. Der BfS/BAuA-Kooperationsartikel auf gesund.bund.de von 2022 dient nur stabiler Begriffsklärung, nicht einer aktuellen individuellen Gesundheitsbewertung. Die ergänzende Recherchematrix dokumentiert weitere Quellen und fehlgeschlagene BfS-Abrufe; nicht jede recherchierte Quelle wird in der Einheit verwendet. Private EUROPA-Zeilen 9432–9447 nur als geprüfter Themenanker.

Vermeidung und Verringerung werden nicht als pauschales Gesetzeszitat ausgegeben. §§ 5 und 22 bleiben getrennt; keine Genehmigungspflichten, Grenzwerte oder WLAN-Gefahrennachweise erfunden. Notwendige Kühlung oder Sicherheitsfunktionen werden nicht ungeprüft abgeschaltet.

## Ausgeführte Prüfungen

- Branch und sauberer Ausgangsstatus sowie AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage vor Arbeit gelesen. Refero-Direct-Build gegen den vorhandenen Deep-Space-Lock; bestehende Lernseite visuell als Vergleich betrachtet. Gemeinsame Gestaltung unverändert.
- `npm run build` erfolgreich: 1157 Dateien.
- `npm test` erfolgreich nach Vormerkung der neuen SVGs. Der erste Lauf scheiterte am Asset-Allowlist-Check, weil eine verwaiste Indexsperre das Vormerken verhindert hatte. Leere Sperre nach zuverlässiger Prozessprüfung recoverbar umbenannt; kein fremder Inhalt entfernt. Zwei vorhandene Tests für lokale Buchdaten/Lernqueue melden SKIP, da im Worktree nicht importiert.
- `AP2_BROWSER_ONLY=emissionsschutz node scripts/run-browser-tests.mjs` erfolgreich mit lokaler Auth-Fixture. Nur die neue Browserprüfung ausgeführt, keine vollständige Browser-Suite und kein Produktiv-Sync behauptet.
- 390/1440 Pixel, jeweils Dark/Light, Reduced Motion: falsche/richtige Diagnose, vier Pflichtchecks, Feedback/Retry, Lernziel-Gates, Abruf-Mindestlänge und Musterfreigabe, Tastaturkarten, Reload-Persistenz, Abschluss/Rücknahme sowie erneute Sperre bei Check-Reset bestanden. Keine JavaScript-Fehler oder Seitenüberbreite; SVG-Texte passen in Canvas und eigene Boxen. Mobile Diagramme sind bewusst horizontal scrollbar und per Tastatur erreichbar.
- 36 Screenshots erzeugt. Acht direkt betrachtet: Desktop Light Quellenweg und Betriebsfall, Desktop Dark Maßnahmenfolge, Mobile Dark Belastungsdiagramm und Einstieg, Mobile Light Belastungsquiz (vor/nach Renderwartezeit) und Abruf. Die zunächst leere Screenshotfläche unmittelbar nach Scrollen war nach kurzer Renderwartezeit mit dem Quiz gefüllt; Prüfskript wartet jetzt vor Inhalts-Screenshots. Keine globale Stylingänderung.

Abdeckung nach Build: 366/380 implementierte Kernthemen, 14 offen; WiSo 95/109. Implementierung ist keine menschliche Freigabe. Nächster Abschnitt: `wiso-8__10` Umweltzeichen / Blauer Engel.

Kein Push, keine Veröffentlichung, keine Branch-Löschung.
