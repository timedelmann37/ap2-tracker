# Redaktionspaket: Variablen, Listen und Funktionen

Stand: 17.09.2026. Als Lerneinheit umgesetzt, Status `CURATED_DRAFT`.
Kernthema: `ga1-9__4`.
Slug: `variablen-datentypen-arrays-listen-funktionen-parametern-ruckgabewert`.
Bestehende Hierarchie und Tracker-Schlüssel unverändert übernehmen.

## Quellen und Grenzen

- IT-Basiswissen, Chunk 00221, Zeilen 5375–5491: Anfang bis zur Datentyp-
  und Verlaufstabelle gelesen. Beleg für bewusste Datenanalyse und Typwahl;
  historische Abschreibungsregeln nicht verwenden.
- [Python-Tutorial: Listen](https://docs.python.org/3/tutorial/introduction.html#lists):
  Abschnitt 3.1.3 gelesen. Für ausdrücklich Python-bezogene Aussagen zu Index,
  Länge, Veränderbarkeit und gemeinsam referenzierten Listen verwenden.
- [Python-Tutorial: Funktionen](https://docs.python.org/3/tutorial/controlflow.html#defining-functions):
  Abschnitt 4.8 als Primärbeleg für Parameter, lokale Namen und Rückgabe.
- Automatische Treffer über DHCP-Parameter sind keine Funktionsparameter-Belege.
  Die übrigen bisherigen Mapping-Kandidaten sind noch nicht fachlich freigegeben.
- Array und Liste nicht pauschal gleichsetzen. Festgelegtes Lernmodell: geordnete
  Liste nichtnegativer ganzer Zahlen, nullbasierter Index. Sprachspezifische
  Größen-, Typ- und Speicherregeln ausdrücklich abgrenzen.

## Lernziele

1. Index, Elementwert, Anzahl und Summe unterscheiden.
2. Parameter und Rückgabewert einer Funktion erklären und den Leerfall behandeln.

## Eigenes Szenario

Eine Funktion erhält eine Liste von Dateigrößen in KiB. Sie liefert einen
Ergebnisdatensatz mit Anzahl und Gesamtsumme zurück. Sie verändert die Eingabe
nicht und gibt selbst nichts auf dem Bildschirm aus. Die gültigen Eingaben
sind endlich und enthalten ausschließlich nichtnegative ganze Zahlen.
Validierung fremder Eingaben wird als separater notwendiger Schritt benannt.

Parametername: `groessen`. Beispielargument: Liste mit 6, 0 und 9.
Lokale Variablen: `anzahl` und `summe`, jeweils anfangs null.
Pro Element wird der Zähler um eins und der Akkumulator um den Elementwert
erhöht. Rückgabe erfolgt erst nach vollständiger Verarbeitung.
Der Aufrufer entscheidet, ob und wie er das Ergebnis anzeigt.

## Geprüfte Sollwerte

| Eingabe | Anzahl | Summe in KiB | Bemerkung |
|---|---:|---:|---|
| 6, 0, 9 | 3 | 15 | Null ist ein vorhandenes Element |
| leere Liste | 0 | 0 | kein Durchlauf, definierte Rückgabe |
| 4, 4 | 2 | 8 | gleiche Werte bleiben zwei Elemente |
| 0 | 1 | 0 | Anzahl und Summe sind nicht austauschbar |

Für die Liste 6, 0, 9 gilt: Index null enthält sechs, Index eins enthält null,
Index zwei enthält neun. Ein Zugriff auf Index drei liegt außerhalb dieser
Liste. Eine leere Liste besitzt keinen gültigen Elementindex.

## Didaktische Umsetzung im bestehenden System

- Diagnose: Liefert die Länge der Liste ihren letzten Index oder ihre Anzahl?
- Modellgrafik: drei Felder mit getrennten Index- und Wertbeschriftungen.
- Zweite Grafik: Argument beim Aufrufer → lokale Verarbeitung → Rückgabedatensatz.
- Typwahl kurz erklären: Kennung als Text, Dateigröße als ganze Zahl,
  Prüfergebnis als Wahrheitswert; ein numerisch aussehender Text ist nicht
  automatisch eine Zahl. Keine implizite Konvertierungsregel unterstellen.
- Vollständiger Verlauf mit drei Durchläufen; Summe als MathML setzen.
- Zahlenübungen für Indexwert, Anzahl und Summe mit getrennten Rückmeldungen.
- Sortierung: lokale Startwerte, vollständige Verarbeitung, Rückgabe.
- Eigener Schreibauftrag: Funktion skizzieren, die nur die Summe zurückgibt.
- Karten: Parameter/Argument, Rückgabe/Anzeige, Zähler/Akkumulator, Leerfall.
- Transfer A: Liste 5, 0, 5 → Anzahl drei und Summe zehn.
- Transfer B: Rückgabe innerhalb der Schleife → bei mehreren Elementen zu früh;
  bei leerer Eingabe wird dieser Rückgabeweg überhaupt nicht erreicht.

## Prüfplan vor Abschluss

- Sollwerte unabhängig nachrechnen und beide Funktionsaufrufe isoliert prüfen:
  lokale Zähler dürfen keine Werte aus dem vorherigen Aufruf behalten.
- Falsche Antworten, Rücksetzen, Tastatur, Musterlösung und Speicherung testen.
- Zusatzübungen dürfen keine Pflichtziele freischalten.
- Beide Pflichtziele, Abschluss/Rücknahme und erneutes Laden prüfen.
- Grafik und Tabellen bei 390/1440px, Dark/Light visuell kontrollieren.
- Umsetzung mit `npm test` und gezieltem Browsertest geprüft: Fehlantworten,
  Tastatur, Sortierung, Erinnerungsauftrag, Speicherung, Pflichtziele und
  Abschluss/Rücknahme. Darstellung bei 390/1440px in beiden Themes geprüft;
  Diagramme auf kleinen Bildschirmen innerhalb ihrer Grafikfläche verschiebbar.
- Abdeckung nach Umsetzung: 120/380, davon GA1 12/164. Menschliche fachliche
  Freigabe bleibt offen; kein vollständiger Navigationstest in diesem Durchlauf.
