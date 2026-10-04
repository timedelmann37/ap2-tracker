# WiSo 5__7 – GKV-Beitrag mit Zusatzbeitrag berechnen

Abgeschlossen am 04.10.2026 auf `codex/ga1-linux-admin`. Einheit `krankenversicherung-beitrag-zusatzbeitrag-berechnen` bleibt `CURATED_DRAFT`; menschliche Freigabe ausstehend.

## Inhalt und Evidenz

Eigene Riva-Fälle: Lene mit 4000 Euro beitragspflichtigem Monatsentgelt und fiktivem kassenindividuellem Zusatzbeitrag von 3,0 Prozent; Ovin mit 6000 Euro und fiktiven 1,4 Prozent. Für einen vollen Monat regulärer Beschäftigung außerhalb des Übergangsbereichs, allgemeiner Beitragssatz mit Krankengeldanspruch, ohne Einmalzahlungen. Beitragsbasis, Gesamtsatz und Arbeitnehmeranteil getrennt bestimmen: Lene 352 Euro Arbeitnehmeranteil, Ovin bei auf 5812,50 Euro begrenzter Basis 465 Euro. Keine vollständige Nettoabrechnung; Pflegeversicherung und Jahresarbeitsentgeltgrenze nicht mit KV-Rechenbasis vermischt.

Private EUROPA-Rohquelle im Hauptcheckout Zeilen 5613–5631 direkt gelesen: Beitragssätze, Bemessungsgrenze und Berechnungsfrage ausschließlich als Themenanker. Keine Buchfälle übernommen. Aktuelle Primärquellen direkt geprüft: SGB V § 241 (14,6 Prozent), § 223 (Beitragsbasis und Begrenzung) sowie BMG „Beiträge“ (2026-Grenze, kassenindividueller Zusatzbeitrag und hälftige Tragung). Durchschnittlicher Zusatzbeitrag nicht als tatsächlicher Kassensatz verwendet. Abrufe von §§ 249 und 242 fehlgeschlagen; nicht als gelesene Evidenz registriert. BMG belegt die benötigten Aussagen. Zeitabhängige Angaben ausdrücklich auf 2026 bezogen.

Refero-Skill und Visual-Workflow angewandt: bestehende Deep-Space-Lernseite und Referenz-Lock als Build-Target, gemeinsame Tokens erhalten. Zwei native technische SVG für Rechenweg und Fehlerprüfung. Drei semantische MathML-Blöcke mit zugänglichen Beschriftungen; Prozentzahlen und Dezimalfaktor ausdrücklich unterschieden. Keine dekorativen Rasterbilder oder ASCII-Diagramme.

## Tatsächlich geprüfte Ergebnisse

- Build bestanden: 1007 Dateien.
- `npm test` bestanden. Zwei SKIPs wegen nicht importierter privater Wissensbasis/Lernqueue und Buchdaten im Worktree; Themenanker separat im Hauptcheckout geprüft.
- `AP2_BROWSER_ONLY=kv-beitrag node scripts/run-browser-tests.mjs` bestanden: 390/1440 px, Dark/Light, Reduced Motion, Diagnose, falsche/richtige Antworten mit Feedback, vier Pflichtziele, Recall-Längenprüfung/Modell, Karten Enter/Space, Persistenz, Abschluss/Rücknahme und Sperre nach Reset.
- Diagrammtexte innerhalb Canvas/eigener Felder, mobile Tastaturverschiebung, Kartenhöhe, kein Seitenüberlauf und keine Browserfehler. Mobile Diagramme absichtlich seitlich scrollbar.
- Rechenwerte unabhängig geprüft: Arbeitnehmeranteile 352/465 Euro, Gesamtbeiträge 704/930 Euro.
- Finale Screenshots tatsächlich angesehen: Desktop Dark Fehlerdiagramm, Desktop Light Formeln, Mobile Dark Formeln und Mobile Light Quiz.

Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-beitrag-20261004/`. Vorhandene angemeldete lokale Browser-Testfixture; kein Produktionskonto geprüft.

Vor/nach Abschnitt: 03:53:48 / 03:57:57 UTC. Codex-Wochenlimit jeweils 65 Prozent genutzt, gewöhnliche Nutzung erlaubt. Coverage: 325/380, WiSo 54/109, 55 verbleibend. Nächster offener Abschnitt wiso-5__8. Ausschließlich lokale Sicherung; kein Push und keine Veröffentlichung.
