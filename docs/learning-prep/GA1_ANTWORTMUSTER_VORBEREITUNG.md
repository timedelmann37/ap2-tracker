# Antwortmuster: Quellenprüfung und didaktischer Fall

Stand 03.10.2026. Vorbereitung für ga1-11__17 abgeschlossen; Website-Einheit noch nicht implementiert. Abdeckung nicht verändert. Geplante Einheit bleibt CURATED_DRAFT bis menschliche Freigabe.

## Direkt geprüfte Themenanker

- Private Buchquelle europa-integratoren-2026:00019, Zeilen 284–296: Planung mit Alternativen und begründeten Entscheidungen. Nur Themenanker; kein Text oder Buchfall wird übernommen.
- Primärquelle IHK/NUiF-Workbook: https://www.ihk.de/blueprint/servlet/resource/blob/4884370/44aa896e3fe6548cb29d9da466115485/untersuetzung-fuer-auszubildende-data.pdf . PDF-Text Seite 5, Zeilen 218–226 direkt gelesen am 03.10.2026: Vergleichen und Begründen als unterschiedliche Arbeitsaufträge. Das Workbook liefert allgemeine Prüfungshinweise, keinen verbindlichen AP2-Lösungsschlüssel.

## Eigener Fall: Backup für Werkstatt Kies

Der Betrieb verlangt einen maximalen Datenverlust von einer Stunde und Wiederherstellung innerhalb von zwei Stunden. Die Aufgabe gibt zwei vereinfachte Angebote vor:

- A: Sicherung einmal am Abend; im Aufgabentext kein erfolgreicher Wiederherstellungstest dokumentiert.
- B: Sicherung stündlich; ebenfalls kein dokumentierter Wiederherstellungstest.

Diese Daten sind ausdrücklich didaktisch erfunden. Aus Sicherungstakt allein darf keine garantierte Wiederherstellungszeit abgeleitet werden. Auch die Datenverlustgrenze setzt erfolgreiche Sicherungen, geeignete Verfahren und beobachtete Sicherungsläufe voraus.

### Kurzes Antwortmuster

Anforderung: höchstens eine Stunde Datenverlust. Lösung: stündliche Sicherung aus Angebot B. Begründung: Der vorgesehene Sicherungstakt passt zur geforderten Datenverlustgrenze, während einmal abends diese Grenze über einen Arbeitstag nicht abdeckt. Einschränkung: erfolgreiche Läufe und Wiederherstellbarkeit müssen nachgewiesen sein.

### Alternative und Abwägung

A hat im Modell weniger Sicherungsläufe, verfehlt aber die Datenverlustanforderung. B ist für diese Anforderung der passende Ansatz, kann jedoch aus den gegebenen Angaben nicht als vollständig geeignet freigegeben werden: Die Zwei-Stunden-Wiederherstellung ist unbelegt. Ein gemessener Restore unter repräsentativen Bedingungen wird benötigt. Keine pauschale Behauptung „B erfüllt alle Anforderungen“.

## Geplanter Ablauf im bestehenden Lernschema

1. Diagnose: reine Techniknennung versus begründete Auswahl unterscheiden.
2. Anforderung aus dem Fall präzise entnehmen, Datenverlust und Wiederherstellungsdauer nicht vertauschen.
3. Lösung mit einer passenden Eigenschaft verbinden, Ursache und Nutzen verständlich erklären.
4. Alternative nach denselben Anforderungen vergleichen und begründetes bedingtes Urteil formulieren.
5. Eigene freie Antwort vor Musterlösung; keine automatische Fachbenotung.

Lernziel-Checks: Anforderung, tragfähige Begründung und Abwägung. Fehlantworten: „Backup ist sicher“, fehlender Fallbezug, Sicherungsintervall als Restore-Dauer, erfundener erfolgreicher Test. Technische SVG-Prozessgrafik verbindet Anforderung, Lösung, Begründung, Alternative und Nachweisgrenze. Keine dekorative Rastergrafik; keine Formel für diesen qualitativen Auftrag nötig.

Gestaltung: bestehende Deep-Space-Leseflächen und Quiz-/Recall-Widgets unverändert verwenden; Refero-Skill für die nächste Umsetzung gelesen. Kein neues UI in diesem Vorbereitungsabschnitt.

## Technische Quellenprüfung (03.10.2026, zweiter Abschnitt)

Direkt gelesen: AWS Whitepaper, Disaster recovery options in the cloud, Abschnitte Backup and restore (Zeilen 7, 23, 61 und 71): https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html . Sicherungstakt beeinflusst den erreichbaren Wiederherstellungspunkt; Wiederherstellung benötigt auch Konfiguration und Infrastruktur. Die Strategie muss getestet werden. Nur diese allgemeinen Beziehungen werden verwendet, keine AWS-Produktgarantien auf den lokalen Fall übertragen.

AWS Business Continuity Plan: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/business-continuity-plan-bcp.html . RTO bezeichnet die maximal akzeptable Verzögerung bis zur Wiederherstellung des Dienstes; RPO die maximal akzeptable Zeit seit dem letzten Wiederherstellungspunkt. Für den eigenen Fall werden daraus RPO eine Stunde und RTO zwei Stunden, nicht umgekehrt.

Präzisierung für die Umsetzung: „Stündlich geplant“ ist nicht automatisch „RPO erfüllt“. Sicherungsdauer, erfolgreicher Abschluss und Alter des tatsächlich nutzbaren Wiederherstellungspunkts müssen berücksichtigt werden. Ein Restore-Test muss den nutzbaren Dienst einschließlich notwendiger Konfiguration prüfen, nicht nur das Zurückkopieren einer einzelnen Datei. Beide Angebote bleiben hinsichtlich RTO unbelegt. Fehlende Angaben werden als fehlend gekennzeichnet, nicht ergänzt.

Diese technische Quellenprüfung ist abgeschlossen. Noch keine neue Website-Einheit und keine erhöhte Abdeckung; Build und Browserprüfung sind für diesen reinen Dokumentationsabschnitt nicht ausgeführt.

## Noch ausstehend

Die jetzt geprüften technischen Primärquellen bei der Implementierung in content/sources.json verzeichnen. Danach Schema-Einheit, Diagramm, Tests, Build, Mobile/Desktop Dark/Light und Browserinteraktionen prüfen. Erst nach diesen Prüfungen Abdeckung erhöhen und die fertige Einheit dokumentieren. In diesem Abschnitt wurden keine Website-Tests oder visuelle Abnahme einer neuen Einheit behauptet.
