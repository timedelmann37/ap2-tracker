# ga1-11__11 – Subnetting und IP-Adressberechnung

Stand 03.10.2026: CURATED_DRAFT, menschliche Fachfreigabe ausstehend.

## Abgeschlossene Arbeit

Eigener GA1-Prüffall Mosaik. Client 10.44.8.77/26: Maske 255.255.255.192, 64 Adressen, 62 nutzbar, Netz .64, Broadcast .127, Hosts .65–.126. Bitgewichts- und Blockgrenzenkontrolle erklärt. Der anschließende neue VLSM-Plan ist ausdrücklich ein anderer Konfigurationsfall: Werkstatt .0/26 für 50, Büro .64/27 für 25 und Messgeräte .96/28 für zehn Adressen inklusive Gateway/Reserve. Masken, Hostbereiche und Broadcasts dokumentiert. Gegenfall .80/28 überschneidet sich mit Büro .64/27. /31-Ausnahme und /32-Hostroute begrenzen die normale Hostformel.

Diagnose, vier numerische Pflichtchecks, ein Entscheidungs-Pflichtcheck, Transfer vor Musterlösung und fünf Tastatur-Lernkarten. Drei MathML-Formeln, zwei technische SVG-Abläufe. Bestehende GA2-Seiten und gemeinsame Shell unverändert. Refero-Skill folgt dem vorhandenen Doppler-/Astro-/n8n-Referenz-Lock; keine neuen Stilentscheidungen oder dekorativen Rasterbilder.

## Direkt geprüfte Quellen

- RFC 4632 §3.1: Präfixnotation und 32-Bit-Netz-/Hostanteil.
- RFC 1878, Table sowie Subnets and Networks: Masken und normale Hostbereiche; historische Klassenbegriffe nicht als aktuelle Planungsmethode übernommen.
- RFC 3021 §2.1: beide /31-Adressen auf Punkt-zu-Punkt-Verbindungen als Hosts.
- Privater Themenanker europa-integratoren-2026:00315 (Zeilen 3040–3041) und :00320 (3082–3107): Dokumentation von Netz, Maske, Broadcast und Routeradressen. Keine Originalaufgabe, Zahlen oder Topologie übernommen.
- docs/AUSBILDUNG_IT_SOURCE_REVIEW.md als methodischer Kontext: eigener Fall mit begründeter Anwendung; Portalinventar nicht als fachliche Freigabe behandelt.

## Tatsächlich ausgeführte Prüfungen

- npm run build bestanden.
- npm test bestanden.
- AP2_BROWSER_ONLY=ip-calculation npm run test:browser bestanden. Gezielte Prüfung, keine vollständige Browser-Regression behauptet.
- Falsche und richtige Rechenantworten einschließlich Dezimalkomma, Diagnose ohne Gate, erklärendes Quizfeedback, Reset, Sperre/Entsperrung, Persistenz, Erledigt/Undo, Transferfreigabe und Enter/Space-Karten geprüft.
- 390/1440 Pixel, Dark/Light, Reduced Motion: keine Dokumentüberbreite, SVG-Texte innerhalb Canvas, mobile horizontale Diagrammnavigation geprüft.
- Screenshots in C:/Users/timed/AppData/Local/Temp/ap2-ipcalc-20261003. Desktop-Dark-Adressdiagramm, Mobile-Light-VLSM-Formel, Desktop-Light-Plan und Mobile-Dark-Plan tatsächlich visuell geöffnet. Mobile technische Diagramme bleiben mit sichtbarem Hinweis horizontal verschiebbar.

Abdeckung: GA1 139/164, gesamt 247/380. Lokale Sicherung ausschließlich eigener Dateien; kein Push oder Veröffentlichung.
