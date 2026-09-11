---
id: osi-model
slug: osi-model
title: Das OSI-Schichtenmodell sicher anwenden
description: Die sieben OSI-Schichten ordnen, ihre Aufgaben unterscheiden und Geräte sowie Protokolle anhand der tatsächlich ausgewerteten Information einordnen.
domain: GA2
domain_label: Analyse und Entwicklung von Netzwerken
group_id: ga2-1
group_label: Block N1 · Grundlagen, Medien und Verkabelung
item_id: ga2-1__0
week: KW 35
estimated_minutes: 22
relevance: hoch
sources: ["europa-integratoren-2026", "itlf10-12-2023", "ihk-bonn"]
content_revision: 2026-09-11.1
content_status: CURATED_DRAFT
learning_objectives: ["layer-order", "layer-classification"]
curation: content/curation/osi-model.json
---
Das OSI-Modell ist keine Landkarte einzelner Produkte, sondern ein **Denk- und Fehlersuchmodell**. Es trennt Netzwerkkommunikation in sieben Aufgabenbereiche. In der AP2 musst du daraus vor allem zwei Dinge ableiten: **Welche Information gehört zu welcher Schicht?** Und: **Bis zu welcher Schicht wertet ein Gerät oder Verfahren Daten aus?**

<section class="learning-goals" aria-labelledby="osi-learning-goals-title">
  <h2 id="osi-learning-goals-title">Nach dieser Einheit kannst du …</h2>
  <ul>
    <li>die sieben OSI-Schichten in der richtigen Reihenfolge nennen und ihre Kernaufgaben unterscheiden,</li>
    <li>typische Geräte, Protokolle und Verarbeitungsschritte anhand der tatsächlich ausgewerteten Information einer OSI-Schicht zuordnen und die Zuordnung begründen.</li>
  </ul>
</section>

## Einstieg: Welche Adresse entscheidet?

<section class="quiz" data-quiz="osi-diagnostic" data-correct="2">
  <h3>Ein Router leitet ein IPv4-Paket im Normalfall zum nächsten Netz weiter. Welche Angabe ist für diese Entscheidung ausschlaggebend?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Ein TCP-Zielport gehört zur Transportschicht. Ein gewöhnlicher Router benötigt ihn nicht für die Auswahl des nächsten Netzes."><span class="m">A</span> der TCP-Zielport</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Die Ziel-MAC-Adresse gilt nur für den aktuellen lokalen Übertragungsabschnitt. Der Router entfernt den eingehenden Frame vor der Routenwahl."><span class="m">B</span> die Ziel-MAC-Adresse des eingehenden Frames</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Richtig: Die Ziel-IP-Adresse gehört zur Vermittlungsschicht. Der Router vergleicht sie mit seinen Routen und bestimmt daraus den nächsten Hop."><span class="m">C</span> die Ziel-IP-Adresse</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Eine URL ist Anwendungsinformation. Ein normal weiterleitender Router wertet sie für seine Routenwahl nicht aus."><span class="m">D</span> die URL der angeforderten Webseite</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

Diese Diagnose zählt nicht zum Abschluss. Sie zeigt nur, ob du beim Lernen besonders auf **lokale MAC-Adressierung** oder **netzübergreifende IP-Adressierung** achten solltest.

## Sieben Schichten, sieben Verantwortungen

Lerne die Schichten nicht nur als Merkspruch. Frage bei jeder Schicht: **Welche Information kommt hier hinzu, und welches Problem löst sie?**

