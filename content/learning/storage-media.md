---
id: storage-media
slug: ssd-vs-hdd-vs-nvme-iops-latenz
title: SSD, HDD und NVMe passend auswählen
description: Speicher anhand von Zugriffsmuster, Latenz, IOPS, Kapazität und Endurance vergleichen und eine belastbare Auswahl treffen.
domain: GA1
domain_label: Konzeption & Administration
group_id: ga1-3
group_label: Block 3 · Speicherlösungen
item_id: ga1-3__6
week: KW 37
estimated_minutes: 27
relevance: hoch
sources: ["ihk-bonn", "itlf6-9-2022", "itlf10-12-2023"]
content_revision: 2026-09-11.1
content_status: CURATED_DRAFT
learning_objectives: ["media-selection", "endurance-planning"]
curation: content/curation/storage-media.json
---
„SSD ist schneller“ ist für eine AP2-Begründung zu ungenau. Eine tragfähige Auswahl verbindet **Lastprofil**, **Latenz**, **IOPS**, **Datendurchsatz**, **Kapazität**, **Kosten** und **Schreibhaltbarkeit**. Außerdem musst du Medium, Bauform und Protokoll auseinanderhalten.

<section class="learning-goals" aria-labelledby="learning-goals-title">
  <h2 id="learning-goals-title">Nach dieser Einheit kannst du …</h2>
  <ul>
    <li>für ein konkretes Lastprofil HDD, SATA-SSD oder NVMe-SSD auswählen und die Entscheidung mit den passenden Kennzahlen begründen,</li>
    <li>TBW und DWPD einordnen und aus Kapazität, Garantiezeit und Schreibvolumen eine zulässige Schreiblast berechnen.</li>
  </ul>
</section>

## Einstieg: Was würdest du wählen?

<section class="quiz" data-quiz="storage-diagnostic" data-correct="2">
  <h3>Ein Host startet 40 virtuelle Testsysteme. Viele kleine Dateien werden gleichzeitig und zufällig gelesen. Welches Argument ist am wichtigsten?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Kapazität allein sagt nicht, wie schnell viele kleine, verteilte Zugriffe beantwortet werden. Für diesen Fall fehlen Latenz und IOPS."><span class="m">A</span> Die größte Kapazität pro Laufwerk</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Eine hohe sequenzielle MB/s-Angabe beschreibt große zusammenhängende Übertragungen. Das VM-Szenario erzeugt dagegen viele kleine zufällige Zugriffe."><span class="m">B</span> Nur die maximale sequenzielle Leserate</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Richtig: Für viele kleine parallele Zugriffe sind vor allem niedrige Latenz, hohe Random-IOPS und ein zur Schreiblast passendes Endurance-Rating relevant."><span class="m">C</span> Random-IOPS, Latenz und passende Schreibhaltbarkeit</button>
  <button class="opt" type="button" data-answer="3" data-rationale="M.2 bezeichnet zunächst die Bauform. Ein M.2-Laufwerk kann je nach Gerät SATA oder PCIe/NVMe nutzen."><span class="m">D</span> Allein die Bauform M.2</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

Die Diagnose ist unbewertet und erfüllt noch kein Lernziel. Sie zeigt nur, ob du Kennzahlen und Produktbegriffe bereits trennst.

## Drei Ebenen, eine Entscheidung

Beginne nicht mit einem Produktnamen, sondern mit drei Ebenen:

1. **Medium:** HDD speichert magnetisch auf rotierenden Scheiben. SSD speichert elektronisch in NAND-Flash.
2. **Verbindung und Protokoll:** SATA-SSDs sprechen typischerweise AHCI über SATA. NVMe-SSDs sprechen NVMe über PCIe.
3. **Bauform:** 2,5 Zoll und M.2 beschreiben die physische Form. M.2 allein verrät weder SATA noch NVMe.

Eine **NVMe-SSD ist also weiterhin eine SSD**. NVMe ist kein drittes Speichermedium neben HDD und SSD, sondern ein für nichtflüchtigen Speicher entwickeltes Protokoll. Die tatsächliche Leistung hängt trotzdem auch von NAND, Controller, Firmware, Temperatur, Queue Depth und Lastprofil ab.

