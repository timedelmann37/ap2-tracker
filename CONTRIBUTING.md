# Mitarbeit: Prüfungssimulation

Willkommen im Repo. Dieses Dokument ist für dich als Entwickler:in der
**Prüfungssimulation** — es beschreibt, was das Projekt technisch von dir
braucht, damit wir parallel arbeiten können, ohne uns gegenseitig
Merge-Konflikte zu bescheren.

## Kurzfassung

- Du arbeitest ausschließlich in `/simulation/`. Alles darin gehört dir —
  Struktur, Styling, Technik, alles frei.
- `/tracker/`, die root `index.html`, `netlify.toml`, `README.md` und dieses
  Dokument fasst du nicht an, außer wir sprechen es ab.
- Einstiegspunkt ist `/simulation/index.html` — dort landet, wer auf der
  Startseite auf "Prüfungssimulation" klickt.
- Reiner statischer Code, kein Build-Step. Was du in `/simulation/`
  eincheckst, ist exakt das, was live auf Netlify liegt.

## Warum diese Struktur

Das Repo ist in drei unabhängige Bereiche aufgeteilt:

```
/                    Hub — verlinkt auf beide Tools
/tracker/            AP2 Tracker (bestehend, nicht dein Bereich)
/simulation/         Prüfungssimulation — dein Bereich
```

Netlify liefert jeden Ordner mit eigener `index.html` automatisch unter dem
passenden Pfad aus (`meineseite.netlify.app/simulation/`), ganz ohne
Server-Konfiguration. Solange du innerhalb von `/simulation/` bleibst,
kannst du committen und pushen, ohne dass es mit meiner Arbeit am Tracker
kollidiert — wir fassen im Normalfall nie dieselbe Datei an.

## Technische Leitplanken

**Rein statisch, kein Build-Schritt.** Netlify deployed die Dateien 1:1 so,
wie sie im Repo liegen — kein `npm run build`, kein Bundler, der vorher noch
etwas erzeugen müsste. Wenn du mit einem Framework arbeiten willst, das
selbst einen Build braucht (Vite, Webpack, …), checke bitte nur das fertig
gebaute Ergebnis ein, nicht den Build-Prozess selbst — sonst müssten wir die
Netlify-Konfiguration gemeinsam anfassen, und genau das wollen wir vermeiden.
Am einfachsten bleibt reines HTML/CSS/JS, so wie der Tracker es macht.

**Pfade root-relativ, nicht mit `../` verkettet.** Die Seite läuft direkt auf
der Domain-Wurzel (kein GitHub-Pages-Unterordner), deshalb sind Pfade wie
`/simulation/style.css` oder ein Link zurück zum Hub über `href="/"`
zuverlässiger als `../`-Ketten. Innerhalb von `/simulation/` kannst du
natürlich trotzdem mit normalen relativen Pfaden zu eigenen Unterordnern
arbeiten (`./assets/…`) — nur nach draußen (zurück zum Hub, o. Ä.) bitte
root-relativ.

**`localStorage`-Namensraum: eigenes Präfix verwenden.** Tracker und
Simulation laufen auf derselben Origin, `localStorage` ist nicht
pfadgebunden, sondern wird von beiden geteilt. Der Tracker benutzt aktuell
den Schlüssel `ap2-tracker-state-v1`. Bitte nimm für die Simulation ein
eigenes, eindeutiges Präfix, z. B. `ap2-sim-…`, damit sich nichts
überschreibt.

**Link zurück zum Hub.** Von irgendwo in der Simulation sollte ein Link auf
`/` führen, damit Nutzer:innen zurückfinden. Wie das aussieht, ist dir
überlassen — im Platzhalter (`/simulation/index.html`, den du komplett
ersetzt) siehst du ein Minimalbeispiel.

**Design ist frei.** Es gibt keine Pflicht, den Look des Trackers zu
übernehmen. Falls dir am visuellen Zusammenhang zum Hub liegt: Der Hub und
der Tracker nutzen ein dunkles Farbschema (echtes Schwarz `#000` als Grund,
Blau/Orange/Grün als Akzentfarben aus der JetBrains-Rider-Palette, IBM Plex
Sans/Mono als Schrift) — du findest die kompletten Farb- und
Typografie-Tokens als CSS-Variablen ganz oben im `<style>`-Block von
`/index.html` und `/tracker/index.html`, falls du sie als Ausgangspunkt
kopieren willst. Eine völlig eigene Optik ist genauso in Ordnung.

**Versionsnummer/Changelog sind optional für dich.** Hub und Tracker zeigen
oben rechts bzw. in der Fußzeile eine anklickbare Versionsnummer mit
Änderungsprotokoll (siehe `CHANGELOG.md` im Repo-Root). Das ist aktuell nur
für `/` und `/tracker/` eingerichtet — du musst für `/simulation/` nichts
Vergleichbares bauen, es sei denn du willst es. Falls du später doch
mitziehen willst, sag Bescheid, dann sprechen wir uns über eine gemeinsame
Versionsnummer fürs ganze Projekt ab, statt getrennter Zählungen.

## Git-Workflow

1. Branch von `main` abzweigen, z. B. `feature/simulation-grundgeruest`.
2. In `/simulation/` committen, so oft wie es für dich sinnvoll ist.
3. Push auf den Branch, dann Pull Request gegen `main` öffnen.
4. Netlify baut automatisch eine Deploy-Preview für den PR — den Link
   findest du als Check unten im PR. Darüber testest du live, ob
   `/simulation/` sauber ausgeliefert wird, bevor überhaupt gemergt wird.
5. Kurzer Blick von mir drüber (nur der Vollständigkeit halber, nicht als
   Gatekeeping — bei getrennten Ordnern gibt es normalerweise nichts
   Inhaltliches zu diskutieren), dann Merge.

Bitte nicht direkt auf `main` pushen, auch wenn's nur `/simulation/`
betrifft — der PR-Umweg gibt uns beiden die Deploy-Preview zum Testen und
eine Historie, an der man nachvollziehen kann, wann was warum passiert ist.

## Was du NICHT brauchst

- Du musst niemanden um Schreibrechte für ein fremdes Repo bitten — wir
  arbeiten im selben Repo, du bist als Collaborator eingeladen und hast
  direkt Push-Rechte auf eigene Branches.
- Du musst nichts am `netlify.toml` ändern, auch nicht für eigene Redirects
  innerhalb von `/simulation/` — falls du doch mal einen brauchst, sag
  kurz Bescheid, dann ergänzen wir das gemeinsam, statt dass zwei Leute
  zeitgleich an derselben Konfigurationsdatei schrauben.

## Fragen

Bei allem, was über "ich baue in meinem Ordner" hinausgeht — gemeinsame
Navigation, geteilte Assets, Namenskonflikte — kurz absprechen statt
einfach machen. Ansonsten: viel Spaß beim Bauen.