| Nr. | Schicht | Kernaufgabe | Typische Information oder Dateneinheit | Beispiele |
| ---: | --- | --- | --- | --- |
| **7** | Anwendung · Application | Netzdienste für Anwendungen und fachliche Nachrichten | Daten, etwa Anfrage und Antwort | HTTP, DNS, SMTP, SSH |
| **6** | Darstellung · Presentation | gemeinsame Darstellung von Daten: Kodierung, Format, Kompression und konzeptionell Verschlüsselung | dargestellte beziehungsweise transformierte Daten | UTF-8, JSON, JPEG als anschauliche Formate |
| **5** | Sitzung · Session | Dialoge beziehungsweise Sitzungen aufbauen, steuern, synchronisieren und beenden | Sitzungszustand, Kontrollpunkte | Dialogsteuerung und Wiederaufsetzpunkte als Funktionen |
| **4** | Transport · Transport | Ende-zu-Ende-Transport zwischen Prozessen; Segmentierung, Ports, je nach Protokoll Zuverlässigkeit und Flusskontrolle | TCP-Segment oder UDP-Datagramm | TCP, UDP |
| **3** | Vermittlung · Network | logische Adressierung und Weiterleitung zwischen Netzen | IP-Paket | IPv4, IPv6, ICMP; Router |
| **2** | Sicherung · Data Link | Übertragung auf einem lokalen Link; Frames, MAC-Adressen, Medienzugriff und Fehlererkennung | Ethernet- oder WLAN-Frame | Ethernet, IEEE 802.11; Bridge, Switch |
| **1** | Bitübertragung · Physical | Bits als elektrische, optische oder Funksignale übertragen | Bits beziehungsweise Signale | Kabel, Stecker, Funk, Transceiver; Hub, Repeater |

<aside class="callout merk"><span class="lbl">Merksatz</span><p><strong>Anwendung bis Bitübertragung beschreibt beim Senden den Weg von 7 nach 1.</strong> Bei der Fehlersuche arbeitest du häufig von 1 nach 7: Signal, Frame, Paket, Transport und erst dann Anwendung.</p></aside>

<figure class="learning-figure">
  <img src="/assets/learning/osi-model.svg" alt="Sieben OSI-Schichten mit ihren Aufgaben, Dateneinheiten und Beispielen. Klammern zeigen die typische Sichtweite: Repeater bis Schicht 1, Switch bis Schicht 2, Router bis Schicht 3 und Endsystem bis Schicht 7.">
  <figcaption>Eigene Lernskizze: Die höchste ausgewertete Information bestimmt die Zuordnung. Ein Gerät kann darunterliegende Schichten ebenfalls verwenden und zusätzliche Funktionen besitzen.</figcaption>
</figure>

## „Arbeitet auf Schicht 2“ richtig lesen

Die Aussage meint meist: **Schicht 2 ist die höchste Schicht, deren Information das Gerät für diese konkrete Funktion auswertet.**

- Ein klassischer **Switch** empfängt Signale auf Schicht 1 und verarbeitet Ethernet-Frames auf Schicht 2. Für seine Weiterleitungsentscheidung nutzt er typischerweise die Ziel-MAC-Adresse.
- Ein **Router** nutzt ebenfalls Schicht 1 und 2, entfernt aber den eingehenden Link-Layer-Rahmen und trifft die Weiterleitungsentscheidung anhand der Ziel-IP-Adresse auf Schicht 3.
- Ein **Layer-4-Load-Balancer** bezieht beispielsweise IP-Adressen und TCP-/UDP-Ports ein. Ein **Layer-7-Load-Balancer** kann zusätzlich Anwendungsinformationen wie HTTP-Host oder URL-Pfad auswerten.
- Ein **Endsystem** verarbeitet für eine Anwendung den gesamten Stapel. Es ist deshalb falsch, einen Server pauschal nur der Anwendungsschicht zuzuordnen.

<aside class="callout warn"><span class="lbl">Prüfungsfalle</span><p><strong>Produktname ist nicht gleich Schicht.</strong> Ein Multilayer-Switch kann zusätzlich routen, eine Firewall kann je nach Bauart bis zur Anwendungsschicht prüfen und ein Proxy beendet sogar Anwendungsverbindungen. Begründe mit dem ausgewerteten Feld oder Protokoll.</p></aside>

Die Schichten 5 und 6 sind im heutigen TCP/IP-Stapel selten als getrennte Softwaremodule sichtbar. Ihre Funktionen existieren trotzdem. Auch die Zuordnung von TLS wird in Lehrwerken und Implementierungen unterschiedlich dargestellt. Für eine belastbare Antwort beschreibst du deshalb zuerst die **Funktion** und übernimmst keine starre TLS-Schichtzuordnung ohne Kontext.

## Vorhersage: Was ändert der Router?

