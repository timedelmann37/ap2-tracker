# RAID Write Penalty: Redaktion und Prüfung

18.09.2026; ga1-3__4; CURATED_DRAFT.

Privater Buchbatch ga1-3-004-004 gesichtet: Kompetenzbeschreibung,
historische Speicherspezifikation und Datenbankaufgabe belegen keine
Write-Penalty-Faktoren. Ausgeschlossen; keine Buchgrafik veröffentlicht.
Dell Engineering, Understanding RAID with Dell SC Series Storage (2016),
Abschnitt 4.3 auf gedruckten Seiten 17–18 und Abschnitt 7.2 auf Seite 32
begrenzt gelesen. Nur das grundlegende I/O-Zählmodell übernommen,
keine SC-Tiering-Regeln, historischen Kapazitätsgrenzen oder Kaufempfehlungen.

Modell: gesunder Verbund, kleine zufällige Updates, Read-Modify-Write bei
Paritäts-RAID, keine Cache-Hits, kein Full-Stripe-Write, keine Hintergrundlast.
RAID 1/10 mit zwei Kopien. Faktoren 1/2/4/6 zählen Arbeit, nicht Latenz.
Eigene Zahlen: RAID 5 mit 300 Reads und 100 Writes benötigt 700 Backend-IOPS;
RAID 10 bei gleicher Last 500. Übung RAID 6 mit 200/100 ergibt 800.
Reines RAID-5-Schreibbudget 1200 ergibt 300 Frontend-IOPS.
Transfer RAID 5 mit 100/200 ergibt 900. Keine Leistungszusage.

Zwei eigene Diagramme und drei semantische MathML-Darstellungen,
Diagnose, Rechenaufgabe mit Fehlvorstellungen, Sortierung, freie Erklärung,
Lernkarten und zwei Pflichtziele. Bestehende Komponenten unverändert.

npm test bestanden. Gezielte Browserprüfung bei 390/1440px und Dark/Light:
Fehlfeedback, Tastatur, Persistenz, Zahlenprüfung, Sortierung, freie Antwort,
Lernziel-Sperre, Abschluss/Rücknahme und Überlauf geprüft. Repräsentative
Formel- und Diagrammansichten visuell geprüft. Browserprüfung im gemeinsamen
Runner registriert; keine vollständige erneute Browserregression.

Abdeckung 133/380, GA1 25/164, Speicherlösungen 7/13.
Menschliche Fachfreigabe offen. Kein Push, keine Veröffentlichung.
Nächstes offenes Kernthema der Gruppe: Dateisysteme (ga1-3__7).

