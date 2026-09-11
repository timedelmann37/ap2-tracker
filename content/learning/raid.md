---
id: raid-level
slug: raid
title: RAID-Level sicher auswählen und berechnen
description: RAID-Level vergleichen, Nutzkapazität berechnen und eine begründete Auswahl für AP2-Aufgaben treffen.
domain: GA1
domain_label: Konzeption & Administration
group_id: ga1-3
group_label: Block 3 · Speicherlösungen
item_id: ga1-3__3
week: KW 37
estimated_minutes: 24
relevance: hoch
sources: ["europa-integratoren-2026", "ihk-bonn", "itlf6-9-2022", "it-basiswissen-2012"]
content_revision: 2026-09-11.1
content_status: CURATED_DRAFT
learning_objectives: ["capacity", "selection"]
curation: content/curation/raid-level.json
---
In der AP2 reicht es selten, nur ein RAID-Level zu nennen. Du musst aus einer Anforderung **eine Entscheidung ableiten**, die **nutzbare Kapazität berechnen** und das verbleibende Risiko präzise benennen.

<section class="learning-goals" aria-labelledby="learning-goals-title">
  <h2 id="learning-goals-title">Nach dieser Einheit kannst du …</h2>
  <ul>
    <li>die Nutzkapazität von RAID 0, 1, 5, 6 und 10 auch bei unterschiedlich großen Laufwerken berechnen,</li>
    <li>für ein Szenario ein RAID-Level auswählen und die Entscheidung mit Ausfalltoleranz, Leistung und Rebuild-Risiko begründen.</li>
  </ul>
</section>

## Einstieg: Was weißt du schon?

<section class="quiz" data-quiz="raid-diagnostic" data-correct="1">
  <h3>Sechs SSDs à 4 TB bilden ein RAID 6. Welche Aussage ist korrekt?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="RAID 6 verwendet die Kapazität von zwei Laufwerken für verteilte doppelte Parität."><span class="m">A</span> 24 TB nutzbar, weil Parität keine Kapazität kostet</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Richtig: (6 − 2) × 4 TB = 16 TB; zwei beliebige Laufwerke dürfen ausfallen."><span class="m">B</span> 16 TB nutzbar und zwei Laufwerksausfälle tolerierbar</button>
  <button class="opt" type="button" data-answer="2" data-rationale="20 TB und ein tolerierter Ausfall beschreiben bei sechs gleich großen Laufwerken RAID 5."><span class="m">C</span> 20 TB nutzbar und ein Laufwerksausfall tolerierbar</button>
  <button class="opt" type="button" data-answer="3" data-rationale="12 TB entsprechen der Hälfte der Bruttokapazität und wären für RAID 10 plausibel, nicht für RAID 6."><span class="m">D</span> 12 TB nutzbar und zwei Laufwerksausfälle immer tolerierbar</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

Die Diagnose zählt noch nicht als Lernziel-Check. Sie zeigt dir nur, worauf du beim Lernen besonders achten solltest.

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>RAID ersetzt kein Backup.</strong> Es kann Laufwerksausfälle abfangen, schützt aber nicht vor Löschen, Schadsoftware, Fehlkonfiguration oder einem Standortschaden.</p></aside>

## Das Entscheidungsmodell

Gehe in Aufgaben immer in derselben Reihenfolge vor:

1. **Anforderung lesen:** Geht es primär um Leistung, Kapazität oder Verfügbarkeit?
2. **Ausfalltoleranz festlegen:** Wie viele gleichzeitige Laufwerksausfälle müssen in welcher Konstellation verkraftet werden?
3. **Nutzkapazität rechnen:** Maßgeblich ist die Kapazität des kleinsten Laufwerks.
4. **Betriebsrisiko nennen:** Rebuild-Dauer, verbleibende Reserve, Controller und Backup gehören in die Begründung.

Ein guter Prüfungssatz verbindet diese Punkte: „Ich wähle RAID 6, weil zwei beliebige Laufwerke ausfallen dürfen. Gegenüber RAID 5 sinkt die Nutzkapazität, dafür bleibt während eines einzelnen Ausfalls noch eine weitere Paritätsreserve.“

## Die RAID-Level im Vergleich

