---
name: AP2-Tracker
description: Ruhige Lernoberfläche mit klarer Typografie und gut lesbaren Arbeitsflächen.
colors:
  canvas: "#ffffff"
  surface: "#ffffff"
  surface-muted: "#f7f6f2"
  border: "#e8e6e0"
  ink: "#25241f"
  text-secondary: "#67645d"
  text-muted: "#757169"
  next-action: "#fbffc2"
  progress-green: "#16794c"
typography:
  display: "'Inter Display', 'Inter', system-ui, sans-serif"
  ui: "'Inter', system-ui, sans-serif"
  metadata: "'Inter', system-ui, sans-serif"
rounded:
  controls: "6px"
  cards: "8px"
  panels: "12px"
implementation:
  visual-layer: "assets/ap2-reference-ui.css"
  theme: "assets/ap2-theme.js"
  navigation: "assets/ap2-navigation.js"
  reference-lock: "docs/UI_REDESIGN_REFERENCE_LOCK.md"
---

# Design System: AP2-Tracker

Stand: 2026-09-10.

## Richtung: Klarheit zum Lernen

Die vom Nutzer ausgewählte Programa-Referenz ersetzt die frühere
AssetWise-/Lovable-Gestaltung. Weißer Grund, warme neutrale Arbeitsflächen,
feine Kanten und flache weiche Schatten bleiben bestehen. Auf ausdrücklichen
Wunsch ergänzen die Schriften der heutigen Attio-Website diese Flächen:
Inter Display für Titel und Inter für sämtliche Bedien- und Statustexte.

Die Startseite beantwortet zuerst „Was ist jetzt dran?“ und führt zu
„Diese Woche“. Übersicht und Bereiche folgen weiterhin der Hierarchie
`Bereich > Themengruppe > Kernthema`. Inhalte, Datenmodell, Links und
optionaler Cloud-Sync ändern sich durch die Gestaltung nicht.
`/simulation/` bleibt außerhalb dieser Runde.

Die verbindliche Referenz mit Quellenrollen steht in
[UI_REDESIGN_REFERENCE_LOCK.md](docs/UI_REDESIGN_REFERENCE_LOCK.md).
Die älteren Inline-Styles bleiben als Fallback erhalten; die gemeinsame
Datei `assets/ap2-reference-ui.css` trägt die aktuelle Gestaltung.

## Farbe und Material

- Canvas und Arbeitsflächen: Weiß `#ffffff`.
- Abgesetzte Gruppen: warmes Off-White `#f7f6f2`; Tracks `#eeece6`.
- Text: `#25241f`; Beschreibungen `#67645d`; Metadaten `#757169`.
- Kanten: `#e8e6e0`, stärker `#d2cfc7`.
- Hauptaktion: `#2b2a26` mit weißem Text.
- Nächste Lernaktion/heute: blasses Gelb `#fbffc2` mit dunklem Text.
- Grün `#16794c` bedeutet Fortschritt/Erfolg; Ocker und Rot bleiben
  Warnung und Fehler. Bereichsfarben sind kleine Orientierungssignale.
- Kleine Schatten besitzen 1–3 px Versatz. Arbeitsflächen erhalten
  einen sehr schwachen, 10 px versetzten Schatten mit 30 px Unschärfe.
- Kein vollflächiges Punktraster, keine äußere App-Umrahmung, keine
  Browser-Fensterpunkte und keine dekorativen Produktbilder.

### Dunkelmodus

Canvas `#191917`, Surface `#22221f`, Surface muted `#292925`,
Ink `#f2f0e8`, Beschreibung `#c4c0b5`, Metadaten `#a39f94`.
Gelb wird zu `#e5eaa1`, Grün zu `#52c98b`; Rahmen bleiben leise.

Ohne gespeicherte Wahl gilt die Systemeinstellung. Jeder Klick invertiert
den **tatsächlich sichtbaren** Modus und speichert die explizite Wahl unter
`ap2-theme-v1`. Kein dritter „System“-Zwischenschritt.
Das früh geladene Modul setzt den Modus vor dem Rendern. Tabs synchronisieren
sich über das Storage-Ereignis; zurückgeholte Seiten lesen die Wahl erneut.
Bei gesperrtem Speicher funktioniert der Wechsel zumindest auf der aktuellen
Seite. Native Controls erhalten dasselbe `color-scheme`.

