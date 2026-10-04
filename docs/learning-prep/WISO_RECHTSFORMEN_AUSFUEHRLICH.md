# WiSo: Rechtsformen ausführlich

Stand: 4. Oktober 2026. Kernthema: wiso-6__5. Status: CURATED_DRAFT, menschliche Freigabe steht aus.

## Abgeschlossener Abschnitt

Die Einheit rechtsformen-haftung-kapital-leitung-gewinn erläutert Einzelunternehmen, GbR, OHG, KG, GmbH, UG (haftungsbeschränkt), AG und eG in 15 Abschnitten. Richtwert: 95 Minuten, auf drei Lernrunden aufteilbar. Diagnose, sechs Pflicht-Lernziel-Checks mit spezifischem Fehlerfeedback, sechs eigene Praxisfälle, freier Transfer mit Musterantwort und sechs Tastatur-Lernkarten sind integriert.

Drei technische SVG-Diagramme erklären die Rechtsformfamilien, AG-Organe und die Fallprüfung. Zwei semantische MathML-Rechenwege behandeln offene Kommanditistenhaftung und UG-Rücklage. Mobile Vergleichstabellen wurden nach Sichtprüfung durch acht lesbare Steckbriefe ersetzt. Kein dekoratives Rasterbild, kein ASCII-Ersatz, keine neue Gestaltung eingeführt; bestehende Deep-Space-Komponenten und Referenzbindung wiederverwendet.

## Quellen und rechtliche Grenzen

Privater Themenanker: knowledge-base/local/europa-integratoren-2026/raw/EUROPA_Prüfungsvorbereitung_Teil_2_Integratoren_4._Auflage.md, Zeile 4084, im Hauptcheckout gelesen. Ausschließlich Kompetenzanker; eigene Erklärungen, Namen, Zahlen und Fälle. Private Pakete sind im Inhaltsworktree nicht importiert.

20 Primärquellen-Einträge wurden im Quellenregister ergänzt. Maßgeblich sind aktuelle Gesetzestexte bei Gesetze im Internet: BGB 709, 715 und 721; HGB 105, 120, 161 und 171; GmbHG 5, 5a, 7 und 35 sowie der vollständige Gesetzestext; AktG 7, 76 und vollständiger Gesetzestext; GenG 1, 4, 19 und vollständiger Gesetzestext. Der Einheitliche Ansprechpartner Brandenburg ergänzt das Einzelunternehmen. Bei einzelnen nicht abrufbaren Einzelparagraph-Seiten wurden verfügbare vollständige amtliche Gesetzestexte beziehungsweise amtliche Suchtextauszüge geprüft; nicht erfolgreiche Abrufe gelten nicht als Volltextbeleg. Quellenverwendung und einzelne Abrufgrenzen stehen auch in der Curation-Datei.

Besonders geprüft: Gesellschaftsvermögen statt Kapitalnennbetrag als Haftungsmasse; GmbH 25.000 Euro Mindeststammkapital versus Einzahlung zur Anmeldung; UG-Rücklage nach Verlustvortrag ohne automatische Umwandlung; KG Haftsumme versus Einlage und Rückgewähr; heutige Gewinnverteilung statt überholter pauschaler Vier-Prozent-Regel; eG Mitgliederförderung, Stimmrecht und mögliche satzungsmäßige Nachschusspflichten. Grundmodelle und gesetzliche beziehungsweise vertragliche Ausnahmen sind getrennt. Keine individuelle Gründungs- oder Rechtsberatung.

## Tatsächlich durchgeführte Prüfungen

- npm run test:browser mit AP2_BROWSER_ONLY=rechtsformen: bestanden, einschließlich Build mit 1041 Dateien. Nicht die gesamte Browser-Suite ausgeführt.
- npm test nach der mobilen Inhaltskorrektur: bestanden. Zwei private Datenprüfungen übersprungen, weil Wissensbasis/Queue und Buchdaten im Worktree fehlen; keine Behauptung einer vollständigen privaten Quellenvalidierung.
- Browser: sechs Gates mit falschen/richtigen Antworten und Reset; Diagnose; Mindestlänge und Musterlösung beim Transfer; Enter/Space auf allen sechs Lernkarten; Fortschrittspersistenz; Abschluss und Rücknahme; erneute Sperre nach Gate-Reset.
- Responsive: 390 und 1440 Pixel, jeweils Dark und Light, Reduced Motion. Keine Seitenüberbreite oder JavaScript-Seitenfehler. SVG-Texte innerhalb ihrer Felder, mobile Diagramme per Tastatur horizontal erreichbar. MathML mit zugänglichen Namen.
- Screenshots aller vier Darstellungsvarianten erzeugt. Sichtgeprüft unter anderem mobile Light-Steckbriefe, mobile Dark-Formel/Kartenrückseite, Desktop-Light-UG-Formel/AG-Organe sowie Desktop-Dark-Familien und Fallprüfungsdiagramm.
- Erster Browserlauf: veraltete Praxisfall-Selektorannahme korrigiert; erneuter Lauf bestanden. Mobile Tabellenproblem anschließend behoben und erneut geprüft.
- git diff --check: bestanden.

Coverage nach Build: 336 von 380 Kernthemen mit Lerneinheiten, 44 verbleibend; WiSo 65 von 109. wiso-6__6 bleibt separat offen, trotz KG-Grundlagen in dieser Übersicht. Nur wiso-6__5 neu zugeordnet.

Zeit-/Limitprüfung: Beginn 06:38 UTC, nach Abschlussprüfungen 06:53 UTC. Codex-Nutzung 70 Prozent der Wochenperiode, ordinaryUsageAllowed true. Kein Push und keine Veröffentlichung; ausschließlich lokale beabsichtigte Änderungen auf codex/ga1-linux-admin.