<section class="recall-practice" data-recall="osi-router-prediction" data-min-length="35" aria-labelledby="osi-prediction-title">
  <div class="recall-prompt"><h3 id="osi-prediction-title">Erst vorhersagen, dann vergleichen</h3><p>Ein Client sendet eine HTTPS-Anfrage über einen Switch und einen Router. Notiere aus dem Kopf: Welche Adressen bleiben ohne NAT vom Client bis zum Server gleich, und welche ändern sich an jedem gerouteten Übertragungsabschnitt?</p></div>
  <label class="sr-only" for="osi-prediction-answer">Deine Vorhersage zu IP- und MAC-Adressen</label>
  <textarea id="osi-prediction-answer" data-recall-input rows="4" placeholder="IP-Adressen …; MAC-Adressen …"></textarea>
  <div class="recall-actions"><span data-recall-count>0 Zeichen notiert</span><button class="lbtn" type="button" data-recall-reveal>Vorhersage vergleichen</button></div>
  <div class="recall-model" data-recall-model hidden><strong>Erwartung:</strong> Ohne NAT bleiben Quell- und Ziel-IP-Adresse logisch vom Client bis zum Server bestehen. Die Quell- und Ziel-MAC-Adressen gehören dagegen zum jeweiligen lokalen Link; der Router entfernt den eingehenden Frame und erstellt für den nächsten Link einen neuen.</div>
</section>

## Vollständig durchgearbeitetes Beispiel

Ein Client mit `192.0.2.10` und TCP-Quellport `51514` ruft einen Webserver unter `198.51.100.20:443` auf. Zwischen den Netzen steht ein Router; NAT ist in diesem Beispiel ausgeschaltet.

1. **Schicht 7 – Anwendung:** Der Browser erzeugt eine HTTP-Anfrage. Bei HTTPS wird der HTTP-Inhalt durch TLS geschützt; die konkrete TLS-Zuordnung ist für die folgende Weiterleitung nicht nötig.
2. **Schichten 6 und 5 – Darstellung und Sitzung:** Daten werden in einer vereinbarten Darstellung verarbeitet und der Kommunikationsdialog wird verwaltet. Im realen TCP/IP-Stapel übernehmen Anwendung und Bibliotheken diese Aufgaben häufig gemeinsam.
3. **Schicht 4 – Transport:** TCP versieht die Daten mit Quellport `51514` und Zielport `443`. Dadurch kann der Server die Daten dem HTTPS-Dienst zuordnen.
4. **Schicht 3 – Vermittlung:** IP ergänzt Quelle `192.0.2.10` und Ziel `198.51.100.20`. Weil das Ziel in einem anderen Netz liegt, wird das Paket zum Standardgateway geschickt.
5. **Schicht 2 – erster Link:** Der Client baut einen Ethernet-Frame. Quell-MAC ist die MAC-Adresse des Clients; Ziel-MAC ist die MAC-Adresse des lokalen Router-Interfaces. Sie ist **nicht** die MAC-Adresse des entfernten Servers.
6. **Schicht 1 – Übertragung:** Die Bits des Frames werden als Signale über das Medium übertragen. Ein klassischer Switch liest die Ziel-MAC-Adresse und leitet den Frame zum Router-Port weiter.
7. **Am Router:** Der Router entfernt den Ethernet-Rahmen, liest die Ziel-IP-Adresse, wählt eine Route und vermindert bei IPv4 den TTL-Wert. Danach kapselt er das IP-Paket in einen **neuen** Frame für den nächsten Link.
8. **Am Server:** Der Server entfernt die Header in umgekehrter Richtung. IP liefert an TCP, TCP ordnet über Port `443` zu, und die Anwendung verarbeitet nach der TLS-Entschlüsselung die HTTP-Anfrage.

