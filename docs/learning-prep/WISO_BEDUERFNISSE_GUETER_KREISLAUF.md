# Bedürfnisse, Güter, Knappheit und Wirtschaftskreislauf

Abgeschlossen am 04.10.2026 im Branch `codex/ga1-linux-admin`. Einheit `wiso-7__0`, Route `/lernen/beduerfnisse-gueter-knappheit-wirtschaftskreislauf/`, Status **CURATED_DRAFT**. Keine menschliche Freigabe, kein Push und keine Veröffentlichung.

## Umgesetzter Abschnitt

- Diagnose: Warum ein verschenktes knappes Notebook kein freies Gut ist.
- Bedürfnis, kaufkraftgedeckter Bedarf und am Markt wirksame Nachfrage mit ausdrücklich benannter Lehrkonvention und abweichender Begriffsverwendung im Potsdamer Skript.
- Vier unabhängige Güterkriterien an eigenen privaten und betrieblichen IT-Fällen; Materialität, Zweck und Nutzungsdauer nicht miteinander verwechseln.
- Eigener Budgetfall mit semantischem MathML: Zwei einzeln bezahlbare Alternativen sind gemeinsam nicht finanzierbar. Opportunitätskosten sind der entgangene Nutzen der besten erreichbaren Alternative, nicht automatisch deren Kaufpreis.
- Einfacher Zwei-Sektoren-Kreislauf mit vier beschrifteten, gerichteten Real- und Geldströmen; Staat, Banken, Ausland sowie Sparen und Investieren ausdrücklich als Modellgrenzen.
- Vier Pflichtziel-Checks mit Feedback und erneutem Versuch, Abruf/Transfer, vier umschaltbare Lernkarten und Wiederholungshinweis.
- Drei eigenständige SVG-Lehrdiagramme. Der enge neue `economic-cycle`-Renderer nutzt bestehende Theme-Tokens, gerichtete Pfeile und gestrichelte Geldströme; keine Rasterbilder und kein neues Styling.

## Quellen und Grenzen

Fundstellen und Abrufgrenzen stehen in `WIRTSCHAFTSKREISLAUF_QUELLEN.md`. Originaltexte von Universität Potsdam, bpb und OSZ Lotis geprüft. Der Bundesbank-Originalabschnitt wurde im Suchdienst geprüft; vollständiger Abruf scheiterte an Größenbegrenzungen. Keine visuelle PDF-Prüfung behauptet. OSZ-Material und lizenzierter bpb/Duden-Artikel sind als ergänzend beziehungsweise sekundär eingeordnet. Alle Fälle, Diagramme und Übungen sind eigene Darstellungen.

Die Suche in den verfügbaren privaten Buchtexten ergab keinen belastbaren passenden Themenanker für diesen Abschnitt. Deshalb keine künstliche Buchfundstelle und kein fremdes Aufgabenmaterial ergänzt. Die Quellen belegen Grundlagen, nicht die Verbindlichkeit eines AP2-Prüfungskatalogs.

## Tatsächlich ausgeführte Prüfung

- `npm run build:learning`: bestanden.
- `npm test`: bestanden, einschließlich vollständigem Site-Build, Site-Prüfung, Lerncompiler, Learning-Batch, Lerninhalten, Netzplan/Gantt, Fortschritts-Merge und SQL-Rangliste.
- `AP2_BROWSER_ONLY=kreislauf npm run test:browser`: bestanden. Nur dieser gezielte Browserlauf, nicht die gesamte Browser-Suite.
- Browsermatrix: 390 und 1440 Pixel, jeweils Dark/Light, Reduced Motion. Diagnose, falsche/richtige Antworten, Feedback, erneuter Versuch, Abruf-Sperre, Karten per Enter/Leertaste, Persistenz nach Reload und Markieren/Rücknahme geprüft.
- Diagrammtexte auf Canvas-Grenzen und die vier Pfeile auf Richtung geprüft; mobiles seitliches Diagrammscrolling per Tastatur und fehlender Seitenüberlauf geprüft. MathML/ARIA vorhanden. Keine Browserfehler im Lauf.
- Reale Screenshots des Desktop-Dark- und Mobile-Light-Kreislaufs, des Desktop-Light-Begriffsdiagramms und der Mobile-Dark-Formel visuell geprüft. Screenshots und Testlogs liegen lokal im temporären Verzeichnis `ap2-kreislauf-20261004` beziehungsweise als `ap2-kreislauf-*.log`.
- `git diff --check`: bestanden. Eine alte leere Git-Index-Sperre erst nach einem freien Prozesszeitfenster recoverabel als `index.lock.stale-kreislauf-20261004` gesichert; keine aktiven Prozesse beendet und keine fremden Dateien entfernt.

## Abdeckung

344 von 380 Kernthemen implementiert, 36 offen; WiSo 73 von 109. Implementiert bedeutet weiterhin Entwurf, nicht freigegeben. Nächstes offenes Kernthema: `wiso-7__1` Angebot, Nachfrage, Preisbildung und Marktformen.