<figure class="learning-figure">
  <img src="/assets/learning/storage-media.svg" alt="Vergleich von HDD, SATA-SSD und NVMe-SSD: Die HDD besitzt einen mechanischen Zugriffspfad. SATA-SSD und NVMe-SSD verwenden beide NAND-Flash, unterscheiden sich aber durch SATA mit AHCI beziehungsweise PCIe mit NVMe. Kleine zufällige Zugriffe werden einem NVMe-Prüffall, große sequenzielle Archivdaten einem HDD-Prüffall zugeordnet.">
  <figcaption>Eigene Lernskizze: Medium, Bauform und Protokoll sind getrennte Entscheidungsebenen. Genau diese Trennung verhindert typische M.2- und NVMe-Fehlschlüsse.</figcaption>
</figure>

## HDD und SSD technisch verstehen

### HDD: Mechanik prägt das Verhalten

Bei einer HDD muss der Schreib-/Lesekopf zur richtigen Spur bewegt werden; anschließend muss der gesuchte Sektor unter dem Kopf vorbeirotieren. Ein großer zusammenhängender Datenstrom ist deshalb wesentlich günstiger als viele kleine, verteilte Zugriffe.

- **Stärken:** hohe Kapazität pro investiertem Euro, gut für große sequenzielle Datenmengen und Kapazitätstiers.
- **Grenzen:** mechanische Zugriffszeit, deutlich weniger Random-IOPS, Geräusch, Vibration und Stoßempfindlichkeit.
- **Passende Fälle:** Backup-Ziel, Medienarchiv, kalte Daten oder große Datenmengen, wenn die geforderte Geschwindigkeit nachweislich ausreicht.

Eine HDD kann daher die fachlich richtige Wahl sein. „Neuer“ oder „schneller“ ist kein Selbstzweck, wenn Kapazität und Kosten die zentrale Anforderung bilden.

### SSD: Flash verschiebt den Engpass

Eine SSD hat keine beweglichen Teile. Ein Controller ordnet logische Blöcke den physischen NAND-Zellen zu. Dadurch sind zufällige Zugriffe sehr viel weniger abhängig von der Position der Daten.

- **Stärken:** geringe Latenz, hohe Random-IOPS, stoßunempfindlicher und geräuschlos.
- **Grenzen:** höhere Kosten pro Kapazität; NAND-Zellen besitzen eine begrenzte Zahl an Programmier-/Löschzyklen.
- **Controller-Aufgaben:** Wear Leveling verteilt Schreibvorgänge, Garbage Collection gewinnt Blöcke zurück, TRIM meldet nicht mehr benötigte Daten und Over-Provisioning schafft Arbeitsreserve.

Diese Mechanismen machen aus „begrenzten Schreibzyklen“ nicht automatisch ein akutes Ausfallproblem. Für die Planung zählt die **bewertete Schreibhaltbarkeit des konkreten Modells** und nicht nur der Begriff SSD.

## Die Kennzahlen beantworten verschiedene Fragen

| Kennzahl | Leitfrage | Einheit | Typischer Fehler |
| --- | --- | --- | --- |
| **Latenz** | Wie lange dauert ein einzelner I/O? | µs oder ms | nur den Mittelwert betrachten und Ausreißer ignorieren |
| **IOPS** | Wie viele Ein-/Ausgabeoperationen schafft das System pro Sekunde? | I/O pro Sekunde | Blockgröße, Queue Depth und Read/Write-Mix nicht nennen |
| **Durchsatz** | Wie viele Daten werden pro Zeit übertragen? | MB/s oder MiB/s | sequenzielle Herstellerangabe auf Random-Last übertragen |
| **Kapazität** | Wie viele Daten passen nutzbar auf das System? | TB oder TiB | Kosten, Redundanz und Reserve vergessen |
| **Endurance** | Wie viel Schreiben ist im angegebenen Zeitraum vorgesehen? | TBW oder DWPD | TBW ohne Laufwerksgröße und Zeitraum vergleichen |

Unter idealisierten Bedingungen verbindet folgende Beziehung IOPS, Blockgröße und Datenrate:

<div class="math-display" role="group" aria-label="Idealisierte Beziehung zwischen IOPS, Blockgröße und Durchsatz"><math display="block" aria-label="Durchsatz ist gleich IOPS mal Blockgröße"><mrow><mi>D</mi><mo>=</mo><mi>I</mi><mo>×</mo><mi>B</mi></mrow></math><div class="math-legend"><span><b>D</b> Datenrate</span><span><b>I</b> IOPS</span><span><b>B</b> Blockgröße je I/O</span><span>Einheiten konsistent halten</span></div></div>

