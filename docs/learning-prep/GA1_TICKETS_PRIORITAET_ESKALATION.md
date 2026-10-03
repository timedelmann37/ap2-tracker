# GA1-10__5 – Ticketsystem, Priorität und Eskalation

Stand: 03.10.2026. CURATED_DRAFT; menschliche Freigabe ausstehend.

## Abgeschlossener Abschnitt

Eigene Kieshain-Fälle: zentraler Versandstillstand, Arbeitsplatzdrucker mit geprüftem Ersatz und normaler Komfortwunsch. Auswirkung und Dringlichkeit getrennt, eigene dreistufige Fallmatrix statt universeller Multiplikation. Prioritätsnummer und Support-Level nicht gleichgesetzt. Funktionale und hierarchische Eskalation, bestätigte Übernahme, Vertretung und überprüfbarer Serviceabschluss.

Diagnose, vier verpflichtende Lernziel-Checks mit Antwortfeedback, freie Transferantwort und sieben Tastatur-Lernkarten. Zwei editierbare technische SVG-Abläufe und semantische MathML-Zuordnung P = M(I,U). Keine produktiven Tickets angelegt.

Fünf-Minuten-Übernahme und Matrix sind eigene Fallregeln, kein allgemeines SLA oder ITIL-Standard. Third Level ist Spezialwissen, nicht zwingend Hersteller. Keine Pflicht zum Durchlauf aller Stufen. Anforderung C wird nicht künstlich zum Incident.

## Quellen und Designbindung

Privater Themenanker europa-integratoren-2026:00038, Zeilen 443–468: Benutzeranfragen aufnehmen, analysieren und bearbeiten. Keine Buchaufgaben übernommen.
ServiceNow Data lookup for prioritizing problems: übergreifende Begriffe Impact/Urgency/Priority und konfigurierbare Zuordnung direkt gelesen. Quelle betrifft Problemformulare; weder als Incident-Produktdokumentation ausgegeben noch deren Standardmatrix kopiert. Der versuchte Abruf der Incident-Prioritätsseite war nicht verfügbar und wurde nicht als Beleg verwendet.
Atlassian IT support levels: Rollen 1–3 und organisationsbezogene Auswahl gelesen. Starre Gleichsetzungen von Level und Severity nicht übernommen.
Atlassian Escalation policies: Functional, Hierarchical und Automatic escalation sowie Set clear processes direkt gelesen.
URLs, Verwendungsgrenzen und Quellenbelege stehen im Register und Curation-Sidecar.

Refero-Skill und DESIGN.md mit Doppler-/Astro-/n8n-Referenz-Lock gelesen. Bestehende Lernseite vor Implementierung visuell verglichen. Wiederverwendung der Lernoberfläche, keine neue Gestaltungsrichtung. Bei mobiler Sichtprüfung Matrixbeschriftungen gekürzt und Erklärung des seitlichen Verschiebens ergänzt.

## Tatsächlich ausgeführte Prüfungen

npm run build und npm test erfolgreich, nach Matrixkorrektur erneut ausgeführt.
Isolierter Browserlauf AP2_BROWSER_ONLY=ticket-priority npm run test:browser erfolgreich, nach erweiterten Matrixprüfungen erneut ausgeführt. Neue Prüfung zusätzlich in breiter Browser-Suite eingehängt; vollständige Browser-Suite nicht ausgeführt.

Falschantwort, Reset, erklärendes Feedback und korrekte Freischaltung; eigene Transferantwort vor Musterlösung; Karten mit Enter/Space; Persistenz nach Reload; Abschluss und Rücknahme geprüft.
390/1440 Pixel, Dark/Light, Reduced Motion: kein Seitenüberlauf; SVG-Texte im Canvas; mobile Diagramme tastaturverschiebbar. Semantische Formel vorhanden. Drei Matrixzeilen und mobile Verschiebung bis zu den Prioritätswerten geprüft.

Screenshots unter C:/Users/timed/AppData/Local/Temp/ap2-ticket-20261003/ tatsächlich angesehen: 1440-dark-figure-0.png, 390-light-figure-1.png, 1440-light-start.png, 390-dark-start.png, 390-light-formula.png, 390-light-matrix.png, 390-light-matrix-values.png und 1440-dark-matrix.png. Mobile Matrix nutzt vorhandenen horizontalen Tabellencontainer; Desktop zeigt vollständige Matrix. Texte, Diagramme und Formel passen zur bestehenden Oberfläche.

Coverage nach Build: 232/380 insgesamt; GA1 124/164, 40 offen.
Nur lokale Sicherung, kein Push und keine Veröffentlichung.