| Betrachtete Angabe | Erster Link: Client → Router | Nächster Link: Router → Zielnetz | Warum? |
| --- | --- | --- | --- |
| Quell-IP | `192.0.2.10` | `192.0.2.10` | logische Ende-zu-Ende-Adresse; hier kein NAT |
| Ziel-IP | `198.51.100.20` | `198.51.100.20` | Grundlage der Routenwahl |
| TCP-Ports | `51514 → 443` | `51514 → 443` | Zuordnung der Prozesse; hier kein Port-Übersetzer |
| Quell-MAC | Client-MAC | MAC des Router-Ausgangs | Link-lokale Absenderadresse |
| Ziel-MAC | MAC des Standardgateways | MAC des nächsten Hops beziehungsweise Servers | Link-lokale Empfängeradresse |
| Dateneinheit | Frame mit IP-Paket und TCP-Segment | neuer Frame mit weitergeleitetem IP-Paket | Schicht 2 wird an der gerouteten Grenze neu aufgebaut |

<aside class="callout merk"><span class="lbl">Prüfungssatz</span><p><strong>Switches entscheiden typischerweise mit MAC-Adressen, Router mit IP-Adressen und Transportfunktionen mit Ports.</strong> Anwendungskomponenten können zusätzlich den Inhalt eines Protokolls auswerten.</p></aside>

## Geführte Übung: Fehler sinnvoll eingrenzen

<section class="aufgabe">
  <div class="h"><span class="b">Schrittweise</span> Webseite nicht erreichbar</div>
  <div class="body">
    <p>Ein Client erreicht die Server-IP per Ping. Ein TCP-Verbindungsversuch zum Zielport 443 scheitert jedoch. In welcher Reihenfolge grenzt du den Fehler ein?</p>
    <details data-hint="osi-guided-1"><summary>Hinweis 1: Was ist bereits belegt?</summary><div class="loesung"><p>Der erfolgreiche Ping ist ein starkes Indiz dafür, dass Signalweg, lokaler Link und IP-Routing für diesen Test grundsätzlich funktionieren. Er beweist aber nicht, dass TCP-Port 443 erlaubt oder der Webdienst erreichbar ist.</p></div></details>
    <details data-hint="osi-guided-2"><summary>Hinweis 2: Nächste Schicht</summary><div class="loesung"><p>Prüfe auf Schicht 4, ob eine TCP-Verbindung zu Port 443 aufgebaut werden kann und ob eine Firewall den Verkehr verwirft. Erst wenn der Transport funktioniert, untersuchst du TLS und HTTP auf den oberen Schichten.</p></div></details>
    <details><summary>Musterlösung</summary><div class="loesung"><ol><li>Ping-Ergebnis und Ziel-IP prüfen, ohne daraus vorschnell auf den Webdienst zu schließen.</li><li>TCP-Erreichbarkeit von Port 443 testen und Firewall-/ACL-Regeln kontrollieren.</li><li>Lauscht der Prozess auf Port 443, TLS-Aushandlung und Zertifikat prüfen.</li><li>Danach HTTP-Antwort, Hostname und Anwendungskonfiguration untersuchen.</li></ol><p>Der Schichtenweg verhindert, dass du einen HTTP-Fehler suchst, obwohl noch keine TCP-Verbindung besteht.</p></div></details>
  </div>
</section>

## Karteikarten und Wiederholung

<div class="flashcard-grid">
  <button class="flashcard" type="button" data-flashcard="osi-l2-l3" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>MAC-Adresse oder IP-Adresse?</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>MAC-Adressen steuern die lokale Frame-Zustellung auf Schicht 2; IP-Adressen ermöglichen die Weiterleitung zwischen Netzen auf Schicht 3.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="osi-pdu" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Frame, Paket, Segment?</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>Schicht 2: Frame. Schicht 3: Paket. Schicht 4: TCP-Segment beziehungsweise UDP-Datagramm.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="osi-device" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Was bedeutet „Router auf Schicht 3“?</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>Für die Routingfunktion ist Schicht 3 die höchste ausgewertete Ebene. Der Router nutzt darunter trotzdem Signale und Frames.</span></span></button>
  <button class="flashcard" type="button" data-flashcard="osi-upper" aria-pressed="false"><span class="face front"><span class="k">Frage</span><strong>Warum sind Schicht 5 und 6 oft schwer zu sehen?</strong><small>Erst erinnern, dann umdrehen</small></span><span class="face back"><span class="k">Antwort</span><span>Im TCP/IP-Stapel übernehmen Anwendungen und Bibliotheken Sitzungs- und Darstellungsfunktionen häufig gemeinsam; die konzeptionellen Aufgaben bleiben erhalten.</span></span></button>
