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

Sechster Schritt am 14.09.2026: Automatisierungseinheit um eine eigene
Wiederholungsübung ergänzt. Auftragskennung und Versuchskennung werden getrennt;
die Lernenden schließen einen Teilerfolg ohne Dubletten und unterscheiden
Berichtszustand von Protokollhistorie. Modellannahme unveränderter Eingangsdaten
explizit, keine zusätzliche externe Tatsachenbehauptung oder Quellenlektüre.
Quiz und gespeicherter Wiederholungsnachweis ergänzen die vorhandenen Diagramme.
Revision `2026-09-14.2`, `CURATED_DRAFT`, Pflichtziele unverändert.

`npm test` und gezielte Browserprüfung aller neun Quellenfälle erfolgreich.
Neue Übung mit falscher/richtiger Antwort, Tastatur, verdeckter Musterlösung,
Speicherung und Abschlussgrenze geprüft; 390/1440px und beide Themes ohne
Seitenüberlauf. Mobile Dark- und Desktop-Light-Aufnahme visuell geprüft.
Kein erneuter vollständiger Navigationstest. Abdeckung unverändert 115/380.

Siebter Schritt am 15.09.2026: neues Kernthema `ga1-9__2`, Schreibtischtest.
Eigener Berichtszähler mit Trace-Tabelle, Ablaufgrafik, MathML, Zahleneingabe
mit drei gezielten Fehlerrückmeldungen, Grenzwertdiagnose, Selbsterklärung,
Karten und zwei Pflichtnachweisen. Quellen: IT-Basiswissen Chunk 00221
(Wiederholungsstruktur/Schreibtischtest) und IHK Bonn Chunk 00076
(Soll-Ist-Abweichungen/Testdaten). Chunk 00175 ist Netzwerkdiagnose und wurde
als unpassender Mapping-Treffer verworfen. Historische Steuerwerte und
unbelegte Aussagen zu konkreten Prüfungsterminen nicht übernommen.

`npm test` erfolgreich. Neuer `verify-trace-browser.mjs` prüft Zahlenfeedback,
verdeckte Musterlösung, Tastatur, Speicherung, Pflichtziele, Abschluss/Rücknahme,
MathML, Diagramm und 390/1440px in beiden Themes. Mobile Codezeile gekürzt;
Tabelle im vorhandenen horizontalen Scrollbereich einschließlich Ergebnisspalten
geprüft. Diagramm, Tabelle und Übung visuell kontrolliert. Kein vollständiger
Navigationstest in diesem Lauf. Revision `2026-09-15.1`, `CURATED_DRAFT`;
Abdeckung 116/380, GA1 8/164. Weitere Quellenlektüre unverändert offen.

Achter Schritt am 15.09.2026: neues Kernthema `ga1-9__1`, verständlicher
Pseudocode. Eigene Geräteprüfliste mit Eingabevoraussetzungen, Auswahlregel,
Reihenfolge und leerer Ausgabe. Erklärgrafik, vollständig durchgespielter Fall,
Sortierübung per Tastatur, Auswahlfragen, eigener Schreibauftrag, Karten und
zwei Pflichtziele. Quellenimpuls EUROPA Chunk 00303, Zeilen 2935–2952, vollständig
gelesen. Beschädigter Lösungsausschnitt 00811 nicht als Codevorlage verwendet;
unpassende Mapping-Kandidaten 00042 und IT-Basiswissen 00115 ausgeschlossen.

`npm test` und neuer `verify-pseudocode-browser.mjs` erfolgreich: falsche/richtige
Sortierung, Selbsterklärung, Tastatur, Speicherung, Abschlussgrenzen und Rücknahme.
390/1440px in beiden Themes geprüft, Grafik, Code und Sortierung visuell gelesen;
lange Codebedingung für mobile Lesbarkeit geteilt, Grafiklabel gekürzt.
Keine gemeinsamen Layoutänderungen, kein vollständiger Navigationstest in diesem
Lauf. `CURATED_DRAFT`, Revision `2026-09-15.1`. Abdeckung jetzt 117/380,
GA1 9/164. Menschliche Fachfreigabe und weitere Quellenlektüre bleiben offen.

