# GA1-10__4 – Change-Prozess

Stand: 03.10.2026. CURATED_DRAFT; menschliche Freigabe ausstehend.

## Tatsächlich abgeschlossener Abschnitt

Eigenständiger Auenblick-Fall CHG-24: Antrag, Risikobewertung, Autorisierung, Umsetzung, Rückfallplan und Change-Freeze. Vier verpflichtende Lernziel-Checks mit begründetem Feedback, Diagnose, freie Transferantwort und sieben Tastatur-Lernkarten. Zwei editierbare technische SVG-Abläufe und eine semantische MathML-Zeitbudgetformel.

Eigene Zeitannahmen: Fenster 20:00–21:00 Uhr; 10 Minuten Rücksetzen, 10 Minuten Prüfung, 10 Minuten Reserve; letzter Rückfallstart 20:30 Uhr. Ein erfülltes Fehlerkriterium um 20:18 Uhr verlangt bereits den vorgesehenen Fehlerweg. Kein universelles Zeitversprechen und keine Datenbankschemamigration im vereinfachten Rechenfall. Datenverträglichkeit, Konsistenz und neue Schreibvorgänge werden als Grenzen von Snapshot und Paket-Rollback erläutert.

## Quellen und Entwurfsbindung

- Privater Themenanker europa-integratoren-2026:00038, Zeilen 443–468: Systemaktualisierung evaluieren, Wiederherstellung und Tests dokumentieren; keine Buchaufgaben übernommen.
- Atlassian Change management types: Standard, Normal und Emergency changes direkt gelesen am 03.10.2026. Keine übernommenen Anbieterfälle.
- Microsoft Safe deployment practices: Failure detection, stateful rollback, safety guardrails und Emergency SDP protocols direkt gelesen. Nicht als allgemeine Zeitnorm verwendet.
- GitLab Releases: Prevent unintentional releases by setting a deploy freeze direkt gelesen. Freeze-Zeitfenster und tatsächlich durchgesetzte Ausführungssperre unterscheiden.
- Eigene Freeze-Regel, Ausnahmeweg und Falltests ausdrücklich als Organisationsannahmen gekennzeichnet.
- DESIGN.md und bestehender Doppler-/Astro-/n8n-Referenz-Lock gelesen; bestehende Lernseite vor Implementierung visuell als Vergleich geprüft. Direkter Build im bestehenden System, keine neue Gestaltungsrichtung.

## Ausgeführte Prüfung

npm run build und npm test erfolgreich.
Isolierter Browserlauf AP2_BROWSER_ONLY=change-process npm run test:browser erfolgreich, anschließend mit zusätzlicher Formelprüfung erneut erfolgreich. Breite vollständige Browser-Suite nicht ausgeführt; neuer Lauf zusätzlich in diese eingehängt.

Falschantwort, Feedback, Reset und korrekte Lernziel-Freischaltung; eigene Antwort vor Musterlösung; Enter/Space-Lernkarten; Persistenz nach Reload; Abschluss und Rücknahme geprüft. Vier Zustände: 390/1440 Pixel, Dark/Light, Reduced Motion. Kein Seitenüberlauf bei Formel und Diagrammen, SVG-Texte im Canvas, mobile Diagramme per Tastatur verschiebbar.

Fünf Screenshots tatsächlich angesehen unter C:/Users/timed/AppData/Local/Temp/ap2-change-20261003/:
1440-dark-figure-0.png, 390-light-figure-1.png, 1440-light-start.png, 390-dark-start.png, 390-light-formula.png.
Leseflächen, Typografie, Diagrammrahmen und Formel passen zur bestehenden Lernoberfläche; mobile Grafiken sind bewusst seitlich scrollbar.

Coverage nach Build: 231/380 insgesamt; GA1 123/164, 41 offen.
Nur beabsichtigte lokale Änderungen gesichert; kein Push, keine Veröffentlichung.
