---
id: storage-types
slug: storage-types
title: DAS, NAS und SAN sicher unterscheiden
description: Datei- und Blockspeicher einordnen, Protokolle zuordnen und eine Speicherarchitektur für ein Szenario begründet auswählen.
domain: GA1
domain_label: Konzeption & Administration
group_id: ga1-3
group_label: Block 3 · Speicherlösungen
item_id: ga1-3__0
week: KW 37
estimated_minutes: 18
relevance: hoch
sources: ["europa-integratoren-2026", "ihk-bonn", "itlf6-9-2022"]
content_revision: 2026-09-11.2
content_status: CURATED_DRAFT
learning_objectives: ["access-level", "architecture-selection"]
curation: content/curation/storage-types.json
---
In Prüfungsaufgaben ist nicht das Gehäuse die wichtigste Frage, sondern **wie der Host auf den Speicher zugreift**. Sieht er Dateien und Ordner oder ein rohes Blockgerät, auf dem er selbst ein Dateisystem anlegt? Aus dieser Unterscheidung lassen sich DAS, NAS, SAN und die passenden Protokolle zuverlässig ableiten.

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>DAS ist direkt, NAS liefert Dateien, SAN liefert Blöcke über ein Speichernetz.</strong> Ein Gerät kann mehrere Dienste anbieten. Entscheidend ist deshalb der verwendete Zugriff, nicht allein die Bezeichnung auf dem Gehäuse.</p></aside>

## Das Zugriffsmodell

| Architektur | Anschluss und Sicht des Hosts | Wer verwaltet das Dateisystem? | Typische Stärke | Typische Grenze |
| --- | --- | --- | --- | --- |
| **DAS** · Direct Attached Storage | direkt an einen Host; der Speicher erscheint als Blockgerät | der angeschlossene Host | einfach, geringe Zusatzkosten, kurze Wege | meist an einen Host gebunden; gemeinsame Nutzung und zentrale Verwaltung sind begrenzt |
| **NAS** · Network Attached Storage | Dateifreigabe über Ethernet und IP | das NAS | unkomplizierte gemeinsame Dateiablage für viele Clients | Leistung und Verfügbarkeit hängen auch von Netz, NAS und dessen Uplinks ab |
| **SAN** · Storage Area Network | LUN beziehungsweise Namespace erscheint am Server als Blockgerät | der jeweilige Host oder ein Cluster-Dateisystem | zentraler, gemeinsam bereitgestellter Blockspeicher für Server | höhere Planungs-, Betriebs- und Redundanzanforderungen |

Bei **Blockzugriff** liest und schreibt ein Host adressierbare Blöcke. Er partitioniert das bereitgestellte Gerät und legt darauf selbst ein Dateisystem an. DAS und SAN arbeiten typischerweise so.

Bei **Dateizugriff** fordert der Client Pfade, Dateien und Verzeichnisse an. Das NAS verwaltet das eigentliche Dateisystem und setzt Freigaben sowie Zugriffsrechte um.

<figure class="learning-figure">
  <img src="/assets/learning/storage-types.svg" alt="Vergleich von DAS, NAS und SAN: DAS verbindet einen Server direkt mit Blockspeicher, NAS liefert mehreren Clients Dateien über SMB oder NFS, SAN liefert Servern Blöcke über iSCSI, Fibre Channel, FCoE oder NVMe over Fabrics.">
  <figcaption>Eigene Lernskizze: Anschlussweg, Zugriffsebene und Verantwortung für das Dateisystem unterscheiden die drei Architekturen.</figcaption>
</figure>

<aside class="callout"><span class="lbl">Häufige Falle</span><p>Ein NAS-Gerät kann zusätzlich ein iSCSI-Target bereitstellen. Greift ein Server darauf per iSCSI zu, ist dieser Zugriff <strong>blockbasiert und SAN-artig</strong> – auch wenn dieselbe Appliance daneben SMB-Freigaben anbietet.</p></aside>

<aside class="callout"><span class="lbl">Wichtig im Cluster</span><p>Eine LUN darf nicht unkoordiniert von mehreren Hosts mit gewöhnlichen lokalen Dateisystemen beschrieben werden. Gemeinsamer Blockzugriff benötigt eine clusterfähige Speicher- und Dateisystemlösung oder eine andere passende Koordination.</p></aside>

## Protokolle richtig zuordnen

