# Verteilte Speicher: Redaktion und Prüfung

18.09.2026; ga1-3__10; CURATED_DRAFT.
Privater Batch ga1-3-010-010: historische IHK-Bonn-SAN-/NAS- und Produktangaben
sind keine geeigneten EC-/SDS-Belege. Ausgeschlossen; keine Buchgrafik übernommen.
Nicht aufgelöste Referenzen bleiben ungeprüft.

Zunächst Ceph latest gefunden, als Entwicklungsversion erkannt. Stattdessen
versionierte Squid-Dokumentation verwendet: Erasure code (Einleitung, Profile,
overhead, recovery) und Architecture (Einleitung, Komponenten, EC).
CRUSH-Map-Seiten geöffnet, jedoch nicht als zusätzlich vollständig geprüfte
Quelle geführt. Keine Defaults, Tuning- oder Hardwareempfehlungen übernommen.

Eigene Modelle: Replikationsfaktor 3 bedeutet insgesamt drei Kopien.
8 TiB Nutzdaten: 24 TiB repliziert oder 12 TiB mit EC 4+2.
Übung 12 TiB ergibt 18 TiB; Transfer 20 TiB ergibt 30 TiB.
Ohne Metadaten, Rundung und Betriebsreserve.
Idealisiertes Reed-Solomon, intakte Fragmente desselben Datenstands.
Rekonstruierbarkeit ausdrücklich von Dienstbetrieb/Schreibfreigabe getrennt.
Rack A: D1/D2/D3 auf drei Hosts; B: D4/P1 auf zwei; C: P2 auf einem.
Rack-B-Ausfall lässt vier Fragmente, Rack-A-Ausfall nur drei.
Keine pauschale Gleichsetzung Fragmentverlust und Rackverlust.
Wiederaufbau braucht Reserve, Netzwerk und Zeit; Schutz ersetzt kein Backup.

Zwei eigene Vergleichsgrafiken, zwei MathML-Blöcke, Diagnose, Rechenaufgabe,
Reihenfolge, freie Erklärung, Karten und Pflichtziele.
npm test bestanden, nach visueller Beschriftungskorrektur erneut bestanden.
Gezielter Browsertest 390/1440px, Dark/Light ebenfalls erneut bestanden:
Fehlfeedback, Tastatur, Persistenz, Pflichtziel-Sperre, Abschluss/Rücknahme,
kein Seitenüberlauf. Rack-Beschriftungen nach Sichtprüfung gekürzt und
erneut visuell geprüft. Im gemeinsamen Runner registriert;
keine vollständige erneute Browserregression.

Abdeckung 137/380, GA1 29/164, Speicherlösungen 11/13.
Menschliche Fachfreigabe offen. Kein Push, keine Veröffentlichung.
Nächster offener Inhalt: Kapazitätsplanung (ga1-3__11).