</div>
<div class="card-rating"><span>Karte „MAC/IP“:</span><button type="button" data-card-id="osi-l2-l3" data-card-rate="known">gewusst</button><button type="button" data-card-id="osi-l2-l3" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="osi-l2-l3"></span></div>
<div class="card-rating"><span>Karte „Dateneinheiten“:</span><button type="button" data-card-id="osi-pdu" data-card-rate="known">gewusst</button><button type="button" data-card-id="osi-pdu" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="osi-pdu"></span></div>
<div class="card-rating"><span>Karte „Gerätesicht“:</span><button type="button" data-card-id="osi-device" data-card-rate="known">gewusst</button><button type="button" data-card-id="osi-device" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="osi-device"></span></div>
<div class="card-rating"><span>Karte „obere Schichten“:</span><button type="button" data-card-id="osi-upper" data-card-rate="known">gewusst</button><button type="button" data-card-id="osi-upper" data-card-rate="unsure">unsicher</button><span class="card-review-status" data-card-review-status="osi-upper"></span></div>

## Freier Abruf

<section class="recall-practice" data-recall="osi-core-recall" data-min-length="55" aria-labelledby="osi-recall-title">
  <div class="recall-prompt"><h3 id="osi-recall-title">Ohne Nachschlagen erklären</h3><p>Warum ändert ein Router den Ethernet-Frame, während Quell- und Ziel-IP-Adresse ohne NAT im Beispiel gleich bleiben? Verwende die Begriffe Link, Frame, Paket und nächster Hop.</p></div>
  <label class="sr-only" for="osi-recall-answer">Deine freie Erklärung</label>
  <textarea id="osi-recall-answer" data-recall-input rows="4" placeholder="Der Frame gilt …; das IP-Paket …"></textarea>
  <div class="recall-actions"><span data-recall-count>0 Zeichen notiert</span><button class="lbtn" type="button" data-recall-reveal>Muster vergleichen</button></div>
  <div class="recall-model" data-recall-model hidden><strong>Muster:</strong> Ein Ethernet-Frame gilt nur auf einem lokalen Link und adressiert dort den nächsten Hop. Der Router entfernt diesen Frame, wählt anhand der Ziel-IP des enthaltenen Pakets die Route und erzeugt für den nächsten Link einen neuen Frame mit passenden MAC-Adressen. Ohne NAT bleiben die IP-Endpunkte dabei logisch gleich; Protokollfelder wie TTL können sich trotzdem ändern.</div>
</section>

## Lernziel-Check: Transfer

Ein Techniker untersucht einen neuen Standort konsequent von der physischen Verbindung bis zum Anwendungsdienst. Ordne die Prüfschritte den aufsteigenden OSI-Schichten zu.

<section class="sequence-practice" data-sequence="osi-transfer-order" data-expected="physical,data-link,network,transport,session,presentation,application" data-correct-feedback="Richtig. Die Bottom-up-Analyse folgt Schicht 1 bis 7: Signal, lokaler Link, Routing, Prozess-Transport, Sitzung, Darstellung und Anwendung." data-wrong-feedback="Beginne mit Signal und Medium. Danach folgen lokaler Frame, geroutetes Paket, Prozess-Transport und erst anschließend die drei anwendungsnahen Schichten." data-required-objective="layer-order" aria-labelledby="osi-sequence-title">
  <div class="lab-heading"><div><h3 id="osi-sequence-title">Reihenfolge-Werkstatt: von unten nach oben</h3><p>Die Schritte sind gemischt. Ordne sie mit den Schaltflächen „Hoch“ und „Runter“ von Schicht 1 bis Schicht 7.</p></div><span class="lab-tag">Pflichtziel 1</span></div>
  <ol class="sequence-list" data-sequence-list>
    <li data-step="transport" tabindex="-1"><span class="step-position" data-step-position>1</span><span>TCP-Verbindungsaufbau und Zielport des Dienstes prüfen.</span></li>
    <li data-step="physical" tabindex="-1"><span class="step-position" data-step-position>2</span><span>Link-Signal, Medium und Transceiver kontrollieren.</span></li>
    <li data-step="application" tabindex="-1"><span class="step-position" data-step-position>3</span><span>HTTP-Anfrage und Antwort des Webdienstes untersuchen.</span></li>
    <li data-step="network" tabindex="-1"><span class="step-position" data-step-position>4</span><span>IP-Adresse, Präfix, Gateway und Route kontrollieren.</span></li>
    <li data-step="presentation" tabindex="-1"><span class="step-position" data-step-position>5</span><span>Datenformat, Zeichenkodierung und Transformation prüfen.</span></li>
    <li data-step="data-link" tabindex="-1"><span class="step-position" data-step-position>6</span><span>VLAN, MAC-Adresse und Ethernet-Frame prüfen.</span></li>
    <li data-step="session" tabindex="-1"><span class="step-position" data-step-position>7</span><span>Aufbau, Zustand und geordnetes Ende des Dialogs betrachten.</span></li>
  </ol>
  <button class="lbtn primary" type="button" data-sequence-check>Reihenfolge prüfen</button>
  <p class="practice-feedback" data-sequence-feedback aria-live="polite" hidden></p>