| Protokoll oder Technik | Ebene | Transport und Einordnung | Typischer Einsatz |
| --- | --- | --- | --- |
| **SMB** | Datei | Dateifreigabe über IP; CIFS bezeichnet einen älteren SMB-Sprachgebrauch beziehungsweise eine ältere SMB-Generation | Windows- und gemischte Clientnetze, gemeinsame Ordner |
| **NFS** | Datei | Netzwerkdateisystem über IP | Linux-/Unix-Umgebungen, Freigaben und unterstützte Datastores |
| **iSCSI** | Block | kapselt SCSI-Kommandos in TCP/IP und nutzt Ethernet; Initiator verbindet sich mit Target | IP-SAN ohne eigene Fibre-Channel-Fabric |
| **FC** · Fibre Channel | Block | eigene verlustarme Storage-Fabric mit Host-Bus-Adaptern und FC-Switches | leistungs- und verfügbarkeitskritische Server- und Clusterumgebungen |
| **FCoE** · Fibre Channel over Ethernet | Block | transportiert Fibre-Channel-Frames über dafür ausgelegtes Data-Center-Ethernet | konvergente Rechenzentrumsnetze mit passender Infrastruktur |
| **NVMe-oF** · NVMe over Fabrics | Block | überträgt NVMe-Kommandos über eine Fabric, zum Beispiel TCP, RDMA oder Fibre Channel | latenzkritische, moderne Flash- und NVMe-Speichersysteme |

Schnittstelle und Architektur sind nicht dasselbe: Eine direkt angeschlossene SAS-Erweiterung bleibt DAS. Ethernet kann dagegen sowohl Dateizugriff per SMB/NFS als auch Blockzugriff per iSCSI oder NVMe/TCP transportieren.

## In vier Schritten entscheiden

1. **Zugriffsart klären:** Brauchen Benutzer gemeinsame Dateien oder benötigen Server ein Blockgerät für eigenes Dateisystem, Datenbank oder Cluster-Datastore?
2. **Teilnehmer bestimmen:** Nutzt ein einzelner Host den Speicher oder müssen mehrere Clients beziehungsweise Server darauf zugreifen?
3. **Betriebsanforderungen prüfen:** Bandbreite, Latenz, Skalierung, zentrale Verwaltung, Redundanz und Wiederherstellung festhalten.
4. **Infrastruktur und Kosten abwägen:** Vorhandene Ethernet-Struktur, FC-Kompetenz, Adapter, Switches, Multipathing und Betriebsaufwand berücksichtigen.

Ein vollständiger Prüfungssatz verbindet Anforderung und Entscheidung: „Für die gemeinsamen Abteilungsordner wähle ich ein NAS mit SMB, weil viele Arbeitsplatzrechner gleichzeitig auf zentral verwaltete Dateien zugreifen. Ein SAN wäre für diesen reinen Datei-Use-Case unnötig komplex.“

### Typische Auswahl

- **DAS:** lokaler Videoschnitt, einzelner Backup-Server oder preisgünstige Erweiterung eines einzelnen Hosts.
- **NAS:** Teamfreigaben, Home-Verzeichnisse und Dokumentenablagen für heterogene Clients.
- **iSCSI-SAN:** zentraler Blockspeicher über vorhandene IP-Kompetenz; für kritische Systeme mit getrennten beziehungsweise priorisierten, redundanten Pfaden planen.
- **FC-SAN:** große, latenz- oder verfügbarkeitskritische Serverlandschaften, wenn Kosten und Spezialbetrieb gerechtfertigt sind.

<aside class="callout"><span class="lbl">Prüfungstipp</span><p>„SAN ist schneller“ reicht nicht als Begründung. Die reale Leistung hängt von Datenträgern, Controllern, Queueing, Protokolloverhead, Netzbandbreite und Redundanzdesign ab. Begründe immer mit der konkreten Anforderung.</p></aside>

## Aufgaben

<section class="aufgabe">
  <div class="h"><span class="b">Szenario 1</span> Gemeinsame Projektablage</div>
  <div class="body">
    <p>Vierzig Windows-Arbeitsplätze benötigen gemeinsame Projektordner mit zentralen Berechtigungen. Die vorhandene Ethernet-Infrastruktur reicht für die erwartete Last aus. Welche Architektur und welches Protokoll passen?</p>
    <details><summary>Lösung anzeigen</summary><div class="loesung"><p><strong>NAS mit SMB</strong> passt: Die Clients benötigen gemeinsame Dateien, keine eigenen Blockgeräte. Das NAS verwaltet Dateisystem und Freigaben zentral. NFS wäre bei überwiegend Linux-/Unix-Clients eine naheliegende Alternative.</p></div></details>
  </div>
