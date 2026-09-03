# AP2-Tracker

Lern-Tools zur Vorbereitung auf die IHK-Abschlussprüfung AP2
(Fachinformatiker Systemintegration). Deployment über Netlify. Details in
[`README.md`](./README.md).

Der Bestand ist heute statisches, in sich geschlossenes HTML/CSS/JS pro Seite
ohne Build-Schritt. **Das ist keine Vorgabe mehr für neue Arbeit:** ein
Build-Schritt, ein Framework (React o. Ä.), TypeScript, Tailwind oder eine
Komponentenbibliothek (shadcn/ui usw.) sind erlaubt, wo sie sich lohnen. Wer
so etwas einführt, richtet den passenden Netlify-Build mit ein und hält die
bestehenden statischen Seiten lauffähig, bis sie migriert sind.

## Agent skills

### Issue tracker

Issues und Specs leben als GitHub-Issues in `timedelmann37/ap2-tracker` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Kanonische Standard-Labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` im Repo-Root. See `docs/agents/domain.md`.
