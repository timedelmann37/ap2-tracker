---
name: AP2-Tracker
description: Ruhiges, instrumentelles Lern-Panel für die IHK-Prüfung AP2 — Haarlinien, ein Grün, Mono-Zahlen.
colors:
  readout-green: "#16794c"
  signal-green: "#3ecf8e"
  key-green: "#006239"
  key-green-hi: "#00794a"
  brand-tint: "rgba(62, 207, 142, 0.11)"
  paper: "#fcfcfc"
  surface-raised: "#ffffff"
  surface-sunken: "#f4f4f2"
  surface-sunken-deep: "#ececea"
  hairline: "rgba(0, 0, 0, 0.09)"
  hairline-strong: "rgba(0, 0, 0, 0.17)"
  warm-charcoal: "#1c1c1b"
  charcoal-muted: "#56554f"
  charcoal-faint: "#8a897f"
  ga1-green: "#16794c"
  ga2-cobalt: "#2f6ecc"
  wiso-ochre: "#a06a12"
  plan-violet: "#6f49cf"
  status-warning: "#a06a12"
  status-critical: "#c33f39"
  highlight: "rgba(62, 207, 142, 0.28)"
typography:
  display:
    fontFamily: "Manrope, Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(30px, 5vw, 44px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.021em"
  headline:
    fontFamily: "Manrope, Inter, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope, Inter, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.006em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
  mono:
    fontFamily: "'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "'tnum' 1"
rounded:
  xs: "3px"
  sm: "5px"
  md: "7px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "18px"
  lg: "22px"
  xl: "34px"
components:
  button:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-muted}"
    rounded: "{rounded.sm}"
    padding: "6px 11px"
  button-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.warm-charcoal}"
  button-primary:
    backgroundColor: "{colors.key-green}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "6px 11px"
  button-primary-hover:
    backgroundColor: "{colors.key-green-hi}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-muted}"
    rounded: "{rounded.sm}"
    padding: "7px 11px"
  input:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.warm-charcoal}"
    rounded: "{rounded.sm}"
    padding: "9px 11px"
  chip:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.warm-charcoal}"
    rounded: "{rounded.sm}"
    padding: "8px 10px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-muted}"
    rounded: "{rounded.sm}"
    padding: "7px 12px"
  tab-active:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.warm-charcoal}"
  badge:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.readout-green}"
    rounded: "{rounded.pill}"
    padding: "3px 8px"
  panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.warm-charcoal}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  topic-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.warm-charcoal}"
    rounded: "{rounded.md}"
    padding: "0px"
  bottomnav-link:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-faint}"
    padding: "8px 4px 7px"
    height: "54px"
---

# Design System: AP2-Tracker

## Overview

**Creative North Star: "Das Kontrollpult"**

Der AP2-Tracker sieht aus wie ein ruhig kalibriertes Messinstrument, an dem
man den eigenen Lernstand abliest. Flächen sind flach und durch Haarlinien
getrennt, nicht durch Schatten; Zahlen stehen im Monospace mit tabellarischen
Ziffern, damit ein Fortschrittswert sich wie eine Anzeige und nicht wie
Fließtext liest. Es gibt genau eine Akzentstimme — ein Grün — die sparsam für
Fortschritt, aktive Zustände und den Primär-Button eingesetzt wird. Alles
andere ist warmes Charcoal auf Papierweiß.

Die Grundstimmung ist **präzise und instrumentell**, aber **warm im Detail**:
die Neutraltöne haben einen leichten Wärmestich, das Charcoal ist nie reines
Schwarz, und kleine Momente (ein Pop beim Abhaken, ein einmaliger Balken-Lauf
bei 100 %, die Streak-Pille) geben dem Werkzeug Charakter, ohne laut zu
werden. Die Bereiche GA1, GA2, WiSo und „der Plan" tragen je einen eigenen
Akzent, aber alle mit derselben Helligkeit — sie wirken als abgestimmtes Set,
nicht als Regenbogen.