</section>

<section class="aufgabe">
  <div class="h"><span class="b">Szenario 2</span> Virtualisierungscluster</div>
  <div class="body">
    <p>Drei Hypervisor sollen einen hochverfügbaren, gemeinsam erreichbaren Block-Datastore nutzen. Im Rechenzentrum gibt es redundante Ethernet-Switches, aber keine Fibre-Channel-Komponenten oder FC-Betriebserfahrung. Triff eine begründete Vorauswahl.</p>
    <details><summary>Lösung anzeigen</summary><div class="loesung"><p>Ein <strong>redundant angebundenes iSCSI-SAN</strong> ist eine plausible Vorauswahl. Es stellt Blockgeräte bereit und nutzt die vorhandene IP-/Ethernet-Kompetenz. Für hohe Verfügbarkeit gehören getrennte Pfade, Multipathing, redundante Targets und Switches sowie passende Netzkapazität in das Konzept. FC wäre ebenfalls technisch geeignet, würde hier aber zusätzliche Infrastruktur und Know-how verlangen.</p></div></details>
  </div>
</section>

<section class="aufgabe">
  <div class="h"><span class="b">Rechenaufgabe</span> Übertragungszeit abschätzen</div>
  <div class="body">
    <p>Ein Server überträgt 300 GB auf ein IP-basiertes Speichersystem. Der 10-Gbit/s-Link erreicht einschließlich aller Verluste effektiv 70&nbsp;% seiner Nennrate. Wie lange dauert die Übertragung mindestens? Rechne mit dezimalen Einheiten.</p>
    <details><summary>Lösung anzeigen</summary><div class="loesung"><div class="math-worked" role="group" aria-label="Dreistufige Übertragungszeitberechnung"><div><span>Effektive Rate</span><math aria-label="zehn Gigabit pro Sekunde mal null Komma sieben ergibt sieben Gigabit pro Sekunde"><mn>10</mn><mtext> Gbit/s</mtext><mo>×</mo><mn>0,70</mn><mo>=</mo><mn>7</mn><mtext> Gbit/s</mtext></math></div><div><span>Datenmenge</span><math aria-label="dreihundert Gigabyte mal acht ergibt zweitausendvierhundert Gigabit"><mn>300</mn><mtext> GB</mtext><mo>×</mo><mn>8</mn><mo>=</mo><mn>2.400</mn><mtext> Gbit</mtext></math></div><div><span>Zeit</span><math aria-label="zweitausendvierhundert Gigabit geteilt durch sieben Gigabit pro Sekunde ist ungefähr dreihundertdreiundvierzig Sekunden beziehungsweise fünf Minuten dreiundvierzig Sekunden"><mfrac><mrow><mn>2.400</mn><mtext> Gbit</mtext></mrow><mrow><mn>7</mn><mtext> Gbit/s</mtext></mrow></mfrac><mo>≈</mo><mn>343</mn><mtext> s</mtext><mo>≈</mo><mn>5</mn><mtext> min </mtext><mn>43</mn><mtext> s</mtext></math></div></div><p>Das ist eine Idealabschätzung ohne zusätzliche Verzögerungen durch Speicher, Protokoll und konkurrierenden Verkehr.</p></div></details>
  </div>
</section>

## Karteikarten

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="storage-filesystem" aria-pressed="false">
    <span class="face front"><span class="k">Frage</span><strong>Wer verwaltet bei NAS und SAN das Dateisystem?</strong><small>Zum Umdrehen antippen</small></span>
    <span class="face back"><span class="k">Antwort</span><span>Beim NAS verwaltet die Appliance das Dateisystem. Beim SAN erhält der Host ein Blockgerät und verwaltet darauf selbst das Dateisystem – oder nutzt ein geeignetes Cluster-Dateisystem.</span></span>
  </button>
  <button class="flashcard" type="button" data-flashcard="storage-iscsi" aria-pressed="false">
    <span class="face front"><span class="k">Frage</span><strong>Warum ist iSCSI kein NAS-Dateiprotokoll?</strong><small>Zum Umdrehen antippen</small></span>
    <span class="face back"><span class="k">Antwort</span><span>iSCSI transportiert SCSI-Kommandos über TCP/IP und stellt dem Initiator Blöcke bereit. SMB und NFS stellen dagegen Dateien und Verzeichnisse bereit.</span></span>
  </button>
  <button class="flashcard" type="button" data-flashcard="storage-fabric" aria-pressed="false">
    <span class="face front"><span class="k">Frage</span><strong>Wofür steht „Fabric“ bei NVMe-oF?</strong><small>Zum Umdrehen antippen</small></span>
    <span class="face back"><span class="k">Antwort</span><span>Für das Transportnetz zwischen Host und entferntem NVMe-Speicher. Je nach Variante kann die Fabric etwa TCP, RDMA oder Fibre Channel nutzen.</span></span>
  </button>