## Typografie

- **Inter Display, 500/600:** Titel; Haupttitel 44–64 px, Bereichstitel
  36–56 px am Desktop, mobil 34–46 px; Zeilenhöhe um 1.08.
- **Inter, 400/500/600:** Navigation, Beschreibung, Buttons, Themengruppen,
  Kernthemen und große Fortschrittswerte. 13–17 px für normalen Produkttext.
- **Inter, 400/500:** Statusangaben 14 px mit 1.6-facher Zeilenhöhe,
  Beschreibungen und Kernthemen 15 px; kompakte Planlabels mindestens 13 px.
  Keine Monospace-Schrift. Statusangaben umbrechen einzeln auf kleinen Displays.
- Beide Familien werden lokal geladen; `ss03` folgt der Attio-Referenz.
  Herkunft und Nutzungshinweise
  stehen in [assets/fonts/SOURCES.md](assets/fonts/SOURCES.md).
- Lange Titel umbrechen; große Titel nutzen `text-wrap: balance`.

## Layout und Komponenten

- Durchgehender Seitengrund; Desktop-Navigation 72 px hoch, ohne Außenrahmen.
- Inhaltskorridor maximal 1160 px, seitlicher Abstand mobil 20 px.
- Einstieg mit klarem Seitentitel, Prüfungs-Countdown und einer Hauptaktion.
- Der Wochenfokus ist eine echte Arbeitsfläche: kompakter Kalenderkopf,
  heute relevante Themengruppe, zwei weitere Bereiche.
- Übersicht: zusammenhängende Fortschritts-/Aktivitätsfläche und Zeitplan.
- Bereich: Titel, Fortschritt, Wochenhinweis, Suche, Werkzeuge,
  Themengruppen und abhakbare Kernthemen.
- Controls haben 6 px Radius, Karten 8 px, große Flächen 12 px.
  Statuschips dürfen kleiner sein. Keine übergroßen CTA-Pillen.
- Outline-Symbole nutzen `currentColor`, 16 px Grundgröße, 1.75 px Strich.
  Kleine neutrale Symbolflächen zeigen Kontext, nicht Dekoration.
- Unter 820 px bleiben die fünf mobilen Ziele in der Bottom-Navigation.
  Konto und Theme bleiben mit mindestens 44 px hohen Zielen im Kopf.

## Einfache Interaktion

- Navigation: 50 ms Hover-Einstieg, 300 ms Ausstieg, `cubic-bezier(.2,0,0,1)`.
- Themenmenü per Hover oder Klick: 150 ms Opazität und 4 px vertikale Bewegung,
  `cubic-bezier(.65,0,.35,1)`. Pfeiltasten, Escape und Außenklick unterstützt.
- Theme-Wechsel und Seitenwechsel zeigen direkt den neuen Zustand.
- Keine gestaffelten Einblendungen; Inhalte sind sofort sichtbar.
- Suchtreffer, aufklappbare Themen und Lernstatus behalten ihre Funktionen.
- Keine Scroll-Sperren, Parallax oder erzwungenen Scrollstationen.
- Reduced Motion entfernt Übergänge und Animationen.
- Fokus: 2 px Ring mit Abstand. Zustand wird nie nur über Farbe vermittelt.
- Theme-Wechsel unterdrücken Farbtransitionen auch in der Navigation.

## Sprache

Kurze, konkrete Sätze beschreiben Lernstand und Bedienung. Keine Werbeversprechen,
Metaphern oder technischen Ersatzbegriffe wie „Fortschrittsbild“. Fachinhalte,
Prüfungstermine und die Hierarchie `Bereich > Themengruppe > Kernthema` bleiben
unverändert. Hinweise erklären Sicherung und Wiederherstellung verständlich.

## Prüfung

`node scripts/verify-theme-persistence.mjs` prüft den früher fehlerhaften
ersten Klick, beide Systemmodi, wiederholte Wechsel, Tastatur, alle fünf Seiten,
Reload, Tab-Synchronisierung und gesperrten Speicher.
`node scripts/verify-navigation.mjs` prüft Menübedienung, Unterbrechungen,
Tastatur, mobile Umschaltung und reduzierte Bewegung.
Visuelle Browserprüfung bleibt zusätzlich für Desktop/Mobil und beide Modi
erforderlich; Suche, Themenaufklappen und Fortschritt werden separat geprüft.