Qualitätssicherung am 15.09.2026 nach dem achten Schritt: Die Browserprüfungen
für Pseudocode und Schreibtischtest prüfen jetzt zusätzlich sämtliche vier
Diagnose-/Zusatzquizze mit falscher Antwort, Rücksetzen und richtiger Antwort
per Tastatur. Beide Antwortzustände werden direkt kontrolliert; keine dieser
Übungen darf den Kernthema-Abschluss freischalten.

Der vollständige Lauf `npm run test:browser` ist erfolgreich: Navigation,
Theme-Persistenz und nicht verfügbarer Speicher, Lernroute, N8/N9, neun
Quellenfälle, Skriptqualität, Schreibtischtest, Pseudocode sowie Atmosphäre,
echter Fortschritt, Rücknahme, Pause und Reduced Motion. Damit ist die bislang
nur gezielte Browserprüfung der jüngsten Ergänzungen um den gemeinsamen
Regressionstest ergänzt. Keine Inhalts- oder Statusänderung; Abdeckung bleibt
117/380. Diese technische Prüfung ersetzt keine menschliche Fachfreigabe.

Quellenpipeline am 15.09.2026: Die bevorzugten Fundstellen für Pseudocode und
Schreibtischtest wurden mit den tatsächlich verwendeten Buchbelegen abgeglichen.
Nicht geprüfte Grafikkandidaten wurden aus diesen beiden bevorzugten Mappings
entfernt; eigene Neuzeichnungen bleiben vorgesehen. Vier nachweislich unpassende
Texttreffer werden jetzt mit `excludedChunkIds` themenbezogen ausgeschlossen:
Pseudocode: EUROPA 01079 (Netzwerke), 00042 (Prüfungshinweise), IT-Basiswissen
00115 (Signale/Zahlensysteme); Schreibtischtest: IT-Basiswissen 00175
(Netzwerkdiagnose). Der Export berücksichtigt die Ausschlüsse auch beim
Nachfüllen aus der alten Suchwarteschlange.

Verifikation: Batch-Vertragstest erfolgreich, einschließlich Ausschluss sowohl
aus Mapping als auch Fallback und unverändertem Nachbarthema. Realer Export
`ga1-9 --start 1 --limit 2` liefert zuerst EUROPA 00303 beziehungsweise
IT-Basiswissen 00221 und IHK Bonn 00076; die vier verworfenen Treffer fehlen.
Weitere automatisch ergänzte Text-/Grafikkandidaten sind weiterhin ungeprüft.
Historische Statusfelder des Mappings bleiben unverändert; Lernmanifest und
Abdeckungsbericht sind maßgeblich. Keine neue Lernseite, Abdeckung 117/380.

Neuntes Kernthema am 15.09.2026: `ga1-9__10`, Idempotenz und deklarativ versus
imperativ. Eigene Zustandsmodelle trennen Beschreibung und Wiederholungswirkung;
explizite Grenzen für Protokolle, veränderte Eingaben und parallele Prozesse.
Ablaufgrafik, MathML, Zahlenübung, Sortierung, Quizze, eigener Testnachweis,
Karten und zwei Pflichtziele. Buchbeleg EUROPA 00750, Zeilen 7569–7596,
gelesen; Idempotenz gegen das offizielle Ansible-Glossar abgeglichen:
https://docs.ansible.com/projects/ansible/latest/reference_appendices/glossary.html#idempotency

`npm test` und gezielter `verify-idempotency-browser.mjs` erfolgreich:
Fehlantworten, Zahlenfeedback, Tastatur, Speicherung, Abschlussgrenzen und
Rücknahme. Grafik, Formel und Übung bei 390/1440px in beiden Themes geprüft,
repräsentative Ansichten visuell gelesen. Kein erneuter kompletter Browsertest.
Revision `2026-09-15.1`, `CURATED_DRAFT`. Abdeckung 118/380, GA1 10/164.
Menschliche Fachfreigabe bleibt offen.

