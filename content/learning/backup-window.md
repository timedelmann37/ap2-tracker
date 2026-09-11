---
id: backup-window
slug: backup-window
title: Backup-Fenster mit Datenrate und Engpass berechnen
description: Datenmenge und Übertragungsrate sicher umrechnen, den realen Engpass erkennen und beurteilen, ob eine Sicherung in das verfügbare Zeitfenster passt.
domain: GA1
domain_label: Konzeption & Administration
group_id: ga1-4
group_label: Block 4 · Backup, Recovery und Notfallvorsorge
item_id: ga1-4__5
week: KW 38
estimated_minutes: 20
relevance: hoch
sources: ["ihk-bonn", "europa-integratoren-2026"]
content_revision: 2026-09-11.1
content_status: CURATED_DRAFT
learning_objectives: ["rate-conversion", "window-decision"]
curation: content/curation/backup-window.json
---
Ein Backup-Fenster ist die Zeit, in der eine Sicherung den Betrieb belasten darf. In Prüfungsaufgaben reicht deshalb die theoretische Portgeschwindigkeit nicht: Du musst **Einheiten sauber umrechnen**, den **langsamsten Abschnitt** erkennen und das Ergebnis mit dem verfügbaren Fenster vergleichen.

<section class="learning-goals" aria-labelledby="backup-window-goals">
  <h2 id="backup-window-goals">Nach dieser Einheit kannst du …</h2>
  <ul>
    <li>Mbit/s und MB/s unterscheiden und aus Datenmenge sowie effektiver Rate eine Dauer berechnen,</li>
    <li>den Engpass einer Sicherungskette bestimmen und eine belastbare Fensterentscheidung formulieren.</li>
  </ul>
</section>

## Einstieg: Reicht Teilen durch 1000?

<section class="quiz" data-quiz="backup-window-diagnostic" data-correct="1">
  <h3>Eine Verbindung liefert 800 Mbit/s. Welche maximale Datenrate entspricht dem ohne weitere Verluste?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Bit und Byte sind nicht dasselbe. Für Byte pro Sekunde muss die Bitrate durch acht geteilt werden."><span class="m">A</span> 800 MB/s</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Richtig: Acht Bit bilden ein Byte. 800 Mbit/s geteilt durch acht ergeben 100 MB/s."><span class="m">B</span> 100 MB/s</button>
  <button class="opt" type="button" data-answer="2" data-rationale="80 MB/s wären 640 Mbit/s. Hier wurde weder korrekt durch acht geteilt noch die Ausgangsrate beibehalten."><span class="m">C</span> 80 MB/s</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Die Umrechnung von Bit in Byte hängt nicht von der dezimalen oder binären Schreibweise der Datenmenge ab."><span class="m">D</span> 0,8 MB/s</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>Großes B bedeutet Byte, kleines b bedeutet Bit.</strong> Von Mbit/s zu MB/s teilst du durch acht. Erst danach teilst du die Datenmenge durch die Datenrate.</p></aside>

## Die Rechenkette

<div class="math-worked" role="group" aria-label="Dreistufige Berechnung eines Backup-Fensters">
  <div><span>Bitrate in Byterate</span><math aria-label="Megabit pro Sekunde geteilt durch acht ergibt Megabyte pro Sekunde"><mfrac><mrow><mi>R</mi><mtext> in Mbit/s</mtext></mrow><mn>8</mn></mfrac><mo>=</mo><mi>R</mi><mtext> in MB/s</mtext></math></div>
  <div><span>Effektive Rate</span><math aria-label="theoretische Rate mal Wirkungsgrad ergibt effektive Rate"><msub><mi>R</mi><mtext>eff</mtext></msub><mo>=</mo><msub><mi>R</mi><mtext>theo</mtext></msub><mo>×</mo><mi>η</mi></math></div>
  <div><span>Sicherungsdauer</span><math aria-label="Zeit ist Datenmenge geteilt durch effektive Rate"><mi>t</mi><mo>=</mo><mfrac><mi>D</mi><msub><mi>R</mi><mtext>eff</mtext></msub></mfrac></math></div>
</div>

<p><strong>η</strong> ist der angenommene Wirkungsgrad. Er bündelt in einer vereinfachten Prüfungsrechnung Protokolloverhead und weitere Verluste. In einem realen Konzept misst du die effektive Rate mit repräsentativen Daten und berücksichtigst zusätzliche Zeiten für Start, Katalog, Prüfung und Nachlauf.</p>