Die Bildsprache ist an supabase.com angelehnt (warmes Charcoal mit Grünstich,
ein Grün-Akzent, Haarlinien, Manrope + Inter + IBM Plex Mono). Sie ist der
verbindliche Ausgangspunkt und wurde in der UI-Hierarchie-Kur bewusst
beibehalten — die Runde war eine IA-Kur, kein neues Redesign.

**Key Characteristics:**
- Flach: Haarlinien statt Schatten, `--shadow: none` ist global gesetzt.
- Eine Akzentstimme (Grün), auf ≤10 % der Fläche.
- Mono-Ziffern mit `tabular-nums` für jeden gemessenen Wert.
- Warme Neutraltöne, nie reines Schwarz oder reines Weiß auf `--page`.
- Kleine Radien (3–10 px); nichts ist stark abgerundet.
- Bereichsakzente als helligkeitsgleiches Set.
- Vollständige Light-/Dark-Parität über ein einziges Token-Set.

## Colors

Eine fast neutrale Palette — warmes Charcoal auf Papierweiß — mit genau einem
gesättigten Grün als Signalfarbe und vier gedämpften Bereichsakzenten.

### Primary
- **Anzeige-Grün** (`#16794c`): Die lesbare Variante des Akzents. Links,
  aktive Nav-Labels, „Zur Übersicht"-Fußzeilen der Kacheln, Badge-Text auf
  Tint. Dunkel genug für Text auf Weiß.
- **Signal-Grün** (`#3ecf8e`): Der leuchtende Akzent (Supabase-Grün).
  Fortschrittsbalken-Füllung, Heatmap-Spitzenstufe, Fokus-Outline,
  Countdown-Standardfarbe, Punkt-/Akzentflächen. Nie als Textfarbe auf Weiß.
- **Tastengrün** (`#006239`, Hover `#00794a`): ausschließlich die Fläche des
  Primär-Buttons.

### Secondary — Bereichsakzente
Ein Set gleicher Helligkeit; jede Farbe kennzeichnet genau einen Bereich in
Punkten, Swatches, Mini-Tracks und aktiven Filter-Tabs.
- **GA1 / Anzeige-Grün** (`#16794c`): Konzeption und Administration.
- **GA2 / Kobalt** (`#2f6ecc`): Analyse und Entwicklung von Netzwerken.
- **WiSo / Ocker** (`#a06a12`): Wirtschafts- und Sozialkunde.
- **Plan-Violett** (`#6f49cf`): „der Plan" und die Wiederholungsmarkierung
  (`--marker`). Doppelrolle ist gewollt — beides ist „vom System/Plan gesetzt",
  nicht vom Stoff.

### Neutral
- **Warmes Charcoal** (`#1c1c1b`): primärer Text, Überschriften.
- **Charcoal gedämpft** (`#56554f`): Sekundärtext, Button-Beschriftung im
  Ruhezustand.
- **Charcoal blass** (`#8a897f`): Eyebrows, Meta, Platzhalter,
  deaktivierte/erledigte Labels.
- **Papierweiß** (`#fcfcfc`): Seitengrund.
- **Fläche erhaben** (`#ffffff`): Panels, Karten, Modals.
- **Fläche gesenkt** (`#f4f4f2`) / **tief** (`#ececea`): Tracks, Chips,
  Hover-Grund, Eingabefelder.
- **Haarlinie** (`rgba(0,0,0,0.09)`) / **stark** (`rgba(0,0,0,0.17)`): jede
  Trennung, jeder Rahmen. Ersetzt Schatten vollständig.

### Status
- **Ocker** (`#a06a12`) = „bald" / Warnung. **Rückstand-Rot** (`#c33f39`) =
  Rückstand / kritischer Countdown / Fehler. **Anzeige-Grün** = erledigt / ok.

### Named Rules
**Die Ein-Stimme-Regel.** Auf keinem Screen bedeckt Signal-Grün mehr als ~10 %
der Fläche. Seine Seltenheit ist der Punkt — es markiert Fortschritt und den
einen Primär-Button, sonst nichts.

