# Deep Space — Referenz und Umsetzung

Stand: 2026-09-12. Branch: `codex/deep-space-ui`.

## Ziel

Die drei vom Nutzer gelieferten Refero-Style-Referenzen Doppler, n8n und Astro
sind der direkte Build-Target. Der Nutzer hat die Auswahl und Umsetzung einer
gemeinsamen Richtung ausdrücklich beauftragt.
Die Lernaufgabe bleibt: Diese Woche → Bereich → Themengruppe → Kernthema.

## Revision 2 — ausdrückliche Nutzerkorrektur

Die erste Fassung wurde als bloße Umfärbung abgelehnt. Der Nutzer verlangt
sichtbares Glas, einen neuen Aufbau, dauerhaft erkennbare Animationen und
Fortschrittsbalken als voranschreitenden Lichtstrahl. Diese Vorgabe ersetzt
die anfängliche Beschränkung auf eine kurze Eingangsanimation.

- Hub: große linke Textspalte mit echtem Countdown; rechts eine führende
  Glasfläche und zwei über Linien verbundene Nebenflächen.
- Bereiche: Titel und Fortschritt nebeneinander, Themengruppen in zwei Spalten;
  geöffnete Gruppen erhalten die volle Breite.
- Übersicht: getrennte, vertikal versetzte Glasflächen statt einer geschlossenen
  rechteckigen Gesamtfläche.
- Material: 30–48% dunkle Tönung, 24px Backdrop-Blur, feine innere Lichtkante.
  Bewegte blaue/violette Lichtfelder scheinen hinter den Flächen durch.
- Bewegung: 15–22s Lichtfeldbewegung, umlaufende Konturen und Glasspiegelung.
  Pause-Knopf, gespeicherte Bewegungswahl, reduzierte Bewegung und Pause in
  verborgenen Tabs. Text bewegt sich nicht mit dem Hintergrund.
- Fortschritt: Lichtkante liegt exakt am echten Prozentwert; ein 2,8s Sweep
  läuft innerhalb der erledigten Breite. Änderungen gleiten in 850ms vor/zurück.
  Bei 0% ist der Balken leer. Abhaken erzeugt einen kurzen Bestätigungsimpuls.

## Revision 3 — ruhige Themengruppen und klarer Hellmodus

Die Nutzerkorrektur vom 12. September ersetzt für die Bereichsseiten die
volle Breite geöffneter Themengruppen. Karten bleiben in ihrer Grid-Spalte und
animieren ihre gemessene Höhe beim Öffnen und Schließen über 340ms. Dadurch
bleiben Nachbarkarten horizontal stabil und folgende Reihen wandern mit dem
wachsenden Inhalt statt sprunghaft.

Im Hellmodus werden die Glasflächen deckender, Kanten und Schatten klarer und
Sekundärtexte sowie Bereichsfarben dunkler. Die Aurora bleibt sichtbar, wird
aber schmaler und weniger flächig, damit sie den Seitenkontrast nicht auswäscht.
Reduced Motion öffnet Themengruppen weiterhin ohne Höhenanimation.

Zusätzliche Strukturreferenz: Refero Doppler Projektübersicht
`e64eb4ca-90b8-4d33-ba62-1a499e5f2017` (getrennte Bereichspanels), übertragen
auf die vorhandenen Lernaufgaben. Marketing-Stil und Produkthierarchie behalten
ihre zuvor festgelegten Rollen.

## Referenz-Lock und Entscheidungen

### Aktueller Hintergrund: Polarlicht + offene Lichtbögen

Der Nutzer bewertet die Animation in Chrome als flüssig, den geschlossenen
Kreis jedoch als unplatziert. Er wird durch zwei feine, auslaufende SVG-Bögen
an den äußeren Seiten und einen weichen violetten Schimmer ersetzt. Das
Polarlicht aus dem gewählten Hybrid bleibt. Diese Korrektur gilt global.

- Astro behält die Rolle der diffusen Atmosphäre, n8n liefert die Idee feiner
  Lichtverbindungen; die randständige Platzierung folgt der Nutzerkorrektur.
- Die neue Ebene `.space-trails` bewegt sich über 24s nur um 8px seitlich und
  18px nach oben. Animiert wird allein die Transformation der Ebene.
