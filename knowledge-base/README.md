# Lokale Wissensbasis

Die Wissensbasis trennt bewusst zwei Ebenen:

1. `knowledge-base/local/` enthält die vollständig importierten Buch-Exporte,
   Bilder sowie maschinenlesbare Such-, Tabellen- und Bildindizes. Der Ordner
   ist lokal, wird von Git ignoriert und darf nicht veröffentlicht werden.
2. `content/learning/` enthält ausschließlich kuratierte, neu formulierte
   Lerneinheiten. Nur diese Inhalte werden in die öffentlich erreichbaren
   Lernseiten gebaut.

Damit ist das Nachschlagewerk keine zweite Lernplan-Hierarchie. Die bestehende
Struktur `Bereich > Themengruppe > Kernthema` bleibt führend; die Wissensbasis
liefert Material für ein Kernthema, und die Lernseite vermittelt und prüft es.

## Import

```powershell
npm run knowledge:import -- `
  --source 'europa-integratoren-2026=C:\Pfad\zum\EUROPA-Ordner' `
  --source 'ihk-bonn=C:\Pfad\zum\IHK-Bonn-Ordner' `
  --source 'itlf6-9-2022=C:\Pfad\zum\ITLF6-9-Ordner' `
  --source 'it-basiswissen-2012=C:\Pfad\zum\IT-Basiswissen-Ordner'
```

Pro Quelle entstehen lokal:

- `raw/` mit den unveränderten Markdown-, JSON- und Bilddateien,
- `chunks.jsonl` als abschnittsweiser Volltextindex,
- `tables.jsonl` mit extrahierten Markdown-Tabellen,
- `assets.jsonl` als Bildinventar mit Prüfsummen,
- `manifest.json` mit Herkunft, Dateizahlen und Prüfsummen.

Die Suche arbeitet nur auf dieser lokalen Ablage:

```powershell
npm run knowledge:search -- "RAID 6 Rebuild"
```

PDF-Dateien werden separat importiert:

```powershell
npm run knowledge:install-ocr
npm run knowledge:import-pdf -- --source-id itlf10-12-2023 --pdf 'C:\Pfad\ITLF10-12.pdf'
```

Existiert zu einer Quelle bereits ein strukturierter Markdown-Export, wird die
Original-PDF **nicht** mit `knowledge:import-pdf` erneut importiert. Dieser
Befehl ist für neue PDF-only-Quellen gedacht. Stattdessen wird die PDF
verlustfrei als zweite Repräsentation an die bestehende Quelle gehängt:

```powershell
npm run knowledge:attach-pdf -- --source-id europa-integratoren-2026 --pdf 'C:\Pfad\EUROPA.pdf'
```

Der Markdown-Export bleibt die maßgebliche Text-, Tabellen- und
Grafikrepräsentation; die Scan-PDF bleibt die seitengetreue visuelle Referenz.
Der Anhang schreibt nach `raw/pdfs/` und `pdf/original/` und überschreibt weder
`chunks.jsonl` noch `tables.jsonl` oder `assets.jsonl`.

Der PDF-Import prüft jede Seite auf eine Textschicht. Ein reiner Seitenscan
wird vollständig und mit Seitenindex aufgenommen, aber ausdrücklich als
`ocr-required` markiert. Erst nach einer lokalen OCR dürfen daraus Volltext-
oder Tabellen-Treffer abgeleitet werden.

Die benötigten PDF-/OCR-Abhängigkeiten werden nur lokal im ignorierten
Datenordner installiert. RapidOCR und ONNX Runtime arbeiten anschließend ohne
Upload:

```powershell
npm run knowledge:ocr -- --source-id itlf10-12-2023 --pages all
npm run knowledge:verify-ocr -- --source-id itlf10-12-2023 --require-complete
```

Der Lauf schreibt jede fertige Seite atomar nach `ocr/text/`, aktualisiert
`pages.jsonl` und `chunks.jsonl` und kann nach einem Abbruch mit demselben
Befehl fortgesetzt werden. `tables.jsonl` enthält die strukturiert erkannten
Markdown-Tabellen der vier Textexporte. Tabellen in reinen PDF-Scans werden
nicht automatisch als verlässliche Zellstruktur behauptet; ihr OCR-Seitentext
ist durchsuchbar und muss vor einer Übernahme kuratiert werden.

## Grafikkatalog

Die Markdown-Exporte enthalten bereits einzeln ausgeschnittene Bilder. Der
Grafikkatalog verbindet jedes dieser privaten Assets mit der physischen
PDF-Seite, dem Fundort im Markdown, dem umgebenden Text, Abmessungen,
Prüfsumme, Dublettenstatus und einer Prüfentscheidung:

```powershell
npm run knowledge:catalog-figures -- --all
npm run knowledge:catalog-figures -- --all --ocr
npm run knowledge:verify-compendium -- --all
```

Nach der Katalogisierung durchsucht `knowledge:search` neben Buchabschnitten
auch den Markdown-Kontext und lokal erkannten Beschriftungstext der Grafiken.

`figures.jsonl` ist die spätere manuelle Arbeitsliste. `reviewStatus` bleibt
bis zur fachlichen Sichtung auf `needs-manual-review`. `rightsStatus` ist für
Originalabbildungen immer `private-source-only`. In Diagrammen vorhandene
Beschriftungen können lokal mit RapidOCR erfasst werden; das ersetzt keine
fachliche Interpretation.

Unklare oder rechtlich nicht übernehmbare Darstellungen werden nicht
automatisch veröffentlicht. Eine eigene Lernskizze erhält später einen neuen
Datensatz mit `derivedFrom`, Quellseite, Erstellungsgrund und manueller
Freigabe. So bleiben Original, Interpretation und neu gezeichnete Fassung
nachvollziehbar getrennt.

## Kuratierte Lerninhalte

Jede Datei in `content/learning/*.md` besitzt Metadaten für den kanonischen
Fortschritts-Schlüssel und Quellen-IDs aus `content/sources.json`. Der Build
erzeugt daraus `lernen/<slug>/index.html` und `content/learning-manifest.json`.

```powershell
npm run build:learning
```

Grafiken aus den Büchern werden nicht automatisch veröffentlicht. Für jede
Abbildung muss separat entschieden werden, ob sie zitiert, neu gezeichnet oder
mit geklärten Nutzungsrechten übernommen wird.
