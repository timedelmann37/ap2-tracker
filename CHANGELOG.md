# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier festgehalten.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
Versionierung nach [SemVer](https://semver.org/lang/de/). Die Version ist auch
direkt auf der Seite sichtbar — ein Klick auf die Versionsnummer im Hub (in
der Fußzeile) zeigt dieselbe Liste als Änderungsprotokoll. Gepflegt wird das
Changelog ausschließlich im Hub, nicht mehr in den einzelnen Bereichen.

## [3.7.0] – 2026-09-04

Design-Qualitätsrunde auf Basis von v3.6.0 — keine IA-Änderung, die flache
Bildsprache bleibt. Leitgedanke: **jede Bereichsseite ein Kontrollpult, jeder
Bereich eine eigene Farbe, Barrierefreiheit auf WCAG AA.** `/simulation/`
unberührt.

### Geändert

- **GA1 bekommt einen eigenen Bereichsakzent (Teal).** Vorher war er farbgleich
  mit dem Fortschrittsgrün — auf der GA1-Seite waren Bereichspunkt, aktiver Tab,
  Mini-Track und Fortschrittsfüllung dieselbe Farbe, „das ist GA1" nicht von
  „das ist Fortschritt" zu unterscheiden. Die vier Bereichsakzente sind jetzt
  klar getrennt: Teal (GA1) · Kobalt (GA2) · Ocker (WiSo) · Plan-Violett.
- **Jede Bereichsseite trägt ihre Farbe.** Der Fortschrittsbalken füllt sich in
  der Bereichsfarbe (`--cat-color`) statt immer grün. Signal-Grün bleibt dem
  Gesamt-Aggregat (Hub, Übersicht) und dem Primär-Button vorbehalten.
- **Der Bereichsseiten-Kopf führt jetzt wie der Hub-Hero.** Große Prozent-Anzeige
  in der Bereichsfarbe (`clamp(40px, 8vw, 56px)`), die laufende Plan-Woche
  daneben in Monospace (`Woche 3 · KW 37`, aus `activeTopic()`), der Zähler
  darunter. Kartenlos, nur eine Haarlinie unten; Titel auf Hero-Größe. Der
  redundante Kategorie-Kopf (Swatch + Mini-Track + Prozent) entfällt auf
  Einzel-Bereichsseiten — die Anzeige zeigt das schon.
- **Der Rückstand-Zustand: roter Alarm → ruhiges Ocker.** Die Hub-Zeile heißt
  „N Themengruppen im Rückstand"; der Countdown sagt „Rückstand aufholen" statt
  „Noch reichlich Zeit", solange der Plan hinterherhängt. Das dauerhafte rote
  Status-Badge pro Themengruppe ist auf Ocker heruntergestuft.
- **Einheitliche Benennung.** „Rückstand" überall (vorher teils „Überfällig" /
  „offen" — beides steht auf der Avoid-Liste in `CONTEXT.md`), „WiSo" statt
  „SoWi", das Navigations-Dropdown heißt „Bereiche" (vorher „Themenblöcke").
  Der Speicherungs-Hinweis am Fuß der Bereichsseiten ist von ~120 auf ~40 Wörter
  gekürzt — die Datei-Handling-Anweisungen und der Notion-Verweis waren für eine
  gehostete Seite sinnlos.
- **Handy: Kontroll-Zone der Bereichsseiten in zwei Gruppen** (Filter-Tabs
  50/50, Werkzeug-Buttons 2-spaltig) statt einer umbrechenden Button-Wand;
  „Fortschritt zurücksetzen" isoliert auf eigener Zeile.

### Behoben

- **Text-Kontrast (WCAG 1.4.3).** Gedämpfte Meta- und Platzhalter-Texte
  (`--text-muted`) erfüllen jetzt in Light **und** Dark WCAG AA — vorher ~3,5:1.
- **Funktionale Kleinschrift** (Badges, Zähler, Filter-Tab-Count, „bald"-Marker,
  Backlog-Meta) auf mindestens 11 px angehoben; DESIGN.md spezifiziert 11–13 px.
- **`<main>`-Landmark** auf Übersicht und den drei Bereichsseiten (Hub hatte es
  schon), **`aria-label` an der Hauptnavigation** auf allen fünf Seiten,
  echte `<h2>` statt `<div>` für die Panel-Köpfe der Übersicht.
- **Touch-Flächen ≤ 820 px** (Filter-Tabs, Werkzeug-Buttons, Kopf-Icons) auf
  ≥ 40–44 px (WCAG 2.5.8).
- **Vollbild-Overlays** (Konto, Änderungsprotokoll, Minispiele) auf allen Seiten
  flach wie im Hub — kein `box-shadow`, einheitlicher `blur(4px)`-Backdrop
  (vorher drift zwischen Hub und Unterseiten).
- **Countdown** zählt nur noch beim ersten Laden hoch, nicht mehr im
  Minutentakt; die Zählanimation respektiert `prefers-reduced-motion`.

## [3.6.0] – 2026-09-03

UI-Hierarchie-Kur auf Basis von v3.5.0/3.5.1 — kein zweites Redesign, die
flache Bildsprache bleibt. Leitgedanke: **eine Seite, eine Aufgabe.**
`/simulation/` unberührt.

### Geändert
- **Der Hub führt mit „Diese Woche".** Bis zu drei aktuell geplante
  Themengruppen (eine je Bereich), jede mit Fortschrittsbalken und einem
  `weitermachen`-Link, der den Block öffnet, aufklappt und zum ersten noch
  offenen Kernthema scrollt. Der Bereich, der heute laut Wochenrhythmus
  dran ist, ist hervorgehoben. Darunter eine kompakte, aufklappbare Rückstand-Zeile,
  der Prüfungs-Countdown als ruhige Zeile und `Gesamt: X %` mit Link zur
  Übersicht. Siehe [ADR 0001](docs/adr/0001-hub-fuehrt-mit-diese-woche.md).
- **Die Kachel-Wand auf dem Hub ist raus** (Planung / Themenbereiche /
  Prüfung & Werkzeuge). Jeder Bereich bleibt über die Navigation erreichbar.
- **Das Dashboard wandert auf die Übersicht.** Fortschrittsbild
  (Gesamtfortschritt + ein Balken je Bereich), Aktivitäts-Heatmap,
  Lern-Streaks und „zuletzt bearbeitet" liegen jetzt dort.
- **Die Übersicht wird die „Zoom-out"-Seite.** Der 31-Zeilen-Gesamtplan ist
  durch eine vertikale Timeline nach Kalenderwoche ersetzt — je Themengruppe
  ein Mini-Fortschritt, vergangene Wochen eingeklappt, die aktuelle Woche
  wird beim Laden angesprungen, Themengruppen im Rückstand sind markiert,
  ein Klick öffnet den passenden Bereich am richtigen Block.
- **Der Wochenrhythmus** ist von der fest verdrahteten Tabelle zu einer
  ein-/ausklappbaren Referenzkarte am Seitenende geworden.
- **Themenseiten oben entschlackt:** die vier Stat-Tiles sind zu einer
  Fortschrittszeile zusammengezogen (`X / Y Kernthemen · N markiert · M in
  Rückstand`), die „Was ist dran?"-Tabelle ist auf einen schmalen Hinweis
  reduziert. Beim Laden ist die aktuell geplante Themengruppe aufgeklappt,
  alle anderen zu. Live-Suche, „Markiert"-Filter, „alle auf/zu", die
  Minispiele und Export/Import bleiben unverändert.

### Hinzugefügt
- **Bereichsübergreifende Suche** über die Titel aller Themengruppen und
  alle Kernthemen der drei Bereiche. Am Desktop ein immer sichtbares
  Suchfeld in der Navigation (der `Nachschlagewerk – bald`-Platzhalter
  bleibt daneben), auf dem Handy über den `Suche`-Eintrag der Bottom-Tab-Bar.
  Treffer nennen Bereich und Themengruppe, heben die Fundstelle hervor und
  springen per Deep-Link in den Block; das vollständige Nachschlagewerk
  bleibt ein späterer, separater Build.
- **Mobile Bottom-Tab-Bar** (ab ≤ 820 px) auf allen Seiten inklusive Hub:
  Übersicht · GA1 · GA2 · WiSo · Suche. Flach (Haarlinie oben, kein
  Schatten), aktive Seite markiert, verdeckt keine Inhalte; der Hub ist
  über das Logo erreichbar.
- **Interaktions-Feinschliff:** animiertes Abhaken (kurzer Haken-Draw plus
  leichter Scale-Bounce), füllende statt springende Fortschrittsbalken auf
  Hub, Übersicht und Themenseiten, eine dezente Feier bei 100 % einer
  Themengruppe (grüner Balken-Puls + Haken, kein Konfetti) und weiche
  Seitenübergänge (View Transitions, wo unterstützt). Alles wird bei
  `prefers-reduced-motion: reduce` vollständig abgeschaltet. Keine
  Tastatur-Navigation durch die Kernthemen.

### Unverändert
- Datenmodell und Speicher: `localStorage`-Schlüssel `ap2-tracker-state-v1`,
  `state.__activity`, die `mark__`-Präfixe und die Abhak-Zeitstempel bleiben
  gleich; Cloud-Sync (Supabase) läuft unverändert weiter. Export/Import als
  JSON funktioniert wie bisher. Keine URL-Änderungen (Minor-Bump).

## [3.5.1] – 2026-09-03

### Geändert
- Hub neu gruppiert und Kachel-Höhen angeglichen:
  - `Gesamtfortschritt` (nur noch Balken + Bereichsbalken) und `Aktivität`
    stehen jetzt gleich hoch nebeneinander; die vorher darin eingebetteten
    Listen `Überfällig` und `Zuletzt bearbeitet` bilden eine eigene Zeile
    darunter.
  - Die Modul-Kacheln sind in drei benannte Gruppen sortiert: **Planung**
    (Übersicht als breite Zeile), **Themenbereiche** (die drei
    Prüfungsbereiche nebeneinander) und **Prüfung & Werkzeuge**
    (Simulation, Nachschlagewerk).
- Aktivitäts-Heatmap zeigt immer mindestens die letzten elf Wochen, damit
  sie von Anfang an Kontext hat und nicht als Ein-Wochen-Fragment erscheint.
  Die Aktivitäts-Kachel wird nicht mehr auf die Höhe der Fortschritts-Spalte
  gestreckt.

## [3.5.0] – 2026-09-03

### Geändert
- Komplettes UI-Redesign, stark an [supabase.com](https://supabase.com)
  angelehnt und auf alle Seiten angewendet (Hub, Übersicht, die drei
  Themenbereiche; `/simulation/` unberührt):
  - **Farbschema:** warmes Charcoal mit leichtem Grünstich statt reinem
    Schwarz/Blau; ein einziger Grün-Akzent (`#3ecf8e` / auf Hell `#16794c`)
    statt bunter Syntaxfarben; Bereichsfarben auf gleiche Helligkeit gezogen.
  - **Tiefe:** alle `box-shadow`, Glas-Blur und Hover-Glows raus — nur noch
    1px-Haarlinien; Hover wechselt Rahmen-/Flächenfarbe, ohne Verschieben.
  - **Typografie:** Manrope (Überschriften) + Inter (Text) statt IBM Plex
    Sans; Mono bleibt IBM Plex Mono. Zweizeilige Seitenüberschriften.
  - **Navigation:** randlos mit Haarlinie unten statt schwebendem Kasten,
    kleines Grün-Logo, aktive Punkte grün getönt; auf schmalen Bildschirmen
    eingeklappt (Navigation dort über den Hub).
  - **Hub-Layout:** eine durchgehende Bento-Grid (Fortschritt 7 / Aktivität
    5, Bereichskacheln 8+4 und 4+4+4) statt gestapelter gleichförmiger
    Kartenreihen. Karten-Icons einfarbig, nehmen die Bereichsfarbe erst
    beim Überfahren an.
  - Der Pseudo-Pfad `~/abschlusspruefung/…` ist auf allen Seiten weg.
  - Fortschrittsbalken einfarbig grün statt Farbverlauf.
- Theme-Logik umgedreht: Standard folgt dem Betriebssystem (hell/dunkel),
  die drei Modi (System/Hell/Dunkel) über den Umschalter bleiben.

## [3.4.2] – 2026-09-03

### Geändert
- Countdown-Feinschliff: Der Pseudo-Pfad `~/abschlusspruefung/…` über der
  Hub-Überschrift wurde entfernt. Die Tage-Zahl sitzt jetzt in einem dezenten
  Kasten mit feiner Rahmen- und Flächentönung in der jeweiligen
  Dringlichkeitsfarbe. Die auffällige Puls-Glow-Animation wurde durch einen
  ruhigen, blinkenden Terminal-Cursor neben der Zahl ersetzt, der mit
  steigender Dringlichkeit schneller blinkt und am Prüfungstag bzw. im
  „Geschafft"-Zustand stillsteht. `prefers-reduced-motion` wird respektiert.

## [3.4.1] – 2026-09-03

### Geändert
- Prüfungs-Countdown vom eigenen großen Panel zu einer kompakten Zahl
  direkt neben der Hub-Überschrift verschoben. Farbe/Dringlichkeit und ein
  sanfter Puls-Glow um die Zahl bleiben erhalten, Prüfungsdatum und
  Status-Text jetzt als Tooltip beim Hover statt als eigener Textblock.

## [3.4.0] – 2026-09-03

### Hinzugefügt
- Animierter Countdown bis zur Prüfung (24.–25.11.2026) im Hub: Anzeige und
  Farbe ändern sich automatisch je nach Dringlichkeit — ruhig (Akzentfarbe)
  über 30 Tage vorher, aufmerksam (Gelb) ab 30 Tagen, Endspurt (Rot,
  auffälligere Pulsanimation) ab 7 Tagen, ein Sonderzustand am Prüfungstag
  selbst und ein „Geschafft"-Zustand danach.
- Aktivitäts-Heatmap im Hub im Stil von GitHubs Beitragsverlauf: zeigt, an
  welchen Tagen wie viele Punkte abgehakt wurden (Zeitraum vom ersten
  abgehakten Punkt bis heute). Dazu aktuelle und längste Lernstreak (Tage in
  Folge mit mindestens einem Häkchen). Der Verlauf läuft automatisch mit
  Cloud-Sync mit und bleibt von „Fortschritt zurücksetzen" in einem Bereich
  unberührt — er ist ein reines Aktivitätsprotokoll, keine Checkbox-Daten.

## [3.3.0] – 2026-09-03

### Hinzugefügt
- Cloud-Sync (optional): Fortschritt kann jetzt zusätzlich zur lokalen
  Speicherung mit einem Konto verknüpft und geräteübergreifend
  synchronisiert werden. Anmeldung passwortlos per Magic Link (E-Mail).
  „Anmelden"-Button in der Navigationsleiste auf allen Bereichsseiten. Beim
  ersten Login mit vorhandenem Fortschritt auf mehreren Geräten fragt ein
  Dialog, ob der Cloud-Stand übernommen oder mit dem lokalen Stand
  zusammengeführt werden soll. Läuft technisch über
  [Supabase](https://supabase.com); ohne eingerichtetes Projekt bleibt die
  Seite unverändert nutzbar (lokale Speicherung wie bisher). Einrichtung
  siehe `CLOUD_SYNC.md`.

## [3.2.0] – 2026-09-03

### Geändert
- Leichter „Liquid Glass"-Feinschliff auf Nav-Leiste, Hub-Dashboard, Hub-Kacheln,
  Changelog- und Minispiele-Modal: stärkerer Blur/Sättigung, eine feine
  Lichtkante oben am Panel und beim Hover einer Hub-Kachel ein sanfter Glow in
  der jeweiligen Akzentfarbe. Bewusst NICHT auf die einzelnen Themen-Karten
  angewendet (Performance bei vielen Elementen, Lesbarkeit von Prüfungsinhalten
  hat Vorrang).

## [3.1.3] – 2026-09-03

### Geändert
- Alle farbigen Emoji-Icons (Hub-Kacheln, Darstellung-umschalten, Lern-Minispiele)
  durch ein einheitliches, selbst gezeichnetes Outline-Icon-Set ersetzt (Kalender,
  Server, Netzwerk-Knoten, Aktenkoffer, Stoppuhr, Buch, Sonne/Mond/Kontrast,
  Gamepad, Paket, Stecker, Rechner, Glühbirne) — als Inline-SVG, ohne externe
  Abhängigkeit, in `currentColor` eingefärbt. Reine Symbole wie Pfeile (→ ↔),
  Haken (✓) und Warnzeichen (⚠) bleiben unverändert.

## [3.1.2] – 2026-09-03

### Behoben
- `/simulation/`: Ein Syntaxfehler im Haupt-Script (escapte Template-Literals,
  `\`` statt `` ` `` und `\${` statt `${`) verhinderte, dass die
  Prüfungssimulation überhaupt lief — kein Klick auf eine Prüfungskarte hatte
  eine Wirkung. Gilt ebenso für `exam_2023_1_GA2.js`. Einmalige Ausnahme von
  der Regel, dass `/simulation/` nicht angefasst wird — Design und Inhalte
  blieben unverändert, nur die kaputte Escape-Syntax wurde repariert.

## [3.1.1] – 2026-09-03

### Behoben
- Root (`/`) zeigte durch einen fehlerhaften manuellen Datei-Upload
  versehentlich die Prüfungssimulation statt des Hubs an. `/` liefert wieder
  den Hub aus, die Prüfungssimulation liegt korrekt unter `/simulation/`
  (inklusive ihrer `exam_2023_1_GA2.js` und `status.md`, die dabei ebenfalls
  fälschlich im Root gelandet waren).
- Veraltete `/tracker/`-Reste aus der Zeit vor der Aufteilung in Übersicht,
  Konzeption & Administration, Netzwerke und SoWi entfernt.

## [3.1.0] – 2026-09-03

### Hinzugefügt
- Persistente Navigationsleiste oben auf allen Seiten (Hub, Übersicht, den
  drei Themenblöcken und der Prüfungssimulation): Übersicht, ein
  „Themenblöcke"-Dropdown mit den drei Bereichen, Simulation, sowie ein
  deaktivierter Platzhalter „Nachschlagewerk" für ein geplantes
  Nachschlagewerk zu einzelnen Themen. Der aktuelle Bereich ist markiert.
- Darstellung umschalten (🌓) sitzt jetzt in der Navigationsleiste statt als
  schwebender Button.

### Geändert
- Hauptmenü im Hub neu nach vier didaktischen Kategorien geordnet: Planung
  (Übersicht), Themenblöcke (die drei Bereiche), Prüfung (Simulation),
  Nachschlagewerk (geplant) — statt einer flachen Liste gleichrangiger
  Kacheln.

## [3.0.0] – 2026-09-03

### Geändert
- Großer Umbau für mehr Übersichtlichkeit: `/tracker/` (ein einzelner,
  langer Themenplan für alle drei Bereiche) wurde aufgeteilt in vier
  eigenständige Seiten — `/uebersicht/`, `/konzeption-administration/`,
  `/netzwerke/`, `/sowi/`. Alte `/tracker/`-Links leiten per Redirect auf
  den Hub weiter. **Breaking Change** für Lesezeichen auf `/tracker/`,
  deshalb Major-Version.
- Der Hub (`/`) ist jetzt ein echtes Dashboard: Gesamtfortschritt, ein
  Fortschrittsbalken je Themenbereich, überfällige Themen und zuletzt
  bearbeitete Themen — alles live aus demselben gespeicherten Fortschritt
  wie die Themenbereichs-Seiten, mit Link direkt zum passenden Block.
- „Fortschritt zurücksetzen" auf einer Bereichs-Seite löscht nur noch die
  Haken/Markierungen dieses einen Bereichs, nicht mehr den gesamten
  gespeicherten Stand.

### Hinzugefügt
- `/uebersicht/`: bereichsübergreifender Wochenplan (unverändert übernommen)
  plus neuer chronologischer Gesamtplan aller 31 Themenblöcke bis zur
  Prüfung, mit Sprung zum jeweiligen Bereich und Block.
- Deep-Links zwischen den Seiten: ein Klick auf ein Thema in Übersicht, Hub
  oder Gesamtplan öffnet die passende Bereichs-Seite direkt beim richtigen
  Themenblock.
- Der gespeicherte Fortschritt merkt sich jetzt auch, wann ein Punkt zuletzt
  abgehakt wurde — Grundlage für „Zuletzt bearbeitet" im Hub-Dashboard.

## [2.0.1] – 2026-09-03

### Entfernt
- Animierter Farbverlauf im Hintergrund (WebGL, Domain-Warped-Noise) wieder
  entfernt — Hub und Tracker sind vorerst einheitlich tiefschwarz.

## [2.0.0] – 2026-09-03

### Geändert
- Projekt in Hub und Module aufgeteilt: `/` zeigt jetzt eine Startseite mit
  Verweisen auf `/tracker/` und `/simulation/`, statt direkt den Tracker
  auszuliefern. Bestehende Lesezeichen auf die Root-URL landen ab jetzt im
  Hub, nicht mehr direkt im Tracker.

### Hinzugefügt
- `/simulation/`-Modul (Platzhalter) für die geplante Prüfungssimulation.
- `CONTRIBUTING.md` mit Regeln für die Zusammenarbeit zu zweit: Ordnerhoheit,
  Pfadkonventionen, `localStorage`-Namensraum, Git-Workflow über
  Feature-Branches.
- `netlify.toml` liefert alle drei Bereiche als eigenständige Seiten aus statt
  über einen Catch-all-Rewrite.

## [1.2.0] – 2026-09-03

### Geändert
- Komplettes visuelles Redesign: dunkles, an JetBrains Rider angelehntes
  Farbschema (IntelliJ-New-UI-Grautöne, Syntaxfarben als Akzente), IBM Plex
  Sans/Mono statt Systemschrift, tiefschwarzer Grund.

## [1.1.0] – 2026-09-03

### Hinzugefügt
- Fortschritt als JSON-Datei exportieren und wieder importieren — Absicherung
  gegen Datenverlust bei Browserwechsel, geleertem Cache oder neuem Gerät.

## [1.0.0] – 2026-09-03

### Hinzugefügt
- Erste Version des AP2-Trackers: Themenplan für GA1, GA2 und WiSo mit
  Fortschrittsanzeige, Live-Suche über Themen und Einzelinhalte, vier
  Lern-Minispiele (Paket-Fang, Port-Sprint, Subnetting-Blitz,
  Fachbegriff-Rush).
- Git-Repository und Netlify-Deployment eingerichtet.
