# WiSo 5__8 – Rentenarten und drei Säulen der Altersvorsorge

Abgeschlossen am 04.10.2026 auf `codex/ga1-linux-admin`. Einheit `rentenarten-altersvorsorge-drei-saeulen` bleibt `CURATED_DRAFT`; menschliche Freigabe ausstehend.

## Inhalt und Evidenz

Eigene Veyra-Fälle trennen Leistungsanlass und Vorsorgeweg: Miro (Altersrente, fehlende Wartezeit), Sena (bisheriger Beruf versus allgemeiner Arbeitsmarkt), Lio (mögliche Halbwaisenrente) und Aki (gesetzliche Ansprüche, Betriebsrente, privater Vertrag). Vier Pflichtziele mit Diagnose, Anwendung, erklärendem Feedback, Recall und Tastaturkarten. Keine individuelle Anspruchs- oder Anlageberatung, keine Renditegarantie. Weitere Voraussetzungen und Übergangsregeln ausdrücklich von der Zuordnung unterschieden.

Private EUROPA-Rohquelle im Hauptcheckout Zeilen 5803–5808 direkt gelesen: Generationenvertrag ausschließlich als angrenzender Rentenanker; keine direkt belegte Drei-Säulen-Darstellung im geprüften Export erfunden. Keine Buchfälle übernommen. Direkt geprüfte Primärdokumentation: SGB VI §§ 33 und 35, DRV-Seiten zu Regelaltersrente, Erwerbsminderung, Hinterbliebenen und drei Säulen, BMAS zur Betriebsrente sowie BetrAVG § 1 zur arbeitsbezogenen Zusage und externen Durchführung. § 43 SGB VI zweimal nicht abrufbar; nicht als gelesene Evidenz registriert, Erwerbsminderungsmaßstab aus direkt gelesener DRV-Seite. Veraltete Steuerprognose der Drei-Säulen-Seite nicht übernommen.

Refero-Skill und Visual-Workflow angewandt: vorhandene Deep-Space-Lernseite und Referenz-Lock als Build-Target, gemeinsame Rahmen/Tokens erhalten. Zwei native technische SVG zeigen getrennte Ordnungsebenen; kein Rasterbild und kein ASCII-Ersatz. Keine Berechnungsformel erforderlich. Browserprüfung erkannte zunächst zu breite Langbeschriftungen in den Diagrammschlüsseln; durch fachliche Kurzformen GRV/bAV mit ausgeschriebener Legende behoben, erneut bestanden.

## Tatsächlich geprüfte Ergebnisse

- Build bestanden: 1010 Dateien.
- Finale `npm test`-Suite bestanden. Zwei SKIPs wegen nicht importierter privater Wissensbasis/Lernqueue und Buchdaten im Worktree; Themenanker separat im Hauptcheckout geprüft.
- `AP2_BROWSER_ONLY=rentenarten node scripts/run-browser-tests.mjs` bestanden: 390/1440 px, Dark/Light, Reduced Motion, Diagnose, falsche/richtige Antworten mit Feedback, vier Pflichtziele, Recall-Längenprüfung/Modell, Karten Enter/Space, Persistenz, Abschluss/Rücknahme und erneute Sperre nach Reset.
- Diagrammtexte in Canvas und eigenen Feldern, Schlüsseltexte ohne Detailüberlappung, mobile Tastaturverschiebung, Kartenhöhe, kein Seitenüberlauf und keine Browserfehler. Mobile Diagramme absichtlich seitlich scrollbar.
- Finale Darstellung tatsächlich angesehen: Desktop Dark Leistungsanlässe, Desktop Light Vorsorgewege, Mobile Dark Kartenrückseite und Mobile Light Quiz.

Screenshots: `C:/Users/timed/AppData/Local/Temp/ap2-renten-20261004/`. Vorhandene angemeldete lokale Browser-Testfixture; kein Produktionskonto geprüft.

Vor Abschnitt: 04:08:50 UTC, Codex-Wochenlimit 65 Prozent genutzt, gewöhnliche Nutzung erlaubt. Nach Inhalts- und Sichtprüfung: 04:14:56 UTC, ebenfalls 65 Prozent und Nutzung erlaubt. Coverage: 326/380, WiSo 55/109, 54 verbleibend. Nächster offener Abschnitt wiso-5__9. Ausschließlich lokale Sicherung; kein Push und keine Veröffentlichung.