Vertiefung am 15.09.2026: Idempotenz erhält ein eigenes Gegenbeispiel
„stabil, aber falsch“. Eine konstante falsche Zielkonfiguration trennt
Wiederholungswirkung von Auftragserfüllung. Zusatzquiz mit gezielten
Fehlerrückmeldungen; keine neuen Pflichtziele. Ableitung aus dem bereits
definierten Zahlenmodell, keine zusätzliche externe Quellenbehauptung.
Revision `2026-09-15.2`, weiterhin `CURATED_DRAFT`.

`npm test` und gezielter Idempotenz-Browsertest erfolgreich, einschließlich
neuem Quiz, Tastatur, Speicherung, Abschlussgrenzen und 390/1440px in beiden
Themes. Gegenbeispiel mobil und am Desktop visuell geprüft. Abdeckung bleibt
118/380; kein neuer vollständiger Navigationstest.

Zehntes Kernthema am 15.09.2026: `ga1-9__3`, Kontrollstrukturen. Eigene Fälle
zu unabhängigen und exklusiven Bedingungen, for/while/do-while, Nullfall,
UND-Verknüpfung und Versuchslimit. Fallauswahl ohne Fall-Durchlauf ausdrücklich
als Modell definiert; Sprachdetails nicht pauschal verallgemeinert. Grafik,
vollständiger Ablauf, Zahlenübung, Sortierung, Selbsterklärung, Karten und zwei
Pflichtziele. Quellen: ITLF6–9 Chunk 00159 vollständig sowie Anfang von 00151
(Einleitung/erstes Beispiel) gelesen; beschädigter OCR-Code nicht übernommen.

`npm test` und gezielter `verify-control-structures-browser.mjs` erfolgreich:
Fehlantworten, Nullwert-Eingabe, Tastatur, Speicherung, Abschluss/Rücknahme und
390/1440px in beiden Themes. Code, Grafik und Sortierung visuell geprüft.
Kein erneuter vollständiger Navigationstest. Revision `2026-09-15.1`,
`CURATED_DRAFT`; Abdeckung 119/380, GA1 11/164. Menschliche Fachfreigabe offen.

Vertiefung am 15.09.2026: Kontrollstrukturen ergänzt um den letzten erlaubten
Durchlauf und einen eigenen Off-by-one-Fall. Zahlenübung trennt „kleiner als“
von „höchstens“, erklärt Zählerbedeutung und Zeitpunkt der Erhöhung. Eigene
Ableitung des vorhandenen Versuchsmodells, keine neue Quellenbehauptung.
Revision `2026-09-15.2`, unveränderte Pflichtziele und `CURATED_DRAFT`.
`npm test` und gezielter Browsertest erfolgreich, inklusive Fehlwerten 3/5,
richtiger Eingabe 4, Tastatur und Abschlussgrenzen. Neuer Abschnitt bei
390/1440px in beiden Themes geprüft und mobil/desktop visuell kontrolliert.
Abdeckung bleibt 119/380; kein erneuter vollständiger Navigationstest.

Vorbereitung am 15.09.2026: Für `ga1-9__4` liegt jetzt das begrenzte
Redaktionspaket `docs/learning-prep/GA1_VARIABLES_FUNCTIONS.md` vor. Buchkontext
IT-Basiswissen 00221 bis zur Daten-/Verlaufstabelle und offizielle Python-
Abschnitte zu Listen und Funktionen geprüft. Eigener Dateigrößenfall mit
Lernzielen, zwei Grafikaufträgen, Übungen, Transfer und Prüfplan vorbereitet.
Fünf Sollwertfälle einschließlich leerer Liste und Nullwert unabhängig lokal
berechnet; unveränderte Eingabe und wiederholte Aufrufe geprüft.
Noch keine Lernseite, keine Freigabe und keine Abdeckungserhöhung: 119/380.
Nächster Umsetzungsschritt ist dieses Redaktionspaket, nicht erneute Vollsuche.

