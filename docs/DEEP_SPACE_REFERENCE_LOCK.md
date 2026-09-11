# Deep Space — Referenz und Umsetzung

Stand: 2026-09-11. Branch: `codex/deep-space-ui`.

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

Zusätzliche Strukturreferenz: Refero Doppler Projektübersicht
`e64eb4ca-90b8-4d33-ba62-1a499e5f2017` (getrennte Bereichspanels), übertragen
auf die vorhandenen Lernaufgaben. Marketing-Stil und Produkthierarchie behalten
ihre zuvor festgelegten Rollen.

## Referenz-Lock und Entscheidungen

### Aktueller Hintergrund: Polarlicht + Sonnenfinsternis

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
Hintergrundkomposition gilt die oben ausgewählte Variante.

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