</div>

## Selbsttest

<section class="quiz" data-quiz="storage-level" data-correct="1" data-required-objective="access-level">
  <h3>Ein Client greift auf <code>\\dateiserver\projekte</code> zu. Welche Kombination beschreibt den Zugriff am besten?</h3>
  <button class="opt" type="button" data-answer="0"><span class="m">A</span> SAN und Blockzugriff</button>
  <button class="opt" type="button" data-answer="1"><span class="m">B</span> NAS und Dateizugriff</button>
  <button class="opt" type="button" data-answer="2"><span class="m">C</span> DAS und Objektzugriff</button>
  <button class="opt" type="button" data-answer="3"><span class="m">D</span> FC und Dateizugriff</button>
  <div class="fb" data-feedback hidden><strong>NAS und Dateizugriff sind richtig.</strong> Der UNC-Pfad verweist auf eine SMB-Freigabe; das entfernte System verwaltet das Dateisystem. <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

<section class="quiz" data-quiz="storage-protocol" data-correct="2">
  <h3>Welches Protokoll stellt über ein TCP/IP-Netz typischerweise Blockspeicher bereit?</h3>
  <button class="opt" type="button" data-answer="0"><span class="m">A</span> SMB</button>
  <button class="opt" type="button" data-answer="1"><span class="m">B</span> NFS</button>
  <button class="opt" type="button" data-answer="2"><span class="m">C</span> iSCSI</button>
  <button class="opt" type="button" data-answer="3"><span class="m">D</span> CIFS</button>
  <div class="fb" data-feedback hidden><strong>iSCSI ist richtig.</strong> Ein Initiator sendet SCSI-Kommandos über TCP/IP an ein Target. SMB/CIFS und NFS sind Dateiprotokolle. <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

<section class="quiz" data-quiz="storage-classification" data-correct="3" data-required-objective="architecture-selection">
  <h3>Eine Appliance bietet parallel eine SMB-Freigabe und ein iSCSI-Target an. Welche Aussage ist korrekt?</h3>
  <button class="opt" type="button" data-answer="0"><span class="m">A</span> Beide Zugriffe sind dateibasiert, weil dasselbe Gehäuse verwendet wird.</button>
  <button class="opt" type="button" data-answer="1"><span class="m">B</span> Beide Zugriffe sind blockbasiert, weil Festplatten eingebaut sind.</button>
  <button class="opt" type="button" data-answer="2"><span class="m">C</span> SMB ist blockbasiert und iSCSI dateibasiert.</button>
  <button class="opt" type="button" data-answer="3"><span class="m">D</span> SMB ist dateibasiert, iSCSI ist blockbasiert.</button>
  <div class="fb" data-feedback hidden><strong>Antwort D ist richtig.</strong> Die Zugriffsmethode bestimmt die Ebene; eine Appliance kann Datei- und Blockdienste gleichzeitig anbieten. <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>EUROPA Prüfungsvorbereitung Teil 2 – Integratoren, 4. Auflage (2026):</strong> aktuelle Hauptquelle für die Abgrenzung von NAS-Dateifreigaben über SMB/NFS und SAN-Blockspeicher über iSCSI oder Fibre Channel.</p>
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> enthält einen älteren Herstellervergleich zu DAS, NAS, iSCSI und Fibre Channel. Verwendet wurden nur zeitstabile Grundprinzipien; historische Produkt-, Bandbreiten- und Kostenangaben wurden bewusst nicht übernommen.</p>
  <p><strong>ITLF6–9 (2022):</strong> liefert Anwendungsszenarien für NAS, direkt angeschlossene Speichererweiterung sowie die Abwägung von iSCSI- und Fibre-Channel-SAN.</p>
  <p class="source-note">Text, Aufgaben und Grafik sind eine eigenständig formulierte Synthese. Buchseiten und Originalabbildungen bleiben in der privaten lokalen Wissensbasis.</p>
</div>
