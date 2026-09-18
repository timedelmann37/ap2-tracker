# Dateisysteme: Redaktion und Prüfung

18.09.2026; ga1-3__7; CURATED_DRAFT.
Privater Batch ga1-3-007-007: ITLF10–12 S. 58 (VM-Backup), S. 67 (NTP),
EUROPA Abschnitt Datenspeicherung/RAID. Nur angrenzender Kontext,
kein belastbarer Vergleich der Dateisysteme; nicht als Fachbeleg übernommen.
Insbesondere Snapshot im selben Pool nicht als unabhängiges Backup dargestellt.

Primärabgleich, ausgewählte Abschnitte:
- Microsoft ReFS overview: Resiliency, Supported deployments, Feature comparison.
- Microsoft fsutil quota: Parameters und Remarks.
- Linux Kernel ext4: Einleitung und Data Mode.
- Linux Kernel XFS: Einleitung, logdev und Benutzer-/Gruppen-/Projektquotas.
- Btrfs Introduction: Einleitung und Feature overview.
- OpenZFS zfsconcepts: Hierarchy und Snapshots.
- OpenZFS zpool-scrub: DESCRIPTION.
Die zwei zunächst versuchten OpenZFS-Basic-Concepts-Seiten lieferten keinen
brauchbaren Inhalt; stattdessen die offiziellen Manual-Seiten verwendet.
Keine Befehle aus Quellen ausgeführt. Versions- und Supportgrenzen genannt.

Eigene Fälle: NTFS für Windows-Startvolume/native Datenträgerquotas; XFS als
Kandidat bei ausdrücklich geforderten nativen Projektquotas und Freigabe.
Kein universeller Gewinner. Journal, Prüfsumme, Snapshot und unabhängiges
Backup getrennt. Erkennung allein garantiert keine Reparatur.
Quota-Modell: 8 GiB angerechnet, 10 GiB harte Grenze, 3 GiB Upload,
500 GiB frei. Restbudget 2 GiB; Upload überschreitet die harte Grenze.
Kompression, Metadaten und Block-Sharing ausdrücklich ausgeklammert.

Zwei eigene Diagramme, grafische MathML-Beziehung, Vergleichstabelle,
Diagnose, Zahleneingabe, Reihenfolge, freie Erklärung, Karten, zwei Pflichtziele.
npm test erfolgreich. Gezielter Browsertest 390/1440px, Dark/Light:
Fehlfeedback, Tastatur, Persistenz, Pflichtziel-Sperre, Abschluss/Rücknahme,
kein Seitenüberlauf. Mobile Tabelle tatsächlich horizontal gescrollt.
Repräsentative Ansichten visuell geprüft. Keine erneute vollständige
Browserregression; Test im gemeinsamen Runner registriert.

Abdeckung 134/380, GA1 26/164, Speicherlösungen 8/13.
Menschliche Fachfreigabe offen; keine Veröffentlichung und kein Push.
Nächster verwandter offener Inhalt: LVM/Volumes (ga1-3__8).