**Die Kein-Regenbogen-Regel.** Bereichsakzente werden nie aufgesättigt oder
in der Helligkeit gespreizt. Sie haben denselben Hellwert und erscheinen nur
in kleinen Trägern (7–9 px Punkte, 4 px Tracks, Tab-Rahmen), nie als Vollfläche.

**Die Dark-Parität-Regel.** Es gibt kein Light-only-Feature. Jede neue Farbe
wird im selben Token unter `@media (prefers-color-scheme: dark)` **und**
`:root[data-theme="dark"]` definiert, nie nur in einem Block.

## Typography

**Display Font:** Manrope (Fallback: Inter, system-ui)
**Body Font:** Inter (Fallback: system-ui, -apple-system, Segoe UI)
**Label/Mono Font:** IBM Plex Mono (Fallback: ui-monospace, SFMono-Regular, Menlo)

**Character:** Manrope gibt Überschriften eine leicht geometrische, ruhige
Autorität; Inter trägt dichten, gut lesbaren Fließtext bei 14 px; IBM Plex Mono
ist ausschließlich für Zahlen und Versionskennungen reserviert und macht jeden
Messwert als solchen erkennbar.

### Hierarchie
- **Display** (Manrope 600, `clamp(30px, 5vw, 44px)`, lh 1.06, ls -0.021em):
  Nur die eine Seitenüberschrift im Hero (`.hub-head h1`). `text-wrap: balance`.
- **Headline** (Manrope 600, 34 px, lh 1, ls -0.02em): die große
  Prozentzahl im Dashboard (`.dash-overall .pct`) und `.dash-overall`-Peers.
- **Title** (Manrope 600, 15.5 px, lh 1.35, ls -0.006em): Kachel- und
  Panel-Titel (`.hub-card h2`, `.card-title` nutzt hier Inter 14.5 px).
- **Body** (Inter 400, 14 px, lh 1.6): Fließtext. Beschreibungen laufen auf
  ~52 ch (`max-width: 52ch`).
- **Label / Eyebrow** (Inter 600, 11 px, ls 0.04–0.05em, `text-transform:
  uppercase`): Sektions-Eyebrows, Panel-Labels, Listen-Köpfe.
- **Mono** (IBM Plex Mono 500, 11–13 px, `font-variant-numeric: tabular-nums`):
  Prozentwerte, Item-Zähler, Countdown-Ziffern, Versionsnummer im Footer.

### Named Rules
**Die Zähl-in-Mono-Regel.** Jeder Wert, der sich ändert, wenn der Nutzer
etwas abhakt — Prozent, „7 / 12", Countdown-Tage —, steht in IBM Plex Mono mit
`tabular-nums`. Fließtext und Labels tun das nie.

**Die Eine-Überschrift-Regel.** Display-Größe erscheint genau einmal pro Seite,
im Hero. Panels und Karten beginnen bei Title.

## Layout

Zentrierte Einzelspalte: `.page` mit `max-width: 1060px`, Innenabstand
`34px 24px 96px` (Desktop), `22px 16px 72px` ab ≤640 px.

Der Hub nutzt ein 12-Spalten-Bento (`.bento`, `gap: 12px`): auf Mobile
spannt jede Kachel volle Breite, ab ≥760 px greifen `.b-4/.b-5/.b-6/.b-7/.b-8`.
Themenseiten legen Kategorien in ein `auto-fit`-Raster
(`minmax(300px, 1fr)`, `gap: 22px`); Karten innerhalb einer Kategorie stapeln
mit 12 px Abstand.

Spacing-Rhythmus in Stufen von **6 / 12 / 18 / 22 / 34 px**. Panels und Karten
haben durchgängig 22 px Innenabstand. Sektions-Eyebrows sitzen mit ~30 px
Vorlauf und 12 px Nachlauf über ihrem Block.

**Breakpoints:** 620 px (Listen einspaltig, Kachel-Umbruch), 640 px
(Seiten-Padding), 760 px (Bento greift), 820 px (Bottom-Nav erscheint).

