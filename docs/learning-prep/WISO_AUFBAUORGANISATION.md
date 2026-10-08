# W6.9 Aufbauorganisation – geprüfter Lernentwurf

Stand: 04.10.2026. Branch codex/ga1-linux-admin, Worktree next-learning-ga1/AP2-Tracker. Status CURATED_DRAFT; menschliche Freigabe steht aus. Keine Veröffentlichung und kein Push.

## Umfang

Eigenständige Einheit „Aufbauorganisation sicher lesen“ für wiso-6__9: acht Abschnitte, Diagnose, vier verpflichtende Lernziel-Checks mit Antwortfeedback, eigener IT-Anwendungsfall, Abrufübung und vier Tastatur-Lernkarten. Aufbau und Ablauf, Stelle und Instanz, Einlinie, beratende Stablinie, zwei Kompetenzachsen der Matrix, Organigrammlegende und Konfliktregeln werden getrennt erklärt. Drei selbst erstellte technische SVG-Organigramme; keine dekorativen Rasterbilder oder ASCII-Ersatz. Formeln sind hier nicht erforderlich.

Die Matrixgrafik ist ein ausdrücklich begrenzter Ausschnitt, keine vollständige Gesamtorganisation. Leitungsrichtung und Beziehung werden im Text, in Beschriftungen und Bildbeschreibungen erläutert. Projektkompetenzen sind Fallannahmen, keine universelle disziplinarische Befugnis. Vorteile und Risiken sind Möglichkeiten, keine Erfolgsgarantien.

## Quellen

Privater EUROPA-Integrator-Themenanker: lokaler Export, Zeilen 929–936; ausschließlich Begriffe, keine Buchaufgabe oder Grafik übernommen. Öffentliche Lehrquellen HFU (2020), bpb (2017) und Hering/Toll/Gerbaulet WISU 5/19 S. 574–578 wurden für stabile Modellbegriffe geprüft; historische Daten werden nicht als aktuelle Rechtsnorm ausgegeben. Quellen und Grenzen stehen im Kurationsartefakt und in AUFBAUORGANISATION_QUELLEN.md. Eigene Beispiele, Fragen und Grafiken.

Bestehendes DESIGN.md und Deep-Space Reference Lock fortgeführt; kein neues Layout oder Theme. Vorherige reale Register-Lernseite als Vergleich betrachtet.

## Tatsächlich ausgeführte Prüfungen

- npm run build: bestanden.
- npm test: nach gezielter Vormerkung der drei neuen SVG-Dateien bestanden (Site-Allowlist, Compiler, Lernbatch, Lerninhalte, Fortschrittsmerge, SQL). Lokale Buchdatenprüfung meldet SKIP, weil diese Daten im Worktree nicht importiert sind; der genannte private Themenanker wurde separat im Hauptcheckout gelesen.
- AP2_BROWSER_ONLY=organisation npm run test:browser: bestanden. Nur gezielter Organisationstest, nicht die gesamte Browser-Suite.
- Diagnose falsch/richtig, vier Gates jeweils falsch/richtig/Reset, Abruf-Mindestlänge und Musterantwort, vier Karten Enter/Space, Persistenz nach Reload, Abschluss an/aus und Sperre nach Gate-Reset geprüft.
- 390 und 1440 Pixel, jeweils Dark/Light: kein Seitenoverflow; drei horizontal per Tastatur verschiebbare Grafiken auf Mobile; SVG-Texte innerhalb des Canvas, Knotenbeschriftungen innerhalb ihrer Rechtecke, Beziehungslabel ohne Rechtecküberlappung. Keine JavaScript-Seitenfehler.
- Screenshots in C:/Users/timed/AppData/Local/Temp/ap2-organisation-20261004. Visuell betrachtet: 390-dark-start, 390-light-figure-1, 1440-dark-figure-0 und 1440-light-figure-2. Mobile-Diagramme nutzen den bestehenden beschrifteten seitlichen Scrollbereich.

## Technischer Zwischenfall

Eine leere, unveränderte index.lock blockierte zunächst Git-Staging und dadurch den Site-Allowlist-Test. Keine tatsächliche Git-Prozess-ID vorhanden. Sperre recoverbar nach index.lock.stale-org-20261004 im selben Git-Verwaltungsverzeichnis verschoben; keine Arbeit oder Prozesse gelöscht. Tests danach erfolgreich wiederholt.

## Abdeckung und Fortsetzung

340/380 Kernthemen implementiert, 40 offen; GA1 164/164, GA2 107/107, WiSo 69/109. Implementiert bedeutet Lernentwurf vorhanden, nicht fachlich freigegeben.

Beginn 07:40:56 UTC, Abschlussprüfungen 07:53 UTC. Nutzung zu Beginn 75 %, danach 77 % des Wochenfensters verbraucht; gewöhnliche Nutzung erlaubt. Nächstes offenes Thema: wiso-6__10 Ablauforganisation/Prozessdenken/EPK.