Das ist eine Rechenhilfe, kein Leistungsversprechen. Protokolloverhead, Warteschlangentiefe, Cache, Parallelität, Read/Write-Mix und Latenzverteilung fehlen im vereinfachten Modell.

## Durchgerechnetes Beispiel: IOPS sind nicht gleich MB/s

Eine Anwendung erzeugt 25.000 zufällige Lesezugriffe pro Sekunde mit jeweils 4 KiB. Welcher idealisierte Datendurchsatz gehört dazu?

1. **Operationen und Blockgröße verbinden:**

<div class="math-display compact" role="group" aria-label="IOPS-mal-Blockgröße-Rechnung"><math display="block" aria-label="fünfundzwanzigtausend pro Sekunde mal vier Kibibyte ergibt einhunderttausend Kibibyte pro Sekunde"><mrow><mn>25 000</mn><mfrac><mtext>I/O</mtext><mtext>s</mtext></mfrac><mo>×</mo><mn>4</mn><mfrac><mtext>KiB</mtext><mtext>I/O</mtext></mfrac><mo>=</mo><mn>100 000</mn><mfrac><mtext>KiB</mtext><mtext>s</mtext></mfrac></mrow></math><div class="math-legend"><span>25.000 IOPS</span><span>4 KiB je Zugriff</span><span>100.000 KiB/s</span></div></div>

2. **In MiB/s umrechnen:**

<div class="math-display compact" role="group" aria-label="Umrechnung in Mebibyte pro Sekunde"><math display="block" aria-label="einhunderttausend Kibibyte pro Sekunde geteilt durch eintausendvierundzwanzig ergibt ungefähr siebenundneunzig Komma sieben Mebibyte pro Sekunde"><mrow><mfrac><mn>100 000</mn><mn>1 024</mn></mfrac><mfrac><mtext>MiB</mtext><mtext>s</mtext></mfrac><mo>≈</mo><mn>97,7</mn><mfrac><mtext>MiB</mtext><mtext>s</mtext></mfrac></mrow></math><div class="math-legend"><span>1 MiB = 1.024 KiB</span><span>Ergebnis ≈ 97,7 MiB/s</span></div></div>

Obwohl die Datenrate unter 100 MiB/s liegt, sind 25.000 einzelne Operationen zu beantworten. Eine HDD kann an den vielen Positionswechseln scheitern, obwohl ihre sequenzielle Transferrate auf dem Papier ausreichend aussieht.

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>Erst Zugriffsmuster, dann Kennzahl.</strong> Große zusammenhängende Blöcke belasten vor allem den Durchsatz. Viele kleine zufällige Blöcke belasten vor allem Latenz und IOPS.</p></aside>

## Vorhersagen und ausprobieren

<section class="aufgabe">
  <div class="h"><span class="b">Erst festlegen</span> Welcher Engpass wird sichtbar?</div>
  <div class="body">
    <p>Ein 12-TB-Archiv wird einmal pro Nacht als ein großer Datenstrom geschrieben und tagsüber selten gelesen. Notiere vor dem Öffnen: Würdest du zuerst Random-IOPS, maximale Kapazität pro Budget oder kleinstmögliche Latenz optimieren?</p>
    <details><summary>Vorhersage vergleichen</summary><div class="loesung"><p><strong>Kapazität pro Budget</strong> ist hier der erste Prüfpunkt. Danach muss eine HDD-Lösung den notwendigen sequenziellen Durchsatz und das Zeitfenster nachweislich schaffen. NVMe wäre nicht falsch, aber ohne zusätzliche Anforderung wahrscheinlich wirtschaftlich nicht begründbar.</p></div></details>
  </div>
</section>

Schätze jetzt zuerst den Durchsatz für 12.000 IOPS mit 8 KiB großen Blöcken. Prüfe deine Schätzung danach mit der Eingabe.