**Mobile-Bottom-Tab-Bar** (≤820 px): `position: fixed`, fünf gleich breite
`.bottomnav-link` (Übersicht · GA1 · GA2 · WiSo · Suche), Icon 20 px über
10.5-px-Label, `min-height: 54px`, `env(safe-area-inset-bottom)` respektiert,
Haarlinie oben, kein Schatten. `.page` bekommt dann `padding-bottom: 92px`.

## Elevation & Depth

Das System ist **vollständig flach**. `--shadow` und `--shadow-sm` sind global
auf `none` gesetzt, ebenso alle Glass-Aliasse (`--glass-blur: 0px`,
`--glass-saturate: 1`). Tiefe entsteht ausschließlich durch:

1. **Haarlinien** — 1 px Rahmen in `--border` / `--border-strong`.
2. **Tonale Schichtung** — `--page` < `--surface-1` < `--surface-2` <
   `--surface-3`; ein „gesenktes" Element (Track, Chip, Input) nimmt eine
   dunklere Fläche, ein „erhabenes" (Panel, Modal) das helle `--surface-1`.
3. **Zustands-Kontur** — Fokus ist `outline: 2px solid var(--brand-bright)`
   mit `outline-offset: 2px`; `:focus-within` bei Suchfeldern zusätzlich ein
   3-px-`box-shadow` in `--brand-tint` (der einzige toleriert­e box-shadow, als
   Fokusring, nicht als Elevation).

Die einzigen Ausnahmen von „kein Blur": `backdrop-filter: blur(4px)` auf den
Vollbild-Overlays (Changelog, Konto, Suche), um den Seiteninhalt dahinter
zurückzunehmen.

### Named Rules
**Die Flach-per-Default-Regel.** Flächen liegen im Ruhezustand flach. Es gibt
keinen `box-shadow` zur Andeutung von Höhe — Hover verschiebt Rahmenfarbe und
Flächenton, nicht Schatten.

**Die Ein-Kanten-Balken-Regel.** Ein markiertes Element trägt seinen Status als
`inset`-Kante, nicht als Rahmen oder Schatten: `box-shadow: inset 2px 0 0
var(--marker)` an einer Wiederholungs-Karte.

## Shapes

Zurückhaltende, konsistente Rundung in vier Stufen: **3 px** (`--r-xs`,
Icon-Buttons, Close-Buttons), **5 px** (`--r-sm`, Buttons, Chips, Tabs,
Inputs — der Standard), **7 px** (`--r-md`, Themen-Karten, Icon-Kacheln),
**10 px** (`--r-lg`, Panels, Modals, Hub-Kacheln). Pillen (`999px`) nur für
Status-Badges, Streak-Pillen und Fortschritts-Tracks.

Punkte und Swatches, die einen Bereich markieren, sind **quadratisch mit
2 px Radius** (6–9 px Kantenlänge), nicht kreisrund — sie lesen sich als
Marker, nicht als Aufzählungspunkt.

Rahmen sind immer 1 px. Deaktivierte/„im Aufbau"-Container tragen einen
**gestrichelten** Rahmen (`1px dashed var(--border-strong)`) statt eines
durchgezogenen — die einzige Stelle, an der die Linienart wechselt.

## Components

### Buttons
- **Shape:** 5 px Radius (`--r-sm`); Icon-/Close-Buttons 3 px.
- **Standard (`.btn`):** transparenter Grund, 1-px-Haarlinie,
  `--text-secondary`, Padding `6px 11px`, 12.5 px. Hover: `--text-primary`,
  `--border-strong`, Grund `--surface-2`.
- **Primär (`.btn-primary`):** Fläche `--brand-fill`, Text `#fff`,
  Rahmen `color-mix(brand-bright 45%, transparent)`. Hover: `--brand-fill-hi`.
  Höchstens einer pro Ansicht.
- **Ghost (`.btn-ghost`):** wie Standard, etwas kompakter (`7px 11px`, 12 px),
  für Werkzeugleisten-Aktionen (Export, Zurücksetzen).
