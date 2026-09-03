# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier festgehalten.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
Versionierung nach [SemVer](https://semver.org/lang/de/). Die Version ist auch
direkt auf der Seite sichtbar — ein Klick auf die Versionsnummer im Hub (in
der Fußzeile) zeigt dieselbe Liste als Änderungsprotokoll. Gepflegt wird das
Changelog ausschließlich im Hub, nicht mehr in den einzelnen Bereichen.

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