<section class="numeric-practice" data-numeric-practice="storage-iops-prediction" data-expected="93.75" data-correct-feedback="Richtig: Idealisiert ergeben sich 93,75 MiB/s. Die IOPS-Anforderung bleibt trotzdem eigenständig bestehen." data-wrong-feedback="Noch nicht. Multipliziere zuerst IOPS und KiB pro I/O und teile das Ergebnis für MiB/s durch 1.024.">
  <h3>Wie groß ist der idealisierte Durchsatz?</h3>
  <label for="storage-iops-prediction">Durchsatz in MiB/s</label>
  <div class="answer-row"><input id="storage-iops-prediction" data-numeric-input type="text" inputmode="decimal" autocomplete="off" placeholder="deine Schätzung"><button type="button" class="lbtn" data-numeric-check>Schätzung prüfen</button></div>
  <template data-numeric-correct><span>Richtig.</span><div class="math-display compact"><math display="block" aria-label="zwölftausend mal acht Kibibyte geteilt durch eintausendvierundzwanzig ergibt dreiundneunzig Komma sieben fünf Mebibyte pro Sekunde"><mrow><mfrac><mrow><mn>12 000</mn><mo>×</mo><mn>8</mn><mtext> KiB</mtext></mrow><mn>1 024</mn></mfrac><mo>=</mo><mn>93,75</mn><mfrac><mtext>MiB</mtext><mtext>s</mtext></mfrac></mrow></math><div class="math-legend"><span>12.000 IOPS</span><span>8 KiB je I/O</span><span>binär umgerechnet</span><span>93,75 MiB/s</span></div></div><span>Die Rechnung schätzt nur die Datenmenge. Ob das System 12.000 einzelne I/Os mit der geforderten Latenz beantwortet, muss separat geprüft werden.</span></template>
  <template data-numeric-feedback-for="96">96 MB/s ist die dezimale Umrechnung mit 1.000. Gefragt sind MiB/s; teile deshalb durch 1.024.</template>
  <template data-numeric-feedback-for="1500">Du hast 12.000 durch 8 geteilt. Für die Datenmenge werden Operationen und Blockgröße multipliziert.</template>
  <p class="practice-feedback" data-numeric-feedback aria-live="polite" hidden></p>
</section>

## Geführte Übung: Lastprofil statt Etikett

<section class="aufgabe">
  <div class="h"><span class="b">Schrittweise</span> Storage für einen Build-Server</div>
  <div class="body">
    <p>Ein Build-Server liest und schreibt gleichzeitig tausende kleine Dateien. Das aktive Arbeitsset umfasst 1,2 TB; abgeschlossene Artefakte wachsen auf 18 TB und werden nur selten gelesen. Entwirf eine zweistufige Lösung.</p>
    <details data-hint="storage-guided-1"><summary>Hinweis 1: Daten trennen</summary><div class="loesung"><p>Trenne das heiße, zufällig belastete Arbeitsset von den kalten, überwiegend sequenziell gelesenen Artefakten.</p></div></details>
    <details data-hint="storage-guided-2"><summary>Hinweis 2: Kennzahlen zuordnen</summary><div class="loesung"><p>Für das Arbeitsset sind Latenz, Random-IOPS und Endurance wichtig. Für die Artefakte dominieren Kapazität, Kosten und ausreichender sequenzieller Durchsatz.</p></div></details>
    <details><summary>Musterlösung prüfen</summary><div class="loesung"><p><strong>Heißes Tier:</strong> NVMe-SSD mit passend geprüfter TBW/DWPD-Angabe für das aktive Arbeitsset. <strong>Kapazitätstier:</strong> HDD-Verbund für abgeschlossene Artefakte. Eine Richtlinie verschiebt nicht mehr aktive Artefakte in das Kapazitätstier. Backup und Redundanz werden getrennt geplant; die Zweiteilung ersetzt beides nicht.</p></div></details>
  </div>
</section>

## TBW und DWPD belastbar lesen

**TBW (Terabytes Written)** bezeichnet die kumulierte Datenmenge, die innerhalb der angegebenen Bewertungs- oder Garantiebedingungen geschrieben werden darf. Eine Angabe von 3.504 TBW bedeutet nicht 3.504 TB pro Jahr, sondern insgesamt über den genannten Zeitraum.

**DWPD (Drive Writes Per Day)** normalisiert die Schreibmenge auf die Laufwerkskapazität und einen Tag. Ein DWPD von 1 bedeutet: Über den angegebenen Zeitraum darf rechnerisch jeden Tag einmal die gesamte Nennkapazität geschrieben werden.

