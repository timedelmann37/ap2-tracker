# Ökonomisches Prinzip und betriebliche Kennzahlen

Stand: 04.10.2026. Kernthema `wiso-6__3`, KW 40. **CURATED_DRAFT**, menschliche Freigabe ausstehend.

## Fertiger Abschnitt

Eigener Kerno-Fall: Minimum/Maximum an der festen Größe unterscheiden, nicht zulässige Qualitätsabkürzung ausschließen, Arbeitsproduktivität, Wirtschaftlichkeit und Eigenkapitalrentabilität im vollständigen Modelljahr berechnen. Diagnose, vier Pflichtchecks, erklärendes Fehlerfeedback, Praxisfall, eigener Recall und vier Tastatur-Karteikarten sind eingebaut. Zwei native technische SVGs und drei semantische MathML-Formeln; keine Rasterdeko oder ASCII.

Eigene Daten: 480 gleichartige Einrichtungen / 160 Stunden = 3 Einrichtungen/h. Erträge 48.000 Euro / Aufwendungen 40.000 Euro = Wirtschaftlichkeit 1,2. Alle Erträge/Aufwendungen des Modelljahres sind vorgegeben, Differenz 8.000 Euro Jahresgewinn. Konstant und durchschnittlich 80.000 Euro Eigenkapital: 10 Prozent Eigenkapitalrentabilität für das Modelljahr. Kein Kontoliquiditätsnachweis, keine künftige Renditegarantie, keine Markt-/Investitionsempfehlung. Andere Rentabilitätsbezugsgrößen nicht gleichgesetzt.

## Direkt geprüfte Quellen

- [VV-BHO zu § 7](https://www.verwaltungsvorschriften-im-internet.de/bsvwvbund_14032001_DokNr20110981762.htm): primäre aktuelle Verwaltungsvorschrift, Nr. 1 (Minimum/Maximum) und Nr. 2.1 (Ziele, Rahmenbedingungen, Folgekosten und Risiken) direkt gelesen. Nur methodischer Anker; Bundespflichten nicht auf Privatbetriebe übertragen.
- [bpb Produktivität](https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/20371/produktivitaet/): Output/Input und Mengenbezug direkt gelesen.
- [bpb Wirtschaftlichkeit](https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/21157/wirtschaftlichkeit/): Ertrag/Aufwand beziehungsweise Leistung/Kosten direkt gelesen, nicht miteinander vermischt.
- [bpb Rentabilität](https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/20483/rentabilitaet/): Erfolgs-/Bezugsgröße und Eigenkapital direkt gelesen.
- bpb-Seiten sind sekundäre Duden-Lizenzausgaben 2016, keine aktuellen Marktstatistiken. Abruf 04.10.2026.
- Private EUROPA-Rohquelle im Hauptcheckout Zeile 10422 direkt gelesen: Wirtschaftlichkeit als Ertrag/Aufwand. Nur Themen-/Formelanker, keine benachbarten Originalzahlen, Firmen, Aufgaben oder Lösungen übernommen. Kein privater Direktbeleg für sämtliche Begriffe behauptet.

## Gestaltung und tatsächliche QA

Refero-Skill und Visual-Workflow für die Erweiterung angewandt: vorhandener Deep-Space-Referenz-Lock; vorherige Arbeitsteilungs-Lernseite anhand Desktop-Light-Capture angesehen. Rahmen, Tokens und Interaktionskomponenten unverändert erhalten. Native Diagramme sind fachliche Entscheidungs-/Kennzahlenübersichten, keine Dekoration.

- `npm run test:browser` mit `AP2_BROWSER_ONLY=oekonomie`: bestanden; Build 1034 Dateien.
- Erster Testlauf scheiterte nur an der Großschreibung des gesuchten Begriffs „Liquidität“. Test auf tatsächlich verwendetes „Kontoliquidität“ korrigiert, anschließend erfolgreich wiederholt. Zusätzlich alle drei Formeln erfasst.
- `npm test`: bestanden. Zwei SKIPs für nicht importierte lokale Wissensbasis/Lernqueue und Buchdaten im Worktree. Private Quelle separat im Hauptcheckout gelesen.
- 390/1440 px, Dark/Light und Reduced Motion: Pflichtchecks mit falschen/richtigen Antworten, Reset/Feedback, Diagnose ohne Abschluss-Gate, kurzer/langer Recall, Musteröffnung, Enter/Space-Karten, Persistenz, Abschluss und Rücknahme geprüft.
- Drei MathML-Formeln, zugängliche Namen und Ergebnisse geprüft; keine Seitenüberläufe oder Pageerrors. SVG-Text im Canvas und eigenen Feldern, mobiles Diagrammscrollen per Tastatur geprüft.
- Tatsächlich angesehene Screenshots unter `C:/Users/timed/AppData/Local/Temp/ap2-oekonomie-20261004`: `390-dark-formula-0.png`, `1440-light-formula-1.png`, `390-light-formula-2.png`, `1440-dark-figure-1.png`, `1440-light-figure-0.png`, `390-light-quiz.png`, `1440-dark-card-reverse.png`. Formeln, Diagramme, Quiz und Karten lesbar; native mobile SVGs absichtlich horizontal verschiebbar.
- Neue Prüfung im vollständigen Browserrunner registriert; kein kompletter Lauf sämtlicher Browsermodule behauptet.
- `git diff --check`: bestanden.

## Stand und Fortsetzung

Vor Beginn sauberer Branch `codex/ga1-linux-admin`, 333/380 abgedeckt, 47 offen. Danach 334/380, WiSo 63/109, 46 offen; GA1/GA2 vollständig. Nächster eigener Vertiefungsabschnitt: `wiso-6__4`, Eigenkapitalrentabilität berechnen und einordnen.

Zeit-/Limitprüfung: vor Beginn 06:08:57 UTC, danach 06:15:28 UTC; Wochenlimit jeweils 67 Prozent verbraucht, normale Nutzung erlaubt. Keine fremden Änderungen vorgefunden oder überschrieben. Nur beabsichtigte lokale Änderungen sichern; kein Push, keine Veröffentlichung.
