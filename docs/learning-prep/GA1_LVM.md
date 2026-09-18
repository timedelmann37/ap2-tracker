# LVM und Volumes: Redaktion und Prüfung

18.09.2026; ga1-3__8; CURATED_DRAFT.
Batch ga1-3-008-008 gelesen: ITLF6–9-Gehäuse-/RAID-Ausschnitt und EUROPA-RAID-
Tabelle sind keine LVM-Anleitung. Ausgeschlossen. Zwei nicht aufgelöste
ITLF10–12-Registerreferenzen bleiben ungeprüft; keine Buchgrafik verwendet.

Primärabgleich: Red Hat RHEL 9 Managing LVM volume groups, Einleitung und 3.4;
Basic logical volume management 4.1, 4.2.1 und 4.3.1; upstream-Handbuchtexte
resize2fs und xfs_growfs (DESCRIPTION) über man7.
Der verlinkte Red-Hat-PV-Unterabschnitt war nicht abrufbar; nicht als gelesen
markiert. Keine Quellenbefehle ausgeführt.

Eigene lineare thick-LV-Modelle; nutzbare VG-Kapazität bereits um Metadaten/
Rundung bereinigt. 200 GiB, LVs 80/60: 60 frei. Wachstum auf 120 benötigt
40 zusätzlich, 20 verbleiben. Übung Wachstum auf 130: 10 verbleiben.
Transfer 300 mit 120/100, Wachstum auf 160: 40 verbleiben.
Schichten PV/VG/LV/Dateisystem, freier Dateisystemplatz vs. VG-Extents,
Online-Erweiterung und abschließende getrennte Kontrolle.
Kein RAID-, Thin- oder Snapshot-Zusatzbedarf im Rechenmodell.
Keine Formatierungs-/Partitionierungs-/Verkleinerungsanleitung.

Zwei eigene Grafiken, zwei MathML-Blöcke, Diagnose, Zahleneingabe,
Sortieraufgabe, freie Erklärung, Karten und zwei Pflichtziele.
npm test bestanden. Gezielter Browserlauf 390/1440px, Dark/Light bestanden:
Fehlfeedback, Tastatur, Persistenz, Lernziel-Sperre, Abschluss/Rücknahme,
kein Seitenüberlauf; horizontale mobile Tabellenlesbarkeit geprüft.
Repräsentative Grafik-/Formelansichten visuell geprüft. Im gemeinsamen
Browserrunner registriert; keine vollständige erneute Browserregression.

Abdeckung 135/380, GA1 27/164, Speicherlösungen 9/13.
Menschliche Fachfreigabe offen. Kein Push, keine Veröffentlichung.
Nächster offener Inhalt: Deduplizierung, Komprimierung und Thin Provisioning.

