# Abmahnung: Zweck, Voraussetzungen und Folgen

Stand: 04.10.2026. Branch: `codex/ga1-linux-admin`. Kernthema: `wiso-3__6`.
Lernseite: `/lernen/abmahnung-zweck-voraussetzungen-folgen/`.
Status: **CURATED_DRAFT**, keine menschliche Freigabe oder Veröffentlichung.

## Abgeschlossener Inhalt

Eigene IT-Support-Fälle mit Tera/Neravo: schuldhaft verspäteter Schichtbeginn, Ermahnung ohne Bestandswarnung, einschlägige Wiederholung und genehmigte Schulung als Gegenfall.
Diagnose, vier verpflichtende Lernziel-Checks mit Fehlerfeedback, Korrekturübung, eigener Transfer mit Musterlösung und vier Tastatur-Lernkarten.
Zwei native technische SVG: Inhalts-Prüfweg und Kategorienvergleich. Keine dekorativen Rasterbilder und keine ASCII-Grafik; keine Rechenformel erforderlich.

## Quellen und Grenzen

Private Rohpakete geprüft: IT-Basiswissen 2012, Zeile 6501, nur Themenanker Abmahnung in einem Urheberrechtsfall; keine Fallübernahme oder aktuelle Rechtsregel. ITLF6–9-Treffer urheberrechtlich, hier nicht als Arbeitsrechtsbeleg verwendet. EUROPA und IHK Bonn ohne direkte Abmahnungs-Treffer.
BAG 19.07.2012 – 2 AZR 782/11, Rn. 13, 20–21: Funktionen, Entfernung und Dokumentationsinteresse. BAG 10.06.2010 – 2 AZR 541/09, Rn. 28, 34–38: Prognose, mildere Mittel und Ausnahmen.
IHK Düsseldorf, Stand Juni 2024: ausschließlich Formfreiheit und Beweisfrage übernommen; pauschale Anhörungs-/Entbehrlichkeitsaussagen nicht übernommen. BetrVG § 84 Absätze 1–3 direkt gelesen. § 83 Einzel-, PDF- und Gesamtabruf scheiterten; dessen Detailrechte nicht aus ungeprüftem Text erklärt.
Keine starre Drei-Abmahnungen-, Verfalls- oder Löschregel. Keine automatische Kündigungsfreigabe bei Vertrauensbruch. Warnung, Beschwerde, Entfernung und Beendigung getrennt; keine individuelle Rechtsberatung.

## Tatsächlich ausgeführte Prüfung

- Vor Beginn Branch/sauberen Status, AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage geprüft.
- Bestehenden Deep-Space-Referenz-Lock und tatsächliche vorherige Lernseitenansicht als Build-Target verwendet; gemeinsame Komponenten unverändert.
- `npm run build`: erfolgreich, 953 Dateien.
- `npm test`: erfolgreich. Zwei erwartete SKIPs: lokale Lernqueue und lokale Buchdaten im Worktree nicht importiert. Private Themenanker separat aus Hauptcheckout gelesen.
- Gezielter Browserlauf `AP2_BROWSER_ONLY=abmahnung`: erfolgreich bei 390/1440 Pixeln, Dark/Light, Reduced Motion. Keine JavaScript-Seitenfehler oder Seitenüberläufe.
- Diagnose ohne Gatewirkung, Fehlantwort/Reset/Richtantwort aller vier Checks, gesperrter/freigegebener Abschluss, Speicherung nach Reload, Abschluss/Undo und erneute Sperre bei Quiz-Reset geprüft.
- Kurzer Transfer bleibt gesperrt; ausreichender eigener Text und Musterlösung, Enter/Space aller Karten und Textpassung beider Kartenseiten geprüft.
- SVG-Text innerhalb Canvas und eigener Spalte, mobile Diagrammsteuerung per Pfeiltaste geprüft.
- Tatsächlich angesehen: `1440-dark-figure-0.png`, `1440-light-figure-1.png`, `390-light-quiz.png`, `390-dark-card-reverse.png` unter `C:/Users/timed/AppData/Local/Temp/ap2-abmahn-20261004/`. Lesbare Labels, ruhige Glaspaneele, keine festgestellten materiellen visuellen Mängel.
- Keine vollständige globale Browser-Suite, kein Screenreader-/WCAG-Audit oder reales Rechtsfallgutachten behauptet.
- Nach Abschnitt Uhrzeit/Nutzung geprüft: 03.10.2026 23:29:54 UTC; Nutzung erlaubt, Wochenfenster 61 % verbraucht.

Coverage: 307/380, WiSo 36/109; W3 7/8. Nächstes offenes Thema: `wiso-3__7` Betriebsübergang (§ 613a BGB).
Nur abschnittsbezogene lokale Änderungen sichern; kein Push, keine Veröffentlichung, keine Branch-Löschung.
