# WiSo: Zahlungsarten, Kredite, Sicherheiten und Leasing/Kauf

Stand 04.10.2026. Kernthema `wiso-7__11`, **CURATED_DRAFT**. Keine menschliche Freigabe, kein Push oder Deployment.

## Abgeschlossener Umfang

60-Minuten-Einheit mit Diagnose, vier Pflicht-Lernzielchecks, eigenen Anwendungs- und Transferfällen, numerischem Feedback, Abrufaufgabe und vier Tastatur-Lernkarten. Drei präzise SVG-Vergleiche und zwei semantische MathML-Formeln. Zahlungsauslösung, Finanzierung, Sicherung und Beschaffung werden getrennt erklärt. Die undiskontierte Modellrechnung ergibt 9.000 Euro Kauf-Mittelabfluss und 9.960 Euro Leasingzahlungen; Liquidität, Endzustand und ausgeschlossene Kosten stehen am Fall.

Geprüfte amtliche Quellen und tatsächlich gelesene private Themenanker sind in [ZAHLUNG_KREDIT_LEASING_QUELLEN.md](./ZAHLUNG_KREDIT_LEASING_QUELLEN.md) dokumentiert. Keine private Aufgabe übernommen. Rechts-, Kredit- oder Steuerberatung wird nicht behauptet. Bestehende Refero-/Deep-Space-Richtung und gemeinsame Runtime unverändert übernommen.

## Tatsächlich ausgeführte Prüfung

- `npm run build`: erfolgreich, 1.113 Dateien.
- `npm test`: erfolgreich (Site, Compiler, Lernbatch, Lerninhalte, Netzplan/Gantt, Fortschrittsmerge, SQL). Buchdaten-Prüfung meldet mangels Import im Worktree SKIP; kein bestandener privater Importtest behauptet.
- `AP2_BROWSER_ONLY=zahlung-kredit node scripts/run-browser-tests.mjs`: erfolgreich. Lernziel-Sperren, Falsch-/Richtigfeedback, Diagnose ohne Freischaltung, Rechenfehlermuster 9.360 versus 9.960, Dezimalkomma, Abruf-Minimallänge, Karten per Enter/Space, Reload-Persistenz, Abschluss/Rücknahme und erneute Sperre getestet.
- 390 und 1.440 Pixel, jeweils Dark/Light: Seitenoverflow, Kartenfront/-rückseite, SVG-Texte im Canvas und ihren Kästen geprüft. Mobile Diagramm-Scroll per Tastatur getestet. Keine Pageerrors.
- Erster Browserlauf fand eine überlange Lastschrift-Beschriftung. Detailtexte gekürzt, neu gebaut und komplette gezielte Prüfung erneut bestanden.
- 44 Screenshots in `C:/Users/timed/AppData/Local/Temp/ap2-fin-20261004`. Tatsächlich visuell angesehen: `390-dark-start.png`, `390-light-formula-1.png`, `1440-dark-figure-2.png`, `1440-light-case.png`. Titel, Entwurfskennzeichnung, lesbare Formeln, Diagrammbeschriftungen und Praxisfall geprüft; kein vollständiger manueller Review aller 44 Bilder behauptet.

Coverage nach Build: 355/380 implementiert, 25 offen; WiSo 84/109. „Implementiert“ bedeutet keine menschliche Freigabe. Nächstes offenes Thema: `wiso-7__12` Verbraucherschutz/Widerruf/Fernabsatz.
