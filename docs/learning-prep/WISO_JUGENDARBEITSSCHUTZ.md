# WiSo: Jugendarbeitsschutz

Stand: 03.10.2026. Kernthema `wiso-1__6`; `CURATED_DRAFT` bis menschliche Fachfreigabe.

## Tatsächlich abgeschlossener Inhalt

Eigene Neris-Mira-Fälle für eine minderjährige, nicht mehr vollzeitschulpflichtige Auszubildende an rein betrieblichen Tagen. Arbeitszeit ohne Pausen von Schichtzeit mit Pausen getrennt. Grundgrenzen acht Stunden täglich, 40 Stunden wöchentlich, Fünf-Tage-Woche, zwölf Stunden Freizeit sowie Nacht-/Wochenendgrundregeln erläutert. Begrenzte 8,5-Stunden-Ausnahme nach § 8 Abs. 2a nicht als allgemeine Überstundenfreigabe dargestellt.

Pausenstaffel, mindestens 15 Minuten je Einzelpause, zeitliche Lage und höchstens 4,5 Stunden am Stück. Eigener Plan 08:00–17:00 mit Pause 12:00–13:00: acht Stunden Nettoarbeit, zwei Vierstundenblöcke. Gegenprobe mit halber Stunde Pause erkennt unabhängigen Pausenfehler. Semantisches MathML zeigt neun Stunden minus eine Stunde gleich acht Stunden; kein Rechenergebnis als vollständige Dienstplanfreigabe.

Urlaub mit Altersstichtag Jahresbeginn und Staffel 30/27/25 gesetzliche Werktage. Miras Geburtstag im Juni ändert die Jahresanfangsstaffel nicht. Werktage einschließlich Samstag von betrieblichen Arbeitstagen getrennt; keine falsche Umbenennung der Gesetzeszahl. Voller Jahresanspruch als Fallannahme, Wartezeit und Teilurlaub gesondert. Berufsschulbesuch während Urlaub mit zusätzlichem Urlaubstag erläutert.

Gefährliche Aufgaben nach § 22, eng begrenzte Ausnahme nur für Nummern 3–7, Ausbildungsbedarf und fachkundige Aufsicht sowie zusätzliche Schutzbedingungen. Keine Freigabe elektrotechnischer Arbeiten. Akkord-/Tempoarbeit nach § 23 eigenständig abgegrenzt; keine pauschale Freigabe durch Ausbildungsvertrag.

Diagnose, drei Pflichtchecks mit Feedback/Reset, Transfer mit Mindestlänge/Muster und drei Enter-/Space-Karten. Zwei technische native SVGs im bestehenden Design: Zeitregelvergleich und Gefahrprüfung. Keine Rasterdekoration und kein ASCII-Ersatz.

## Quellenprüfung und Grenzen

