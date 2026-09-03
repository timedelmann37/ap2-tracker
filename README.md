# AP2 Vorbereitung

Zwei eigenständige, statische Tools zur Vorbereitung auf den schriftlichen
Teil der Abschlussprüfung (Fachinformatiker Systemintegration, AP2 – GA1,
GA2, WiSo), verlinkt über eine gemeinsame Startseite. Kein Server, kein
Build-Schritt, jede Seite ist in sich geschlossenes HTML/CSS/JS.

## Struktur

```
/                    Hub — verlinkt auf beide Tools
/tracker/            AP2 Tracker: Themenplan, Fortschritt, Lern-Minispiele
/simulation/         Prüfungssimulation (im Aufbau)
netlify.toml         Deployment-Konfiguration
CONTRIBUTING.md       Anforderungen für alle, die an /simulation/ arbeiten
```

Jeder Ordner hat seine eigene `index.html` und wird von Netlify automatisch
unter dem passenden Pfad ausgeliefert (`meineseite.netlify.app/tracker/`,
`.../simulation/`) — keine Server-Konfiguration nötig.

## AP2 Tracker (`/tracker/`)

- Themenübersicht für GA1, GA2 und WiSo mit einzeln abhakbaren Lerninhalten
  ("Items"), Fortschrittsbalken je Thema und Kategorie sowie einer
  "Zur Wiederholung markieren"-Funktion.
- Alle Inhalte wurden gegen echte IHK-Prüfungen abgeglichen (Lückencheck);
  ergänzte Punkte sind mit der jeweiligen Quellprüfung markiert.
- Live-Suche über Themen und Einzelinhalte inklusive Hervorhebung der
  Treffer.
- **Fortschritt exportieren/importieren**: Sicherung als JSON-Datei
  herunterladen bzw. wieder einspielen – falls der Browser-Cache mal
  verloren geht (neues Gerät, anderer Browser, Cache geleert).
- Vier kleine Lern-Minispiele hinter dem 🕹️-Button in der Ecke: Paket-Fang,
  Port-Sprint, Subnetting-Blitz, Fachbegriff-Rush.
- Fortschritt wird lokal im Browser gespeichert (`localStorage`,
  Schlüssel-Präfix `ap2-tracker-`).

Inhalte stecken direkt in der `DATA`-Konstante am Anfang des
`<script>`-Blocks in `tracker/index.html`.

## Prüfungssimulation (`/simulation/`)

Im Aufbau. Anforderungen und Spielregeln für die Mitarbeit stehen in
[`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Lokal öffnen

Jede `index.html` lässt sich direkt im Browser öffnen – kein Server, kein
Build, keine Abhängigkeiten. Für Links zwischen den Bereichen (root-relative
Pfade wie `/tracker/`) empfiehlt sich testweise ein lokaler Server, z. B.
`npx serve` oder `python3 -m http.server` im Repo-Root.

## Deployment (Netlify)

Das Repo ist so eingerichtet, dass jeder Push auf `main` automatisch eine
erreichbare Seite ergibt:

- `index.html` liegt im Repo-Root (Netlify liefert standardmäßig
  `index.html` von der "Publish directory" aus), `tracker/` und
  `simulation/` liegen als eigene Ordner daneben.
- `netlify.toml` pinnt `publish = "."`. Es gibt bewusst **keinen**
  Catch-all-Rewrite mehr — mit drei echten Seiten würde der jede Anfrage auf
  `/tracker/` oder `/simulation/` auf die Startseite umbiegen. Nur echte
  404s fallen auf die Startseite zurück (`status = 404`, damit der
  Statuscode korrekt bleibt).

Auf Netlify reicht es, das Repo als Site zu verbinden – Build-Command ist
leer, Publish-Verzeichnis ist das Repo-Root. Kein manuelles Konfigurieren im
Dashboard nötig, alles steckt in `netlify.toml`. Für Pull Requests baut
Netlify automatisch Deploy-Previews, darüber lässt sich ein neuer Bereich
vor dem Merge live testen.

## Mitarbeit zu zweit

Siehe [`CONTRIBUTING.md`](./CONTRIBUTING.md) für die Spielregeln: wer in
welchem Ordner arbeitet, Pfad- und `localStorage`-Konventionen, Git-Workflow
über Feature-Branches und Pull Requests.
