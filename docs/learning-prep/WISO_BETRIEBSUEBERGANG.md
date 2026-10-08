# Betriebsübergang nach § 613a BGB

Stand: 04.10.2026. Branch: `codex/ga1-linux-admin`. Kernthema: `wiso-3__7`.
Lernseite: `/lernen/betriebsuebergang-rechte-unterrichtung-widerspruch/`.
Status: **CURATED_DRAFT**, keine menschliche Freigabe oder Veröffentlichung.

## Abgeschlossener Inhalt und Grenzen

Eigene IT-Service-Fälle Iven/Solviro/Velanto: organisierte Einheit und wirksame Zuordnung ausdrücklich gesetzt; Vertragskontinuität, Jahresregel nur für bestimmte transformierte kollektive Rechte mit Ausnahmen, Kündigungsgrenze und begrenzte zusätzliche Alt-Arbeitgeberhaftung.
Unterrichtung mit vier Gegenständen und Textform; Widerspruch mit Monatsfrist, Schriftform und getrennten Beschäftigungsrisiken. Zugang 06.10.2026/Übergang 01.11.2026 als Anknüpfungsvergleich, keine ungeprüfte konkrete Fristendberechnung oder Widerspruchsempfehlung.
Diagnose, vier Pflicht-Lernziel-Checks mit Feedback, Korrekturübung, Transfer mit Musterlösung, vier Tastatur-Lernkarten, zwei native technische SVG. Keine Rasterdekoration, kein ASCII-Ersatz; keine Rechenformel erforderlich.

## Geprüfte Quellen

Vier private Rohpakete auf Betriebsübergang/Betriebsuebergang/613a direkt durchsucht: keine Treffer. EUROPA Zeile 5751 als allgemeiner Individualarbeitsrecht-/Kündigungsschutz-Themenanker gelesen, nicht als Beleg konkreter Übergangsregeln.
BGB § 613a Absätze 1–6 und § 126b direkt von Gesetze im Internet per HTTPS-Terminalabruf gelesen; Web-Einzel-/Gesamtabrufe § 613a scheiterten.
BAG 23.05.2013 – 8 AZR 426/12, Rn. 22–25: Identität, Gesamtwürdigung, Funktions-/Auftragsnachfolge. BAG 21.03.2024 – 2 AZR 79/23, Leitsätze sowie Rn. 53–57: wirksame Zuordnung, nicht jeder juristische Unterrichtungsfehler verhindert Fristbeginn. Ältere strengere Aussagen nicht pauschal übernommen.
Kein Insolvenz-/Umwandlungsfall. Keine individuelle Rechtsberatung oder Arbeitsplatzgarantie.

## Tatsächlich ausgeführte QA

- Vor Abschnitt Branch, sauberen Status, AGENTS.md, DESIGN.md, PRODUCT.md, CONTEXT.md und Coverage geprüft.
- Refero-Skill für bestehende Designbindung/Prüfroutine verwendet; Deep-Space-Referenz-Lock Doppler/Astro/n8n und tatsächliche Abmahnungs-Seite als Ziel geprüft. Gemeinsame Komponenten/Styles unverändert.
- `npm run build` erfolgreich: 956 Dateien.
- `npm test` erfolgreich; zwei erwartete SKIPs wegen nicht importierter lokaler Lernqueue/Buchdaten im Worktree. Private Themenanker separat im Hauptcheckout geprüft.
- `AP2_BROWSER_ONLY=betriebsuebergang` erfolgreich: 390/1440 Pixel, Dark/Light, Reduced Motion, keine JavaScript-Seitenfehler oder Seitenüberläufe.
- Diagnose ohne Gatewirkung, falsche/richtige Antworten und Reset aller vier Pflicht-Checks, Abschlussfreigabe, Reload-Persistenz, Abschluss/Undo und erneute Sperre nach Reset geprüft.
- Zu kurze Transferantwort gesperrt, ausreichender Text/Musterlösung, Enter/Space aller Lernkarten und Textpassung beider Seiten geprüft.
- SVG-Text innerhalb Canvas/eigener Spalte; mobile Diagrammsteuerung per Pfeiltaste geprüft.
- Vier tatsächliche Sichtprüfungen unter `C:/Users/timed/AppData/Local/Temp/ap2-betrieb-20261004/`: `1440-dark-figure-0.png`, `1440-light-figure-1.png`, `390-light-quiz.png`, `390-dark-card-reverse.png`. Labels, Rückseiten und Feedback lesbar, keine festgestellten materiellen visuellen Mängel.
- Keine vollständige globale Browser-Suite oder Screenreader-/WCAG-Zertifizierung behauptet.
- Nach Abschnitt Uhrzeit/Nutzung geprüft: 03.10.2026 23:43:10 UTC; Nutzung erlaubt, Wochenfenster 61 % verbraucht.

Coverage: 308/380, WiSo 37/109. W3 jetzt 8/8 implementiert; menschliche Inhaltsfreigabe bleibt separat.
Nächstes offenes Thema `wiso-4__0`: Betriebsverfassungsgesetz – Wahl, Größe, Amtszeit und Freistellung des Betriebsrats.
Nur abschnittsbezogene lokale Änderungen sichern; kein Push, keine Veröffentlichung, keine Branch-Löschung.