<figure class="learning-figure">
  <img src="/assets/learning/backup-bottleneck.svg" alt="Backup-Pipeline mit Quellspeicher, Backupserver, Netzwerk und Zielmedium. Beispielraten sind 180, 125 und 95 Megabyte pro Sekunde. Die Zielrate von 95 Megabyte pro Sekunde ist als Engpass markiert; die Gesamtrate kann sie nicht überschreiten.">
  <figcaption>Eigene Lernskizze: In einer seriellen Sicherungskette begrenzt der langsamste Abschnitt den maximalen Durchsatz.</figcaption>
</figure>

<div class="math-display" role="group" aria-label="Engpassformel"><math display="block" aria-label="effektive Rate ist das Minimum aus Quellrate, Verarbeitungsrate, Netzrate und Zielrate"><msub><mi>R</mi><mtext>eff</mtext></msub><mo>≤</mo><mi>min</mi><mo>(</mo><msub><mi>R</mi><mtext>Quelle</mtext></msub><mo>,</mo><msub><mi>R</mi><mtext>Server</mtext></msub><mo>,</mo><msub><mi>R</mi><mtext>Netz</mtext></msub><mo>,</mo><msub><mi>R</mi><mtext>Ziel</mtext></msub><mo>)</mo></math><div class="math-legend"><span>Quelle liest</span><span>Server verarbeitet</span><span>Netz transportiert</span><span>Ziel schreibt</span></div></div>

## Durchgerechneter Fall

Ein Datenbestand umfasst 540 GB. Das Backup läuft über einen 1-Gbit/s-Link. Für die vereinfachte Planung werden 80 % effektiver Durchsatz angenommen. Dezimale Einheiten sind vorgegeben.

1. **Byterate bilden:**

<div class="math-display compact"><math display="block" aria-label="eintausend Megabit pro Sekunde geteilt durch acht ergibt einhundertfünfundzwanzig Megabyte pro Sekunde"><mfrac><mrow><mn>1.000</mn><mtext> Mbit/s</mtext></mrow><mn>8</mn></mfrac><mo>=</mo><mn>125</mn><mtext> MB/s</mtext></math><div class="math-legend"><span>1 Gbit/s = 1.000 Mbit/s</span><span>8 Bit = 1 Byte</span></div></div>

2. **Wirkungsgrad anwenden:**

<div class="math-display compact"><math display="block" aria-label="einhundertfünfundzwanzig Megabyte pro Sekunde mal null Komma acht ergibt einhundert Megabyte pro Sekunde"><mn>125</mn><mtext> MB/s</mtext><mo>×</mo><mn>0,80</mn><mo>=</mo><mn>100</mn><mtext> MB/s</mtext></math><div class="math-legend"><span>theoretisch 125 MB/s</span><span>effektiv 100 MB/s</span></div></div>

3. **Dauer berechnen:** 540 GB entsprechen in dieser Aufgabe 540.000 MB.

<div class="math-display compact"><math display="block" aria-label="fünfhundertvierzigtausend Megabyte geteilt durch einhundert Megabyte pro Sekunde ergibt fünftausendvierhundert Sekunden oder neunzig Minuten"><mfrac><mrow><mn>540.000</mn><mtext> MB</mtext></mrow><mrow><mn>100</mn><mtext> MB/s</mtext></mrow></mfrac><mo>=</mo><mn>5.400</mn><mtext> s</mtext><mo>=</mo><mn>90</mn><mtext> min</mtext></math><div class="math-legend"><span>540 GB Daten</span><span>100 MB/s effektiv</span><span>90 Minuten Laufzeit</span></div></div>

<aside class="callout"><span class="lbl">Entscheidung</span><p>Bei einem verfügbaren Fenster von zwei Stunden passen 90 Minuten rechnerisch hinein. Die Reserve beträgt 30 Minuten. Ein vollständiger Planungssatz nennt zusätzlich Messung, Wachstum, konkurrierende Last und Restore-Test.</p></aside>

## Geführte Übungen

