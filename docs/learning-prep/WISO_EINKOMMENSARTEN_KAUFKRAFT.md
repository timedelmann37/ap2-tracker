# WiSo 5__10 – Einkommensarten und Kaufkraft

Abgeschlossen am 04.10.2026 auf `codex/ga1-linux-admin`. Einheit `einkommensarten-nominal-real-kaufkraft` bleibt `CURATED_DRAFT`; menschliche Freigabe ausstehend.

## Inhalt und Evidenz

Eigene Narevo-Fälle unterscheiden zwei unabhängige Dimensionen: Brutto/Netto und nominal/real. Zu versteuerndes Einkommen als steuerliche Jahresbasis abgegrenzt. Monatliche Übungsdaten: 3.000 Euro Brutto minus 750 Euro gesetzliche AN-Abzüge = 2.250 Euro nominales Netto; zvE 28.000 Euro ausdrücklich separat vorgegeben. Kaufkraftvergleich: Brutto 3.000 auf 3.090 Euro, Preisindex 100 auf 105. Neue Bruttokaufkraft in Ausgangspreisen 2.942,86 Euro, Änderung rund −1,90 Prozent. 3.150 Euro wären zur Erhaltung der Ausgangskaufkraft nötig. Nettoänderung ohne weitere Angaben nicht behauptet. Diagnose, vier Pflichtziele, Anwendung, Feedback, Recall und Tastaturkarten.

Private EUROPA-Rohquelle im Hauptcheckout Zeilen 5613–5633 direkt gelesen: Brutto-/Nettoabrechnung als angrenzender Themenanker. Suche nach Realeinkommen/Nominaleinkommen/Kaufkraft ohne Treffer; keine direkt belegte Buchherleitung behauptet und keine Buchfälle übernommen. Direkt geprüfte Primärquellen: EBV § 1 Absatz 2, EStG § 2 Absätze 2–5/7, Bundesbank-Glossar Reallohn, Bundesbank-Kaufkraftbeispiel (einseitige PDF) und EZB-Inflationserklärung. URLs und Stellen in Register/Einheit. Bundesbank-Preisquotient eigenständig für Bewertung in Ausgangspreisen umgekehrt; eigene Faktor-Algebra. Destatis-Abrufe gescheitert, nicht als direkt gelesen registriert. Keine tatsächlichen Inflationsdaten oder persönlichen Steuersätze behauptet.

Refero-Skill und Visual-Workflow angewandt: bestehende Entgelt-Lernseite tatsächlich angesehen, Deep-Space-Referenz-Lock und gemeinsamer Rahmen beibehalten. Zwei native technische SVG für Abrechnungsbegriffe und Preisbereinigung; zwei semantische MathML-Formeln mit zugänglichen Namen/Legenden. Kein dekoratives Rasterbild, kein ASCII.

## Tatsächlich geprüfte Ergebnisse

- Build bestanden: 1016 Dateien.
- `npm test` bestanden; zwei SKIPs für nicht importierte private Wissensbasis/Lernqueue und Buchdaten im Worktree. Privater Themenanker separat im Hauptcheckout direkt gelesen.
- `AP2_BROWSER_ONLY=einkommen node scripts/run-browser-tests.mjs` bestanden: 390/1440 px, Dark/Light, Reduced Motion, Diagnose, falsche/richtige Antworten mit Feedback, vier Pflichtziele, Recall-Längenprüfung/Modell, Enter/Space-Karten, Persistenz, Abschluss/Rücknahme und Reset-Sperre.
- Unabhängige Rechentests für Preisdeflation, exakte reale Rate statt Prozentdifferenz, Kaufkrafterhalt und Netto. Ergebnisse auf tatsächlich ausgelieferter Seite geprüft.
- Keine Browserfehler oder Seitenüberläufe. Diagrammtexte in Canvas und ihren Feldern; keine Überlappung zwischen Schlüssel/Detail. Mobile SVG bewusst seitlich scrollbar, Tastaturverschiebung geprüft. Formeln und Karten passen.
- Tatsächlich betrachtet: Mobile Dark Begriffsdiagramm, Desktop Light Kaufkraftfluss, Mobile Light Formeln und Desktop Dark Kartenrückseite.

Aufnahmen: `C:/Users/timed/AppData/Local/Temp/ap2-einkommen-20261004/`. Vorhandene angemeldete lokale Browserfixture verwendet; kein Produktionskonto geprüft.

Vor Abschnitt: 04:38:49 UTC, Codex-Wochenlimit 66 Prozent genutzt, gewöhnliche Nutzung erlaubt. Nach Inhalts-/Sichtprüfung: 04:44:05 UTC, ebenfalls 66 Prozent und Nutzung erlaubt. Coverage 328/380; WiSo 57/109; 52 Kernthemen verbleibend. Nächster offener Abschnitt wiso-5__11. Ausschließlich beabsichtigte Änderungen lokal gesichert; kein Push und keine Veröffentlichung.

