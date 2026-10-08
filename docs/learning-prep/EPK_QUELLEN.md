# Ablauforganisation und EPK – geprüfte Quellenanker

Recherche: 2026-10-04. Eigene Fälle und Diagramme erstellen; keine Quellenabbildungen oder Aufgaben übernehmen. Diese Notiz dokumentiert Recherche, keine abgeschlossene Implementierung oder QA.

## 1. Aktuelle Primärdokumentation: ARIS Method Manual

- Herausgeber: Software GmbH / ARIS, **April 2025**, ARIS 10; versionsgebundene Herstellerdokumentation, keine allgemeine gesetzliche Norm.
- [Method Manual](https://docs.aris.com/10.2025.7.0/yaa-method-guide/en/Method-Manual.pdf)
- Direkt gelesen: §3.4.1.2, gedruckte Seiten **66–75** (PDF-Seiten 74–83); Textstellen 1478–1575.
- S.66–67: Funktionen sind Tätigkeiten, Ereignisse relevante Zustände/Auslöser beziehungsweise Ergebnisse. Ereignisse als Sechsecke, Bezeichnung mit Objekt und Zustand; Funktionen benötigen Zeit, Ereignisse beziehen sich auf einen Zeitpunkt.
- S.68–70: EPK beschreibt zeitlich-logischen Ablauf; Start und Ende Ereignisse. Verzweigungen und Schleifen verwenden kreisförmige Regeln, die logische Verknüpfungen ausdrücken. AND verlangt alle, XOR genau eine Alternative, OR mindestens eine inklusive mehrerer Alternativen.
- S.71–75, Abb.72–81: UND führt alle verlangten Eingänge zusammen beziehungsweise löst alle Ausgänge aus. Inklusives ODER erlaubt mehrere; exklusives ODER schließt gleichzeitige Alternativen aus. **S.71 und S.75:** Ein einzelnes auslösendes Ereignis darf nicht durch OR/XOR zwischen nachfolgenden Funktionen entscheiden; AND-Verzweigung ist möglich.
- Umfangsgrenze: Die Operatorübersicht ersetzt keine vollständige Ausführungs-/Synchronisationssemantik für beliebige verschachtelte Netze. OR-Join im Lernfall nur mit eindeutig bestimmbaren aktivierten Zweigen erklären. Keine kopierten Herstellerbeispiele.

## 2. Laufende ARIS-Dokumentation: Ablauf und Erweiterungen

- [Process hierarchy – ARIS Risk and Compliance](https://docs.aris.com/latest/yrc-arcm/en-us/261315-process-hierarchy.html)
- Direkt gelesen: Abschnitt **Process modeling with Event-driven process chain**, Textzeilen 46–61; Abruf 2026-10-04, Seite ohne eindeutiges Veröffentlichungsdatum, Footer 2026.
- EPK modelliert logisch-zeitliche Tätigkeitsfolgen und resultierende Ereignisse. Organisationseinheiten, Rollen und Anwendungssysteme ergänzen den Ablauf; Details können in ein zugeordnetes Function allocation diagram ausgelagert werden.
- Grenze: Die auf derselben Seite geforderte Baumhierarchie gilt für die Prozesshierarchie in ARIS Risk and Compliance, **nicht** als Verzweigungsverbot der EPK übernehmen.
- Ergänzend direkt gelesen: [EPC in ARIS – Hersteller-Datasheet](https://aris.com/resources/aris-epc-cheat-sheet/), Abschnitte General information / Core elements / Extended elements. Belegt Verfahrenssicht und Erweiterungsobjekte. Verlinkte Rasterabbildungen waren im Browserwerkzeug nicht zugänglich; deren Detailinhalt wurde nicht als geprüft behandelt.

## 3. Historischer Modellierungshinweis: Ereigniswechsel ist eine gewählte Konvention

- [Ramona Baureis: Basic rules of EPC modelling](https://ariscommunity.com/users/rbaureis/2010-03-22-basic-rules-epc-modelling), **22.03.2010**, Community-Fachbeitrag, historisch; direkt gelesen, Abschnitte Short overview of Rules / Logical operators.
- Beschreibt Funktionen als aktive Tätigkeiten und Ereignisse als passive Zustände. Split besitzt einen Eingang und mehrere Ausgänge, Join umgekehrt. Der Beitrag empfiehlt bereits 2010, unwichtige Zwischenereignisse wegzulassen; strikte Ereignis-Funktions-Alternation deshalb als **klassische Basiskonvention dieser Lerneinheit** formulieren, nicht als ausnahmslos gültige Regel sämtlicher ARIS-Varianten.
- Gleichartige Split-/Join-Paare eignen sich für einfache strukturierte Lernfälle. Kein mechanisches Ersetzen beliebiger Konnektoren ohne Pfadprüfung.

## 4. Historische Primärforschung: Reichweite der Regeln

- [Langner / Schneider / Wehler: Prozeßmodellierung mit ereignisgesteuerten Prozeßketten und Petri-Netzen](https://www.mathematik.uni-muenchen.de/~wehler/Publications/MAN3.pdf)
- Direkt gelesen: S.1–5, insbesondere **§2.1, S.5**, Textzeilen 130–151. Historisches Forschungspapier (Literatur bis 1997; exaktes Veröffentlichungsjahr aus diesem Dokument nicht gesichert).
- Definiert eine eigene formale Syntax und diskutiert die in älterer Literatur vorhandene Einschränkung für OR/XOR nach Ereignissen ausdrücklich kritisch. Belegt, dass Modellierungskonventionen nicht mit einem universellen mathematischen EPK-Satz gleichgesetzt werden sollen.
- Für diese AP2-Einheit bewusst die klassische, im ARIS-Handbuch 2025 erklärte Regel verwenden; die Forschung nicht als Einstieg in Petri-Netz-Semantik ausweiten.

## Recherchegrenzen und didaktische Entscheidungen

- Das auf ARISCommunity gehostete **ARISQuickModellingGuide.pdf** wurde gelesen, trägt jedoch BP-spezifische Angaben aus 2005–2007 und den Vermerk Confidential. Nicht als aktuelle offizielle ARIS-Norm registrieren, nicht kopieren; das aktuelle Method Manual bietet die erforderliche Primärbasis.
- Uni-Potsdam-DeLFI-2016-Proceedings sowie ein Uni-Hamburg-Lern-PDF waren über direkte Web-Abfrage wegen Größenlimits nicht vollständig lesbar. Suchtreffer allein nicht als geprüfte Hauptquellen registrieren.
- Eigene Fehleranalyse: XOR-Split mit AND-Join kann in einem einfachen Fall auf einen nie aktivierten Alternativzweig warten; AND-Split mit XOR-Join liefert keine passende Synchronisation. Dies als begründete Fallanalyse zeigen, nicht als pauschalen Satz über sämtliche unstrukturierten EPKs.
- Prozessverbesserung über konkrete Wartezeiten, Doppelarbeit, Medienbrüche und Übergaben begründen. Parallel modellierte Arbeit bedeutet nicht zwingend gleichzeitig beginnende Ausführung.
