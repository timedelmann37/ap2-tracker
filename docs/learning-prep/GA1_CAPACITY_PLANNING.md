# Kapazitätsplanung – Lernentwurf

Stand: 18.09.2026. Kernthema `ga1-3__11`, Status `CURATED_DRAFT`.

## Quellen und Abgrenzung

- Buchbatch `ga1-3-011-011`: gekürzte RAID-Tabelle als Gruppenkontext erkannt; nicht als vollständiger Rechenbeleg verwendet. CPU-/Mikrocontroller-Treffer und vorgeschlagene Grafik ausgeschlossen.
- [NIST](https://physics.nist.gov/cuu/Units/binary.html): Präfixtabelle und Einheitenvergleiche gelesen.
- [Ceph Squid](https://docs.ceph.com/en/squid/rados/configuration/mon-config-ref/#storage-capacity): Abschnitt Storage Capacity gelesen. Nur Prinzip der Betriebsreserve bei Ausfällen übernommen, keine Default-Empfehlungen.
- Eigene Beispiele, Aufgaben und zwei Grafiken; keine Buchabbildung veröffentlicht.

## Fachliche Kontrolle

Sechs aktive 2-TB-Platten ergeben 12 TB roh, idealisiert 8 TB nach RAID 6, etwa 7,276 TiB. Keine Hot-Spare-Platte; Metadaten und Dateisystemabzüge ausgeschlossen. Umrechnung ist kein Platzverlust.

4 TiB mit jährlich 20 Prozent Wachstum ergeben nach drei Jahren 6,912 TiB. Bei 20 Prozent freier Reserve an der Gesamtnutzkapazität werden 8,64 TiB benötigt. Die Prozentbasis ist ausdrücklich benannt. 20 Prozent sind eine Aufgabenannahme, keine Betriebsempfehlung.

Übung: 12 / 0,75 = 16 TiB; Fehlantwort 15 lässt nur 20 Prozent frei. Transfer: 5 × 1,2² / 0,8 = 9 TiB. Redundanz, technische Abzüge, Backup und freie Reserve bleiben getrennt.

## Prüfungen

- `npm test` erfolgreich: Build, Site, Compiler, Batches, Lerninhalte und Fortschrittsmerge.
- `scripts/verify-capacity-browser.mjs` erfolgreich: Fehlerfeedback, Wiederholen, Tastatur, Zahlenübung, Reihenfolge, eigene Erklärung mit Persistenz, Karten, Pflichtziel-Sperre, Abschluss und Rücknahme.
- 390 und 1440 px, Dark/Light: kein Seitenüberlauf; repräsentative Screenshots von Formeln und Grafiken gesichtet. Bestehende mobil horizontal verschiebbare Grafiken mit Hinweis beibehalten.
- Keine vollständige Browserregression aller Einheiten behauptet. Gemeinsamer Renderer unverändert.

Abdeckung: 138/380 Lernentwürfe, GA1 30/164, Speicherlösungen 12/13. Menschliche Fachfreigabe offen. Nur lokal gesichert, nicht veröffentlicht.

Nächster Abschnitt: Archivierung `ga1-3__12`; rechtliche Aussagen vor Übernahme aktuell prüfen.