| Level | Mindestzahl | Nutzkapazität bei gleich großen Laufwerken | Ausfalltoleranz | Typische Einordnung |
| --- | ---: | --- | --- | --- |
| RAID 0 | 2 | `n × Cmin` | keine | hohe Transferrate und volle Kapazität, aber ohne Redundanz |
| RAID 1 | 2 | beim Spiegelpaar `1 × Cmin` | ein Laufwerk des Paars | einfach, lesestark, 50 % nutzbar |
| RAID 5 | 3 | `(n − 1) × Cmin` | ein Laufwerk | guter Kapazitätsanteil, aber keine Reserve mehr während des Rebuilds |
| RAID 6 | 4 | `(n − 2) × Cmin` | zwei beliebige Laufwerke | zusätzliche Reserve, dafür mehr Kapazitäts- und Schreibaufwand |
| RAID 10 | 4 | `(n ÷ 2) × Cmin` | ein Laufwerk je Spiegelpaar | hohe I/O-Leistung; zwei Ausfälle nur sicher, wenn sie verschiedene Paare treffen |
| RAID 50 | 6 | `(n − g) × Cmin` | ein Laufwerk je RAID-5-Gruppe | Striping über `g` RAID-5-Gruppen |
| RAID 60 | 8 | `(n − 2g) × Cmin` | zwei Laufwerke je RAID-6-Gruppe | Striping über `g` RAID-6-Gruppen |

<figure class="learning-figure">
  <img src="/assets/learning/raid-parity.svg" alt="Vier Laufwerke mit verteilten Daten- und Paritätsblöcken bei RAID 5; ein ausgefallenes drittes Laufwerk wird aus den übrigen Blöcken rekonstruiert.">
  <figcaption>Eigene Lernskizze nach mehreren privaten Quellen: Parität wandert zwischen den Laufwerken. Im degradierten Zustand fehlt bei RAID 5 die Ausfallreserve.</figcaption>
</figure>

## Durchgerechnetes Beispiel

Ein Server besitzt sechs Laufwerke: vier mit 4 TB und zwei mit 6 TB. Gefordert sind mindestens 14 TB Nutzkapazität und die Toleranz von zwei beliebigen Laufwerksausfällen.

1. **Kleinste Kapazität bestimmen:** `Cmin = 4 TB`. Die zusätzlichen 2 TB der größeren Laufwerke sind im klassischen Verbund nicht nutzbar.
2. **Toleranz prüfen:** RAID 5 scheidet aus, weil nur ein Laufwerk ausfallen darf. RAID 6 erfüllt die Forderung. RAID 10 garantiert nicht jeden beliebigen Doppelausfall.
3. **RAID 6 rechnen:** `(6 − 2) × 4 TB = 16 TB`.
4. **Anforderung vergleichen:** 16 TB sind mindestens 14 TB; die Kapazitätsforderung ist erfüllt.
5. **Restrisiko nennen:** RAID 6 schützt vor Laufwerksausfällen, nicht vor logischen Fehlern. Backup und getesteter Restore bleiben erforderlich.

<div class="formula"><span class="cap">Ergebnis</span><strong>RAID 6 · 16 TB nutzbar · 2 beliebige Ausfälle</strong></div>

## Geführte Übung

<section class="aufgabe">
  <div class="h"><span class="b">Schrittweise</span> Acht Laufwerke auswählen</div>
  <div class="body">
    <p>Acht HDDs à 3 TB sollen mindestens 17 TB Nutzkapazität liefern. Zwei beliebige Laufwerksausfälle müssen verkraftet werden. Bestimme Level und Nutzkapazität.</p>
    <details data-hint="raid-guided-1"><summary>Hinweis 1: Toleranz</summary><div class="loesung"><p>Streiche RAID 0, RAID 1 und RAID 5. RAID 10 garantiert nicht jeden beliebigen Doppelausfall.</p></div></details>
    <details data-hint="raid-guided-2"><summary>Hinweis 2: Formel</summary><div class="loesung"><p>Für RAID 6 gilt: `(n − 2) × Cmin`.</p></div></details>
    <details><summary>Lösung prüfen</summary><div class="loesung"><p><strong>RAID 6 mit 18 TB.</strong> `(8 − 2) × 3 TB = 18 TB`. Die Mindestkapazität wird erreicht und zwei beliebige Ausfälle sind tolerierbar.</p></div></details>
  </div>
</section>

## Rebuild und typische Denkfehler

Nach einem Laufwerksausfall arbeitet ein redundantes Array degradiert. Beim Rebuild werden viele Daten gelesen und auf ein Ersatzlaufwerk geschrieben. Die Last steigt, und bis zum Abschluss ist die Sicherheitsreserve reduziert.