- [JArbSchG § 2: Altersgrenzen](https://www.gesetze-im-internet.de/jarbschg/__2.html): Absätze 1–3 direkt gelesen am 03.10.2026.
- [JArbSchG § 8: Dauer der Arbeitszeit](https://www.gesetze-im-internet.de/jarbschg/__8.html): Absätze 1–3 direkt gelesen am 03.10.2026.
- [JArbSchG § 11: Ruhepausen](https://www.gesetze-im-internet.de/jarbschg/__11.html): Absätze 1–3 direkt gelesen am 03.10.2026.
- [JArbSchG § 12: Schichtzeit](https://www.gesetze-im-internet.de/jarbschg/__12.html): Normtext direkt gelesen am 03.10.2026.
- [JArbSchG § 13: Tägliche Freizeit](https://www.gesetze-im-internet.de/jarbschg/__13.html): Normtext direkt gelesen am 03.10.2026.
- [JArbSchG: Zeitbegriffe, Nacht- und Wochenendruhe](https://www.gesetze-im-internet.de/jarbschg/BJNR009650976.html): §§ 4, 14–17 im amtlichen Suchabruf gelesen; nicht gesamtes Gesetz am 03.10.2026.
- [JArbSchG § 15: Fünf-Tage-Woche](https://www.gesetze-im-internet.de/jarbschg/__15.html): Normtext im amtlichen Suchabruf gelesen am 03.10.2026.
- [JArbSchG § 19: Urlaub](https://www.gesetze-im-internet.de/jarbschg/__19.html): Absätze 1–4 im amtlichen Suchabruf gelesen am 03.10.2026.
- [JArbSchG § 22: Gefährliche Arbeiten](https://www.gesetze-im-internet.de/jarbschg/__22.html): Absätze 1–3 im amtlichen Suchabruf gelesen am 03.10.2026.
- [JArbSchG § 23: Akkord- und tempoabhängige Arbeit](https://www.gesetze-im-internet.de/jarbschg/__23.html): Absätze 1–2 direkt gelesen am 03.10.2026.
- [BUrlG: Werktagsbegriff und Urlaub](https://www.gesetze-im-internet.de/burlg/BJNR000020963.html): § 3 Abs. 2 und §§ 4–5 im amtlichen Suchabruf gelesen am 03.10.2026.
- Direkte Gesamtausgabe und mehrere Einzelabrufe lieferten Timeouts. Bei den genannten Suchabrufen wurde der lesbare amtliche Normtext genutzt, nicht bloß ein Titel. Keine erfolgreiche direkte Seitenlektüre oder vollständige Gesetzeslektüre behauptet.
- Private Quelle `europa-integratoren-2026`, Rohtext Zeilen 471–480 im Hauptrepository: geprüfter allgemeiner Themenanker Arbeitsrecht/Arbeitszeitregelungen, kein spezifischer Beleg aller Schutzvorschriften. Keine Buchaufgabe/Lösung/Grafik übernommen. Quellenrollen gemäß `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md`.
- Kinderarbeit, Berufsschulanrechnung, medizinische Erstuntersuchung und sämtliche Branchen-/Tarifausnahmen nicht vollständig behandelt. Kein juristischer Entscheidungsautomat.
- Refero-Routine und vorhandenen Deep-Space-Lock beibehalten; letzte Lernseite anhand ihrer geprüften Desktopansicht verglichen. Gemeinsame Gestaltung unverändert.

## Verifikation

- Build Exit 0, 868 Dateien. Vollständiges `npm test` Exit 0: Site, Compiler, Batch, Lerninhalte, Fortschrittsmerge und Leaderboard-SQL.
- Private Buchdaten im Worktree nicht importiert; der separat im Hauptrepository gelesene Themenanker ist kein erfolgreicher Worktree-Import.
- `AP2_BROWSER_ONLY=youth-protection node scripts/run-browser-tests.mjs` Exit 0, nach ergänzter expliziter MathML-Anzahl-/Rechnungsprüfung erneut ausgeführt.
- Test-Anmeldung; falsche/richtige Diagnose und Feedback/Reset; drei Pflichtchecks, Transfer-Mindestlänge/Muster, Tastaturkarten, Persistenz, Abschluss/Rücknahme und erneute Sperre nach Zielreset.
- 390/1440 Pixel in Dark/Light mit Reduced Motion: keine Seitenüberläufe oder Laufzeitfehler; SVG-Texte im Canvas/eigenen Rechtecken, Diagrammscrollen per Tastatur, Karten ohne Textkollision und zugänglich benannte Formel.
- Fünf Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-youth-20261003/` angesehen: Desktop-Dark-Zeitregeln, Mobile-Light-Formel, Desktop-Light-Dienstplan, Mobile-Dark-Urlaubskartenrückseite und Desktop-Light-Gefahrprüfung.
- Kein formaler WCAG-Nachweis oder juristische Fachfreigabe behauptet.

Abdeckung: 279/380 Entwürfe, WiSo 8/109, `wiso-1` 7/14. Nächster Abschnitt: `wiso-1__7`, volljährige Auszubildende. Dort die fehlerverdächtige Katalogaussage „längere Probezeit möglich“ gegen § 20 BBiG prüfen; keine Katalogkorrektur in diesem Abschnitt. Nur lokale Sicherung, kein Push oder Veröffentlichung.
