# GA2-9: Prüfungstechnik

Stand: 2026-09-14. Sechs Kernthemen `ga2-9__0` bis `ga2-9__5` als
`CURATED_DRAFT`. Menschliche Fach- und Verständlichkeitsfreigabe bleibt offen.

## Inhaltliche Grenzen

- Netzplan: Gegebenes, Ableitung und Annahme unterscheiden; eigener Firewallfall.
- Subnetting: vollständiger Ansatz und Randadressen, keine Teilpunktgarantie.
- Konfiguration: das verlangte Format entscheidet; Herstellersyntax ist nicht
  pauschal entbehrlich. Eigener Routenfall mit direkt erreichbarem Next Hop.
- Bewertung: Musskriterien vor Vergleich, Zahl der Alternativen nach Auftrag.
- Zeit: 90 Minuten für GA2 anhand der SIHK-Hagen-Prüfungsübersicht geprüft;
  Überblick, Reserve und proportionale Verteilung sind eigene Übungsannahmen.
- Reihenfolge: Können, Aufwand, Vorgaben und Abhängigkeiten statt immer
  Subnetting zuerst. Wechsel mit dokumentiertem Wiedereinstieg.

Die fünf zu pauschalen GA2-Kurztexte wurden auch in Hub, Übersicht,
Netzwerkseite und den kopierten Suchdaten berichtigt. Schlüssel und Reihenfolge
bleiben unverändert. Andere Themengruppen wurden nicht umgeschrieben.

## Quellen

PrüfVorb IHK Bonn, Chunk 00025: beispielhafte Bearbeitungshinweise. Daraus
werden keine universellen Bewertungsregeln abgeleitet. Chunk 00364 liefert
den Subnetting-Kontext; fehlerhafte OCR-Tabellenwerte wurden nicht übernommen.
Eigene Adressen und Aufgaben statt kopierter Prüfungsfragen.

Unpassende Mapping-Treffer zu WiSo, Administratorrollen, Fachgespräch und
Projekt-Netzplantechnik wurden für diesen Batch entfernt. Die Strategien
sind redaktionelle Lernhilfen, nicht durch diese Fremdtreffer belegte Regeln.

Primärabgleich am 14.09.2026:
[SIHK Hagen – IT-Prüfungsvorgaben](https://www.ihk.de/hagen/bildung/abschlusspruefungen/it-berufe-index-812540).
Die aktuelle Aufgabe und ihre Bearbeitungshinweise bleiben maßgeblich.

## Gestaltung und Didaktik

Bestehende OSI-Lernseite vor Umsetzung im Browser angesehen. Refero-Doppler
erneut abgerufen; Doppler-Flächen und Inter, Astro-Atmosphäre und n8n-Linien
behalten ihre Rollen aus DESIGN.md. Kein Redesign der Shell.

| Entscheidung | Grundlage | Umsetzung |
|---|---|---|
| Vorhandene Lesefläche und Bedienung | Referenz-Lock und Lernvorlage | Gemeinsame Styles unverändert |
| Aussagen und Schritte strukturieren | Eigene Lernfälle | Zwölf beschriftete SVGs |
| Rechenmodelle sichtbar machen | Nutzerwunsch | MathML samt Grenzen und Größen |
| Verständnis vor Abschluss | Lernmodul-Vertrag | Zwei Pflichtziele je Einheit |
| Abruf vor Lösung | Bestehende Lerninteraktionen | Karten, Selbsterklärung und explizite Neuversuche |

Jede Einheit enthält Diagnose, Modell, Beispiel, Übung, Sortierung, drei
Karten, Selbsterklärung und Transfer. Subnetting und Zeitbudget enthalten
numerische Pflichtaufgaben; richtige Quizpositionen variieren.

## Verifikation

`npm test` sowie `npm run test:browser`; neuer Test
`scripts/verify-n9-browser.mjs` prüft die sechs Seiten, Fehlantworten,
Abschluss-Gates, Zahlen/Dezimalkomma, Speicherung, Rücknahme, Tastatur,
390/1440px und beide Themes. Optionale Aufnahmen mit `AP2_N9_CAPTURE=1`
bleiben lokal. Lernfreigabe ist unabhängig von technischen Testergebnissen.

Ergebnis am 14.09.2026: Beide vollständigen Befehle erfolgreich (Exit 0).
Zusätzlich acht Browseraufnahmen der sechs Einheiten visuell geprüft,
einschließlich beider Formeln auf Mobilbreite und längerer Ablauftexte.
Diagramme bleiben mobil im beschrifteten, horizontal verschiebbaren Rahmen.
Temporäre Aufnahmen und Hilfsskripte nach der Prüfung entfernt.

Der bestehende Übersichtstest öffnet jetzt vergangene, automatisch zugeklappte
Wochen über deren Summary, bevor er ein Kernthema auswählt. Damit hängt der
Test nicht mehr vom aktuellen Kalenderdatum ab; das Produktverhalten bleibt
unverändert. Abdeckung: GA2 107/107, insgesamt 114/380 Kernthemen mit Lernseite.