- **Übergang:** nur `color`, `border-color`, `background-color` @ .15s ease.
  Keine Transform-Bewegung an Buttons.

### Filter-Tabs (`.tab`)
- Randlos im Ruhezustand, `--text-secondary`, 7 px Punkt in `--text-muted`
  voran, Mono-`tab-count` mit Opazität 0.7.
- Aktiv: `background: color-mix(currentColor 12%, transparent)`, Rahmen
  `color-mix(currentColor 34%, transparent)` — die Tab-Farbe *ist* die
  Bereichsfarbe (`currentColor`), so färbt sich ein aktiver GA2-Filter kobalt,
  ein aktiver Marker-Filter violett.

### Chips (`.chip`, Dashboard-Listen)
- Grund `--surface-2`, transparenter Rahmen, 12 px, Radius 5 px, Padding
  `8px 10px`. 6-px-Quadratpunkt in Bereichsfarbe, Titel mit Ellipse,
  Mono-`chip-meta` rechts.
- Hover: Rahmen `--border-strong`, Grund `--surface-3`.

### Badges (`.badge`)
- Pille, `3px 8px`, 11 px. Getönte Fläche + passender Text über `color-mix(…
  18%, transparent)`: `.now` grün, `.overdue` rot, `.marked` violett.

### Panel / Karte (`.panel`, `.hub-card`)
- **Ecken:** 10 px. **Grund:** `--surface-1`. **Rahmen:** 1 px `--border`.
  **Schatten:** keiner. **Innenabstand:** 22 px.
- `.hub-card` ist ein `<a>`: Hover hebt Rahmen auf `color-mix(--card-color
  48%, --border-strong)` und Grund auf `--surface-2`, der Fuß-Pfeil rückt
  3 px nach rechts. Fokus: 2 px `--brand-bright`-Outline.
- **Panel-Label:** 11-px-Uppercase-Eyebrow in `--text-muted`, 16 px Abstand
  nach unten.

### Themen-Karte (`details.card`) — Signature
Aufklappbarer Lernblock (Themengruppe). Grund `--surface-1`, Rahmen
`--border`, Radius 7 px, `overflow: hidden`. `summary` ohne Default-Marker.
- **Kopf:** `.card-title` (14.5 px, 600, `text-wrap: balance`), `.card-meta`
  mit Status-Badges, `.card-progress` mit 4-px-Track.
- **Markiert:** `box-shadow: inset 2px 0 0 var(--marker)`.
- **Body:** `padding: 0 15px 15px`, oben durch `--grid`-Haarlinie getrennt;
  Öffnen animiert mit `cardOpen .2s ease`.
- **Deep-Link-Flash:** kurz `flashCard 1.5s`, bei `prefers-reduced-motion`
  stattdessen statischer 2-px-Ring in Bereichsfarbe.

### Kernthema-Checkbox (`ul.items input[type=checkbox]`) — Signature
Die kleinste Einheit. Custom-Checkbox ~15 px, Radius `--r-xs`, 1-px-Rahmen.
Hover: Rahmen in Bereichsfarbe (`--cat-color`). Checked: Fläche +
Rahmen `--cat-color`, weißes Häkchen via `::after`. Frisch abgehakt:
`cbPop .3s cubic-bezier(.34,1.56,.64,1)` + `cbDraw` für den Haken. Erledigtes
Label: `--text-muted`, `line-through` in `--baseline`.

### Inputs (`.account-input`, `.search-box`)
- Grund `--surface-2`, 1-px-`--border-strong`, Radius 5 px, Padding `9px 11px`,
  13 px.
- Fokus: Rahmen wechselt auf `--brand-bright`, `outline: none`; Such-Container
  zusätzlich `box-shadow: 0 0 0 3px var(--brand-tint)` als Ring.

### Navigation
- **Desktop:** keine persistente Leiste — Navigation läuft über die Hub-Kacheln
  und Deep-Links; Kopfzeile je Seite trägt nur Titel + Werkzeug-Buttons
  (Theme-Toggle, Konto, Suche).