<div class="math-display" role="group" aria-label="Berechnung von Drive Writes Per Day"><math display="block" aria-label="Drive Writes Per Day ist gleich Terabytes Written geteilt durch Laufwerkskapazität mal Anzahl der Tage"><mrow><mi>DWPD</mi><mo>=</mo><mfrac><mi>TBW</mi><mrow><mi>C</mi><mo>×</mo><mi>T</mi></mrow></mfrac></mrow></math><div class="math-legend"><span><b>TBW</b> gesamte bewertete Schreibmenge</span><span><b>C</b> Nennkapazität in TB</span><span><b>T</b> Zeitraum in Tagen</span></div></div>

### Durchgerechnetes Endurance-Beispiel

Eine SSD besitzt 1,92 TB Nennkapazität, 3.504 TBW und fünf Jahre Bewertungszeitraum.

<div class="math-display" role="group" aria-label="DWPD-Beispielrechnung"><math display="block" aria-label="dreitausendfünfhundertvier Terabyte Written geteilt durch eins Komma neun zwei Terabyte mal dreihundertfünfundsechzig Tage mal fünf Jahre ergibt eins Drive Write Per Day"><mrow><mi>DWPD</mi><mo>=</mo><mfrac><mn>3 504</mn><mrow><mn>1,92</mn><mo>×</mo><mn>365</mn><mo>×</mo><mn>5</mn></mrow></mfrac><mo>=</mo><mn>1</mn></mrow></math><div class="math-legend"><span>3.504 TBW insgesamt</span><span>1,92 TB Kapazität</span><span>1.825 Tage</span><span>1 DWPD</span></div></div>

Das Ergebnis sagt: Im Mittel entspricht die bewertete Schreibmenge einer vollständigen Laufwerksfüllung pro Tag. Für die Beschaffung müssen zusätzlich die Bedingungen des konkreten Datenblatts, Schreibmuster, Over-Provisioning, Reserve und erwartete Write Amplification geprüft werden.

## Cache oder Tiering?

- **Caching:** Häufig benötigte Daten werden zusätzlich auf einem schnelleren Medium gehalten. Der langsamere Speicher bleibt die maßgebliche Ablage. Ein Cache-Hit spart den Zugriff auf das langsamere Tier.
- **Tiering:** Daten werden abhängig von Richtlinien zwischen Speicherklassen verschoben. Nach dem Verschieben liegt der maßgebliche Datenblock im neuen Tier.
- **Write-through:** Ein Schreibvorgang gilt erst als abgeschlossen, wenn Cache und nachgelagerter Speicher aktualisiert sind.
- **Write-back:** Der Cache bestätigt früher und schreibt später weiter. Das kann schneller sein, benötigt aber einen geschützten Flush-Pfad, beispielsweise Stromausfallschutz.

<aside class="callout warn"><span class="lbl">Achtung</span><p>Cache, Tiering, RAID und Backup lösen unterschiedliche Probleme. Ein Cache ist keine unabhängige Sicherung, und ein schnelles Tier beseitigt keinen Single Point of Failure.</p></aside>

## Typische Denkfehler

- **„M.2 bedeutet NVMe.“** Falsch: M.2 ist eine Bauform; das Laufwerk kann SATA oder PCIe/NVMe verwenden.
- **„NVMe ist ein Speichermedium.“** Falsch: Das Medium ist NAND-Flash; NVMe beschreibt den Kommandopfad.
- **„Die höchste MB/s-Zahl gewinnt.“** Falsch: Ohne Blockgröße, Zugriffsmuster, Queue Depth und Read/Write-Mix ist der Vergleich unvollständig.
- **„SSD hat keine Haltbarkeitsgrenze.“** Falsch: NAND altert durch Schreib-/Löschzyklen; TBW/DWPD und der konkrete Workload müssen zusammenpassen.
- **„HDD ist immer zu langsam.“** Falsch: Für große kalte oder sequenzielle Daten kann sie die wirtschaftlich passende Anforderung erfüllen.
- **„Cache ist Backup.“** Falsch: Cache beschleunigt Zugriffe, bietet aber keine unabhängige Wiederherstellungskopie.

