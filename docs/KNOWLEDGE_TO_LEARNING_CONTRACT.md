# Von der Wissensbasis zur Lerneinheit

Dieses Dokument definiert die Nahtstelle zwischen dem privaten
Quellenkompendium und den später öffentlich gebauten Lernseiten. Die
Wissensbasis ist kein zweiter Lernplan. Jedes Material wird manuell einem
bestehenden Schlüssel `Bereich > Themengruppe > Kernthema` zugeordnet.

## Status-Gates

1. **READY_FOR_CURATION**: PDF, OCR beziehungsweise strukturierter Textexport,
   Seitenbezug, Tabellen und Grafikkandidaten sind technisch vollständig und
   mit Herkunftsdaten versehen.
2. **CURATED**: Aussagen wurden fachlich geprüft, veraltete Inhalte markiert,
   Aufgaben neu formuliert und geeignete Quellenstellen einem Kernthema
   zugeordnet.
3. **DIDACTICALLY_REVIEWED**: Lernziele, Erklärfolge, Übungen, Rückmeldung und
   Wiederholung wurden geprüft. Die Einheit funktioniert ohne das Buch.
4. **PUBLICATION_READY**: Text, Rechte, Barrierefreiheit, responsive Darstellung
   und neu gezeichnete Grafiken sind freigegeben.

Ein technischer Import darf niemals einen späteren Status automatisch setzen.

## Tokensparende Produktionspipeline

Die private `learning-queue.json` wird niemals vollständig in einen
Redaktionskontext geladen. Stattdessen erzeugt
`npm run knowledge:export-batch -- --group <id> --start <index> --limit <n>`
ein ignoriertes Batch-Paket unter `knowledge-base/local/batches/`. Es enthält
für höchstens wenige verwandte Kernthemen nur die kuratierten Fundstellen,
exakte begrenzte Quellenausschnitte und einen Grafikkandidaten. Das manuelle
Quellenmapping hat Vorrang vor unscharfen Stichworttreffern.

Neue Lerneinheiten werden kanonisch als
`content/learning-units/*.unit.json` gepflegt. Die Spezifikation enthält
Fachtext, Lernziele, Aufgabeninhalte, Quellenbelege und deklarative Diagramme,
aber kein Button-, Formular-, Zustands- oder ARIA-Markup. Das tiefe
Compiler-Modul erzeugt daraus beim Build Kurations-Sidecar, SVGs, Lernseite,
Manifest, Katalog und Abdeckungsstatus. Die vorhandenen Markdown-Einheiten
bleiben während der schrittweisen Migration über den Legacy-Adapter lauffähig.

Ein sinnvoller Produktionsbatch umfasst sechs bis acht Kernthemen derselben
Themengruppe. Alle Spezifikationen werden zuerst vollständig normalisiert und
validiert; erst danach werden öffentliche Artefakte geschrieben. Ungültige
Diagnosen, doppelte Aktivitäts-IDs, unvollständiges Fehlfeedback und fehlende
Pflichtnachweise brechen den Build ab.

## Aufbau einer Lerneinheit

Eine Einheit beantwortet eine eng gefasste Leitfrage und enthält in dieser
Reihenfolge:

1. **Lernziel und Relevanz** – beobachtbar formuliert, mit Bezug zur AP2.
2. **Vorwissen aktivieren** – eine kurze Diagnosefrage statt langer Einleitung.
3. **Erklärung in Modellen** – vom mentalen Modell zu Begriffen und Regeln;
   typische Fehlvorstellungen werden ausdrücklich korrigiert.
4. **Durchgerechnetes Beispiel** – jeder Entscheidungsschritt wird begründet.
5. **Geführte Übung** – Teilhilfen werden schrittweise reduziert.
6. **Abrufübung** – umdrehbare Karten, Lückentext oder Kurzfragen ohne
   gleichzeitige Anzeige der Lösung.
7. **Prüfungsnahe Transferaufgabe** – neues Szenario, neue Zahlen und eine
   nachvollziehbare Musterlösung; keine kopierte Buchaufgabe.
8. **Selbsterklärung und Wiederholung** – Merksatz, Fehlerhinweis und Termin für
   verteiltes Wiederholen.

Die Aufgaben prüfen das angekündigte Lernziel. Distraktoren beruhen auf echten
Fehlvorstellungen und nicht auf Wortspielen. Rechenaufgaben nennen Einheiten,
Rundungsregel und Lösungsweg. Karten enthalten nur einen prüfbaren Gedanken.

## Grafik- und Layoutvertrag

Originalabbildungen bleiben mit `rightsStatus: private-source-only` in der
ignorierten Wissensbasis. Ein maschineller Ausschnitt ist nur Kontext für die
Redaktion und trägt bis zur Sichtung `needs-manual-review`.

Öffentliche Erklärgrafiken werden als eigenständige SVG-, HTML- oder
Rastergrafik neu entworfen. Ihr Datensatz verweist über `derivedFrom` auf
Quelle, PDF-Seite und Bounding-Box, übernimmt aber weder Buchlayout noch
unnötige Dekoration. Jede Grafik braucht:

- eine einzelne didaktische Aussage,
- eine Leserichtung und visuelle Hierarchie,
- verständliche Beschriftungen sowie Alt-Text,
- ausreichenden Kontrast und eine mobile Fassung,
- eine Textalternative für wesentliche Daten,
- fachliche und gestalterische Freigabe.

Das Lernseiten-Layout folgt der Aufgabenlogik: Erklärung und Beispiel stehen
nah beieinander, Lösungen werden erst nach einer bewussten Antwort gezeigt,
und Feedback erklärt den Denkfehler. Fortschritt darf Verständnis nicht durch
reine Klickzahlen vortäuschen.

## Kurationsdatensatz

Die spätere manuelle Zuordnung hält mindestens fest:

```json
{
  "sourceId": "itlf10-12-2023",
  "sourcePage": 200,
  "sourceLocator": "PDF-Seite oder Markdown-Überschrift und Zeilenbereich",
  "sourceObjectId": "itlf10-12-2023:layout:0200:01",
  "area": "...",
  "topicGroup": "...",
  "coreTopic": "...",
  "learningObjective": "...",
  "use": "explanation|example|exercise|misconception|graphic-reference",
  "freshnessReview": "pending",
  "rightsReview": "private-source-only",
  "reviewStatus": "draft"
}
```

`sourcePage` darf nur gesetzt werden, wenn die Zuordnung belegt ist. Bei einem
Surya-Textchunk ohne direkte Seitennummer bleibt das Feld leer, bis die
Kurationsperson die Stelle über Überschrift, Zeilenbereich, Grafikverweis und
Original-PDF aufgelöst hat.

UI- und Grafikdesign beginnen erst mit einer kuratierten Einheit. Dann werden
Referenzen recherchiert, ein konkreter statischer Lernseitenentwurf geprüft und
erst anschließend Interaktionen und Bewegung ergänzt.