Umsetzung am 17.09.2026: `ga1-9__4` ist als Lernseite zu Variablen, Typen,
Listen und Funktionen eingebaut. Grundlage ist das oben dokumentierte
Redaktionspaket, keine neue Vollrecherche. Zwei eigene Erklärgrafiken,
MathML, drei Zahlenübungen, Sortieraufgabe, eigener Schreibauftrag,
Abrufkarten und zwei Pflichtziel-Checks behandeln auch Nullwert und Leerfall.
`npm test` und gezielter Browsertest erfolgreich, einschließlich Tastatur,
Fehlantworten, Speicherung und Abschluss/Rücknahme. 390/1440px in beiden
Themes geprüft. Abdeckung 120/380, GA1 12/164; `CURATED_DRAFT`, menschliche
Freigabe offen. Kein vollständiger Navigationstest und keine Veröffentlichung.

Umsetzung am 17.09.2026: `ga1-9__12` ergänzt YAML/JSON mit zwei eigenen
Struktur-/Prüfgrafiken, Fehlerdiagnosen, Zahlenübung, Sortieraufgabe,
Schreibauftrag, Karten und zwei Pflichtzielen. Buch-Batch `ga1-9-012-012`
lieferte unpassende Java-/Arduino-Kandidaten; keine davon als Beleg übernommen.
Stattdessen RFC 8259 Abschnitte 2–7 sowie YAML 1.2.2 Kapitel 2, 6.1 und
10.3.2 als Primärquellen gelesen und im Quellenkatalog separat als Webquellen
registriert. Die fünf lokalen Bücher bleiben unverändert.
Eigene Konfigurationsfälle trennen Syntax, Struktur/Typvertrag und Wirkung;
kein ausführbares Deployment und kein automatischer Parser im Schreibauftrag.
`npm test` und gezielter Browsertest bestanden, einschließlich Fehlantworten,
Tastatur, Persistenz, Abschluss/Rücknahme und 390/1440px in beiden Themes.
Abdeckung 121/380, GA1 13/164. Status `CURATED_DRAFT`, menschliche Freigabe
offen; kein vollständiger Browser-Regressionslauf und kein Push.

Umsetzung am 17.09.2026: Dreierbatch `ga1-9__11`, `ga1-9__13`, `ga1-9__14`
zu Ansible/IaC, Git und CI/CD eingebaut. Einzelheiten und Quellenentscheidungen
in `docs/learning-prep/GA1_AUTOMATION_BATCH.md`. Sechs eigene Diagramme,
grafische CI-Laufzeitrechnung, drei Zahlenübungen, Sortier-/Abrufaufgaben und
sechs Pflichtnachweise. Buchstellen bei Git/Ansible begrenzt ausgewertet und
präzisiert; unpassende CI/CD-Treffer nicht als Fachbelege übernommen.
`npm test`, gezielter Dreier-Browsertest und vollständiger
`scripts/run-browser-tests.mjs`-Durchlauf erfolgreich: einschließlich Navigation,
Theme-Persistenz, bestehender Lernmodule und Bewegung/Reduced Motion.
Neue Einheiten bei 390/1440px in beiden Themes geprüft. Abdeckung 124/380,
GA1 16/164; Automatisierungs-Themengruppe 10/16. Alle drei `CURATED_DRAFT`,
menschliche Freigabe offen; kein Push oder produktives Deployment.

Umsetzung am 17.09.2026: Bash und PowerShell (`ga1-9__6`, `ga1-9__7`)
mit vier eigenen Grafiken, Ausgabevorhersagen und interaktiven Übungen ergänzt.
Quellenabgrenzung und Korrektur der Standardstrom-/Parameterverwechslung in
`docs/learning-prep/GA1_SHELL_BATCH.md`. `npm test`, echte lokale
Bash-/PowerShell-Beispieltests und gezielte Browserprüfungen bestanden.
Keine AD-Befehle ausgeführt. Abdeckung 126/380, GA1 18/164,
Automatisierungsgruppe 12/16. Beide `CURATED_DRAFT`; Fachfreigabe offen.
Keine erneute vollständige Browserregression, kein Push oder Deployment.