<section class="aufgabe">
  <div class="h"><span class="b">Schrittweise</span> Netto-Datenrate bestimmen</div>
  <div class="body">
    <p>Eine 2-Gbit/s-Verbindung erreicht laut Messung 70 % ihrer Nennrate. Wie viele MB/s stehen effektiv zur Verfügung?</p>
    <details><summary>Hinweis anzeigen</summary><div class="loesung"><p>Wandle zuerst 2.000 Mbit/s durch Division durch acht in 250 MB/s um. Wende danach den Faktor 0,70 an.</p></div></details>
    <div class="numeric-practice" data-numeric-practice="backup-window-guided" data-expected="175" data-correct-feedback="Richtig: 175 MB/s effektiv." data-wrong-feedback="Noch nicht. Rechne zuerst 2.000 Mbit/s ÷ 8 und multipliziere das Ergebnis anschließend mit 0,70.">
      <label for="backup-window-guided-answer">Effektive Rate in MB/s</label>
      <div class="answer-row"><input id="backup-window-guided-answer" data-numeric-input type="text" inputmode="decimal" autocomplete="off" placeholder="Ergebnis"><button type="button" class="lbtn" data-numeric-check>Antwort prüfen</button></div>
      <template data-numeric-correct><span>Richtig.</span><div class="math-display compact"><math display="block" aria-label="zweitausend Megabit pro Sekunde geteilt durch acht mal null Komma sieben ergibt einhundertfünfundsiebzig Megabyte pro Sekunde"><mfrac><mn>2.000</mn><mn>8</mn></mfrac><mtext> MB/s</mtext><mo>×</mo><mn>0,70</mn><mo>=</mo><mn>175</mn><mtext> MB/s</mtext></math><div class="math-legend"><span>250 MB/s theoretisch</span><span>70 % wirksam</span><span>175 MB/s effektiv</span></div></div></template>
      <p class="practice-feedback" data-numeric-feedback aria-live="polite" hidden></p>
    </div>
  </div>
</section>

### Typische Fehler

- **Bit und Byte verwechseln:** 1 Gbit/s sind nicht 1 GB/s.
- **Einheiten mischen:** GB mit MB/s oder GiB mit MiB/s erst nach sauberer Umrechnung teilen.
- **Nur das Netzwerk betrachten:** Langsame Quellplatten, Verschlüsselung, Deduplizierung oder das Zielmedium können früher begrenzen.
- **Keine Reserve einplanen:** Ein rechnerisches Ergebnis exakt am Fensterrand ist betrieblich keine robuste Planung.
- **Kompressionsangaben blind übernehmen:** Die erreichbare Kompression hängt von den Daten ab; bereits komprimierte oder verschlüsselte Daten schrumpfen oft wenig.

## Karteikarten und Wiederholung

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="backup-window-bit-byte" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Wie werden 1.000 Mbit/s in MB/s umgerechnet?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Durch acht teilen: 1.000 Mbit/s entsprechen theoretisch 125 MB/s.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="backup-window-bottleneck" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Welche Rate bestimmt eine serielle Backup-Kette?</strong><small>Zum Umdrehen antippen</small></span><span class="face back"><span class="k">Antwort</span><span>Der langsamste wirksame Abschnitt aus Quelle, Verarbeitung, Netzwerk und Ziel.</span></span></button>
</div>
<div class="card-rating"><span>Karte „Bit und Byte“:</span><button type="button" data-card-id="backup-window-bit-byte" data-card-rate="known">gewusst</button><button type="button" data-card-id="backup-window-bit-byte" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="backup-window-bit-byte"></span></div>
<div class="card-rating"><span>Karte „Engpass“:</span><button type="button" data-card-id="backup-window-bottleneck" data-card-rate="known">gewusst</button><button type="button" data-card-id="backup-window-bottleneck" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="backup-window-bottleneck"></span></div>

## Lernziel-Check: Transfer

<section class="recall-practice" data-recall="backup-window-core" data-min-length="40" aria-labelledby="backup-window-recall-title">
  <div class="recall-prompt"><h3 id="backup-window-recall-title">Abruf aus dem Kopf</h3><p>Notiere die drei Rechenschritte und nenne zwei mögliche Engpässe außerhalb des Netzwerks.</p></div>
  <label class="sr-only" for="backup-window-recall-answer">Deine freie Antwort</label>
  <textarea id="backup-window-recall-answer" data-recall-input rows="4" placeholder="Umrechnung, Wirkungsgrad, Dauer und Engpässe …"></textarea>
  <div class="recall-actions"><span data-recall-count>0 Zeichen notiert</span><button class="lbtn" type="button" data-recall-reveal>Muster vergleichen</button></div>
  <div class="recall-model" data-recall-model hidden><strong>Muster:</strong> Mbit/s durch acht in MB/s umrechnen, mit dem Wirkungsgrad zur effektiven Rate multiplizieren und Datenmenge durch effektive Rate teilen. Mögliche Engpässe sind Quellspeicher, Backupserver beziehungsweise Verarbeitung und Zielmedium.</div>
