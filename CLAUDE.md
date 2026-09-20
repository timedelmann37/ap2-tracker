# AP2-Tracker

Lern-Tools zur Vorbereitung auf die IHK-Abschlussprüfung AP2
(Fachinformatiker Systemintegration). Selbst gehostet (nginx). Details in
[`README.md`](./README.md).

Der Bestand nutzt statisches HTML/CSS/JS mit gemeinsamen Assets; Lernseiten
werden aus Markdown gebaut. Build und Deployment stehen in `package.json`
und `docker-compose.yml` / `nginx/default.conf`. **Die Technik ist keine Vorgabe für neue Arbeit:** ein
Build-Schritt, ein Framework (React o. Ä.), TypeScript, Tailwind oder eine
Komponentenbibliothek (shadcn/ui usw.) sind erlaubt, wo sie sich lohnen. Wer
so etwas einführt, hängt es in `npm run build` ein und hält die
bestehenden statischen Seiten lauffähig, bis sie migriert sind.

## Design und neue Inhalte

Vor neuen Seiten, Komponenten, UI-Texten oder Änderungen an Styling und Bewegung
[`DESIGN.md`](./DESIGN.md) lesen und die dortige Erweiterungs- und Prüfroutine
anwenden. Deep Space mit Glasflächen, Laser-Akzenten und animiertem Fortschritt
ist die fortzuführende Gestaltung. Gemeinsame Tokens, Styles und Verhalten
wiederverwenden. Produktlogik und Begriffe stehen in `PRODUCT.md` und `CONTEXT.md`.
Refero-Quellen und Komponentenherkunft sind von `DESIGN.md` aus verlinkt.

## Agent skills

### Issue tracker

Issues und Specs leben als GitHub-Issues in `timedelmann37/ap2-tracker` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Kanonische Standard-Labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` im Repo-Root. See `docs/agents/domain.md`.
