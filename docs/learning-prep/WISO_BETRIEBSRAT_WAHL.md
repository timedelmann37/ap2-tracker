# WiSo W4: Betriebsrat – Wahl, Größe, Amtszeit und Freistellung

Stand: 04.10.2026. Einheit `wiso-4__0`, Status **CURATED_DRAFT**, keine menschliche Freigabe und keine Veröffentlichung.

## Abgeschlossener Abschnitt

- Eigenständiger Talvero-Fall mit ausdrücklich gesetzten Zählvoraussetzungen; 220 Arbeitnehmer ergeben neun Sitze und mindestens eine volle Freistellung.
- Aktives Wahlrecht ab 16 und Wählbarkeit grundsätzlich ab 18 plus sechs Monate Zugehörigkeit getrennt; alte Buchaltersregel nicht übernommen.
- Gesetzliche Zählgruppen in § 9, vereinfachtes Wahlverfahren, regelmäßiger Wahlzeitraum und Amtszeit sowie Sonderfälle erklärt.
- § 37 erforderliche Arbeitsbefreiung von § 38 Mindestfreistellungen abgegrenzt; 120er-Gegenfall und 199/200/201-Schwellenvergleich.
- Diagnose, vier erforderliche Lernziel-Checks, Anwendung mit Feedback, eigener Transfer vor Musterlösung, vier tastaturbedienbare Karteikarten.
- Zwei native SVG: Prüfweg und Schwellenvergleich. Keine dekorativen Rasterbilder, keine ASCII-Darstellung; keine Rechenformel erforderlich.

## Quellen und Gestaltung

Private EUROPA-Rohquelle Zeilen 4360–4378 als Themenanker direkt gelesen, keine Buchfälle kopiert. Aktuelle amtliche Einzeltexte §§ 1, 7, 8, 9, 13, 14, 14a, 21, 37 und 38 BetrVG direkt gelesen. §§ 1 und 38 per Webabruf, übrige Normen per HTTPS-Terminalabruf nach Web-Timeout. Quellen und konkrete Nutzung im Register und Kurationsartefakt. Keine individuelle Rechtsberatung, keine Wahlverfahrens-Komplettanleitung.

Refero-Skill einschließlich Visual-Workflow und bestehender Deep-Space-Reference-Lock angewendet; vorhandene Betriebsübergangs-Abbildung tatsächlich angesehen. Gemeinsame Komponenten und Styles bleiben unverändert. Der bestehende Doppler/Astro/n8n-Bezug wurde nicht neu gestaltet.

## Tatsächlich durchgeführte Prüfung

- `npm run build`: erfolgreich, 959 Dist-Dateien.
- `npm test`: erfolgreich. Zwei ausdrücklich gemeldete SKIPs: lokale Wissensbasis/Lernqueue und lokale Buchdaten sind im Ziel-Worktree nicht importiert; private Themenanker wurden separat im Hauptcheckout gelesen.
- `AP2_BROWSER_ONLY=betriebsrat node scripts/run-browser-tests.mjs`: erfolgreich nach Korrektur eines veralteten Karteikarten-Selektors im neuen Test. Kein Produktfehler hierfür behauptet.
- Chromium: 390 und 1440 px, je Dark/Light, Reduced Motion. Diagnose ohne Abschlusswirkung; falsche Antwort/Reset/richtige Antwort für vier Ziele; Persistenz, Markieren/Rücknahme und erneutes Sperren.
- Transfer: zu kurze Antwort hält Musterlösung gesperrt, ausreichende Antwort schaltet sie frei. Karteikarten mit Enter/Space; Vorder- und Rückseitentext passt.
- Diagrammtext innerhalb SVG und eigener Spalte; mobiler Diagrammbereich per Tastatur scrollbar; kein horizontaler Seitenüberlauf und keine pageerror-Ereignisse.
- Vier Screenshots selbst betrachtet: Desktop-Dark Prüfweg, Desktop-Light Schwellenvergleich, Mobile-Dark Kartenrückseite, Mobile-Light Quiz. Lesbare technische Labels, Feedback und Fokusumrandung.
- Screenshot-Verzeichnis: `C:/Users/timed/AppData/Local/Temp/ap2-br-20261004`; nicht versioniert.
- Kein vollständiger Screenreader-/WCAG-Audit und kein vollständiger Browser-Gesamtlauf behauptet.

## Stand und nächste Fortsetzung

Coverage: **309/380**, WiSo **38/109**, W4 **1/9**. Nächstes offenes Kernthema: `wiso-4__1`, Beteiligungsrechte.

Vor Abschnitt: 03.10.2026 23:52:48 UTC; nach Prüfungen: 04.10.2026 00:00:32 UTC. Codex-Wochenfenster jeweils 61 % verbraucht, gewöhnliche Nutzung erlaubt. Keine Reset-Gutschrift verwendet.

Nur beabsichtigte neue Einheit, Quellen, generierte Artefakte, Browsertest und diese Notiz lokal gesichert. Kein Push, keine Veröffentlichung, keine Branch-Löschung.
