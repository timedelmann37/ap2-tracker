# WiSo 5__3 – Rechtsweg und Gerichte

Abgeschlossen am 04.10.2026, lokal auf `codex/ga1-linux-admin`. Einheit: `rechtsweg-gerichte-streitfaelle`, Status `CURATED_DRAFT`; menschliche Freigabe ausstehend.

## Inhalt und Quellenprüfung

Eigenständige Silvaro-Fälle: gesetzlicher Rentenanspruch, arbeitsvertraglicher Lohn, öffentlich-rechtliche Baugenehmigung ohne Sonderzuweisung, gewöhnlicher 600-Euro-Kaufpreis und Sorgerecht. Besondere Rechtswegzuweisungen, Familiengericht als Abteilung des Amtsgerichts sowie Rechtsweg/sachliche/örtliche Zuständigkeit getrennt. Aktueller GVG-§-23-Text nennt 10.000 Euro, nicht die ältere 5.000-Euro-Grenze. Keine individuelle Rechtsberatung oder Fristenanleitung.

Private EUROPA-Rohquelle im Hauptcheckout, Zeilen 5812–5818, als arbeitsrechtlicher Gerichtszuständigkeits-Anker gelesen. Keine Buchaufgabe, Abbildung oder Antworttexte übernommen. Amtliche Primärquellen: SGG § 51, ArbGG § 2, VwGO § 40, GVG §§ 23/23b und FamFG § 111. Web-Timeouts bei SGG § 51, GVG § 23 und FamFG § 111 durch freigegebenen lesenden HTTPS-Abruf überprüft.

Refero-Skill, Visual-Workflow und Deep-Space-Referenzbindung angewandt: bestehenden Lernrahmen wiederverwendet, technische native SVG statt Rasterdekoration. Zwei Diagramme mit alternativen Beschreibungen; Familie ausdrücklich keine zusätzliche selbstständige Gerichtsbarkeit.

## Tatsächlich geprüfte Ergebnisse

- `npm run build`: bestanden, 995 Dateien.
- `npm test`: bestanden. Zwei ausdrücklich gemeldete SKIPs: lokale Wissensbasis/Lernqueue und lokale Buchdaten im Worktree nicht importiert. Privater Themenanker separat im Hauptcheckout geprüft; SKIPs nicht als bestanden gezählt.
- `AP2_BROWSER_ONLY=rechtsweg node scripts/run-browser-tests.mjs`: bestanden, 390/1440 px in Dark/Light mit Reduced Motion. Diagnose ohne Freischaltwirkung; falsche/richtige Antworten und Feedback; vier Pflichtziele; Recall-Mindestlänge und Modell; Karten per Enter/Space; Persistenz; Abschluss/Rücknahme; Zurücksetzen sperrt Abschluss erneut.
- Canvas- und Spaltengrenzen aller Diagrammtexte, Schlüsselspalte ohne Überlappung, Kartenhöhe und Seitenüberlauf geprüft. Mobile Diagrammbedienung per Tastatur geprüft. Erster Durchlauf erkannte zu breites SVG-Schlüsselfeld; auf „Verwalt.“ verkürzt. Vergleichsbeschriftung ebenfalls gekürzt. Finaler Build, Tests und Browserlauf nach Korrektur wiederholt.
- Vier finale Ansichten tatsächlich gesehen: Desktop Dark Zuordnungsdiagramm, Desktop Light Zuständigkeitsdiagramm, Mobile Dark Kartenrückseite, Mobile Light Lohnquiz. Gut lesbar, gemeinsame Theme- und Lernflächen erhalten.

Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-gericht-20261004/`. Browser-Test verwendet die vorhandene angemeldete lokale Testfixture; kein Nachweis eines echten Supabase-Produktionskontos.

Uhrzeit vor/nach Abschnitt: 02:52:49 / 03:00:16 UTC. Nutzungslimits vor/nach: jeweils 64 % Wochenfenster genutzt, gewöhnliche Nutzung erlaubt. Coverage jetzt 321/380, WiSo 50/109, 59 verbleibend. Nächster offener Abschnitt: wiso-5__4. Keine Veröffentlichung und kein Push.