- **Mobile (≤820 px):** fixierte `.bottomnav`, fünf `.bottomnav-link`
  (Icon + Label, `--text-muted`), aktiver Link in `--brand`, `:active`-Grund
  `--surface-2`. Haarlinie oben, kein Schatten.
- **Egg-Tabs** (Minispiele): Unterstreichungs-Tabs, `border-bottom: 2px`
  in `--accent` beim aktiven, leichte Tönung.

### Fortschritts-Track (`.track`) — Signature
6 px hoch (4 px in Karten, `.track.sm`), `--surface-2`-Rinne, Pillenradius.
Füllung `--brand-bright`, `transition: width .55s cubic-bezier(.4,0,.2,1)`.
Bei 100 %: einmaliges `barCelebrate 1.1s ease` + `done-check`, das mit
`cubic-bezier(.34,1.56,.64,1)` einskaliert. Von `prefers-reduced-motion`
abgeschaltet.

### Aktivitäts-Heatmap — Signature
GitHub-artiges Wochenraster im Dashboard. 12-px-Zellen (`.heatday`),
2 px Radius, 5 Stufen von `--surface-2` über `color-mix(--brand-bright 26 %
→ 50 % → 74 %)` bis `--brand-bright` voll. Zukünftige Tage transparent.
Legende rechtsbündig, 10.5 px.

## Do's and Don'ts

### Do:
- **Do** jede Trennung mit einer 1-px-Haarlinie in `--border` /
  `--border-strong` lösen — nie mit einem Schatten.
- **Do** wechselnde Messwerte in IBM Plex Mono mit `font-variant-numeric:
  tabular-nums` setzen.
- **Do** Signal-Grün (`#3ecf8e`) für Fläche/Progress reservieren und
  Anzeige-Grün (`#16794c`) für Text/Links — nicht tauschen.
- **Do** jede neue Farbe dreifach definieren: `:root`,
  `@media (prefers-color-scheme: dark)` und `:root[data-theme="dark"]`.
- **Do** Bereichszugehörigkeit über kleine quadratische Punkte (2 px Radius)
  und `currentColor`-getönte Tabs zeigen.
- **Do** Radien in den vier Stufen 3 / 5 / 7 / 10 px halten; Pillen nur für
  Badges, Streak-Pillen und Tracks.
- **Do** Hover als Rahmen- und Flächenton-Wechsel gestalten; Transform-Bewegung
  nur für taktiles Mikro-Feedback (Häkchen-Pop, Pfeil-Nudge um 3 px).
- **Do** Bewegung an die bestehenden `@media (prefers-reduced-motion)`-Blöcke
  hängen und zu einem statischen Endzustand degradieren.

### Don't:
- **Don't** `box-shadow` für Elevation verwenden. Erlaubt sind nur der
  `inset`-Statusstreifen und der `--brand-tint`-Fokusring.
- **Don't** einen Gamification-Look bauen: keine bunten XP-Badges, kein
  Konfetti, keine Maskottchen, keine Pokal-Ikonografie. Die 100-%-Feier ist
  ein einmaliger Balken-Lauf, mehr nicht.
- **Don't** die Bereichsakzente aufsättigen, in der Helligkeit spreizen oder
  als Vollfläche einsetzen — kein Regenbogen.
- **Don't** Signal-Grün als Textfarbe auf hellem Grund verwenden (Kontrast).
- **Don't** mehr als einen `.btn-primary` pro Ansicht zeigen.
- **Don't** reines `#000` oder `#fff` auf `--page` setzen; die Neutraltöne
  haben einen Wärmestich.
- **Don't** eine persistente Desktop-Navigationsleiste einführen; Navigation
  läuft über Kacheln, Deep-Links und die Mobile-Bottom-Nav.
- **Don't** Google Fonts durch andere Familien ersetzen — Manrope / Inter /
  IBM Plex Mono sind gesetzt.