</section>

<section class="quiz" data-quiz="osi-transfer-classification" data-correct="3" data-required-objective="layer-classification">
  <h3>Ein Reverse Proxy liest bei einer eingehenden HTTPS-Verbindung nach der Entschlüsselung den HTTP-Hostnamen und den URL-Pfad, um einen Backend-Server auszuwählen. Bis zu welcher OSI-Schicht wertet er für diese Entscheidung Informationen aus?</h3>
  <button class="opt" type="button" data-answer="0" data-rationale="Schicht 2 würde nur lokale Informationen wie MAC-Adressen und Ethernet-Frames erklären. Hostname und URL-Pfad sind dort nicht sichtbar."><span class="m">A</span> bis Schicht 2, weil jedes Paket zuerst in einem Frame steckt</button>
  <button class="opt" type="button" data-answer="1" data-rationale="Schicht 3 reicht für eine Entscheidung anhand von IP-Adressen. Der beschriebene Proxy liest aber Inhalte oberhalb des IP-Headers."><span class="m">B</span> bis Schicht 3, weil der Backend-Server eine IP-Adresse hat</button>
  <button class="opt" type="button" data-answer="2" data-rationale="Ein Layer-4-Verfahren könnte IP-Adressen und TCP-/UDP-Ports auswerten. HTTP-Hostname und URL-Pfad gehören jedoch zur Anwendung."><span class="m">C</span> bis Schicht 4, weil HTTPS TCP verwendet</button>
  <button class="opt" type="button" data-answer="3" data-rationale="Richtig: Die konkrete Entscheidung verwendet HTTP-Informationen. Damit wertet der Proxy für diese Funktion bis zur Anwendungsschicht aus."><span class="m">D</span> bis Schicht 7, weil HTTP-Host und URL-Pfad Anwendungsinformationen sind</button>
  <div class="fb" data-feedback hidden><span data-selected-feedback></span> <button type="button" class="retry" data-quiz-reset>Erneut versuchen</button></div>
</section>

## Quellen und Einordnung

<div class="src-block">
  <p><strong>EUROPA Prüfungsvorbereitung Teil 2 – Integratoren (2026):</strong> Hauptbeleg für das siebenschichtige Referenzmodell, die Reihenfolge und die Einordnung von TCP auf Schicht 4.</p>
  <p><strong>IT-Berufe Fachstufe II – Lernfelder 10–12 (2023):</strong> Praxisbelege für unterschiedliche Verarbeitungstiefen, insbesondere Load Balancing auf Schicht 4 und 7 sowie die Zuordnung von Ethernet, IP, UDP und Anwendungskommunikation.</p>
  <p><strong>Prüfungsvorbereitung IHK Bonn:</strong> Prüfungsnahe Muster zur Zuordnung von Protokollen und Kopplungsgeräten zu OSI-Schichten.</p>
  <p class="source-note">Text, Aufgaben und SVG sind eigenständig erstellt. Die Buchgrafiken bleiben private Belege. Mehrdeutige historische Zuordnungen, insbesondere bei TLS und Mehrschichtgeräten, wurden nicht als starre Regeln übernommen.</p>
</div>
