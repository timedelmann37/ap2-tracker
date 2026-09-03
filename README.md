# AP2 Tracker

Ein einziges, in sich geschlossenes HTML-Dokument zur Vorbereitung auf den
schriftlichen Teil der Abschlussprüfung (Fachinformatiker Systemintegration,
AP2 – GA1, GA2, WiSo). Fortschritt wird lokal im Browser gespeichert
(`localStorage`), es gibt keinen Server und kein Build-Schritt.

## Was drin ist

- Themenübersicht für GA1, GA2 und WiSo mit einzeln abhakbaren Lerninhalten
  ("Items"), Fortschrittsbalken je Thema und Kategorie sowie einer
  "Zur Wiederholung markieren"-Funktion.
- Alle Inhalte wurden gegen echte IHK-Prüfungen abgeglichen (Lückencheck);
  ergänzte Punkte sind mit der jeweiligen Quellprüfung markiert.
- Live-Suche über Themen und Einzelinhalte inklusive Hervorhebung der
  Treffer.
- **Fortschritt exportieren/importieren** (Buttons über den Kategorien):
  Sicherung als JSON-Datei herunterladen bzw. wieder einspielen – falls der
  Browser-Cache mal verloren geht (neues Gerät, anderer Browser, Cache
  geleert). Import kann den aktuellen Stand ersetzen oder mit ihm
  zusammenführen.
- Vier kleine Lern-Minispiele hinter dem 🕹️-Button in der Ecke:
  - **Paket-Fang** – reines Auflockerungs-Minigame.
  - **Port-Sprint** – bekannte Portnummern gegen die Uhr eintippen.
  - **Subnetting-Blitz** – Netz-/Broadcast-Adresse und nutzbare Hosts zu
    einer IP/Prefix-Kombination berechnen.
  - **Fachbegriff-Rush** – Multiple-Choice-Schnellraten zu Fachbegriffen.

## Lokal öffnen

Es genügt, `index.html` direkt im Browser zu öffnen – kein Server, kein
Build, keine Abhängigkeiten.

## Deployment (Netlify)

Dieses Repo ist so eingerichtet, dass jeder Push auf `main` automatisch
eine erreichbare Seite ergibt:

- `index.html` liegt direkt im Repo-Root (Netlify liefert standardmäßig
  `index.html` von der "Publish directory" aus).
- `netlify.toml` pinnt `publish = "."` und leitet alle Pfade per Catch-all-
  Redirect auf `/index.html`, damit es unabhängig von Dashboard-Einstellungen
  funktioniert.

Auf Netlify reicht es, das Repo als Site zu verbinden – Build-Command ist
leer, Publish-Verzeichnis ist das Repo-Root. Kein manuelles Konfigurieren im
Dashboard nötig, alles steckt in `netlify.toml`.

## Ändern & aktuell halten

Alle Inhalte stecken direkt in der `DATA`-Konstante am Anfang des
`<script>`-Blocks in `index.html`. Nach jeder inhaltlichen Änderung bitte
committen und pushen – Netlify deployed daraufhin automatisch neu.