## Karteikarten und Selbsteinschätzung

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="storage-m2" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Warum sagt „M.2“ noch nichts Sicheres über NVMe?</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>M.2 bezeichnet die Bauform. Ein M.2-Laufwerk kann je nach Ausführung SATA oder PCIe mit NVMe verwenden.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="storage-iops" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Wann ist IOPS aussagekräftiger als eine sequenzielle MB/s-Angabe?</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>Bei vielen kleinen, verteilten oder parallelen Zugriffen, sofern Blockgröße, Queue Depth und Read/Write-Mix mitgenannt werden.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="storage-dwpd" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Was bedeutet 1 DWPD?</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>Über den angegebenen Zeitraum darf im Mittel pro Tag eine Datenmenge entsprechend der gesamten Nennkapazität geschrieben werden.</span></span></button>
</div>
<div class="card-rating"><span>Karte „M.2 oder NVMe“:</span><button type="button" data-card-id="storage-m2" data-card-rate="known">gewusst</button><button type="button" data-card-id="storage-m2" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="storage-m2"></span></div>
<div class="card-rating"><span>Karte „IOPS“:</span><button type="button" data-card-id="storage-iops" data-card-rate="known">gewusst</button><button type="button" data-card-id="storage-iops" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="storage-iops"></span></div>
<div class="card-rating"><span>Karte „DWPD“:</span><button type="button" data-card-id="storage-dwpd" data-card-rate="known">gewusst</button><button type="button" data-card-id="storage-dwpd" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="storage-dwpd"></span></div>

Bewerte dich ehrlich: „gewusst“ passt nur, wenn du die Rückseite vor dem Umdrehen sinngemäß nennen konntest. „unsicher“ legt die Karte früher wieder vor.

## Freier Abruf

<section class="recall-practice" data-recall="storage-core" data-min-length="70" aria-labelledby="storage-recall-title">
  <div class="recall-prompt"><h3 id="storage-recall-title">Abruf aus dem Kopf</h3><p>Schau nicht zurück: Erkläre den Unterschied zwischen Medium, Bauform und Protokoll. Nenne anschließend je ein Lastprofil für HDD und NVMe-SSD.</p></div>
  <label class="sr-only" for="storage-recall-answer">Deine freie Antwort</label>
  <textarea id="storage-recall-answer" data-recall-input rows="5" placeholder="Medium, Bauform, Protokoll und zwei Lastprofile …"></textarea>
  <div class="recall-actions"><span data-recall-count>0 Zeichen notiert</span><button class="lbtn" type="button" data-recall-reveal>Muster vergleichen</button></div>
  <div class="recall-model" data-recall-model hidden><strong>Muster:</strong> HDD und NAND-Flash sind Speichertechnologien; SSD bezeichnet ein flashbasiertes Laufwerk. M.2 ist eine Bauform. SATA/AHCI und PCIe/NVMe beschreiben Verbindungs- und Kommandopfade. Eine HDD passt häufig zu großen, selten genutzten sequenziellen Datenmengen. Eine NVMe-SSD passt häufig zu vielen kleinen parallelen Zugriffen mit strenger Latenzanforderung. Entscheidend bleibt das konkrete Datenblatt und Lastprofil.</div>
</section>

## Lernziel-Check: Transfer

Ein Datenbankserver speichert 1,5 TB aktive Daten. Messungen zeigen viele zufällige 8-KiB-Zugriffe, hohe Parallelität und eine strenge Antwortzeit. Das Betriebsteam erwartet eine hohe tägliche Schreibmenge.

<section class="quiz" data-quiz="storage-transfer-selection" data-correct="1" data-required-objective="media-selection">
  <h3>Welche Auswahl und Begründung trifft die Anforderung am besten?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Eine HDD kann viel Kapazität günstig liefern, aber das Lastprofil fordert viele kleine zufällige Zugriffe und geringe Latenz. Die sequenzielle Rate ist hier nicht der Hauptindikator."><span class="m">A</span> Große HDD, weil ihre sequenzielle MB/s-Angabe genügt</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Richtig: Eine NVMe-SSD adressiert den parallelen Random-I/O-Pfad. Kapazität und ein zur Schreiblast passendes TBW/DWPD-Rating müssen zusätzlich geprüft werden."><span class="m">B</span> NVMe-SSD mit passender Kapazität und geprüftem Endurance-Rating</button>
  <button class="opt" type="button" data-answer="2" data-rationale="M.2 bezeichnet nur die Bauform. Ohne Angabe des Protokolls kann es sich auch um eine SATA-SSD handeln; außerdem fehlt die Endurance-Prüfung."><span class="m">C</span> Beliebige M.2-SSD, weil M.2 automatisch NVMe und hohe Haltbarkeit bedeutet</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Eine SATA-SSD beseitigt zwar die HDD-Mechanik, ist aber nicht automatisch gleich schnell wie eine NVMe-SSD. Das strenge parallele Lastprofil verlangt den Vergleich realer Latenz- und IOPS-Daten."><span class="m">D</span> Beliebige SATA-SSD, weil jede SSD unter jeder Last gleich reagiert</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

