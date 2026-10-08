# GA1: Kennzahlen und Kapazitätsplanung

Abgeschlossen am 03.10.2026; Kernthema `ga1-10__1`, Status `CURATED_DRAFT`.

## Umfang und Quellen

Eigener Hainwerk-Fall: sechs Beobachtungsbereiche, vergleichbare Trends, Zählerreset,
Speicherreserve, lineare Prognose, Sensitivität und Umsetzung mit Vorlauf.
Eine Diagnose, vier verpflichtende Lernziel-Checks mit Antwortfeedback,
Transfer mit eigener Eingabe vor Musterlösung, sieben Tastatur-Abrufkarten.
Zwei technische SVG-Entscheidungsketten und zwei semantische MathML-Formeln.

- Privater Themenanker `europa-integratoren-2026:00038`, Zeilen 443–468 direkt gelesen:
  Ressourcenverwaltung, Systemauslastung/-verhalten, dokumentierte Tests. Keine Aufgaben übernommen.
- [Linux Kernel proc](https://docs.kernel.org/filesystems/proc.html): MemFree,
  MemAvailable und Cached direkt gelesen; verwendet nur zur Linux-RAM-Abgrenzung.
- [Zabbix Agent-Items](https://www.zabbix.com/documentation/current/en/manual/config/items/itemtypes/zabbix_agent):
  system.cpu.util, net.if.in/out, vfs.dev.read/write direkt gelesen; Parameter,
  Zähler/Raten und Gerätebezug. Keine allgemeine Schwelle daraus abgeleitet.
- `docs/AUSBILDUNG_IT_SOURCE_REVIEW.md`: eigene szenariobezogene Entscheidungen,
  Messdaten nicht als bewiesene Diagnose behandeln; keine Portalaufgaben kopiert.

## Fachliche Eigenprüfung

400 − 60 = 340 GiB Planungsgrenze; (250 − 222)/7 = 4 GiB/Tag;
(340 − 250)/4 = 22,5 Tage. Vollbelegung erst nach 37,5 Tagen, aber nicht Planungsziel.
14 Tage Vorlauf + 3 Tage Puffer ergeben 5,5 Tage bis zum spätesten Prozessstart.
Bei 6 GiB/Tag nur 15 Tage; regulärer 17-Tage-Ablauf reicht nicht.
50.000.000 Byte/10 s = 5.000.000 Byte/s = 40.000.000 bit/s:
4 % einer nominellen 1-Gbit/s-Schnittstelle in Empfangsrichtung.
Annahmen und Aussagegrenzen sind ausdrücklich Bestandteil der Übungen.

## Gestaltung und tatsächlich ausgeführte Prüfung

Bestehende Deep-Space-Referenzbindung fortgeführt: Doppler-Lesepanels und Inter,
Astro nur Atmosphäre, n8n-Verbindungsidee nur am technischen Fluss.
Keine neue Oberfläche, keine dekorativen Rasterbilder.

- `npm run build`: erfolgreich.
- `npm test`: erfolgreich.
- `AP2_BROWSER_ONLY=capacity-trends npm run test:browser`: erfolgreich;
  kein vollständiger Browser-Gesamtsuitenlauf behauptet.
- Eigener Test `scripts/verify-capacity-trends-browser.mjs`: falsche/richtige Antworten,
  erklärendes Feedback, Lernziel-Sperren, Reset, Eingabe vor Recall-Muster,
  Enter/Space auf sieben Karten, Persistenz, Abschluss und erneute Sperre.
- 390/1440 Pixel, Dark/Light, Reduced Motion: keine Seitenüberbreite,
  SVG-Texte innerhalb der Zeichenfläche, mobile Diagramme bewusst seitlich
  scrollbar mit Hinweis und geprüfter Tastaturbedienung.
- Zwei MathML-Formeln mit zugänglichem Namen und geprüftem Ergebnis;
  Screenshots der Formeln, Diagramme und Einstiege erzeugt.
  Visuell betrachtet: Desktop Dark-Diagramm, Mobile Light-Diagramm,
  Desktop Light-Einstieg, Mobile Dark-Einstieg sowie Mobile Light-/Desktop Dark-Formeln.
- Vergleich mit vorheriger Monitoring-Lernseite: Hierarchie und Quellenrollen erhalten.

Prüfbilder lokal: `C:/Users/timed/AppData/Local/Temp/ap2-kap-20261003/`.
Vorhandener `verify-capacity-browser.mjs` unverändert erhalten;
neuer Test separat in Runner integriert.
Coverage nach Build: 228/380 insgesamt, GA1 120/164; 44 GA1-Kernthemen offen.
Keine menschliche Fachfreigabe, kein Push, keine Veröffentlichung.