- **Hot Spare:** Reservelaufwerk, das den Wiederaufbau automatisch starten kann; es erhöht nicht die grundsätzliche Toleranz des RAID-Levels.
- **Hot Swap:** Fähigkeit, ein Laufwerk im laufenden Betrieb physisch zu tauschen. Das ist keine Redundanzstufe.
- **RAID 10:** „Zwei Ausfälle“ ist ohne Angabe der Spiegelpaare zu ungenau.
- **Einheiten:** TB und TiB nicht mischen. In einer Aufgabe mit TB rechnest du durchgängig dezimal; bei TiB binär.

## Karteikarten und Wiederholung

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="raid-backup" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Warum ist RAID kein Backup?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Weil Spiegelung und Parität logische Fehler, Schadsoftware, Löschen und Standortausfälle nicht unabhängig abdecken.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="raid10-failure" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Wann übersteht RAID 10 zwei Ausfälle?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Wenn die ausgefallenen Laufwerke zu unterschiedlichen Spiegelpaaren gehören.</span></span></button>
</div>
<div class="card-rating"><span>Karte „RAID vs. Backup“:</span><button type="button" data-card-id="raid-backup" data-card-rate="known">gewusst</button><button type="button" data-card-id="raid-backup" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="raid-backup"></span></div>
<div class="card-rating"><span>Karte „RAID 10“:</span><button type="button" data-card-id="raid10-failure" data-card-rate="known">gewusst</button><button type="button" data-card-id="raid10-failure" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="raid10-failure"></span></div>

## Lernziel-Check: Transfer

Ein Planungsfall: Zwölf HDDs à 8 TB stehen für ein Archivsystem bereit. Mindestens 75 TB müssen nutzbar sein, und zwei beliebige Laufwerke dürfen gleichzeitig ausfallen. Die Daten werden zusätzlich versioniert und an einen zweiten Standort gesichert.

<section class="quiz" data-quiz="raid-transfer-selection" data-correct="2" data-required-objective="selection">
  <h3>Welches Level erfüllt die beiden zentralen Speicheranforderungen am direktesten?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="RAID 5 liefert zwar 88 TB, toleriert aber nur einen Laufwerksausfall."><span class="m">A</span> RAID 5</button>
  <button class="opt" type="button" data-answer="1" data-rationale="RAID 10 liefert 48 TB und verfehlt damit bereits die Kapazitätsforderung; außerdem ist nicht jeder Doppelausfall tolerierbar."><span class="m">B</span> RAID 10</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Richtig: RAID 6 toleriert zwei beliebige Ausfälle und liefert hier 80 TB Nutzkapazität."><span class="m">C</span> RAID 6</button>
  <button class="opt" type="button" data-answer="3" data-rationale="RAID 0 bietet keine Redundanz und scheidet trotz voller Kapazität aus."><span class="m">D</span> RAID 0</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

<section class="quiz" data-quiz="raid-transfer-capacity" data-correct="1" data-required-objective="capacity">
  <h3>Wie groß ist die Nutzkapazität der richtigen Auswahl?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="88 TB wäre `(12 − 1) × 8 TB` und damit RAID 5."><span class="m">A</span> 88 TB</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Richtig: `(12 − 2) × 8 TB = 80 TB`."><span class="m">B</span> 80 TB</button>
  <button class="opt" type="button" data-answer="2" data-rationale="48 TB entsprechen der Hälfte der Bruttokapazität und damit RAID 10."><span class="m">C</span> 48 TB</button>
  <button class="opt" type="button" data-answer="3" data-rationale="96 TB sind die Bruttokapazität ohne Redundanzabzug."><span class="m">D</span> 96 TB</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <strong>Die Standortkopie ist trotzdem notwendig:</strong> RAID 6 ersetzt kein Backup. <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>EUROPA Prüfungsvorbereitung Teil 2 – Integratoren (2026):</strong> Hauptquelle für RAID-Vergleich, Kapazitätsrechnung, Hot Spare und die Fehlvorstellung „RAID ist Backup“.</p>
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> Aufgabenquelle für RAID 6, Hot Spare und die ausfallabhängige Abgrenzung von RAID 10 und RAID 01.</p>
  <p><strong>ITLF6–9 (2022):</strong> Vergleich von RAID 5 und RAID 6 sowie XOR-basierte Rekonstruktion. Beschädigte OCR-Tabellen wurden nicht übernommen.</p>
  <p><strong>IT-Basiswissen (2012):</strong> nur als historischer Kontrolltreffer verwendet.</p>
  <p class="source-note">Text, Zahlen, Aufgaben und Grafik sind eigenständig erstellt. Konkrete Fundstellen und Prüfentscheidungen stehen im versionierten Kurations-Sidecar; Buchabbildungen bleiben privat.</p>
</div>