Für einen zweiten Server wird eine SSD mit 3,84 TB Kapazität, 3.504 TBW und fünf Jahren Bewertungszeitraum angeboten.

<section class="numeric-practice transfer-number" data-numeric-practice="storage-transfer-endurance" data-required-objective="endurance-planning" data-expected="0.5" data-correct-feedback="Richtig: Das Laufwerk ist mit 0,5 DWPD über fünf Jahre angegeben. Nun muss diese Grenze mit der erwarteten realen Schreiblast verglichen werden." data-wrong-feedback="Noch nicht. Teile die gesamte TBW-Menge durch Kapazität mal 365 Tage mal 5 Jahre.">
  <h3>Wie viele DWPD entsprechen diesen Angaben?</h3>
  <label for="storage-transfer-dwpd">DWPD</label>
  <div class="answer-row"><input id="storage-transfer-dwpd" data-numeric-input type="text" inputmode="decimal" autocomplete="off" placeholder="z. B. 0,5"><button type="button" class="lbtn primary" data-numeric-check>Ergebnis prüfen</button></div>
  <template data-numeric-correct><span>Richtig.</span><div class="math-display compact"><math display="block" aria-label="dreitausendfünfhundertvier geteilt durch drei Komma acht vier mal dreihundertfünfundsechzig mal fünf ergibt null Komma fünf Drive Writes Per Day"><mrow><mfrac><mn>3 504</mn><mrow><mn>3,84</mn><mo>×</mo><mn>365</mn><mo>×</mo><mn>5</mn></mrow></mfrac><mo>=</mo><mn>0,5</mn><mi>DWPD</mi></mrow></math><div class="math-legend"><span>3.504 TBW</span><span>3,84 TB</span><span>5 Jahre</span><span>0,5 DWPD</span></div></div><span>Erst der Vergleich mit der erwarteten täglichen Schreiblast zeigt, ob das Laufwerk passt.</span></template>
  <template data-numeric-feedback-for="1">1 DWPD ergäbe sich bei gleicher TBW-Menge mit 1,92 TB Kapazität. Hier ist das Laufwerk doppelt so groß, daher halbiert sich der normalisierte Wert.</template>
  <template data-numeric-feedback-for="2.5">Du hast vermutlich die Garantiejahre multipliziert statt die gesamte Schreibmenge auf alle Tage zu verteilen.</template>
  <template data-numeric-feedback-for="912.5">Das sind näherungsweise Laufwerksfüllungen über den gesamten Fünfjahreszeitraum. DWPD verlangt zusätzlich die Verteilung auf die Anzahl der Tage.</template>
  <p class="practice-feedback" data-numeric-feedback aria-live="polite" hidden></p>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> Aufgabenbezug für SSD-Definition, Vor- und Nachteile gegenüber HDD, Schnittstellen und die Einordnung einer SATA-Transferrate.</p>
  <p><strong>ITLF6–9 (2022):</strong> Anwendungskontext für eine kapazitätsorientierte Speicherentscheidung, bei der HDD-Geschwindigkeit ausdrücklich ausreicht. Fehlerhafte OCR-Tabellen wurden nicht übernommen.</p>
  <p><strong>ITLF10–12 (2023):</strong> private OCR-Quelle für die konzeptionelle Trennung von SATA- und PCIe-Anbindung. Die Buchgrafik wurde nicht veröffentlicht.</p>
  <p><strong>Abdeckungsgrenze:</strong> Die gemappten Buchstellen definieren NVMe, IOPS, TBW, DWPD, Tiering und Caching nicht vollständig. Diese Abschnitte sind eigenständig formulierte technische Synthese und bleiben bis zur menschlichen Prüfung gegen aktuelle Primärquellen ein kuratierter Entwurf.</p>
  <p class="source-note">Text, Zahlen, Aufgaben und SVG sind eigenständig erstellt. Private Fundstellen, Rechteentscheidung und offene Prüfungen stehen im Kurations-Sidecar.</p>
</div>
