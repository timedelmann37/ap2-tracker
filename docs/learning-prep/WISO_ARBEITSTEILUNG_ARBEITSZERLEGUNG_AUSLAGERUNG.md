# Arbeitsteilung: Arbeitszerlegung und Auslagerung

Stand: 04.10.2026. Kernthema `wiso-6__1`, KW 40. Status **CURATED_DRAFT**; menschliche Freigabe ausstehend.

## Fertiger Abschnitt

Eigenständige Einheit mit erfundenem Rivo-Auftrag: Gesamtaufgabe zerlegen, Übergaben mit Ergebnissen definieren, interne Rollen von der externen Servanta-Variante trennen und Nutzen/Abhängigkeiten abwägen. Diagnose, vier Pflichtchecks mit begründetem Fehlerfeedback, Praxisfall, eigener Transfer und vier Tastatur-Karteikarten sind eingebaut. Zwei native technische SVGs zeigen interne Übergaben und die externe Aufgabenverteilung. Keine Rasterdeko, keine ASCII-Grafik; keine Formel für dieses begriffliche Thema nötig.

Auslagerung ist keine garantierte Ersparnis. Homeoffice ist allein kein Anbieterwechsel oder Beleg internationaler Arbeitsteilung. Gerätkauf ohne Angaben zur übernommenen Funktion wird nicht automatisch als Outsourcing eingestuft. Die konkrete Checkliste ist ein eigener Vorschlag, keine allgemeine gesetzliche Pflicht oder Vertragsberatung.

## Tatsächlich geprüfte Quellen

- [bpb – Arbeitsteilung](https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/18690/arbeitsteilung/): Definition sowie Spezialisierung/Abhängigkeit direkt gelesen. Sekundäre Duden-Lizenzausgabe 2016, keine aktuellen Messwerte.
- [bpb – Outsourcing](https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/20240/outsourcing/): Begriffsabsatz direkt gelesen. Sekundäre Duden-Lizenzausgabe 2016; Ziel einer Kostensenkung nicht als Garantie dargestellt.
- [FIAusbV Anlage](https://www.gesetze-im-internet.de/fiausbv/anlage.html): primäre Ausbildungsquelle, F Nr. 2 a sowie A Nr. 7 a/b/e direkt gelesen. Organisations- und Übergabebezug; kein vorgeschriebenes Rivo-Organigramm behauptet.
- Private EUROPA-Rohquelle im Hauptcheckout, Zeile 4084 direkt gelesen: Themenanker Arbeitsteilung in der IT-Branche. Keine Buchfälle, Aufgaben oder Lösungen übernommen.
- BSI-HTML-Direktabrufe zu externen Cloud-Diensten, FAQ und Modellierungslektion scheiterten mit 403. Keine BSI-Anforderungen als geprüft oder auf den fiktiven Privatbetrieb anwendbar behauptet.

## Gestaltung und Prüfung

Refero-Skill und Visual-Workflow angewandt: bestehender Deep-Space-Referenz-Lock statt neuer Richtung. Vorherige Lernseite `betriebliche-grundfunktionen-wirtschaftssektoren` anhand des vorhandenen Desktop-Light-Captures angesehen. Gemeinsamer Seitenrahmen, Tokens, Quiz-/Recall-/Kartenlogik unverändert übernommen.

- `npm run test:browser` mit `AP2_BROWSER_ONLY=arbeitsteilung`: bestanden; Build 1031 Dateien.
- `npm test`: bestanden. Zwei ausdrücklich gemeldete SKIPs: lokale Wissensbasis/Lernqueue und lokale Buchdaten sind im Worktree nicht importiert. Private Quelle separat im Hauptcheckout geprüft.
- Vier Browserkombinationen: 390/1440 px, Dark/Light, Reduced Motion.
- Falsche/richtige Diagnose, vier Pflichtchecks samt Reset/Feedback, gesperrter/entsperrter Abschluss, Rücknahme, Reload-Persistenz, kurze/lange freie Antwort, Musteröffnung, Enter/Space-Karten geprüft.
- Kein Seitenüberlauf oder Pageerror; Diagrammtext im Canvas und in eigenen Feldern. Mobiles horizontales Diagrammscrollen per Tastatur geprüft.
- Screenshots tatsächlich angesehen: `390-dark-figure-0.png`, `1440-light-figure-1.png`, `390-light-quiz.png`, `1440-dark-card-reverse.png` unter `C:/Users/timed/AppData/Local/Temp/ap2-arbeitsteilung-20261004`. Mobile Diagramme sind absichtlich horizontal verschiebbar und entsprechend beschriftet; Quiz, Karten und Texte lesbar.
- Browserprüfung im Gesamtrunner registriert; kein vollständiger Gesamtlauf aller Browsermodule behauptet.
- `git diff --check`: bestanden.

## Stand und Fortsetzung

Vor Beginn: sauberer Branch `codex/ga1-linux-admin`, 332/380 Einheiten, 48 offen. Danach: 333/380, WiSo 62/109, 47 offen. GA1 und GA2 vollständig abgedeckt. Nächster offener Abschnitt: `wiso-6__3` (ökonomisches Prinzip); `wiso-6__2` ist bereits vorhanden.

Zeit-/Limitprüfung vor Beginn: 05:53:56 UTC, danach 06:01:20 UTC; Wochenlimit jeweils 67 % verbraucht, normale Nutzung erlaubt. Keine fremden Änderungen vorgefunden oder überschrieben. Nur beabsichtigte Dateien lokal sichern; kein Push und keine Veröffentlichung.