</section>

<section class="numeric-practice transfer-number" data-numeric-practice="backup-window-transfer-rate" data-required-objective="rate-conversion" data-expected="75" data-correct-feedback="Richtig: 75 MB/s effektiv." data-wrong-feedback="Noch nicht. Wandle zuerst 800 Mbit/s in 100 MB/s um und berücksichtige danach 75 % Wirkungsgrad.">
  <h3>Bestimme die effektive Rate</h3>
  <p>Ein 800-Mbit/s-Pfad erreicht 75 % seiner Nennrate. Wie viele MB/s bleiben effektiv?</p>
  <label for="backup-window-transfer-rate">Effektive Rate in MB/s</label>
  <div class="answer-row"><input id="backup-window-transfer-rate" data-numeric-input type="text" inputmode="decimal" autocomplete="off" placeholder="Ergebnis"><button type="button" class="lbtn primary" data-numeric-check>Ergebnis prüfen</button></div>
  <template data-numeric-correct><span>Richtig.</span><div class="math-display compact"><math display="block" aria-label="achthundert Megabit pro Sekunde geteilt durch acht mal null Komma sieben fünf ergibt fünfundsiebzig Megabyte pro Sekunde"><mfrac><mn>800</mn><mn>8</mn></mfrac><mtext> MB/s</mtext><mo>×</mo><mn>0,75</mn><mo>=</mo><mn>75</mn><mtext> MB/s</mtext></math><div class="math-legend"><span>100 MB/s theoretisch</span><span>75 % wirksam</span><span>75 MB/s effektiv</span></div></div></template>
  <template data-numeric-feedback-for="600">600 Mbit/s ist die effektive Bitrate. Gefragt sind MB/s; teile zusätzlich durch acht.</template>
  <template data-numeric-feedback-for="100">100 MB/s ist die theoretische Byterate vor dem Wirkungsgrad.</template>
  <p class="practice-feedback" data-numeric-feedback aria-live="polite" hidden></p>
</section>

<section class="quiz" data-quiz="backup-window-transfer-decision" data-correct="2" data-required-objective="window-decision">
  <h3>Eine Rechnung ergibt 108 Minuten für ein zweistündiges Backup-Fenster. Welche Bewertung ist fachlich am stärksten?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Zwölf Minuten Reserve sind nicht automatisch ausreichend; Wachstum und Schwankungen fehlen in dieser Aussage."><span class="m">A</span> Passt sicher, weil 108 kleiner als 120 ist.</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Das Ergebnis ist für eine erste Abschätzung nutzbar. Ohne Reserven ist es aber nicht automatisch wertlos."><span class="m">B</span> Die Rechnung ist wertlos, weil Backups nie planbar sind.</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Richtig: Rechnerisch passt es knapp. Eine belastbare Entscheidung prüft Messwerte, Wachstum und Puffer und optimiert gegebenenfalls Strategie oder Engpass."><span class="m">C</span> Rechnerisch passt es knapp; Messung, Wachstum und Puffer müssen vor Freigabe geprüft werden.</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Eine größere Netzwerkbandbreite hilft nur, wenn das Netzwerk tatsächlich der Engpass ist."><span class="m">D</span> Es muss immer nur die Netzwerkbandbreite verdoppelt werden.</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> prüfungsnahe Muster zur Berechnung von Datenvolumen, Sicherungsdauer und Datentransferraten. Die Zahlen und Aufgaben dieser Einheit sind neu erstellt.</p>
  <p><strong>EUROPA Prüfungsvorbereitung Teil 2 – Integratoren (2026):</strong> Kontextquelle für Sicherungsplanung und die Einordnung von Bandbreite, Laufzeit und technischen Randbedingungen.</p>
  <p class="source-note">Formeln, Fallzahlen und Pipeline-Grafik sind eine eigenständige didaktische Synthese. Originalabbildungen bleiben in der privaten Wissensbasis.</p>
</div>
