# Ergänzende Quelle: Ausbildung in der IT

Stand: 14. September 2026. Status: **Inventur abgeschlossen; redaktionelle Auswertung teilweise abgeschlossen.** Dies ist kein vollständiger Faktencheck sämtlicher Unterseiten.

## Auftrag und Quellenrolle

Das öffentliche Portal [Ausbildung in der IT](https://ausbildung-in-der-it.de/) wird als zusätzliche Orientierung für AP2-Tracker ausgewertet. Es ist ein redaktionelles Angebot, keine prüfende IHK und kein amtlicher Prüfungskatalog. Seine Aufgabentexte, Lösungen, Grafiken und Programmbeispiele werden **nicht übernommen**. Abgelegt werden URL-Metadaten, eigene kurze Erkenntnisse und Vorschläge für unabhängig erstellte Übungen.

Die Nutzerfreigabe zum Lesen bedeutet keine Lizenz zur Veröffentlichung der Website-Inhalte. Keine Anmeldung, Newsletter-Bestellung, kostenpflichtige Freischaltung oder Übernahme der angebotenen PDFs. Der [AP2-Lernguide](https://ausbildung-in-der-it.de/ap2-lernguide) bewirbt einen PDF-Zugang nach E-Mail-Bestätigung; dessen Inhalt wurde nicht gelesen. Das öffentlich zugängliche Seitenangebot und die separate App sind nicht gleichzusetzen.

## Nachvollziehbarer Umfang

Die vollständige URL-Liste und ihr jeweiliger Bearbeitungsstatus stehen in `AUSBILDUNG_IT_URL_INVENTORY.json`. „HTTP geprüft“ bedeutet ausschließlich: abrufbar und auf Links untersucht. Es bedeutet weder gelesen noch sachlich freigegeben.

- [robots.txt](https://ausbildung-in-der-it.de/robots.txt) erlaubt öffentliche Pfade, sperrt `/elemente` und `/downloads/`. Diese Sperren wurden beachtet.
- [Sitemap-Index](https://ausbildung-in-der-it.de/sitemap-index.xml) verweist auf [sitemap-0.xml](https://ausbildung-in-der-it.de/sitemap-0.xml), mit gemeldetem Änderungsdatum 09.09.2026.
- **814 Sitemap-URLs:** alle per HTTP abgerufen, alle final HTTP 200. Kein Archiv der HTML-Texte oder Medien angelegt.
- Ein Linkpass über diese Seiten fand **107 zusätzliche URL-Kandidaten**: 106 antworteten mit HTTP 200, einer mit HTTP 404. 102 der zusätzlichen erreichbaren URLs deklarieren einen anderen kanonischen Lernseiten-Pfad und sind keine 102 neuen Lektionen. Zwei Zeichenfolgen aus dynamischen `href`-Bindings wurden als Parserartefakte verworfen, nicht als Seiten gezählt.
- Insgesamt **921 Inhalts-URL-Kandidaten inventarisiert**, davon 920 HTTP 200 und eine defekte Verknüpfung: `/lernplattform/dojos/sql/grundlagen`. Die aus dieser Fehlerantwort gefundene technische `/404`-Seite wird nicht als weiterer Lerninhalt gezählt. Der zweite Linkpass fand sonst keine neuen statischen Inhalts-URLs unter den genannten Filtern.
- **20 Seiten redaktionell ausgewertet:** bei zehn der Haupttext, bei zehn ausgewählte relevante Abschnitte. Auch diese sind nicht vollständig fachlich auditiert.
- **901 URL-Einträge** bleiben `not_reviewed`. Ein Lexikon-Index zählt als eine gelesene Indexseite, nicht als Lektüre seiner Einzelartikel.
- Dynamische Suchabfragen, Fragmente, Medien, Downloadpfade und Inhalte der separaten App sind ausgeschlossen. Ein Sitemap-/Linkcrawl garantiert nicht, jede unverlinkte oder dynamisch erzeugte Seite zu finden.

Die 814 Sitemap-Adressen verteilen sich unter anderem auf 331 Lexikon-Adressen einschließlich Index, 142 Lernseiten, 204 Lernplattform-/Dojo-Adressen, 59 Blog-Adressen einschließlich Rubriken, 18 Fachinformatiker-Adressen und 15 Prüfungsadressen. Das sind **URLs, keine eindeutigen Lerninhalte**.

## Wesentliche Erkenntnisse aus tatsächlich gelesenen Seiten

### Fachrichtung und Prüfungsbereich getrennt halten

Der [FISI-Lernindex](https://ausbildung-in-der-it.de/lernen/systemintegration) nennt 43 unterschiedliche Lektionen und weist auf Mehrfachzuordnungen hin. Die [Lernbibliothek](https://ausbildung-in-der-it.de/lernen) ordnet dieselben Inhalte nach Lernfeldern oder Prüfungsbereichen. Daraus folgt für AP2-Tracker als eigene Entscheidung: bestehende Themen nicht duplizieren, sondern Quellen und Zuordnungen am selben Kernthema pflegen. Die Portalzahlen sind kein Beleg für vollständige Prüfungsvorbereitung.

### Prüfungsleistung statt Definitionssammlung

Die [FISI-Vorbereitung](https://ausbildung-in-der-it.de/pruefungsvorbereitung-fachinformatiker-systemintegration) und [FISI-AP2-Übersicht](https://ausbildung-in-der-it.de/pruefung/ap2/fachinformatiker-systemintegration) betonen szenariobezogenes Entscheiden, nachvollziehbare Rechnungen und schriftliche Begründungen. Eigene Umsetzungsidee: jede Einheit muss einen neuen Fall enthalten, in dem die lernende Person Anforderung, Beleg, Entscheidung und Prüfungsergebnis verbindet. Karten ergänzen diesen Nachweis, ersetzen ihn aber nicht. Aussagen des Portals über „häufige“ Prüfungsaufgaben sind redaktionelle Einschätzungen, keine Vorhersagen.

### Messdaten sind noch keine Diagnose

Die gelesene [Messdaten-Lektion](https://ausbildung-in-der-it.de/lernen/systemintegration/lektion/netzwerkstoerung-mit-messdaten-diagnostizieren) trennt Beobachtung, konkurrierende Erklärungen und nächsten Test. Für eigene N8-/N9-Aufgaben übernehmen wir nur das abstrakte Lernziel: Messbedingungen sichtbar machen, Vergleichbarkeit prüfen und eine Schlussfolgerung auf ihre Belegstärke begrenzen. Keine Übernahme des Unternehmens, der Zahlen, Timeline, Aufgaben oder Musterlösung.

### Sicherheitsplanung braucht überprüfbare Beziehungen

Aus den gelesenen Abschnitten zu [Segmentierung](https://ausbildung-in-der-it.de/lernen/systemintegration/lektion/segmentiertes-netzwerk-planen) und [DMZ](https://ausbildung-in-der-it.de/lernen/systemintegration/lektion/dmz-mit-firewall-absichern) ergeben sich geeignete Übungsformen: Beziehungen nach Quelle, Ziel, Dienst und Zweck beschreiben; erwünschte und unerwünschte Verbindungen getrennt testen. Vor einer fachlichen Übernahme sind die genannten BSI-/NIST-/RFC-Quellen direkt zu prüfen. Das Portal ist hier ein Wegweiser, nicht der alleinige technische Beleg.

### Betrieb und Wiederherstellung sichtbar prüfen

Die gelesenen Abschnitte zu [Backup/Restore](https://ausbildung-in-der-it.de/lernen/systemintegration/lektion/backup-und-restore-planen) und [Administrationsautomatisierung](https://ausbildung-in-der-it.de/lernen/systemintegration/lektion/administrationsaufgabe-automatisieren) liefern Anregungen für Nachweisaufgaben: vollständigen Wiederanlauf statt nur Kopierzeit bewerten; Vorschau und tatsächlichen Erfolg auseinanderhalten; Normal-, Wiederholungs- und Fehlerfall prüfen. Fremde Skripte werden nicht übernommen oder ausgeführt. Ihre Korrektheit wurde nicht auditiert.

### Prüfungssimulation braucht eine Rückschau

Der [Artikel zu alten IHK-Prüfungen](https://ausbildung-in-der-it.de/pruefung/alte-ihk-pruefungen) und [Lernmethoden-Artikel](https://ausbildung-in-der-it.de/blog/effektiv-lernen) geben Anregungen zur Verbindung von Praxis, Wiederholung und Fehlerauswertung. Eigene Umsetzungsidee für N9: nach einer Simulation unterscheiden zwischen Wissenslücke, missverstandenem Auftrag, Rechenfehler und verlorener Zeit. Konkrete Wochenpläne und Zeitrezepte des Portals werden nicht als allgemeingültige Empfehlung oder Prüfungsregel übernommen.

## Amtliche Rückprüfung

Die prüfungsbezogenen Kernaussagen wurden auf die rechtliche Primärquelle zurückgeführt:

| Gegenstand | Direkt gelesene Primärquelle | Konsequenz |
| --- | --- | --- |
| Systemkonzeption, Betrieb, Speicher und Automatisierung; 90 Minuten schriftlich | [FIAusbV § 21](https://www.gesetze-im-internet.de/fiausbv/__21.html) | Lernbereich GA1 bleibt breiter als reine Serverbegriffe. |
| Protokolle, Komponenten, Sicherheit sowie Betrieb/Verfügbarkeit; 90 Minuten schriftlich | [FIAusbV § 22](https://www.gesetze-im-internet.de/fiausbv/__22.html) | N9 übt Anwendung und begründete Auswahl. |
| Wirtschaftliche und gesellschaftliche Zusammenhänge der Berufs-/Arbeitswelt; 60 Minuten schriftlich | [FIAusbV, § 23 im Gesamttext](https://www.gesetze-im-internet.de/fiausbv/BJNR025000020.html) | Die sechs WiSo-Lektionen des Portals ersetzen keinen vollständigen WiSo-Abgleich. |
| Gewichtung AP1 20 %, Projekt 50 %, schriftliche AP2-Bereiche je 10 %; mehrere Bestehensbedingungen | [FIAusbV § 24](https://www.gesetze-im-internet.de/fiausbv/__24.html) | Keine pauschale Aussage „mit 50 Punkten insgesamt bestanden“. |
| Handlungsorientiertes Lernen: planen, durchführen und beurteilen | [KMK-Rahmenlehrplan, Seiten 5–7](https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/BeruflicheBildung/rlp/Fachinformatiker_19-12-13_EL.pdf) | Eigene Lernfälle verbinden fachliche, betriebliche und bewertende Schritte. |

„GA1“ und „GA2“ sind die etablierten Lernbereichsbezeichnungen unseres Trackers. In der geltenden Verordnung heißen die FISI-Prüfungsbereiche „Konzeption und Administration von IT-Systemen“ sowie „Analyse und Entwicklung von Netzwerken“. AP Teil 1 ist nicht gleich GA1.

Regionale Termine, erlaubte Hilfsmittel, konkrete Punktevergabe und formale Projektvorgaben wurden hier **nicht** verifiziert. Dafür sind die aktuellen Hinweise der zuständigen IHK bzw. Aufgabenstelle nötig. Das Portal allein reicht dafür nicht.

## Abbildung auf nächste Lernarbeit

Die folgenden Zuordnungen sind eigene redaktionelle Vorschläge, keine vom Portal oder der IHK bestätigte Stoffmatrix.

| Tracker | Geeignete Ergänzung aus der Recherche | Nicht daraus ableiten |
| --- | --- | --- |
| GA2-9 Netzplan-Prüfungsanalyse | Befund und Annahme trennen; für fehlende Information einen Test benennen | Jede gezeichnete Verbindung sei bereits ein erlaubter Datenfluss |
| GA2-9 Subnetting-Rechenweg | Zwischenergebnis, Einheit und Plausibilitätsprüfung sichtbar verlangen | Garantierte Teilpunkte für eine bestimmte Darstellung |
| GA2-9 Konfiguration beschreiben | Herstellerneutrale Soll-Tabelle plus Erfolgs-/Negativtest | Eine Portliste ersetze die Anforderungsanalyse |
| GA2-9 Alternativen bewerten | Anforderungen, Ausschlusskriterien, Aufwand und begründete Wahl | Höchste Nutzwertsumme sei unabhängig von Annahmen objektiv richtig |
| GA2-9 Zeitmanagement / Priorisieren | Eigene Simulation mit Kontrollreserve, Rückkehrmarkierung und Fehlerauswertung | „Subnetting immer zuerst“ oder eine feste Minuten-pro-Punkt-Regel sei vorgeschrieben |
| GA1 kommende Vertiefungen | Wiederanlauf, Systemanforderungen, sichere Automatisierung, Abnahme | Vollständige technische Freigabe der Portalbeispiele |
| WiSo | Aufgaben mit Rolle, Konflikt, Handlungsoption und Begründung | Sechs Portal-Lektionen seien vollständige WiSo-Abdeckung |

## Restliche Lesewarteschlange

### Erste produktive Einbindung am 14.09.2026

Die Recherche ist jetzt in drei bestehenden Einheiten umgesetzt, nicht nur
verlinkt. Kanonische JSON-Spezifikationen enthalten jeweils einen eigenen
Praxisfall, ein Quiz mit fehlerspezifischer Rückmeldung und eine gespeicherte
Selbsterklärung mit zunächst verdecktem Muster:

| Kernthema / Seite | Neu eingearbeitete Lernhandlung | Quellenrolle |
| --- | --- | --- |
| `netzwerk-messwerte` | Unvergleichbare RTT-Messungen erkennen und einen prüfbaren Vergleich planen | Portal: Messdaten-Lektion; fachlicher Abgleich RFC 2330, Abschnitte 13–14 |
| `konfiguration-beschreiben` | Erlaubte und gesperrte Quellbeziehung testen; Timeout nicht mit Regelbeweis verwechseln | Portal: DMZ-Lektion, Abschnitt zu positiven/negativen Tests; NIST SP 800-41 Rev. 1, Abschnitt 5.3 |
| `ga2-zeitmanagement` | Einen übersehenen Aufgabenauftrag von einer vermuteten Wissenslücke trennen; nächste Übung und Erfolgskriterium bestimmen | Portal: alte IHK-Prüfungen, Fehlerauswertung; eigene Lernhilfe ohne Prüfungsvorschrift |

Die genannten Quellenabschnitte wurden in diesem Umsetzungsschritt direkt
gelesen. Die Szenarien sind eigenständig, keine Umbenennung fremder Aufgaben.
Provenienz steht in den Kurationsnotizen und sichtbar im Quellenabschnitt der
Lernseite. Der separate Buchkatalog bleibt unverändert; Webquellen werden nicht
als importierte Bücher ausgegeben. `contentRevision` ist jeweils
`2026-09-14.2`; Status bleibt `CURATED_DRAFT`. Die Zusatzfälle ändern die
Pflichtnachweise nicht und vergeben keinen Abschluss für Textlänge.

Verifikation: `npm test` und `npm run test:browser` erfolgreich am 14.09.2026.
Der neue Test `scripts/verify-source-cases-browser.mjs` prüft falsche/richtige
Antworten, Tastaturbedienung, verdecktes Muster, Speicherung und die Trennung
von Zusatzübungen und Pflichtnachweisen. Ansichten bei 390/1440px in beiden
Themes geprüft; repräsentative Aufnahmen aller drei Fälle visuell gelesen.

Zweite Einbindung am 14.09.2026: `backup-methods` enthält einen eigenen
Restore-Abnahmefall mit fehlender Teilnehmerliste; `backup-window` eine
vollständige Wiederanlaufrechnung aus vier explizit nicht überlappenden Phasen.
Beide ergänzen Quiz und Selbsterklärung, die Zeitaufgabe zusätzlich eine
Zahleneingabe mit grafischem MathML-Lösungsweg. Quellenimpuls: Backup-/Restore-
Lektion des Portals; direkter Fachabgleich: NIST SP 800-34 Rev. 1, Anhang A.1,
Abschnitte 5.1–5.3 (Daten- und Funktionsvalidierung). Keine Kopie der Portalaufgabe.
Quellenangaben stehen in Lernseiten und Kurationsnotizen; beide Revisionen
`2026-09-14.1`, weiterhin `CURATED_DRAFT` und keine neuen Pflichtziele.

Prüfung dieses zweiten Schritts: `npm test` erfolgreich; der erweiterte
`verify-source-cases-browser.mjs` erfolgreich für alle fünf Praxisfälle,
einschließlich falscher/richtiger Gesamtdauer, Tastatur, Speicherung und
390/1440px in beiden Themes. Beide neuen Fälle visuell kontrolliert. Der
vollständige Navigation-/Atmosphäre-Browsertest wurde hier nicht erneut ausgeführt.

Dritte Einbindung am 14.09.2026: `segmentierung-vorteile` übt einen präzisen
Datenfluss für ein Werkstattterminal; `zero-trust-segmentierung` trennt
Netzwerkstandort, Anmeldung und ressourcenbezogene Berechtigung im Prüferinnenfall.
Jeweils eigener Praxisfall, Quiz und gespeicherte Selbsterklärung. Portalquelle:
Segmentierungslektion; Primärabgleich: Abstract von NIST SP 800-207, direkt gelesen.
Revision jeweils `2026-09-14.1`, weiterhin `CURATED_DRAFT`, Pflichtziele unverändert.
`npm test` und gezielter Browsertest aller sieben Quellenfälle erfolgreich;
390/1440px, beide Themes, Tastatur und Speicherung geprüft, beide neuen Fälle
visuell kontrolliert. Kein erneuter vollständiger Navigationstest.

Vierte Einbindung am 14.09.2026: vollständige neue Einheit für `ga1-9__15`,
„Qualität von Skripten“, unter
`/lernen/qualitat-skripten-kommentare-fehlerbehandlung-logging-test-vor/`.
Eigener Statusbericht-Fall mit Eingabeprüfung, Vorschau, unabhängigen und
abhängigen Fehlerfällen, Wiederholung, Logging und Freigabe. Zwei eigene
Diagramme, Diagnose, Sortierung, Karten, Selbsterklärung und zwei Pflichtziele.
Buchkontext: ITLF10–12 PDF-Seite 122, Testsysteme/Versionierung. Die gemappte
Seite 298 ist kein direkter Skriptbeleg. Portal-Automatisierungslektion als
didaktischer Impuls; ShouldProcess und try/catch gegen Microsoft Learn geprüft.
Keine fremden Skripte übernommen oder ausgeführt. `CURATED_DRAFT`.

Verifikation: `npm test` erfolgreich; gezielte Browserprüfung der acht
Quellenfälle einschließlich Pflichtzielen, Wiederladen, Rücknahme, Sortierung,
Karten und beiden Themes erfolgreich. Neue Diagramme mobil und am Desktop
visuell geprüft. Abdeckung jetzt 115/380; GA1 7/164.

Fünfte Einbindung am 14.09.2026: `alternativen-bewerten` ergänzt einen eigenen
Praxisfall zu geänderten Annahmen bei einer Angebotsentscheidung. Quiz und
gespeicherte Selbsterklärung verlangen eine erneute Bewertung samt verbleibendem
Nachteil statt einer automatischen Entscheidung nach Preis oder alter Punktzahl.
Portal-Prüfungsvorbereitungsseite ausschließlich als didaktischer Impuls;
keine Übernahme pauschaler Bewertungsregeln. Revision `2026-09-14.2`, weiterhin
`CURATED_DRAFT`, Pflichtziele unverändert.

Verifikation: `npm test` und gezielte Browserprüfung aller neun Quellenfälle
erfolgreich, einschließlich Tastatur, Speicherung und Pflichtziel-Trennung.
390/1440px in beiden Themes geprüft, neuer Fall mobil und am Desktop visuell
kontrolliert. Kein erneuter vollständiger Navigationstest. Abdeckung bleibt 115/380.

Noch nicht umgesetzt: die weiteren Zuordnungsvorschläge für
WiSo; weitere Automatisierungs-Kernthemen bleiben offen. Die URL-Inventur bleibt
eine Lesewarteschlange und wird durch diesen Batch nicht pauschal als geprüft
markiert.

### Offene Quellenlektüre

1. **Priorität 1:** alle noch nicht ausgewerteten FISI-Lektionen und gemeinsam genutzten Grundlagenseiten, zunächst Systemlösung, Speicher, Virtualisierung, Netzwerkplan, Subnetting, Testprotokoll und Wirtschaftlichkeit. Teilgelesene Seiten vervollständigen, bevor sie einzelne technische Aussagen belegen.
2. **Priorität 2:** verbleibende FISI-Lernfeldseiten und Prüfungsseiten; Zuordnungen gegen KMK/FIAusbV sowie vorhandene Buchquellen abgleichen.
3. **Priorität 3:** thematisch passende Lexikonartikel für kommende GA1-/GA2-/WiSo-Blöcke. Definitionen gegen RFC, BSI, Herstellerdokumentation oder geltendes Recht rückprüfen. Keine Komplettübernahme des Lexikons.
4. **Priorität 4:** öffentliche Dojos und Lernpfade nach fachlicher Passung; nur Aufgabenform/Kompetenz notieren, keine Aufgabenbank kopieren.
5. **Priorität 5:** übrige Karriere-, Einstiegs- und Umschulungsseiten strukturell inventarisiert lassen, später auf ausdrücklichen Bedarf lesen.

Im JSON ist die Warteschlange pro URL markiert. Der Auftrag „alle Unterseiten anschauen“ ist damit **nicht als vollständige redaktionelle Lektüre erledigt**: Die umfassende Inventur ist vorhanden, die verbleibende Inhaltslektüre bleibt offen. Es wurde keine dauerhafte automatische Beobachtung eingerichtet.