- Die Bögen sind offen, laufen transparent aus und liegen außerhalb der
  zentralen Lesefläche. Keine geschlossene Scheibe und kein heller Laserkern
  im Hintergrund; die stärkeren Signale bleiben an Fortschritt und Bedienung.
- Die Ebene übernimmt Pause, Reduced Motion und die schwächere Hellmodus-Tönung.

### Vorherige Auswahl: Polarlicht + Sonnenfinsternis (abgelöst)

Nach drei Hintergrundvarianten und einem kombinierten Desktop-Entwurf hat der
Nutzer den Hybrid aus Variante 1 und 2 zur globalen Umsetzung gewählt.
Er ersetzt die drei ursprünglichen Nebelfelder und die großen elliptischen
Umlaufbahnen aus Revision 2. Glas, Seitenaufbau und Laser-Fortschritt bleiben.

- Canvas: `#080b19`; breite türkise/violette Polarlichtbänder hinter Glas.
- Polarlicht: 16s hin und zurück, leichte Verschiebung, Drehung und Vergrößerung.
- Violetter Ring: 760px große Verlaufsfläche, horizontal zentriert, 330px von
  oben; 14s hin und zurück, bis 34px nach oben und 8% größer.
- Auf kleinen Displays wird der Hintergrund am Viewport beschnitten; der
  Seiteninhalt bleibt unabhängig davon responsiv.
- Hellmodus: schwächeres Polarlicht und Ring ohne dunkle Scheibe.
- Umsetzung in den gemeinsamen Space-Assets; Pause und Reduced Motion wirken
  auf beide Ebenen. Der Countdown behält seine eigene umlaufende Kontur.

Die folgende Tabelle dokumentiert die ursprünglichen Quellenrollen; bei der
Hintergrundkomposition gilt die aktuelle Korrektur mit offenen Lichtbögen.

| Entscheidung | Quelle / ursprüngliche Rolle | Umsetzung |
|---|---|---|
| Dominante Welt | Doppler: violet-lit vault, Glasnavigation, ruhige dunkle Paneele | Violettschwarzer Grund, 20px Panels, 12px Controls, feine helle Kanten |
| Atmosphäre | Astro: blau-violetter Nebel nur als Hintergrund | Ein großer Lichtschein hinter Einstieg und Wochenfokus; kein Gradient auf Lesetext |
| Fluss | n8n: Electric Current an Verbindungen + Nutzerkorrektur | Sichtbare Verbindungen, umlaufende Lichtkonturen und Fortschrittsstrahlen |
| Hauptaktion | Astro: weiße invertierte CTA | Weißer Einstieg; Dopplers grüner Go-Button ausschließlich am führenden Weiterlernen-Link |
| Typografie | Doppler nennt Inter als Ersatz | Lokale Inter / Inter Display, 14–16px Lesetext, 48–64px Einstieg |
| Status | Bestehende Produktsemantik | Grün = gelernt, Amber = Rückstand, Rot = Fehler; Lavendel für sparsame Orientierung |
| Bewegung | Explizite Nutzerkorrektur + Refero Motion | Dauerhafte Atmosphäre und Lichtstrahlen; Pause verfügbar, reduced-motion statisch |
| Heller Modus | Bestehende Bedienfunktion | Kühle helle Flächen, gleiche Hierarchie; gespeicherte Auswahl bleibt bestehen |

## Medien und Grenzen

CSS-Radialverläufe und einfache SVG-Verbindungsbahnen sind hier die passenden
nativen Medien. Keine Stockfotos, erfundenen Produktgrafiken oder Partikelwand.
Lerninhalte, Fortschrittsdaten und Sync bleiben funktional erhalten.
Keine Mischung aller drei CTA-Paletten: n8ns orangefarbene CTA wird ausgelassen.
Ungültige verkürzte Astro-Hexwerte aus dem Export werden nicht übernommen.

## Prüfung

Desktop und Mobile: Hub, Übersicht, Bereiche, Lernpfad und Lernseite; dazu
Hellmodus, Menüs, Suche, Fortschritt und reduzierte Bewegung. Build und vorhandene
Browserprüfungen werden gegen die Umsetzung ausgeführt.
