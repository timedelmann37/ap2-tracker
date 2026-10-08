# WiSo 5__6 – Gesetzliche und private Krankenversicherung

Abgeschlossen am 04.10.2026 auf `codex/ga1-linux-admin`. Einheit `gesetzliche-private-krankenversicherung-vergleich` bleibt `CURATED_DRAFT`; menschliche Freigabe ausstehend.

## Inhalt und Evidenz

Eigene Novera-Fälle zu vier getrennten Fragen: Zugang/Status, Beitragsmaßstab, Familienabsicherung und Abrechnungsweg. Kein automatischer PKV-Wechsel, keine pauschale Vollerstattung, keine freie Rückkehrgarantie. Gesetzliche Rückkehrbeschränkung ab 55 ausdrücklich nur mit zusätzlichen Bedingungen. Keine Tarifempfehlung oder individuelle Rechts-/Versicherungsberatung.

Private EUROPA-Rohquelle im Hauptcheckout Zeilen 5613–5623 direkt gelesen: GKV-Beiträge und Bemessungsgrenze als angrenzender Themenanker. Direkter PKV-Vergleich im geprüften Export nicht gefunden; nicht als Buchbeleg erfunden. Eigenständiger Vergleich aus direkt gelesenen Primärquellen: BMG Private Krankenversicherung und Systemwechsel; SGB V §§ 2, 3, 6, 10, 13; gesund.bund.de. Fehlgeschlagene BMG-Familien-URL durch § 10 und Bundesportal ersetzt. Vereinfachte Altersgrenze des Bundesportals nicht übernommen; gesetzliche Zusatzbedingungen berücksichtigt.

Refero-Skill und Visual-Workflow angewandt: vorhandene Deep-Space-Lernseite und Referenz-Lock als Build-Target, Rahmen/Tokens erhalten. Zwei native technische SVG (Beitragsmaßstab und Prüfweg); keine dekorativen Rasterbilder. Keine Berechnungsformel erforderlich.

## Tatsächlich geprüfte Ergebnisse

- Build bestanden: 1004 Dateien.
- `npm test` bestanden. Zwei SKIPs wegen nicht importierter privater Wissensbasis/Lernqueue und Buchdaten im Worktree; kein erfundener Privatdaten-Testpass. Themenanker separat im Hauptcheckout geprüft.
- `AP2_BROWSER_ONLY=krankenvergleich node scripts/run-browser-tests.mjs` bestanden: 390/1440 px, Dark/Light, Reduced Motion, Diagnose und falsche/richtige Antworten mit Feedback, vier Pflichtziele, Recall-Längenprüfung/Modell, Karten Enter/Space, Persistenz, Abschluss/Rücknahme und erneute Sperre nach Reset.
- Diagrammtexte in Canvas/eigenen Feldern, mobile Tastaturverschiebung, Kartenhöhe, kein Seitenüberlauf und keine Browserfehler.
- Finale Screenshots tatsächlich angesehen: Desktop Dark Beitragsvergleich und Prüfweg, Desktop Light Prüfweg, Mobile Dark Kartenrückseite, Mobile Light Quiz. Mobile Diagramme absichtlich seitlich scrollbar.

Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-kv-20261004/`. Vorhandene angemeldete lokale Browser-Testfixture; kein Produktionskonto geprüft.

Vor/nach Abschnitt: 03:38:49 / 03:43:24 UTC. Codex-Wochenlimit 64 / 65 % genutzt, gewöhnliche Nutzung erlaubt. Coverage: 324/380, WiSo 53/109, 56 verbleibend. Nächster offener Abschnitt wiso-5__7. Kein Push, keine Veröffentlichung.