Umsetzung am 17.09.2026: Skriptwerkstatt und Skriptanalyse (`ga1-9__8`,
`ga1-9__9`) ergänzt. Vier eigene Ablaufgrafiken, Schreibaufträge zu Logs,
Backup, CSV und Dienststatus sowie ein fehlerhafter und korrigierter Zähler
mit Trace und Grenzfalltests. Unpassende Buchtreffer ausgeschlossen;
Quellenentscheidungen in `docs/learning-prep/GA1_SCRIPT_WORKSHOP_BATCH.md`.
`npm test`, echte PowerShell-Beispieltests und vollständiger Browserlauf
bestanden. Mobil/Desktop und beide Themes inklusive breiter Tabellen geprüft.
Abdeckung 128/380, GA1 20/164, Automatisierungsgruppe 14/16.
Beide Einheiten `CURATED_DRAFT`; menschliche Freigabe offen, kein Push.

Umsetzung am 17.09.2026: Struktogramm/PAP und Aggregation/Komposition
(`ga1-9__0`, `ga1-9__5`) mit fünf eigenen Fachzeichnungen ergänzt.
Quellen- und Notationsprüfung in `docs/learning-prep/GA1_NOTATION_BATCH.md`.
OMG-Originalspezifikation begrenzt gelesen und relevante Seiten visuell geprüft;
Lebensdauer-Ausnahme bei herausgelösten Teilen ausdrücklich berücksichtigt.
`npm test` und gezielte Browserprüfungen bestanden, 390/1440px und beide Themes.
Abdeckung 130/380, GA1 22/164, Automatisierungsgruppe 16/16 als Lernentwürfe.
Menschliche Freigabe offen; kein Push und keine Veröffentlichung.

Noch nicht umgesetzt: die weiteren Zuordnungsvorschläge für
WiSo und weitere GA1-Themengruppen. Die URL-Inventur bleibt
eine Lesewarteschlange und wird durch diesen Batch nicht pauschal als geprüft
markiert.

### Offene Quellenlektüre

1. **Priorität 1:** alle noch nicht ausgewerteten FISI-Lektionen und gemeinsam genutzten Grundlagenseiten, zunächst Systemlösung, Speicher, Virtualisierung, Netzwerkplan, Subnetting, Testprotokoll und Wirtschaftlichkeit. Teilgelesene Seiten vervollständigen, bevor sie einzelne technische Aussagen belegen.
2. **Priorität 2:** verbleibende FISI-Lernfeldseiten und Prüfungsseiten; Zuordnungen gegen KMK/FIAusbV sowie vorhandene Buchquellen abgleichen.
3. **Priorität 3:** thematisch passende Lexikonartikel für kommende GA1-/GA2-/WiSo-Blöcke. Definitionen gegen RFC, BSI, Herstellerdokumentation oder geltendes Recht rückprüfen. Keine Komplettübernahme des Lexikons.
4. **Priorität 4:** öffentliche Dojos und Lernpfade nach fachlicher Passung; nur Aufgabenform/Kompetenz notieren, keine Aufgabenbank kopieren.
5. **Priorität 5:** übrige Karriere-, Einstiegs- und Umschulungsseiten strukturell inventarisiert lassen, später auf ausdrücklichen Bedarf lesen.

Im JSON ist die Warteschlange pro URL markiert. Der Auftrag „alle Unterseiten anschauen“ ist damit **nicht als vollständige redaktionelle Lektüre erledigt**: Die umfassende Inventur ist vorhanden, die verbleibende Inhaltslektüre bleibt offen. Es wurde keine dauerhafte automatische Beobachtung eingerichtet.
